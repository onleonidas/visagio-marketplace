import { Meta } from '@storybook/react';
import { CartProduct } from '../components/CartProduct';
import { CartItemProps } from '../types/CartItemInterface';

export default {
  title: 'Components/CartProduct',
  component: CartProduct,


} as Meta;

/**Função responsável por remover um determinado item do carrinho.*/
const handleRemoveFromCart = (id: number) => {};

/**Função responsável por verificar se o carrinho possui itens antes de continuar com a compra*/
const handleQuantityChange = () => {};

const productData = {
  id: 1,
  name: 'Sample Product',
  unit_price: 100,
  imageUrl: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
  description: '',
  quantity: 1,
  handleQuantityChange: () => {},
  handleRemoveFromCart: () => {}
};

export const Default = () => <CartProduct product={productData} handleQuantityChange={handleQuantityChange}
handleRemoveFromCart={handleRemoveFromCart} />;