import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

//Import pages


export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App
