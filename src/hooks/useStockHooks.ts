import { ProductsProps } from '../types/ProductsInterface';
import { apiUrls } from '../config/apiUrls';

export const useStockControl = () => {
  const stockControl = async (productId: number, quantity: number) => {
    try {
      const response = await fetch(`${apiUrls.products}${productId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar o produto');
      }
      const product: ProductsProps["product"] = await response.json();
      const updatedStock = Math.max(product.stock - quantity, 0);
      await updateProductStock(productId, updatedStock, product);
    } catch (error) {
      console.error('Erro ao atualizar o estoque do produto:', error);
    }
  };

  const updateProductStock = async (productId: number, stock: number, product: ProductsProps["product"]) => {
    try {
        await fetch(`${apiUrls.products}${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...product, stock: stock }),
      });
    } catch (error) {
      console.error('Erro ao atualizar o estoque do produto:', error);
    }
  };

  return { stockControl };
};
