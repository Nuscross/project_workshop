import { useState } from 'react'
import './App.css'
import DropdownComponent from './components/DropdownComponent'
import FoodComponent from './components/FoodComponent'
import MenuData from './MenuData'

function App() {

  const [food,setFood] = useState(MenuData);

  const changeFoodData = (e) => {
    const category = e.target.value;
    if (category == "เมนูทั้งหมด") {
      setFood(MenuData);
    }
    else {
      const filterFood = MenuData.filter((item)=>item.menu === category);
      setFood(filterFood);
    }
  }

  return (
    <div className="container">
      <DropdownComponent changeFoodData={changeFoodData} />
      <div className="content">
      {
        food.map((data,index)=>{
          return <FoodComponent key={index} {...data} /> 
        })
      }
      </div>
    </div>
  )

}

export default App