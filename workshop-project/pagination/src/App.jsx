import { useEffect, useState } from 'react'
import './App.css'
import Food from './components/Food'
import MenuData from './MenuData'

function App() {

  const [foodData,setFoodData] = useState(MenuData);
  const [dataInPage,setDataInPage] = useState([]);
  const [page,setPage] = useState(0);

  useEffect(()=>{
    const paginate = pagination();
    setDataInPage(paginate);
    setFoodData(paginate[page])
  },[page]);

  const pagination = (allFood) => {
    const foodPerPage = 3;
    const pages = Math.ceil(MenuData.length / foodPerPage);
    const newFood = Array.from({length:pages},(data,index)=>{
      const start = index * foodPerPage;
      return MenuData.slice(start,start + foodPerPage);
    });
    return newFood;
  }

  const handlePage = (index) => {
    setPage(index);
  }

  return (
    <div className="App">
      <h1>FoodCard | Pagination</h1>
      <div className='container'>
        { foodData.map((data,index)=>{
          return <Food key={index} {...data} />
        })}
      </div> 
      <div className='pagination-container'>
        { dataInPage && dataInPage.map((data,index)=>{
          return <button key={index} className={index === page ? 'page-btn active-btn' : 'page-btn'} onClick={()=>handlePage(index)}>{index+1}</button>
        })}
      </div> 
    </div>
  )

}

export default App
