import openai
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

from openai import OpenAI


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/generate-resume", methods=["POST"])
def generate_resume():
    data = request.get_json()

    prompt = f"""
    Create a professional resume with the following:
    Name: {data['name']}
    Email: {data['email']}
    Phone: {data['phone']}
    Skills: {', '.join(data['skills'])}
    Experience: {data['experience']}
    Education: {data['education']}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=600
        )
        result = response.choices[0].message.content
        return jsonify({"resume": result})
    except Exception as e:
        print("OpenAI API Error:", e)
        return jsonify({"error": "Something went wrong"}), 500


# 👇👇 THIS PART IS CRUCIAL 👇👇
if __name__ == "__main__":
    app.run(debug=True)
