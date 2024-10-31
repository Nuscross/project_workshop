import { useState } from "react";
import data from "./data";
import Question from "./question";

const App = () => {
  const [questions,setQuestions] = useState(data);
  const [activeId,setActiveId] = useState(null);

  const toggleQuestion = (id) => {
    const questionToggle = id === activeId ? null : id;
    setActiveId(questionToggle);
  }

  return (
    <>
      <main>
        <Question questions={questions} activeId={activeId} toggleQuestion={toggleQuestion} />
      </main>
    </>
  );
};

export default App;