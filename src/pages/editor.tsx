import CodeEditor from "@/components/CodeEditor";
import Link from "next/link";
import styles from "../styles/editor.module.css"

export default function EditorPage() {
  return (
    <div className="wrap">
      <div className={styles.headerContainer}>
        <Link href="/">
          <h1 className={styles.title}>AlgoNote</h1>
        </Link>
        <div className={styles.buttonContainer}>
          <Link href="/myProblems">
            <button className={styles.myProblemsButton}>📘 내가 푼 문제 보기</button>
          </Link>
        </div>
      </div>

      <h1 className={styles.editorTitle}>🖥️ 코드 편집기</h1>
      <CodeEditor />

      <Link href={"/"}>
        <button className={styles.homeButton}>🏠 홈으로 돌아가기</button>
      </Link>
    </div>
  )
}