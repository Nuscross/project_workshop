import { createContext, useContext, useState } from "react";
import Title from "./components/Title";
import Content from "./components/Content";

export const themeContext = createContext();

export const useAppContext = () => useContext(themeContext);

function App() {

  const [theme,setTheme] = useState('light');

  return (
    <themeContext.Provider value={{theme,setTheme}}>
      <div>
        <Title />
        <Content />
      </div>
    </themeContext.Provider>
  )

}

export default App
