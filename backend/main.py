import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Configure CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    user_input: str

@app.post("/ask")
async def ask_question(input_data: UserInput):
    user_query = input_data.user_input

    try:
        client = openai.OpenAI(api_key=OPENAI_API_KEY)  # Create OpenAI client
        
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a career guidance assistant."},
                {"role": "user", "content": user_query}
            ],
            temperature=0.7
        )

        bot_response = response.choices[0].message.content

    except Exception as e:
        print(e)
        bot_response = "Sorry, I couldn't generate a response."

    return {"response": bot_response}
