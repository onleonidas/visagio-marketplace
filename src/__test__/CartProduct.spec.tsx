import { render, screen } from '@testing-library/react';
import { CartProduct } from '../components/CartProduct';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

describe('CartProduct', () => {
    test('renders product name and price', () => {
      const product = {
        id: 1,
        name: 'Example Product',
        unit_price: 10,
        description: 'Os AirPods Pro oferecem cancelamento de ruído ativo, modo ambiente e ajuste personalizável.',
        imageUrl: 'https://static.vecteezy.com/system/resources/previews/026/782/383/original/apple-airpods-ai-generative-free-png.png',
        quantity: 2,
      };
  
      const handleQuantityChange = jest.fn();
      const handleRemoveFromCart = jest.fn();
  
      render(
        <CartProduct
          product={product}
          handleQuantityChange={handleQuantityChange}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      );
  
      expect(screen.getByText('Example Product')).toBeInTheDocument();
      expect(screen.getByText('R$ 20,00')).toBeInTheDocument(); 
    });
  

});