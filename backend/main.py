# backend/main.py (DeepFace 버전)
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from deepface import DeepFace
import shutil
import pickle
import numpy as np
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

EMBEDDING_FILE = os.path.join("..", "test_deepface", "embeddings.pkl")
with open(EMBEDDING_FILE, "rb") as f:
    champion_data = pickle.load(f)

def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

@app.post("/upload")
async def match_champion(file: UploadFile = File(...)):
    temp_path = "temp.jpg"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # 사용자 얼굴 임베딩
        test_embedding = DeepFace.represent(
            img_path=temp_path,
            model_name="ArcFace",
            detector_backend="skip",
            enforce_detection=False
        )[0]["embedding"]

        # 모든 챔피언과 유사도 계산
        similarities = []
        for champ in champion_data:
            score = cosine_similarity(test_embedding, champ["embedding"])
            similarities.append({
                "name": champ["identity"],
                "score": round(float(score), 4)
            })

        # Top 3 챔피언 추출 (높은 점수 순)
        top3 = sorted(similarities, key=lambda x: x["score"], reverse=True)[:3]

        os.remove(temp_path)

        return {
            "top_matches": top3
        }

    except Exception as e:
        os.remove(temp_path)
        return {"error": str(e)}
