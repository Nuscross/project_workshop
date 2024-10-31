import SingleQuestion from "./singleQuestion";

const Question = ({ questions, activeId, toggleQuestion }) => {
  return (
    <section className="container">
      { questions.map((question)=>{
        return <SingleQuestion key={question.id} {...question} activeId={activeId} toggleQuestion={toggleQuestion} />
      })}
    </section>
  )
}

export default Question;