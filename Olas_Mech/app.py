# app.py
from flask import Flask, jsonify, request
from fusepaychatbot import get_prompt
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS if needed, especially for local development with frontend

from dotenv import load_dotenv
if __name__ == '__main__':
    app.run()
