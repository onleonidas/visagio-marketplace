import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ToastProvider } from './context/ToastContext';
import { FooterComponent } from './components/Footer';

export function App() {
  return (
    <div className='App'>
      <ToastProvider>
        <Navbar />
        <Outlet />
        <FooterComponent />
      </ToastProvider>
    </div>
  );
}

export default App
