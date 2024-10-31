import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import List from './components/List';
import Alert from './components/Alert';

function App() {

  const [name,setName] = useState("");
  const [list,setList] = useState([]);
  const [alert,setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [checkEditItem,setCheckEditItem] = useState(false);
  const [editId,setEditId] = useState(null);

  const submitData = (e) => {
    e.preventDefault();
    if (!name) {
      setAlert({
        show: true,
        msg: "Please insert todo",
        type: "error",
      })
    }
    else {
      if (checkEditItem) {
        const editList = list.map((item)=>{
          if (item.id === editId) {
            return {...item,title:name}
          }
          return item;
        })
        console.log(editList);
        setList(editList);
        setName("");
        setAlert({
          show: true,
          msg: "Edit Successfully",
          type: "success",
        })
        setCheckEditItem(false);
        setEditId(null);
      }
      else {
        const newItem = {
          id: uuidv4(),
          title: name
        }
        setList([...list,newItem]);
        setName("");
        setAlert({
          show: true,
          msg: "Save Successfully",
          type: "success",
        })
      }
    }
  }

  const removeItem = (id) => {
    const newList = list.filter((item)=>item.id !== id);
    setList(newList);
    setName("");
    setAlert({
      show: true,
      msg: "Delete Successfully",
      type: "success",
    })
  }

  const editItem = (id) => {
    setCheckEditItem(true)
    setEditId(id);
    const findList = list.find((item)=>item.id === id);
    setName(findList.title);
  }

  return (
    <section className="container">
      <h1>TodoList App</h1>
      { alert.show && <Alert {...alert} setAlert={setAlert} list={list} />}
      <form className="form-control" onSubmit={submitData}>
        <input type="text" className="text-input" value={name} onChange={(e)=>setName(e.target.value)} />
        <button type="submit" className="submit-btn">
          { checkEditItem ? "Edit" : "Add" }
        </button>
      </form>
      <section className="list-container">
        { list.map((data,index)=>{
          return <List key={index} {...data} removeItem={removeItem} editItem={editItem} />
        })}
      </section>
    </section>
  )
}

export default App;