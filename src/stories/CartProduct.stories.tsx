import { Meta } from '@storybook/react';
import { CartProduct } from '../components/CartProduct';
import { CartItemProps } from '../types/CartItemInterface';

export default {
  title: 'Components/CartProduct',
  component: CartProduct,


} as Meta;

const productData: CartItemProps = {
  id: 1,
  name: 'Sample Product',
  unit_price: 100,
  imageUrl: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
  description: '',
  quantity: 1
};

export const Default = () => <CartProduct product={productData} />;