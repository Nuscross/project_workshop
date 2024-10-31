import { useAppContext } from "../App";
import Switch from "react-switch";

const Title = () => {

  const { theme , setTheme } = useAppContext();

  const toggleSwitch = (checked) => {
    setTheme(
      theme === "light" ? "dark" : "light"
    );
  }

  return (
    <>
      <header className={theme === "light" ? "light" : "dark"}>
        <span>mode [{theme}]</span>
        <Switch onChange={toggleSwitch} checked={theme === "dark"} checkedIcon={false} uncheckedIcon={false} onColor={'#ffa500'} />
      </header>
    </>
  )

}

export default Title;