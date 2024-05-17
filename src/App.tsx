import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ToastProvider } from './context/ToastContext';

export function App() {
  return (
    <div className='App'>
      <ToastProvider>
        <Navbar />
        <Outlet />
      </ToastProvider>
    </div>
  );
}

export default App
