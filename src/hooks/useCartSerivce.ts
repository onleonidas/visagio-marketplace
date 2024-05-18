import { useEffect, useState } from 'react';
import { ProductsProps } from '../types/ProductsInterface';
import { CartItemProps } from '../types/CartItemInterface';
import { apiUrls } from '../config/apiUrls';

/** 
 * ijidjaidja
 * asdada
 * asda
 * 
 */
export const useCartService = () => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(apiUrls.cart);
        if (!response.ok) {
          throw new Error('Erro ao carregar os itens do carrinho');
        }
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, [cartItems]);

  const stockControl = async (productId: number, quantity: number) => {
    try {
      console.log(quantity);
      const response = await fetch(`${apiUrls.products}${productId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar o produto');
      }
      const product: ProductsProps["product"] = await response.json();
      const updatedStock = product.stock - quantity;

      const updateResponse = await fetch(`${apiUrls.products}${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...product, stock: updatedStock }),
      });

      if (!updateResponse.ok) {
        throw new Error('Erro ao atualizar o estoque do produto');
      }
    } catch (error) {
      console.error('Erro ao atualizar o estoque do produto:', error);
    }
  };

  const clearCart = async () => {
    try {
      for (const item of cartItems) {
        console.log(item);
        await removeFromCart(item.id);
        await stockControl(item.id, item.quantity);
      }
      setCartItems([]);
    } catch (error) {
      console.error('Erro ao remover todos os itens do carrinho:', error);
    }
  };


  const addToCart = async (product: ProductsProps["product"], addToast: (message: string) => void) => {
    try {
      const existingItem = cartItems.find(cartItem => cartItem.id === product.id);

      if (existingItem) {
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
        const response = await fetch(`${apiUrls.cart}${existingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedItem),
        });

        if (!response.ok) {
          console.error('Erro ao encontrar o item');
        }

        setCartItems(prevItems =>
          prevItems.map(cartItem =>
            cartItem.id === existingItem.id ? updatedItem : cartItem
          )
        );
      } else {
        const newItem: CartItemProps = {
          id: product.id,
          name: product.name,
          unit_price: product.price,
          description: product.description,
          imageUrl: product.imageUrl,
          quantity: 1
        };

        const response = await fetch(apiUrls.cart, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        });
        
        if (!response.ok) {
          console.error('Erro ao encontrar o item');
        }

        const addedItem = await response.json();
        setCartItems(prevItems => [...prevItems, addedItem]);
      }

      addToast(`${product.name} adicionado ao carrinho com sucesso!`);
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
      addToast('Erro ao adicionar item ao carrinho');
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      const itemToRemove = cartItems.find(cartItem => cartItem.id === id);

      if (itemToRemove) {
        const response = await fetch(`${apiUrls.cart}${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Erro ao remover o item do carrinho');
        }

        setCartItems(prevItems => prevItems.filter(cartItem => cartItem.id !== id));
      }
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error);
    }
  };

  const updateCartItemQuantity = async (item: CartItemProps, quantity: number) => {
    item.quantity = quantity;

    try {
      const response = await fetch(`${apiUrls.cart}${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar a quantidade do item no carrinho');
      }
    } catch (error) {
      console.error('Erro ao atualizar a quantidade do item no carrinho:', error);
    }
  };

  return { cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart };
};
