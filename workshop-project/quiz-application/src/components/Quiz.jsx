import { useEffect, useState } from "react";
import { useAppContext } from "../App";
import QuestionsData from "../Data";

const Quiz = () => {

  const [current,setCurrent] = useState(0);
  const [selectChoice,setSelectChoice] = useState("");

  const { setAppState, score, setScore } = useAppContext();

  useEffect(()=>{
    checkAnswer();
  },[selectChoice]);

  const checkAnswer = () => {
    if (selectChoice !== "") {
      if (selectChoice === QuestionsData[current].answer) {
        setScore(score+1);
        nextQuestion();
      }
      else {
        nextQuestion();
      } 
    }
  }

  const nextQuestion = () => {
    setSelectChoice("");
    if (current === QuestionsData.length - 1) {
      setAppState("score");
      setCurrent(0);
    }
    setCurrent(current + 1);
  }

  return (
    <div className="quiz">
      <h1>{QuestionsData[current].question}</h1>
      <div className="choices">
        <button onClick={()=>setSelectChoice("A")}>{QuestionsData[current].A}</button>
        <button onClick={()=>setSelectChoice("B")}>{QuestionsData[current].B}</button>
        <button onClick={()=>setSelectChoice("C")}>{QuestionsData[current].C}</button>
        <button onClick={()=>setSelectChoice("D")}>{QuestionsData[current].D}</button>
      </div>
      <p>{`${current+1} / ${QuestionsData.length}`}</p>
    </div>
  )

}

export default Quiz;