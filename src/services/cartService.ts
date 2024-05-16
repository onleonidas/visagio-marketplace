// Remover "stock"
// Adicionar quantiade
// Criar lógica para itens repetidos somar quantidade
// Remover do carrinho

import { ProductsProps } from '../types/ProductsInterface';
import apiUrls from '../config/apiUrls';

export const CartService = {
    addToCart: async (product: ProductsProps["product"], addToast: (message: string) => void) => {
        try {
            const response = await fetch(apiUrls.cart, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            if (!response.ok) {
                throw new Error('Erro ao registrar o item');
            }

            const cart = await response.json();
            console.log(cart)

            addToast(`${product.name} adicionado ao carrinho com sucesso!`);
        }
        catch (error) {
            console.error('Erro ao adicionar item ao carrinho:', error);
        }
    },
};
