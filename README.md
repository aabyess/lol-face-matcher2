# 🎮 LOL 챔피언 얼굴 매칭 시스템

리그 오브 레전드(LOL) 챔피언 중 나와 가장 닮은 챔피언을 AI가 자동으로 찾아주는 웹서비스입니다.

---

## ✨ 프로젝트 소개

이 프로젝트는 사용자가 본인의 얼굴 사진을 업로드하면 AI가 얼굴 특징을 분석하고,  
가장 닮은 LOL 챔피언 **Top 3**를 추천해주는 웹 어플리케이션입니다.

> 🧠 `face_recognition` → **DeepFace(ArcFace)** 기반으로 정확도 개선  
> ✅ 챔피언 이미지 50장 기준, DeepFace는 **100% 임베딩 성공률** 기록

---

## 🔍 주요 기능

- **이미지 업로드 및 실시간 분석**: 얼굴 특징 벡터 추출
- **닮은 챔피언 Top 3 추천**: 이미지, 이름, 유사도(%) 출력
- **"다시 테스트하기" 버튼**으로 빠른 재분석
- **챔피언 이미지 자동 렌더링**

---

## 📸 최종 결과물 화면

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
- DeepFace (ArcFace 모델 사용)

### 기타 도구
- Git, GitHub (버전 관리)
- GitHub Desktop
- VSCode

---

## ⚙ 설치 및 실행 방법

### 📍 백엔드 실행 (FastAPI + DeepFace)

```bash
# 1. DeepFace 가상환경 활성화
cd test_deepface
venv\Scripts\activate

# 2. 백엔드 디렉터리로 이동
cd ../backend

# 3. FastAPI 서버 실행
python -m uvicorn main:app --reload
### 📍 프론트엔드 실행 (React)
cd frontend
npm install
npm run dev

