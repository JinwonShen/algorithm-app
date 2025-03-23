# 🧠 My Algorithm App

개발자 맞춤형 알고리즘 문제집 생성기입니다.  
기초 문법부터 DFS, DP까지 다양한 카테고리의 문제를 직접 풀어보며 학습할 수 있습니다.

<br>

## 🚀 주요 기능

| 기능                                    | 설명                                        |
| --------------------------------------- | ------------------------------------------- |
| 📋 문제 리스트 페이지 (`/`)             | JSON 기반의 알고리즘 문제들을 목록으로 확인 |
| 🔍 문제 상세 페이지 (`/problem/[id]`)   | 문제 설명, 입출력 예제, 힌트 제공           |
| 💻 코드 에디터                          | CodeMirror 기반 코드 입력 기능              |
| ▶ 코드 실행 기능                        | 브라우저에서 JS 코드 실행 결과 확인         |
| 🚀 제출 기능                            | 사용자의 출력과 정답 비교 → 정답 여부 판별  |
| 🏆 풀이 기록 저장                       | 정답 제출 시 `localStorage`에 자동 저장     |
| 📜 푼 문제 목록 페이지 (`/my-problems`) | 사용자가 푼 문제들을 목록으로 확인 가능     |

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

## 🗂️ 폴더 구조 (일부)

```
src/
├── data/                         # 문제 JSON 데이터
│   └── algorithm_problems.json
├── pages/
│   ├── index.tsx                 # 문제 리스트
│   ├── problem/
│   │   └── [id].tsx              # 문제 상세 + 제출
│   └── my-problems.tsx          # 내가 푼 문제 목록
├── styles/
│   └── globals.css              # 전역 스타일
└── components/                  # (필요 시 컴포넌트 분리)
```

<br>

## 🛠️ 실행 방법

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 확인
http://localhost:3000
```

<br>

## ✅ 향후 개선 방향

- 코드 테스트 자동화 (입력값 기반 실행)
- 사용자 계정 및 서버 기반 저장 기능
- TailwindCSS 또는 CSS Module로 UI 개선
- 코드 언어 선택 (JS 외에 Python 등)
- 문제 즐겨찾기 / 정답률 표시 기능

<br>

### 📄 License

MIT License

<br>

### 🙋‍♂️ 만든 사람

🔗 [github.com/JinwonShen](JinwonShen/algorithm-app)
