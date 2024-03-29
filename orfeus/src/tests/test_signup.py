import pytest
import requests
from flask import Flask


baseURL = "http://127.0.0.1:4000/"

@pytest.fixture
def app():
    app = Flask(__name__)
    yield app

@pytest.fixture
def client(app):
    return app.test_client()

def test_register_and_delete():
    # Send a POST request with valid credentials
    data = [{"id": "1", "value": "testsignupusername"}, 
            {"id": "2", "value": "testsignuppassword"}, 
            {"id": "3", "value": "testsignupwordemail@gmail.com"}]
    url = baseURL + 'register'
    print(f"Sending request to {url} with data {data}")
    response = requests.post(url, json=data)
    print(f"Response status code: {response.status_code}")
    print(f"Response data: {response.text}")
    
    # Check that the response status code is 200 OK
    assert response.status_code == 200
    # Check that the response contains an access tokendata
    assert 'access_token' in response.json()
     
    # Clean up by testing delete
    url = baseURL + 'users/testsignupusername'
    response = requests.delete(url)
    print(f"Sending request to {url} with delete request")
    print(f"Response status code: {response.status_code}")
    print(f"Response data: {response.text}")
    
    # Check that the response status code is 200 OK
    assert response.status_code == 200
    # Check that the response says that the user was deleted 
    assert response.text == "User deleted"

    
