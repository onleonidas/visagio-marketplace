import { useEffect, useState } from "react";
import apiUrls from "../config/apiUrls";
import { CartItemProps } from "../types/CartItemInterface";
import { CartProduct } from "../components/CartProduct";
import { Button } from "flowbite-react";
import { ConfirmPayment } from "../components/ConfirmPayment";

const ShoppingCart = () => {
    const [cart, setCart] = useState<CartItemProps[]>([]);
    const [totalValue, setTotalValue] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const handleConfirmPurchase = () => {
        setOpenModal(true);
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
        <div className="container mx-auto grid grid-cols-7 gap-5">
            <div className="md:col-span-4 col-span-7">
                {cart.map((product) => (
                    <CartProduct key={product.id} product={product} />
                ))}
            </div>

            <div className="h-auto md:col-span-3 col-span-7 bg-white border p-5 rounded-lg">
                <div className="bg-black h-[200px] mb-5 rounded-lg p-5 flex items-center">
                    <div>
                        <h2 className="text-1xl font-semibold text-gray-400">Valor total</h2>
                        <h2 className="text-4xl font-bold text-white">R$ {totalValue.toFixed(2)}</h2>
                    </div>
                </div>
                <Button className="w-full" color={"dark"} onClick={handleConfirmPurchase}>Confirmar compra</Button>
            </div>
            <ConfirmPayment openModal={openModal} onClose={() => setOpenModal(false)} />
        </div>
    );
};

export default ShoppingCart;
