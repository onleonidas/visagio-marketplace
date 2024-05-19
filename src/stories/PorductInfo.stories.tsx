import { Meta } from '@storybook/react'
import { ProductInfos } from '../components/ProductInfos'
import { ToastProvider } from '../context/ToastContext';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';

export default {
  title: 'Components/ProductInfos',
  component: ProductInfos,
  decorators: [
    (Story) => {
      return (
        <ToastProvider>
          <BrowserRouter>
            <CartProvider>
              <div className='w-[500px]'>
                <Story />
              </div>
            </CartProvider>
          </BrowserRouter>
        </ToastProvider>
      )
    }
  ]
} as Meta;

const productData = {
  id: 1,
  name: 'Sample Product',
  price: 100,
  category: 'Sample Category',
  imageUrl: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
  stock: 10,
  description: ''
};

export const Default = () => <ProductInfos product={productData} />;
