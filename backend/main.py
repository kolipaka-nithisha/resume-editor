from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EnhanceRequest(BaseModel):
    section: str
    content: str

@app.post("/ai-enhance")
async def ai_enhance(data: EnhanceRequest):
    return {
        "section": data.section,
        "enhanced_content": f"Enhanced version of: {data.content}"
    }

class ResumeData(BaseModel):
    data: dict

@app.post("/save-resume")
async def save_resume(resume: ResumeData):
    with open("resume_saved.json", "w") as f:
        json.dump(resume.data, f, indent=4)
    return {"message": "Resume saved successfully."}
