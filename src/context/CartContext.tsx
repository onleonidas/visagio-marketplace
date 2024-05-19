import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ProductsProps } from '../types/ProductsInterface';
import { CartItemProps } from '../types/CartItemInterface';
import { apiUrls } from '../config/apiUrls';
import { useStockControl } from '../hooks/useStockHooks'

interface CartContextType {
  cartItems: CartItemProps[];
  catalogItems: ProductsProps["product"][];
  addToCart: (product: ProductsProps["product"], addToast: (message: string) => void) => void;
  removeFromCart: (itemId: number) => void;
  updateCartItemQuantity: (item: CartItemProps, quantity: number, addToast: (message: string) => void) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

/**
 * Provides the cart context for managing cart items and catalog items.
 */
export const CartProvider = ({ children }: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
    const [catalogItems, setCatalogItems] = useState<ProductsProps["product"][]>([]);
    const {stockControl} = useStockControl();

    useEffect(() => {
        fetchCartItems();
        fetchCatalogItems();
    }, []);

    /**
     * Fetches the cart items from the server.
     */
    const fetchCartItems = useCallback(async () => {
        try {
            const response = await fetch(apiUrls.cart);
            if (!response.ok) {
                console.warn('Erro ao buscar produtos do carrinho');
                return;
            }
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.error('Erro ao buscar produtos do carrinho:', error);
        }
    }, []);

    /**
     * Fetches the catalog items from the server.
     */
    const fetchCatalogItems = useCallback(async () => {
        try {
            const response = await fetch(apiUrls.products);
            if (!response.ok) {
                console.warn('Erro ao buscar produtos no catálogo');
                return;
            }
            const data = await response.json();
            setCatalogItems(data);
        } catch (error) {
            console.warn('Erro ao encontrar os produtos do catálogo:', error);
        }
    }, []);

    /**
     * Clears the cart by removing all items from it.
     */
    const clearCart = useCallback(async () => {
        try {
            for (const item of cartItems) {
                await removeFromCart(item.id);
                await stockControl(item.id, item.quantity);
            }
            setCartItems([]);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }, [cartItems, stockControl]);

    /**
     * Adds an item to the cart.
     * @param product - The item to be added to the cart.
     * @param addToast - A function that displays a success or error toast.
     */
    const addToCart = useCallback(async (product: ProductsProps["product"], addToast: (message: string) => void) => {
        try {
            const existingItem = cartItems.find(cartItem => cartItem.id === product.id);
            if (existingItem) {
                await updateCartItem(existingItem.id, existingItem.quantity + 1);
            } else {
                const newItem: CartItemProps = {
                    id: product.id,
                    name: product.name,
                    unit_price: product.price,
                    description: product.description,
                    imageUrl: product.imageUrl,
                    quantity: 1
                };
                await addCartItem(newItem);
            }
            addToast(`${product.name} adicionado ao carrinho com sucesso!`);
        } catch (error) {
            console.error('Error adding item to cart:', error);
            addToast('Erro ao adicionar ao carrinho.');
        }
    }, [cartItems]);

    /**
     * Adds an item to the cart.
     * @param item - The item to be added to the cart.
     */
    const addCartItem = useCallback(async (item: CartItemProps) => {
        try {
            const response = await fetch(apiUrls.cart, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            if (!response.ok) {
                console.warn('Error adding item to cart');
                return;
            }
            setCartItems(prevCartItems => [...prevCartItems, item]);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    }, []);

    /**
     * Updates the quantity of an item in the cart.
     * @param itemId - The id of the item to be updated.
     * @param quantity - The new quantity of the item.
     */
    const updateCartItem = useCallback(async (itemId: number, quantity: number) => {
        try {
            const itemToUpdate = cartItems.find(cartItem => cartItem.id === itemId);
            if (!itemToUpdate) {
                console.warn('O item não existe no carrinho');
                return;
            }
            const updatedItem = { ...itemToUpdate, quantity };
            const response = await fetch(`${apiUrls.cart}${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });
            if (!response.ok) {
                console.warn('Erro ao atualizar o item no carrinho');
                return;
            }
            setCartItems(prevCartItems => prevCartItems.map(item => item.id === itemId ? updatedItem : item));
        } catch (error) {
            console.error('Erro ao atualizar o item no carrinho:', error);
        }
    }, [cartItems]);

    /**
     * Removes an item from the cart.
     * @param itemId - The id of the item to be removed.
     */
    const removeFromCart = useCallback(async (itemId: number) => {
        try {
            const response = await fetch(`${apiUrls.cart}${itemId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                console.warn('Erro ao remover o item do carrinho');
                return;
            }
            setCartItems(prevCartItems =>
                prevCartItems.filter(item => item.id !== itemId)
            );
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    }, []);

    /**
     * Updates the quantity of an item in the cart and checks if the quantity exceeds the available stock.
     * @param item - The item to be updated.
     * @param quantity - The new quantity of the item.
     * @param addToast - A function that displays a success or error toast.
     */
    const updateCartItemQuantity = useCallback(async (item: CartItemProps, quantity: number, addToast: (message: string) => void) => {
        try {
            const response = await fetch(`${apiUrls.products}${item.id}`);
            if (!response.ok) {
                console.warn('Erro ao buscar produtos no catálogo');
                return;
            }
            const product: ProductsProps["product"] = await response.json();
            if (quantity > product.stock) {
                addToast(`Nós temos apenas ${product.stock} ${item.name} no estoque. O excedente não será considerado em sua compra.`);
                return;
            }
            await updateCartItem(item.id, quantity);
        } catch (error) {
            console.error('Error updating item quantity in cart:', error);
        }
    }, [updateCartItem]);

    const value = useMemo(() => ({
        cartItems,
        catalogItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart
    }), [cartItems, catalogItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
