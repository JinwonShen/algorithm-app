import dynamic from "next/dynamic";
import { useState } from "react";
import { javascript } from "@codemirror/lang-javascript";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });

export default function CodeEditor() {
  const [code, setCode] = useState("// 여기에 코드를 입력하세요.");
  const [output, setOutput] = useState("");

  const runCode = () => {
    try {
      const result = eval(code);
      setOutput(String(result));
    } catch (error) {
      setOutput("오류 발생: " + error);
    }
  };

  return (
    <div>
      <CodeMirror value={code} extensions={[javascript()]} onChange={(value) => setCode(value)} />
      <button onClick={runCode}>실행</button>
      <h2>출력 결과:</h2>
      <pre>{output}</pre>
    </div>
  );
}