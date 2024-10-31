import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import ImageData from "./ImageData";

const ImageSlider = () => {

  const [current,setCurrent] = useState(0);

  const length = ImageData.length;

  const prevSlide = () => {
    if (current === 0) {
      setCurrent(length-1);
    } 
    else {
      setCurrent(current-1);
    }
  }

  const nextSlide = () => {
    if (current === length-1) {
      setCurrent(0);
    } 
    else {
      setCurrent(current+1);
    }
  }

  return (
    <section className="slider">
      <AiOutlineArrowLeft className="leftArrow" onClick={prevSlide} />
      <AiOutlineArrowRight className="rightArrow" onClick={nextSlide}  />
      {ImageData.map((data,index)=>{
        const {title,image} = data;
        return (
          <div key={index} className={index === current ? "slide active" : "slide"}>
            {
              index === current && 
              <div>
                <img alt={title} src={image} className="image" />
                <p>{title}</p>
              </div>
            }
          </div>
        )
      })}
    </section>
  )

}

export default ImageSlider;