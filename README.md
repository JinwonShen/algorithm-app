# 🧠 My Algorithm App

알고리즘 문제를 풀고, 직접 코드를 실행하고,
내가 푼 문제를 저장해 확인할 수 있는 개인 맞춤형 문제풀이 웹 앱입니다.

👉 **배포용이 아닌 학습용 프로젝트입니다.**

<br>

## 📁 프로젝트 구조

```
src/
├── components/            # 재사용 가능한 컴포넌트
│   └── CodeEditor.tsx
├── data/
│   └── algorithm_problems.json   # 알고리즘 문제 JSON 데이터
├── pages/
│   ├── index.tsx          # 홈 (문제 리스트, 검색/정렬/필터)
│   ├── problem/
│   │   ├── [id].tsx       # 문제 상세 및 실행/제출 기능
│   ├── editor.tsx         # 코드 에디터 테스트용 페이지
│   ├── myProblems.tsx     # 내가 푼 문제 확인 페이지
│
├── styles/
│   ├── globals.css        # 전역 스타일
│   ├── index.module.css   # index.tsx 전용 스타일
│   ├── [id].module.css    # [id].tsx 전용 스타일
│   └── …
├── utils/                 # 유틸 함수 저장 예정
├── app.tsx                # 글로벌 스타일 포함
└── …
```

<br>

## 🚀 주요 기능

- ✅ 알고리즘 문제 목록 (카테고리, 난이도 표시)
- 🔍 문제 제목/카테고리 검색
- 📌 난이도/제목 정렬
- 📁 문제 상세 페이지
  - 코드 작성 (CodeMirror 적용)
  - 코드 실행 (`eval` 사용)
  - 정답 제출 및 결과 확인
  - localStorage로 푼 문제 저장
- 📜 내가 푼 문제 리스트 페이지

<br>

## 📦 기능 구현 내역

### ✅ 검색 기능 구현

- 사용자 입력에 따라 문제 목록을 실시간 필터링
- 검색 대상: 문제 title + category
- 대소문자 구분 없이 검색 가능

### ✅ 정렬 기능 추가

- 정렬 기준 선택 가능:
- 기본순 (입력 순서)
- 제목순 (가나다순)
- 난이도순 (Easy → Medium → Hard)
- select 태그로 선택한 정렬 기준에 따라 문제 정렬됨
- 타입 안정성 보장 (difficultyOrder: Record<...> 사용)

### ✅ 카테고리 필터 기능 추가

- 문제 목록에서 특정 카테고리만 필터링 가능
- "전체" 카테고리 선택 시 전체 문제 출력
- 중복 제거된 카테고리 목록을 자동 생성하여 select로 표시

### ✅ 타입스크립트 대응

- sort() 함수 내 매개변수에 명시적 타입(Problem) 지정
- difficultyOrder에 Record<Problem["difficulty"], number> 타입 선언하여 타입 오류 해결
- .sort() 함수에서 모든 분기에서 number 반환하도록 수정 (return 0 포함)

<br>

## 🧰 기술 스택

- **Next.js (TypeScript)**
- **CodeMirror 6**: 코드 입력기
- **React Hooks** (`useState`, `useEffect`, `useRouter`)
- **LocalStorage**: 클라이언트 상태 저장
- **정적 파일 기반 JSON 문제 데이터**

<br>

## 🧪 초기 배포 시도: GitHub Pages 실패 원인

### ❌ 시도한 방법

- `next.config.ts`에 `basePath`와 `assetPrefix` 설정
- `next export`를 사용해 정적 파일(`out`) 생성
- `gh-pages` 패키지로 GitHub Pages에 배포

### ⚠️ 발생한 문제들

- `_next/static/...` 경로에 접근 불가 (404 오류)
- CSS 및 JS 리소스 누락으로 레이아웃이 깨짐
- `.nojekyll` 누락으로 정적 리소스 무시됨
- GitHub Pages 경로 호환 이슈 및 캐시 문제 등

결국 GitHub Pages는 Next.js 정적 사이트와 완전히 호환되기 어려운 점이 많았음

---

## 🚀 전환: Vercel을 활용한 배포 (최종 성공)

[Vercel](https://vercel.com)은 **Next.js 제작사인 Vercel이 직접 운영하는 플랫폼**으로, Next.js 프로젝트에 최적화된 배포 환경을 제공함

### ✅ 장점

- `basePath`, `assetPrefix` 필요 없음
- 자동 라우팅 및 정적 빌드 지원
- 배포가 매우 간단 (CLI 또는 GitHub 연동)
- 빠른 속도와 글로벌 CDN 지원

### 🔧 배포 절차 (npx 방식)

1. Vercel CLI 설치

   ```bash
   npm install -g vercel
   ```

2. 로그인 및 초기화

   ```bash
   npx vercel
   ```

   - GitHub 연동 진행
   - 프로젝트 이름, 루트 디렉토리 설정 (기본값 그대로 OK)

3. 최종 배포

   ```bash
   npx vercel --prod
   ```

4. 배포 주소 확인
   **예: **``

---

## ✅ 현재 배포 주소

👉 [https://algorithm-9r06nuwrx-jinwonshens-projects.vercel.app](https://algorithm-9r06nuwrx-jinwonshens-projects.vercel.app)

---

## 🛠 기술 스택

- Frontend: **React (Next.js)**, **TypeScript**
- Code Editor: [@uiw/react-codemirror](https://github.com/uiwjs/react-codemirror)
- 배포: **Vercel**

---

## 📂 폴더 구조

```
my-algorithm-app
├── pages
│   ├── index.tsx
│   ├── problem/[id].tsx
│   ├── editor.tsx
│   └── myProblems.tsx
├── components
├── styles
├── public
├── utils
└── next.config.ts
```

---

## 🙌 Special Thanks

- GitHub Pages 삽질 덕분에 정적 배포의 구조를 깊게 이해하게 됨
- 함께한 Vercel, 너는 정말 최고의 친구다 😭🙏

<br>

## ✅ 향후 개선 방향

- 테스트 케이스 기반 채점 로직 강화
- 사용자 코드 보안 강화 (eval 제거)
- 문제 제출 기록 관리
- 사용자 인증 및 개인 기록 연동

<br>

### 🙋‍♂️ 만든 사람

🔗 [github.com/JinwonShen](JinwonShen/algorithm-app)
