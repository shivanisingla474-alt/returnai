from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
client = OpenAI(api_key="YOUR_API_KEY")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestData(BaseModel):
    issue: str

@app.post("/analyze-return")
def analyze_return(data: RequestData):
    prompt = f"""
    You are an eCommerce return assistant.

    Customer issue: {data.issue}

    Decide:
    1. Return / Exchange / Reject
    2. Reason
    """

    response = client.chat.completions.create(
        model="gpt-5.4-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return {"result": response.choices[0].message.content}