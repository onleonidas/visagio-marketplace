import { render, screen } from '@testing-library/react';
import { Product } from '../src/components/Product';
import { ToastProvider } from '../src/context/ToastContext';
import { CartProvider } from '../src/context/CartContext';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';


const product = {
  id: 1,
  name: 'Test Product',
  price: 20,
  category: 'Test Category',
  imageUrl: 'test-image.jpg',
  description: 'Test Description',
  stock: 10
};

describe('Product Component', () => {
  test('renders product information correctly', () => {
    render(
      <ToastProvider>
        <CartProvider>
          <Product product={product} />
        </CartProvider>
      </ToastProvider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('R$ 20,00')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute('src', 'test-image.jpg');
  });

  test('displays out of stock message when stock is 0', () => {
    const outOfStockProduct = { ...product, stock: 0 };

    render(
      <ToastProvider>
        <CartProvider>
          <Product product={outOfStockProduct} />
        </CartProvider>
      </ToastProvider>
    );

    expect(screen.getByText('Não temos o item em estoque.')).toBeInTheDocument();
  });
});
