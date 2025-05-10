from deepface import DeepFace
import os
import pickle

champion_dir = "champions"
embedding_file = "embeddings.pkl"
model_name = "ArcFace"

print(f"✅ '{champion_dir}' 안의 이미지들을 분석 중...")

representations = []
success_count = 0
failures = []

for filename in os.listdir(champion_dir):
    img_path = os.path.join(champion_dir, filename)

    try:
        embedding = DeepFace.represent(
            img_path=img_path,
            model_name=model_name,
            detector_backend="skip",
            enforce_detection=False
        )[0]  # 리스트의 첫 결과
        representations.append({
            "identity": filename,
            "embedding": embedding["embedding"]
        })
        success_count += 1
        print(f"✅ 성공: {filename}")

    except Exception as e:
        print(f"❌ 실패: {filename} - {str(e)}")
        failures.append(filename)

# 결과 저장
with open(embedding_file, "wb") as f:
    pickle.dump(representations, f)

print(f"\n🎉 완료: {success_count}개 성공 / {len(failures)}개 실패")
if failures:
    print("실패한 파일 목록:")
    for f in failures:
        print(f" - {f}")
