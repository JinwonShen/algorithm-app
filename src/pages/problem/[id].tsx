import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import problemsData from '../../data/algorithm_problems.json';

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), {ssr: false})
import { javascript } from "@codemirror/lang-javascript";

type Problem = {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  input: string;
  output: string;
  examples: { input: string; output: string }[];
  hints: string[];
}

// 동적 경로 설정: 어떤 ID 값이 있는지 지정
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = problemsData.map((problem) => ({
    params: { id: problem.id }
  }))

  return { paths, fallback: false }
}

// 각 문제 데이터를 정적으로 생성
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const problem = problemsData.find((p) => p.id === params?.id)

  if (!problem) {
    return {notFound: true};
  }

  return { props: {problem} }
}

export default function ProblemDetail({ problem }: { problem: Problem }) {
  const router = useRouter()
  const [ code, setCode ] = useState("// 여기에 코드를 입력하세요.")
  const [ output, setOutput ] = useState("")
  const [ result, setResult ] = useState<string | null>(null) // 정답 여부 저장
  const [solvedProblems, setSolvedProblems] = useState<string[]>([])


  // 컴포넌트 마운트 시 푼 문제 목록 불러오기
  useEffect(() => {
    const storedProblems = localStorage.getItem('solvedProblems')

    if(storedProblems) {
      setSolvedProblems(JSON.parse(storedProblems))
    }
  },[])

  const runCode = () => {
    try {
      const result = eval(code); // 입력된 코드 실행
      setOutput(String(result)) // 실행 결과 저장
    } catch (error) {
      setOutput("오류 발생: " + error)
    }
  }

  // 정답 제출 함수
  const submitCode = () => {
    if(output.trim() === problem.output.trim()) {
      setResult("✅ 정답입니다!");

      // 문제를 풀었다면 localStorage에 저장
      const updatedSolvedProblems = [...solvedProblems, problem.id]
      const uniqueSolvedProblems = [...new Set(updatedSolvedProblems)]
      setSolvedProblems(uniqueSolvedProblems)
      localStorage.setItem("solvedProblems", JSON.stringify(uniqueSolvedProblems))
    } else {
      setResult("❌ 틀렸습니다. 다시 시도해보세요.");
    }
  }

  return (
    <div>
      <h1>{problem.title}</h1>
      <p><strong>카테고리:</strong> {problem.category}</p>
      <p><strong>난이도:</strong> {problem.difficulty}</p>
      <p><strong>설명:</strong> {problem.description}</p>

      <h2>📝 입력 예제</h2>
      <pre>{problem.input}</pre>

      <h2>📌 출력 예제</h2>
      <pre>{problem.output}</pre>

      <h2>🔍 추가 예제</h2>
      {problem.examples.map((example, index) => (
        <div key={index}>
          <p><strong>입력:</strong></p>
          <pre>{example.input}</pre>
          <p><strong>출력:</strong></p>
          <pre>{example.output}</pre>
        </div>
      ))}

      {problem.hints.length > 0 && (
        <>
          <h2>💡 힌트</h2>
          <ul>
            {problem.hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
        </>
      )}

      <button onClick={() => router.push("/")}>🏠 홈으로 돌아가기</button>

      {/* 코드 입력 UI */}
      <h2>💻 코드 실행</h2>
      <CodeMirror 
        value={code}
        height="200px"
        extensions={[javascript()]}
        onChange={(value) => setCode(value)}
      />
      <button onClick={runCode}>▶ 실행</button>

      {/* 실행 결과 표시 */}
      <h2>📌 실행 결과</h2>
      <pre>{output}</pre>

      {/* 제출 버튼 추가 */}
      <button onClick={submitCode}>🚀 제출</button>

      {/* 정답 여부 표시 */}
      {result && <h2>{result}</h2>}

      <button onClick={() => router.push('/')}>🏠 홈으로 돌아가기</button>
      <button onClick={() => router.push('/my-problems')}>📜 내가 푼 문제 보기</button>
    </div>
  )
}