import { useEffect, useState } from "react";
import { apiUrls } from "../config/apiUrls";
import { CartItemProps } from "../types/CartItemInterface";
import { CartProduct } from "../components/CartProduct";
import { Alert, Button } from "flowbite-react";
import { ConfirmPaymentModal } from "../components/ConfirmPaymentModal";
import { EmptyCart } from "../components/EmptyCart";
import { HiInformationCircle } from "react-icons/hi";
import { formatCurrency } from "../utils/formatCurrency";

const ShoppingCart = () => {
    const [cart, setCart] = useState<CartItemProps[]>([]);
    const [totalValue, setTotalValue] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleConfirmPurchase = () => {
        if(cart.length === 0) {
            setShowAlert(true);
        }
        else{
            setOpenModal(true);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(apiUrls.cart);
                const data = await response.json();
                setCart(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const calculateTotalValue = () => {
            const total = cart.reduce((acc, product) => acc + (product.unit_price * product.quantity), 0);
            setTotalValue(total);
        };

        fetchProducts();
        calculateTotalValue();
    }, [cart]);

    return (
        <div className="container mx-auto min-h-screen grid grid-cols-7 h-auto">
            <div className="md:col-span-4 col-span-7 mx-2">
                {cart.length === 0 && <EmptyCart />}
                {cart.map((product) => (
                    <CartProduct key={product.id} product={product} />
                ))}
            </div>

            <div className="h-fit md:col-span-3 mx-2 col-span-7 bg-white border p-5 rounded-lg">
                <div className="bg-black h-[200px] mb-5 rounded-lg p-5 flex items-center">
                    <div>
                        <h2 className="text-1xl font-semibold text-gray-400">Valor total</h2>
                        <h2 className="text-4xl font-bold text-white">{formatCurrency(totalValue)}</h2>
                    </div>
                </div>
                <Button className="w-full" color={"dark"} onClick={handleConfirmPurchase}>Confirmar compra</Button>

                {showAlert && (
                    <Alert color="failure" className="mt-5" icon={HiInformationCircle} onDismiss={() => setShowAlert(false)}>
                        <span className="font-medium"> O carrinho está vazio. Adicione itens antes de confirmar a compra.</span>
                    </Alert>
                )}

            </div>
            <ConfirmPaymentModal openModal={openModal} onClose={() => setOpenModal(false)} />
        </div>
    );
};

export default ShoppingCart;
