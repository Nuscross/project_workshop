import { useAppContext } from "../App";
import QuestionsData from "../Data";

const Score = () => {

  const { setAppState , score } = useAppContext();

  return (
    <div className="score">
      <h1>สรุปผลคะแนนสอบ</h1>
      <h2>{score} / {QuestionsData.length}</h2>
      <button onClick={()=>setAppState("menu")}>ทำแบบทดสอบอีกครั้ง</button>
    </div>
  )

}

export default Score;