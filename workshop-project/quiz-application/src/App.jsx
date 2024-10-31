import { createContext, useContext, useState } from "react";
import Menu from "./components/Menu";
import Quiz from "./components/Quiz";
import Score from "./components/Score";
import "./App.css";

export const DataContext = createContext();

export const useAppContext = () => useContext(DataContext);

function App() {

  const [appState,setAppState] = useState("menu");
  const [score,setScore] = useState(0);

  const renderApp = () => {
    switch (appState) {
      case "menu":
        return <Menu />;
      case "quiz":
        return <Quiz />;
      case "score":
        return <Score />;
      default:
        return <Menu />;
    }
  }

  return (
    <DataContext.Provider value={{ appState, setAppState, score, setScore }}>
      <div className="App">
        <h1>Web Development Quiz</h1>
        { renderApp() }
      </div>
    </DataContext.Provider>
  )

}

export default App;