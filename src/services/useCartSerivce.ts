import { useEffect, useState } from 'react';
import { ProductsProps } from '../types/ProductsInterface';
import { CartItemProps } from '../types/CartItemInterface';
import { apiUrls } from '../config/apiUrls';

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
  }, []);

  const clearCart = async () => {
    try {

      for (const item of cartItems) {
        await removeFromCart(item.id);
      }

      setCartItems([]);

    } catch (error) {
      console.error('Erro ao remover todos os itens do carrinho:', error);
    }
  }


  //Função para adicionar um item ao carrinho
  const addToCart = async (product: ProductsProps["product"], addToast: (message: string) => void) => {
    try {

      const existingItem = cartItems.find(cartItem => cartItem.id === product.id);

      //Se o item já existir, atualiza apenas quantity. Se não, adiciona o item ao carrinho
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
          throw new Error('Erro ao atualizar o item no carrinho');
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
        }

        const response = await fetch(apiUrls.cart, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        });

        if (!response.ok) {
          throw new Error('Erro ao adicionar o item ao carrinho');
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

  //Função para remover um item do carrinho
  const removeFromCart = async (id: number) => {
    try {
      const response = await fetch(`${apiUrls.cart}${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao remover o item do carrinho');
      }

      setCartItems(prevItems => prevItems.filter(cartItem => cartItem.id !== id));
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error);
    }
  };

  //Função para atualizar o valor da quantidade de cada item
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
