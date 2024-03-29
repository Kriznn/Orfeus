from orfeus_config import db, meta
from sqlalchemy import ForeignKey, Table, Column, Integer, String, VARBINARY
from sqlalchemy import Column, ForeignKey, Integer, Index
from sqlalchemy.orm import relationship


def init_app(app):
    db.init_app(app)


user = Table(
    'user', meta,
    Column('id', Integer, primary_key=True),
    Column('username', String),
    Column('password', VARBINARY),
    Column('email', String),
    Column('role', Integer),
    Column('privacy_level', Integer),
    Column('profile_picture_path', String),
    Column('account_creation_date', String),
)


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.LargeBinary, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.Integer, nullable=False)
    privacy_level = db.Column(db.Integer, nullable=False)
    profile_picture_path = db.Column(db.String(200), nullable=False)
    account_creation_date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"


song_file = Table("song_file", meta,
                  Column("song_id", Integer, primary_key=True),
                  Column("title", String(255)),
                  Column("filepath", String(1000)),
                  Column("uploaded_date", String),
                  Column("genre_id", Integer, ForeignKey("genre.id")),
                  Column("artist_id", Integer, ForeignKey("artist.id")),
                  Column("user_id", Integer, ForeignKey("user.id")),
                  )


class SongFile(db.Model):
    __tablename__ = "song_file"

    song_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    filepath = db.Column(db.String(1000))
    uploaded_date = db.Column(db.String)
    genre_id = db.Column(db.Integer, db.ForeignKey("genre.id"))
    artist_id = db.Column(db.Integer, db.ForeignKey("artist.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    def __repr__(self):
        return f"SongFile('{self.title}', '{self.filepath}', '{self.uploaded_date}')"


artist_table = Table("artist", meta,
                     Column("id", Integer, primary_key=True),
                     Column("name", String(45)),
                     )


class Artist(db.Model):
    __tablename__ = "artist"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45))

    def __repr__(self):
        return f"Artist('{self.name}')"


genre = Table("genre", meta,
              Column("id", Integer, primary_key=True),
              Column("name", String(45), nullable=True)
              )


class Genre(db.Model):
    __tablename__ = "genre"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), nullable=True)

    def __repr__(self):
        return f"Genre('{self.name}')"


generated_file = Table(
    'generated_file', meta,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('filepath', String(1000)),
    Column('creation_date', String(255)),
    Column('privacy_level', Integer),
    Column('like_count', Integer),
    Column('song_file_id', Integer),
    Column('user_id', Integer),
    Column('genre_id', Integer),
    Column('settings_id', Integer),
)


class GeneratedFile(db.Model):
    __tablename__ = 'generated_file'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    filepath = db.Column(db.String(1000))
    creation_date = db.Column(db.DateTime)
    privacy_level = db.Column(db.Integer)
    like_count = db.Column(db.Integer)
    song_file_id = db.Column(db.Integer)
    user_id = db.Column(db.Integer)
    genre_id = db.Column(db.Integer)
    settings_id = db.Column(db.Integer)

    def __repr__(self):
        return f"GeneratedFile('{self.id}', '{self.filepath}', '{self.creation_date}', '{self.privacy_level}', '{self.like_count}', '{self.song_file_id}', '{self.user_id}', '{self.genre_id}', '{self.settings_id}')"

comment = Table(
    'comment', meta,
    Column('id', Integer, primary_key=True),
    Column('content', String(1000), nullable=False),
    Column('user_id', Integer, nullable=False),
    Column('generated_file_id', Integer)
)


class Comment(db.Model):
    __tablename__ = 'comment'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    generated_file_id = db.Column(db.Integer)

    def __repr__(self):
        return f"Comment('{self.id}', '{self.content}', '{self.user_id}', '{self.generated_file_id}')"

class Like(db.Model):
    __tablename__ = 'song_like'

    generated_file_id = Column(Integer, ForeignKey('generated_file.id'), primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    generated_file = relationship('GeneratedFile', backref='likes')
    user = relationship('User', backref='likes')

    def __repr__(self):
        return f"Like(generated_file_id={self.generated_file_id}, user_id={self.user_id})"


Index('fk_like_generated_file1_idx', Like.generated_file_id)
Index('fk_like_user1_idx', Like.user_id)

playlist = Table(
    'playlist', meta,
    Column('id', Integer, primary_key=True),
    Column('name', String(45), nullable=False),
    Column('user_id', Integer, nullable=False),
)


class Playlist(db.Model):
    __tablename__ = 'playlist'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Playlist('{self.id}', '{self.name}', '{self.user_id}', )"

class PlaylistSong(db.Model):
    __tablename__ = 'playlist_song'

    generated_file_id = Column(Integer, ForeignKey('generated_file.id'), primary_key=True)
    playlist_id = Column(Integer, ForeignKey('playlist.id'), primary_key=True)
    generated_file = relationship('GeneratedFile', backref='playlist_song')
    playlist = relationship('Playlist', backref='playlist_song')

    def __repr__(self):
        return f"Playlist song relationship(generated_file_id={self.generated_file_id}, playlist_id={self.playlist_id})"