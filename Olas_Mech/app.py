# app.py
from flask import Flask, jsonify, request
from fusepaychatbot import get_prompt
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS if needed, especially for local development with frontend

from dotenv import load_dotenv
load_dotenv()  # This loads the env variables from the .env file

@app.route('/get-prompt', methods=['GET'])
def getChatGPTRequest():
    prompt = request.args.get('prompt', 'Write about the company Fuse-pay which is a payroll system. A system where a company or business owner can add his employees and pay them all at once to their wallets on a monthly basis')  # Default prompt
    try:
        response = get_prompt(prompt)
        print(response)
        return jsonify({"success": True, "response": response}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)