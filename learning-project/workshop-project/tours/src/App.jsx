import { useEffect, useState } from "react";
import Loading from "./loading"
import Tours from "./tours";

const url = 'https://www.course-api.com/react-tours-project';

const App = () => {
  const [isLoading,setIsLoading] = useState(true);
  const [tours,setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tours)=>tours.id !== id);
    setTours(newTours);
  }

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
    }
    catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  useEffect(()=>{
    fetchTours();
  },[]);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="title">
        <h2>no tour left</h2>
        <button type="button" className="btn" onClick={()=>fetchTours()} style={{marginTop:'2rem'}}>refresh</button>
      </div>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};
export default App;
