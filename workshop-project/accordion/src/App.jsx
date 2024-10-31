import { useState } from "react";
import data from "./data";
import SingleContent from "./components/SingleContent";

function App() {

  const [content,setContent] = useState(data);

  return (
    <main>
      <div className="container">
        <h3>เครื่องมือพัฒนาเว็บ</h3>
        <section>
          {content.map((data) => {
            const { id } = data; 
            return <SingleContent key={id} {...data} />
          })}
        </section>  
      </div>
    </main>
  )

}

export default App;