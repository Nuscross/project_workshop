import { useAppContext } from "../App";
import light from "../assets/image/light.svg";
import dark from "../assets/image/dark.svg";

const Content = () => {

  const { theme } = useAppContext();

  return (
    <>
      <main className={theme === "light" ? "light" : "dark"}>
        <div>
          <h1>Content Official</h1>
          <p>DarkMode Workshop</p>
        </div>
        <img alt="Logo" src={theme === "light" ? light : dark} />
      </main>
    </>
  )

}

export default Content;