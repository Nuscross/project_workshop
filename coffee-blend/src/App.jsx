import { useEffect, useState } from "react";

function App() {

  const [product,setProduct] = useState([]);

  console.log(product);

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = () => {
    const data = fetch('https://api.sampleapis.com/coffee/hot')
    .then(res=>res.json())
    .then(json=>setProduct(json))
  }

  return (
    <>
      { product.map((item,index) => {
        return (
          <div key={index}>
            <h2>{item.title}</h2>
            <img alt="" src={item.image} style={{height:200}} />
          </div>
        )
      })}
    </>
  )

}

export default App;