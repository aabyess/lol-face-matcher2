# test.py
from deepface import DeepFace

print("ArcFace 모델 불러오는 중...")
model = DeepFace.build_model("ArcFace")
print("✅ 모델 로딩 성공:", type(model))
