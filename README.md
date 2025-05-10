
# 🎮 LOL 챔피언 얼굴 매칭 시스템

리그 오브 레전드(LOL) 챔피언 중 나와 가장 닮은 챔피언을 AI가 자동으로 찾아주는 웹서비스입니다.

---

## ✨ 프로젝트 소개

이 프로젝트는 사용자가 본인의 얼굴 사진을 업로드하면 AI가 얼굴 특징을 분석하고,  
가장 닮은 LOL 챔피언 **Top 3**를 추천해주는 웹 어플리케이션입니다.

> 🧠 기존 face_recognition → **DeepFace(ArcFace)** 기반으로 전환하여 정확도 향상  
> ✅ 챔피언 이미지 50장 기준, DeepFace는 **100% 임베딩 성공률** 기록

---

## 🔍 주요 기능

- **이미지 업로드 및 실시간 분석**: 얼굴 특징 벡터 추출
- **닮은 챔피언 Top 3 추천**: 이미지, 이름, 유사도(%) 출력
- **"다시 테스트하기" 버튼**으로 빠른 재분석
- **챔피언 이미지 자동 렌더링**

---

## 📸 결과 화면 예시

### 이미지 업로드 전
![upload](./public/screenshots/upload.png)

### 닮은 챔피언 Top 3 결과
![result](./public/screenshots/result.png)

---

## 🛠 사용된 기술

### 프론트엔드
- React (Vite)
- Ant Design (UI 컴포넌트)
- JavaScript (ES6+)

### 백엔드
- Python 3.10
- FastAPI
- Uvicorn
- DeepFace (ArcFace 모델)

### 기타 도구
- Git, GitHub
- GitHub Desktop
- VSCode

---

## ⚙ 설치 및 실행 방법

### ✅ 백엔드 환경 설정 (DeepFace + Python 3.10)

#### 1. 가상환경 생성 (Windows 기준)

```bash
cd test_deepface
C:\Users\a00411\AppData\Local\Programs\Python\Python310\python.exe -m venv venv
```

> 본인의 Python 3.10 경로로 수정 가능 (`py -0` 명령어로 버전 목록 확인)

#### 2. 가상환경 활성화

```bash
venv\Scripts\activate
```

#### 3. 필수 패키지 설치

```bash
pip install tensorflow==2.11.0 keras==2.11.0
pip install deepface fastapi uvicorn python-multipart
```

---

### ✅ 백엔드 서버 실행

```bash
cd ../backend
python -m uvicorn main:app --reload
```

---

### ✅ 프론트엔드 실행 (React)

```bash
cd frontend
npm install
npm run dev
```

---

## ✅ 프로젝트 진행 요약

1. op.gg / 나무위키에서 챔피언 이미지 50장 수집
2. dlib → DeepFace(ArcFace)로 모델 전환 (정확도 개선)
3. `DeepFace.represent()`로 벡터화 → `embeddings.pkl` 저장
4. FastAPI로 이미지 업로드 및 유사도 계산 API 구성
5. React에서 결과 카드 UI 구현 (Top 3 출력)

---

## 🐞 주요 해결 이슈

- Python 가상환경에서 tensorflow/keras 버전 충돌
- 일부 챔피언 이미지 인식 실패 → 이미지 교체 및 ArcFace로 해결
- FastAPI ↔ React 간 CORS 문제 처리
- GitHub 용량 초과 문제 → `.gitignore` 설정 및 리포지토리 리셋

---

## 🔮 향후 추가 기능

- 챔피언 데이터 확대 및 정확도 개선
- 닮은 결과 히스토리 저장 및 공유
- 사용자별 닮은 챔피언 분석 히트맵
- 모바일 반응형 UI

---

## 📄 License

This project is licensed under the MIT License.

---

### 🛠 NumPy 버전 호환 이슈 해결

TensorFlow 2.11은 NumPy 1.x 기반으로 컴파일되어 있으므로, 최신 NumPy 2.x 버전과 충돌이 발생할 수 있습니다.

아래 명령어로 NumPy를 **안정적인 버전(1.24.3)** 으로 다운그레이드하세요:

```bash
pip install numpy==1.24.3 --force-reinstall
```

> 이 설정은 DeepFace + TensorFlow + Keras 조합에서 안정적으로 동작합니다.
