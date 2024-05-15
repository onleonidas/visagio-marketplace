import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import ProductPage from './pages/ProductPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/home" element={<Home />} />
            <Route path="/catalog/:id" element={<ProductPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
