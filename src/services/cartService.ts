
export const CartService = {
  addToCart: (productName: string, addToast: (message: string) => void) => {
    addToast(`${productName} adicionado ao carrinho com sucesso!`);
  },
};
