import { Meta, StoryObj } from '@storybook/react'
import Home from '../pages/Home';
import { ToastProvider } from '../context/ToastContext';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';

const productData = {
  id: 1,
  name: 'Sample Product',
  price: 100,
  category: 'Sample Category',
  imageUrl: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
  stock: 10,
  description: ''
};

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