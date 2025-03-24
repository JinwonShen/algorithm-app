import dynamic from "next/dynamic";
import { useState } from "react";
import { javascript } from "@codemirror/lang-javascript";
import styles from "../styles/CodeEditor.module.css"

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });

export default function CodeEditor() {
  const [code, setCode] = useState("// 여기에 코드를 입력하세요.");
  const [output, setOutput] = useState("");

  const runCode = () => {
    const logs: string[] = [];
    const originalLog = console.log;
  
    console.log = (...args: unknown[]) => {
      logs.push(args.map(String).join(" "));
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

  return (
    <div className={styles.codeEditor}>
      <CodeMirror value={code} extensions={[javascript()]} onChange={(value) => setCode(value)} />
      <button onClick={runCode} className={styles.runButton}>실행</button>
      <h2 className={styles.result}>출력 결과:</h2>
      <pre>{output}</pre>
    </div>
  );
}