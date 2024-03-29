from datetime import datetime
from flask import Blueprint, jsonify, make_response, request, send_file
from flask_cors import cross_origin
from flask_jwt_extended import decode_token, get_jwt_identity
import requests
from models import User, song_file, GeneratedFile, Comment, Like, SongFile
from orfeus_config import engine, db
from sqlalchemy import select
from scipy.io import wavfile
import numpy as np
import os
import io
import os
import json
import io
from flask_jwt_extended import jwt_required, current_user, create_access_token
import boto3
from botocore.exceptions import ClientError
import urllib.parse

sqs = boto3.client('sqs', region_name='us-east-1')
s3 = boto3.client('s3', region_name='us-east-1')
queue_url = 'https://sqs.us-east-1.amazonaws.com/636414103362/imagequeue.fifo'
bucket_name = 'useruploaded'
file_bp = Blueprint('files', __name__)


@file_bp.route('/generatedfiles/<int:sound_file_id>', methods=['GET', 'OPTIONS'])
@cross_origin()
def getGeneratedFileForPlayback(sound_file_id):
    song = GeneratedFile.query.filter_by(id=sound_file_id).first()
    base_path = os.getcwd()
    song_path = os.path.relpath(
        song.filepath, os.path.join(base_path, "src\\backend"))

    # Check if the song exists in the database
    if song is None:
        return make_response("Song not found", 404)

    # Check if the file exists
    if not os.path.isfile(song_path):
        return make_response("Audio file not found", 404)

    # Send the audio file in the response
    return send_file(song_path, mimetype='audio/mpeg')


@file_bp.route('/carouselfiles', methods=['GET', 'OPTIONS'])
@cross_origin()
def getCarouselSongs():
    songs = GeneratedFile.query.all()
    song_list = []
    for song in songs:
        song_dict = {
            column.name: getattr(song, column.name)
            for column in song.__table__.columns
            if column.name != "InstanceState"
        }
        song_list.append(song_dict)
    print(song_list)
    return json.dumps(song_list, default=str)


@file_bp.route('/file', methods=['POST', 'OPTIONS'])
@cross_origin()
def upload():
    if request.method == 'POST':
        uploaded_file = request.files["file"]
        data = uploaded_file.read()
        now = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        # Get the username from the decoded token
        access_token = request.headers.get('Authorization')
        decoded_token = decode_token(
            access_token.replace("Bearer", "").strip())
        user = decoded_token['sub']

        # # Create the output directory if it doesn't exist
        output_dir = os.path.join(os.getcwd(), 'song_database', user)
        os.makedirs(output_dir, exist_ok=True)
        genre = request.form['genre']
        sampleLength = request.form['sampleLength']
        outputLength = request.form['outputLength']
        # Save the file as a WAV file
        output_filename = f"{request.form['fileName']}-{now}.wav"
        output_path = os.path.join(output_dir, output_filename)
        print(output_path)
        data_buffer = io.BytesIO(data)
        audio_data = np.frombuffer(data_buffer.read(), dtype=np.int16)
        wavfile.write(output_path, 44100, audio_data)

        # Upload the file to S3 and send the object key
        # along with other parameters to SQS queue
        object_key = request.form['fileName'] + "-" + now
        message_body = {
            'S3 object key': object_key,
            'genre': genre,
            'sampleLength': sampleLength,
            'outputLength': outputLength
        }
        try:
            # Upload the file to S3
            s3.upload_file(output_path, bucket_name, object_key, ExtraArgs={'Metadata': message_body})
        except ClientError as e:
            # Return an error response if there was an error uploading the file
            print(e)
            return jsonify({'error': 'Failed to upload file to S3'})
    # def on_upload_complete(bytes_transferred):
    #     print("Waiting for object to be uploaded to S3")
    #     response = sqs.send_message(QueueUrl=queue_url,
    #                                 MessageBody=message_body_str,
    #                                 MessageGroupId='1')
    #     print("Message sent to SQS queue")
    #     response = requests.post("http://127.0.0.1:5000/process_queue")
    #     print(response.text)

    # try:
    #     # Upload the file to S3 using the Callback parameter to specify the on_upload_complete function
    #     s3.upload_file(output_path, bucket_name, object_key,
    #                      Callback=on_upload_complete)

    #     # Return a success response
    # except ClientError as e:
    #     # Return an error response if there was an error uploading the file
    #     print(e)
    #     return jsonify({'error': 'Failed to upload file to S3'})
    # Get user id to store file path and user id in database
        user_id_query = select(User.id).where(User.username == user)
        conn = engine.connect()
        idResult = conn.execute(user_id_query)
        dictionaryForQueryResult = {}
        for row in idResult:
            dictionaryForQueryResult = row._mapping
        insert_query = song_file.insert().values(title=output_filename,
                                                 filepath=output_path,
                                                 uploaded_date=str(now),
                                                 genre_id=1,
                                                 artist_id=1,
                                                 user_id=dictionaryForQueryResult['id'])
        connection = engine.connect()
        result = connection.execute(insert_query)
        print(result)
        connection.close()

        return make_response("file saved in " + output_path, 200)

    elif request.method == 'OPTIONS':
        # respond to the preflight request
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.status_code = 200
        return response


@file_bp.route('/comment', methods=['POST'])
@jwt_required()
@cross_origin()
def post_comment():
    content = request.json.get('comment')
    username = get_jwt_identity()
    user = User.query.filter_by(username=username).first()
    generated_file_id = request.json.get('generated_file_id')
    new_comment = Comment(content=content, user_id=user.id,
                          generated_file_id=generated_file_id)
    db.session.add(new_comment)
    db.session.commit()

    return jsonify({'message': 'Comment posted successfully'})


@file_bp.route('/like/<int:song_id>', methods=['POST'])
@jwt_required()
@cross_origin()
def increment_like(song_id):
    generated_file = GeneratedFile.query.filter_by(id=song_id).first()
    if not generated_file:
        return jsonify({'error': 'Song not found.'}), 404
    new_like = Like(generated_file=generated_file, user_id=current_user.id)

    # add the new_like object to the session and commit the transaction
    db.session.add(new_like)
    db.session.commit()
    generated_file.like_count += 1
    db.session.commit()

    return jsonify({'like_count': generated_file.like_count})


@file_bp.route('/dislike/<int:song_id>', methods=['POST'])
@jwt_required()
@cross_origin()
def decrement_like(song_id):
    like = Like.query.filter_by(
        user_id=current_user.id, generated_file_id=song_id).first()
    generated_file = GeneratedFile.query.filter_by(id=song_id).first()
    # If the like exists, delete it from the database
    if (like and generated_file) is not None:
        db.session.delete(like)
        generated_file.like_count -= 1
        db.session.commit()
        # Return the updated like count
        return jsonify({'like_count': generated_file.like_count})

    # If the like does not exist, return a 404 error
    return jsonify({'error': 'Like not found'}), 404


@file_bp.route('/liked_songs')
@jwt_required()
def get_liked_songs():
    username = get_jwt_identity()
    user = User.query.filter_by(username=username).first()
    likes = Like.query.filter_by(user_id=user.id).all()
    like_list = []
    for like in likes:
        generated_file = GeneratedFile.query.filter_by(
            id=like.generated_file_id).first()
        like_dict = {
            column.name: getattr(like, column.name)
            for column in like.__table__.columns
            if column.name != "InstanceState"
        }
        like_dict['like_count'] = generated_file.like_count
        like_list.append(like_dict)
    print(like_list)
    return json.dumps(like_list, default=str)

# @file_bp.route('/generated_songs')
# @jwt_required()
# def get_generated_songs():
#     username = get_jwt_identity()
#     user = User.query.filter_by(username=username).first()
#     likes = Like.query.filter_by(user_id=user.id).all()
#     like_list = []
#     for like in likes:
#         generated_file = GeneratedFile.query.filter_by(id=like.generated_file_id).first()
#         like_dict = {
#             column.name: getattr(like, column.name)
#             for column in like.__table__.columns
#             if column.name != "InstanceState"
#         }
#         like_dict['like_count'] = generated_file.like_count
#         like_list.append(like_dict)
#     print(like_list)
#     return json.dumps(like_list, default=str)


@file_bp.route('/uploaded_songs')
@jwt_required()
def get_uploaded_songs():
    username = get_jwt_identity()
    user = User.query.filter_by(username=username).first()
    songFiles = SongFile.query.filter_by(user_id=user.id).all()
    songFile_list = []
    for song in songFiles:
        songFile_list.append({
            'id': song.song_id,
            'title': song.title,
            'filepath': song.filepath,
            'uploaded_date': song.uploaded_date,
            'genre_id': song.genre_id,
            'artist_id': song.artist_id,
            'user_id': song.user_id
        })
    print(songFile_list)
    return json.dumps(songFile_list, default=str)


@file_bp.route('/comments/<int:song_id>')
def get_comments(song_id):
    comments = Comment.query.filter_by(generated_file_id=song_id).all()
    comment_list = []
    for comment in comments:
        commenter = User.query.filter_by(id=comment.user_id).first()
        comment_list.append({
            'id': comment.id,
            'text': comment.content,
            'user_id': comment.user_id,
            'username': commenter.username,
            'song_id': comment.generated_file_id
        })
    return jsonify(comment_list)

@file_bp.route('/song/<int:sound_file_id>', methods=['GET', 'OPTIONS'])
@cross_origin()
def getSongInfo(sound_file_id):
    song = GeneratedFile.query.filter_by(id=sound_file_id).first()

    # Check if the song exists in the database
    if song is None:
        return make_response("Song not found", 404)
    
    # Send the audio file in the response
    songInfo = {
            'user_id': song.user_id,
            'creation_date': song.creation_date,
            'filepath': song.filepath,
            'likes': song.like_count,
        }
    return jsonify(songInfo)