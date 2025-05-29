
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from deepface import DeepFace
import numpy as np
import pickle
import os
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 경로 설정
EMBEDDING_FILE = os.path.join("..", "test_deepface", "embeddings.pkl")
GENDER_FILE = os.path.join("..", "test_deepface", "champion_gender.json")

# 임베딩 로딩
with open(EMBEDDING_FILE, "rb") as f:
    champion_data = pickle.load(f)

# 성별 정보 로딩 (키를 소문자로 정규화)
with open(GENDER_FILE, "r", encoding="utf-8") as f:
    original_gender = json.load(f)
    champion_gender = {k.lower(): v for k, v in original_gender.items()}

@app.post("/upload")
async def match_champion(file: UploadFile = File(...)):
    contents = await file.read()
    temp_path = "temp_image.jpg"

    with open(temp_path, "wb") as f:
        f.write(contents)

    try:
        test_embedding = DeepFace.represent(
            img_path=temp_path,
            model_name="ArcFace",
            enforce_detection=False
        )[0]["embedding"]

        analysis = DeepFace.analyze(
            img_path=temp_path,
            actions=["gender"],
            enforce_detection=False
        )

        print("🔥 DeepFace 분석 결과:", analysis)

        try:
            if isinstance(analysis, list):
                gender_data = analysis[0].get("gender")
            else:
                gender_data = analysis.get("gender")

            if isinstance(gender_data, dict):
                user_gender = max(gender_data, key=gender_data.get)
            elif isinstance(gender_data, str):
                user_gender = gender_data
            else:
                print("⚠ gender 형식 이상 → fallback 적용")
                user_gender = "man"
        except Exception as e:
            print("⚠ 분석 중 오류 발생 → fallback 적용:", str(e))
            user_gender = "man"

        print("✅ 최종 user_gender:", user_gender)
        user_gender = user_gender.lower()

        def cosine_similarity(vec1, vec2):
            vec1 = np.array(vec1)
            vec2 = np.array(vec2)
            return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))

        similarities = []
        for champ in champion_data:
            champ_name = champ["identity"]
            champ_key = champ_name.lower()
            score = cosine_similarity(test_embedding, champ["embedding"])

            champ_gender = champion_gender.get(champ_key, "unknown")
            if isinstance(champ_gender, str) and champ_gender.lower() == user_gender:
                score *= 1.05

            # ✅ 매칭률 보정: 70~100%로 스케일링
            display_score = 70 + (score * 30)

            similarities.append({
                "name": champ_name,
                "score": round(display_score / 100, 4)  # 0.7~1.0 형태로 반환
            })

        top_matches = sorted(similarities, key=lambda x: x["score"], reverse=True)[:6]

        return {
            "gender": user_gender,
            "top_matches": top_matches
        }

    except Exception as e:
        print("❌ 예외 발생:", str(e))
        return {"error": str(e)}

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)
