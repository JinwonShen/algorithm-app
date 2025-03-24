import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import problemsData from '../../data/algorithm_problems.json';
import styles from "../../styles/[id].module.css"
import Link from "next/link";

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
    const logs: string[] = [];
    const originalLog = console.log;
  
    console.log = (...args: unknown[]) => {
      logs.push(args.join(" "));
      originalLog(...args);
    };
  
    try {
      eval(code); // 코드 실행
      setOutput(logs.join("\n")); // 콘솔 출력된 내용 출력
    } catch (error) {
      setOutput("오류 발생: " + error);
    }
  
    console.log = originalLog; // 원래 console.log로 복구
  };

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
    <div className="wrap">
      <div className={styles.headerContainer}>
        <Link href="/">
          <h1 className={styles.title}>AlgoNote</h1>
        </Link>
      </div>

      <h1 className={styles.problemTitle}>{problem.title}</h1>

      <div className={styles.problemDesc}>
        <p><span>카테고리 :</span> {problem.category}</p> 
        <p><span>난이도 :</span> {problem.difficulty}</p>
        <p><span>설명 :</span> {problem.description}</p>
      </div>

      <div className={styles.problemContainer}>
        <div className={styles.problemInfo}>
          <h2 className={styles.problemSubTitle}>📝 입력 예제</h2>
          <pre className={styles.problemInput}>{problem.input}</pre>

          <h2 className={styles.problemSubTitle}>📌 출력 예제</h2>
          <pre className={styles.problemOutput}>{problem.output}</pre>

          <h2 className={styles.problemSubTitle}>🔍 추가 예제</h2>
          {problem.examples.map((example, index) => (
            <div key={index}>
              <p><strong>입력:</strong></p>
              <pre className={styles.exampleInput}>{example.input}</pre>
              <p><strong>출력:</strong></p>
              <pre className={styles.exampleOutput}>{example.output}</pre>
            </div>
          ))}

          {problem.hints.length > 0 && (
            <>
              <h2 className={styles.problemSubTitle}>💡 힌트</h2>
              <ul>
                {problem.hints.map((hint, index) => (
                  <li key={index} className={styles.hint}>{hint}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className={styles.problemCode}>
          {/* 코드 입력 UI */}
          <h2 className={styles.problemSubTitle}>💻 코드 실행</h2>
          <CodeMirror 
            className={styles.codeMirror}
            value={code}
            extensions={[javascript()]}
            onChange={(value) => setCode(value)}
          />
          <div className={styles.buttonContainer}>
            <button onClick={runCode} className={styles.button}>▶ 실행</button>
            <button onClick={submitCode} className={styles.button}>🚀 제출</button>
          </div>

          {/* 실행 결과 표시 */}
          <h2 className={styles.problemSubTitle}>📌 실행 결과</h2>
          <pre className={styles.problemResult}>{output}</pre>

          {/* 제출 버튼 추가 */}

          {/* 정답 여부 표시 */}
          {result && <h2 className={styles.problemSubTitle}>{result}</h2>}
          <div className={styles.buttonContainer}>
            <button onClick={() => router.push('/')} className={styles.button}>🏠 홈으로 돌아가기</button>
            <button onClick={() => router.push('/myProblems')} className={styles.button}>📜 내가 푼 문제 보기</button>
          </div>
        </div>
      </div>

    </div>
  )
}