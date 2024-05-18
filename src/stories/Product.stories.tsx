import { Meta } from '@storybook/react'
import { Product } from '../components/Product'
import { ToastProvider } from '../context/ToastContext';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Components/Product',
  component: Product,
  decorators: [
    (Story) => {
      return (
        <ToastProvider>
          <BrowserRouter>
            <div className='w-[350px]'>
              <Story />
            </div>
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

export const Default = () => <Product product={productData} />;
