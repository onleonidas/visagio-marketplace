import { Meta, StoryObj } from '@storybook/react'
import Home from '../pages/Home';
import { ToastProvider } from '../context/ToastContext';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';

export default {
  title: "Pages/Home",
  component: Home,
  decorators: [
    (Story) => {
      return (
        <ToastProvider>
          <BrowserRouter>
            <CartProvider>
              <div className=''>
                <Story />
              </div>
            </CartProvider>
          </BrowserRouter>
        </ToastProvider>
      )
    }
  ],

} as Meta;

export const Default: StoryObj = {};