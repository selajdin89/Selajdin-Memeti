import "./App.css";
import Cart from "./pages/carts/Cart";
import All from "./pages/categories/All";
import { useSelector } from "react-redux";
import Clothes from "./pages/categories/Clothes";
import Tech from "./pages/categories/Tech";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./pages/UI/Header";
import ProductPage from "./pages/carts/ProductPage";
import ViewBag from "./pages/carts/ViewBag";

function App() {
  const cartIsShown = useSelector((state) => state.ui.cartIsVisible);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<All />}></Route>
        <Route path="tech" element={<Tech />}></Route>
        <Route path="clothes" element={<Clothes />}></Route>
        <Route path="/product/:id" element={<ProductPage />}></Route>
        <Route path="/bag/" element={<ViewBag />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {cartIsShown && <Cart />}
    </div>
  );
}

export default App;
