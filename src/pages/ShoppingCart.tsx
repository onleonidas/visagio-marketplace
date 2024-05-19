import { useState, useEffect } from 'react'; 
import { formatCurrency } from '../utils/formatCurrency';
import { CartItemProps } from '../types/CartItemInterface';
import { CartProduct } from '../components/CartProduct';
import { apiUrls } from '../config/apiUrls';
import { ConfirmPaymentModal } from '../components/ConfirmPaymentModal';
import { EmptyCart } from '../components/EmptyCart';
import { HiInformationCircle } from 'react-icons/hi';
import { Alert, Button } from 'flowbite-react';
import { useCart } from '../context/CartContext';
import { useToast } from "../context/ToastContext";

const ShoppingCart = () => {
    const [cartProducts, setCartProducts] = useState<CartItemProps[]>([]);
    const [totalValue, setTotalValue] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { removeFromCart, updateCartItemQuantity } = useCart();
    const { addToast } = useToast();

    /**Função responsável por atualizar a quantidade de um determinado item no carrinho.*/
    const handleQuantityChange = (product: CartItemProps, newQuantity: number) => {
        const updatedCart = cartProducts.map(item =>
            item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
        updateCartItemQuantity(product, newQuantity, addToast);
        setCartProducts(updatedCart);
    };

    /**Função responsável por remover um determinado item do carrinho.*/
    const handleRemoveFromCart = (id: number) => {
        const updatedCart = cartProducts.filter(product => product.id !== id);
        setCartProducts(updatedCart);
        removeFromCart(id);
    };

    /**Função responsável por verificar se o carrinho possui itens antes de continuar com a compra*/
    const handleConfirmPurchase = () => {
        if(cartProducts.length === 0) {
            setShowAlert(true);
        }
        else{
            setOpenModal(true);
        }
    };

    /**UseEffect responsável por atualizar a soma total dos itens no carrinho a medida que o carrinho sofrer alterações*/
    useEffect(() => {
        const calculateTotalValue = () => {
            const total = cartProducts.reduce((acc, product) => acc + (product.unit_price * product.quantity), 0);
            setTotalValue(total);
        };
        calculateTotalValue();
    }, [cartProducts]);
    
    /**UseEffect responsável por carregar a lista de itens no carrinho quando o componente ShoppingCart é iniciado.*/
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(apiUrls.cart);
                const data = await response.json();
                setCartProducts(data);

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto min-h-screen grid grid-cols-7 h-auto">
            <div className="md:col-span-4 col-span-7 mx-2">
                {cartProducts.length === 0 && <EmptyCart />}
                {cartProducts.map(product => (
                <CartProduct
                    key={product.id}
                    product={product}
                    handleQuantityChange={handleQuantityChange}
                    handleRemoveFromCart={handleRemoveFromCart}
                />
            ))}
            </div>

            <div className="h-fit md:col-span-3 mx-2 col-span-7 bg-white border p-5 rounded-lg">
                <div className="bg-black h-[200px] mb-5 rounded-lg p-5 flex items-center">
                    <div>
                        <h2 className="text-1xl font-semibold text-gray-400">Valor total</h2>
                        <h2 className="text-4xl font-bold text-white">
                            {formatCurrency(totalValue)}
                        </h2>
                    </div>
                </div>

                <Button
                    className="w-full"
                    color={"dark"}
                    onClick={handleConfirmPurchase}>Confirmar compra
                </Button>

                {showAlert && (
                    <Alert
                        color="failure"
                        className="mt-5"
                        icon={HiInformationCircle}
                        onDismiss={() => setShowAlert(false)}>
                        <span className="font-medium">
                            O carrinho está vazio. Adicione itens antes de confirmar a compra.
                        </span>
                    </Alert>
                )}

            </div>
            <ConfirmPaymentModal
                openModal={openModal}
                onClose={() => setOpenModal(false)} />
        </div>
    );
};

export default ShoppingCart;
