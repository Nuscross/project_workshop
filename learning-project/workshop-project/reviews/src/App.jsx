import { useState } from "react";
import reviews from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa"

const App = () => {
  const [index,setIndex] = useState(0);
  const { name, job, image, text } = reviews[index];

  const checkIndex = (number) => {
    if (number > (reviews.length - 1)) {
      return 0;
    }
    if (number < 0) {
      return reviews.length - 1;
    } 
    return number;
  }

  const prevReview = () => {
    setIndex((currentIndex) => {
      const newIndex = currentIndex - 1;
      return checkIndex(newIndex);
    })
  }

  const nextReview = () => {
    setIndex((currentIndex) => {
      const newIndex = currentIndex + 1;
      return checkIndex(newIndex);
    })
  }

  const randomReview = () => {
    let randomIndex = Math.floor(Math.random() * reviews.length);
    if (randomIndex === index) {
      randomIndex = index + 1;
    }
    setIndex(checkIndex(randomIndex));
  }

  return (
    <main>
      <article className="review">
        <div className="img-container">
          <img src={image} alt={name} className="person-img" />
          <span className="quote-icon">
            <FaQuoteRight />
          </span>
        </div>
        <h4 className="author">{name}</h4>
        <p className="job">{job}</p>
        <p className="info">{text}</p>
        <div className="btn-container">
          <button className="prev-btn" onClick={prevReview}>
            <FaChevronLeft />
          </button>
          <button className="next-btn" onClick={nextReview}>
            <FaChevronRight />
          </button>
        </div>
        <button className="btn btn-hipster" onClick={randomReview}>surprise me</button>
      </article>
    </main>
  );
};
export default App;
