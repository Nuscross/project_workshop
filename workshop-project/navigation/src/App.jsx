import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/pages/Home";
import Member from "./components/pages/Member";
import Product from "./components/pages/Product";

function App() {

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member" element={<Member />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;