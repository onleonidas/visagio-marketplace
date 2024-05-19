import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ToastProvider } from './context/ToastContext';
import { FooterComponent } from './components/Footer';
import { CartProvider } from './context/CartContext';

export function App() {
  return (
    <div className='App'>
        <CartProvider>
        <ToastProvider>      
          <Navbar />
          <Outlet />
          <FooterComponent />
        </ToastProvider>
        </CartProvider>
      
    </div>
  );
}

export default App
