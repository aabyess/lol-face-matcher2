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
- **닮은 챔피언 추천**: 이미지, 이름, 유사도(%) 출력  
- **"다시 테스트하기" 버튼**으로 빠른 재분석  
- **챔피언 메타정보 출력**: 역할(Role), 포지션(Position), 태그(Tags), 대표 대사(Quote) 등 함께 제공  
- **챔피언 이미지 자동 렌더링**:  챔피언 이미지가 카드 형태로 시각화됨

---

## 📸 결과 화면 예시

### 이미지 업로드 전
![upload](./public/screenshots/upload.png)

### 닮은 챔피언 결과
![result](./public/screenshots/result.png)

---

## 🎨 UI/UX 개선 사항

- 🎥 **배경 영상 적용**: `mainPage3.webm` 영상을 사이트 배경으로 활용
- 🧊 **반투명 카드 UI**: 어두운 블루 계열 + 반투명 처리로 몰입감 강화
- 🎞️ **카드 전환 애니메이션**: `Framer Motion`으로 메인 카드 전환 효과 구현

---

## 📱 모바일 반응형 UI

- ✅ `Ant Design`의 `Row/Col` 시스템으로 서브 카드 반응형 레이아웃 구현
- ✅ 카드, 텍스트, 버튼 등 요소 크기 모바일 기준 자동 조정
- ✅ 배경 영상 `object-position: center center`로 모바일 중심 위치 최적화
- ✅ `maxWidth: 100%`, padding/margin 조절로 모바일 공간 확보

---

## 🛠 사용된 기술

### 프론트엔드
- React (Vite)
- Ant Design (UI 컴포넌트)
- Framer Motion (애니메이션)
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
C:/Users/USERNAME/AppData/Local/Programs/Python/Python310/python.exe -m venv venv
```

> 본인의 Python 3.10 경로로 수정 가능 (`py -0` 명령어로 버전 목록 확인)

#### 2. 가상환경 활성화
```bash
venv\Scriptsctivate
```

#### 3. 필수 패키지 설치
```bash
pip install tensorflow==2.11.0 keras==2.11.0
pip install deepface fastapi uvicorn python-multipart
```

#### ✅ NumPy 버전 호환 이슈 해결
```bash
pip install numpy==1.24.3 --force-reinstall
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
- MBTI/성향 기반 챔피언 추천 연동
- 결과 기반 배경 이미지 자동 전환
- SNS 공유 기능, 모달 상세 보기 등 UI 확장

---

## 🧪 실행 순서 (로컬 + 모바일 공유 기능 테스트용)

모든 기능이 정상 작동하려면 백엔드 서버, 프론트 서버, 그리고 ngrok 순서대로 실행해야 합니다.

---

### 1️⃣ 백엔드 서버 실행 (FastAPI)

```bash
cd test_deepface
venv\Scriptsctivate

cd ../backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

> `--host 0.0.0.0`을 설정해야 외부(ngrok 등)에서 접속 가능

---

### 2️⃣ 프론트엔드 서버 실행 (Vite)

```bash
npm run dev -- --host
```

> 실행 후 `http://localhost:5173` 또는 `http://172.xx.xx.xx:5173`로 접속 가능

---

### 3️⃣ ngrok 실행 (모바일 공유 테스트용)

```bash
ngrok http 5173
```

> HTTPS 주소가 생성됩니다. 예시:

```
Forwarding https://abcd-1234.ngrok-free.app -> http://localhost:5173
```

모바일에서 이 HTTPS 주소로 접속해야 Web Share API(공유 버튼)가 작동합니다.

---

### ✅ 정리된 순서 요약

1. 백엔드 실행 (`uvicorn ...`)
2. 프론트엔드 실행 (`npm run dev`)
3. ngrok 실행 → HTTPS 주소 접속
4. 모바일 Safari로 접속 → 공유 기능 확인

---

## 📄 License

This project is licensed under the MIT License.