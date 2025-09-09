# Todo List Demo

React와 Node.js를 사용한 풀스택 Todo List 애플리케이션입니다. 사용자 인증, 할일 관리, 실시간 업데이트 기능을 제공합니다.

## 🚀 주요 기능

### 인증 시스템
- 사용자 회원가입
- 이메일/패스워드 로그인
- JWT 토큰 기반 인증
- 로그아웃 기능

### Todo 관리
- 할일 추가/삭제
- 할일 완료 상태 토글
- 사용자별 개인 할일 목록
- 실시간 업데이트

## 🛠 기술 스택

### Frontend
- **React 18** - UI 라이브러리
- **React Router DOM** - 라우팅
- **React Bootstrap** - UI 컴포넌트
- **Axios** - HTTP 클라이언트
- **Bootstrap 5** - CSS 프레임워크

### Backend
- **Node.js** - 런타임 환경
- **Express.js** - 웹 프레임워크
- **MongoDB** - 데이터베이스
- **Mongoose** - ODM
- **JWT** - 인증 토큰
- **bcryptjs** - 패스워드 암호화
- **CORS** - 크로스 오리진 요청 처리

## 📁 프로젝트 구조

```
todolist-demo/
├── todo-fe/                 # React 프론트엔드
│   ├── public/
│   ├── src/
│   │   ├── components/      # 재사용 가능한 컴포넌트
│   │   │   ├── TodoBoard.js
│   │   │   └── TodoItem.js
│   │   ├── pages/           # 페이지 컴포넌트
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   └── TodoPage.js
│   │   ├── route/           # 라우팅 설정
│   │   │   └── PrivateRoute.js
│   │   ├── utils/           # 유틸리티 함수
│   │   │   └── api.js
│   │   └── App.js
│   └── package.json
├── todo-be/                 # Node.js 백엔드
│   ├── controllers/         # 컨트롤러
│   │   ├── auth.controller.js
│   │   ├── task.controller.js
│   │   └── user.controller.js
│   ├── model/               # 데이터 모델
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/              # API 라우트
│   │   ├── index.js
│   │   ├── task.api.js
│   │   └── user.api.js
│   ├── app.js
│   └── package.json
└── README.md
```

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd todolist-demo
```

### 2. 백엔드 설정 및 실행

```bash
cd todo-be
npm install
```

환경 변수 설정을 위해 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
MONGODB_URI_PROD=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret_key
```

백엔드 서버 실행:
```bash
npm start
```

백엔드는 `http://localhost:5001`에서 실행됩니다.

### 3. 프론트엔드 설정 및 실행

```bash
cd todo-fe
npm install
npm start
```

프론트엔드는 `http://localhost:3000`에서 실행됩니다.

## 📡 API 엔드포인트

### 인증 관련
- `POST /api/user` - 회원가입
- `POST /api/user/login` - 로그인
- `GET /api/user/me` - 현재 사용자 정보 조회

### 할일 관리
- `GET /api/tasks` - 할일 목록 조회
- `POST /api/tasks` - 할일 생성 (인증 필요)
- `PUT /api/tasks/:id` - 할일 수정
- `DELETE /api/tasks/:id` - 할일 삭제

## 🔐 인증 플로우

1. **회원가입**: 사용자가 이메일, 패스워드, 이름을 입력하여 계정 생성
2. **로그인**: 이메일과 패스워드로 인증 후 JWT 토큰 발급
3. **토큰 저장**: 프론트엔드에서 토큰을 sessionStorage에 저장
4. **인증된 요청**: API 요청 시 Authorization 헤더에 토큰 포함
5. **로그아웃**: 토큰 제거 및 사용자 상태 초기화

## 🎨 주요 컴포넌트

### TodoPage
- 사용자 정보 표시 및 로그아웃 기능
- 할일 추가 폼
- TodoBoard 컴포넌트 렌더링

### TodoBoard
- 할일 목록 표시
- TodoItem 컴포넌트들을 매핑하여 렌더링

### TodoItem
- 개별 할일 아이템 표시
- 완료 상태 토글 버튼
- 삭제 버튼

### PrivateRoute
- 인증된 사용자만 접근 가능한 라우트 보호
- 미인증 시 로그인 페이지로 리다이렉트

## 🌐 배포

### 백엔드 (AWS Elastic Beanstalk)
- Node.js 20.x 환경
- MongoDB Atlas 사용
- CORS 설정으로 프론트엔드 도메인 허용

### 프론트엔드 (Netlify)
- React 빌드 파일 배포
- SPA 라우팅을 위한 `_redirects` 설정

## 🔧 개발 환경 설정

### 필수 요구사항
- Node.js 20.x 이상
- MongoDB (로컬 또는 Atlas)
- npm 또는 yarn

### 환경 변수
백엔드 실행을 위해 다음 환경 변수들이 필요합니다:
- `MONGODB_URI_PROD`: MongoDB 연결 문자열
- `JWT_SECRET`: JWT 토큰 서명용 시크릿 키
- `PORT`: 서버 포트 (기본값: 5001)

## 📝 라이선스

ISC
