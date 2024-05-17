import { Button, Modal } from "flowbite-react";
import TextInput from "./TextInput";
import { useNavigate } from "react-router-dom";
import { useCartService } from "../services/useCartSerivce";
import { CartItemProps } from "../types/CartItemInterface";

interface ModalProps {
    openModal: boolean;
    onClose: any;
    cartList: CartItemProps[];
};

export const ConfirmPaymentModal = ({ openModal, onClose, cartList }: ModalProps) => {

    const navigate = useNavigate();
    const { clearCart } = useCartService();

    const handleConfirmPayment = async (cartList: CartItemProps[]) => {
        navigate("/paymentConfirmed")
        await clearCart(cartList);
    }

    return (  
        <Modal show={openModal} onClose={onClose}>
            <Modal.Header>Confirmação dos dados de pagamento</Modal.Header>
            <Modal.Body>
                <form className="flex flex-col gap-5" onSubmit={() => handleConfirmPayment(cartList)}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="text-sm font-semibold">Número do cartão</label>
                        <TextInput type="card" className="rounded border" placeholder="0000 0000 0000 0000" maskType="card" required />
                    </div>

                    <div className="flex items-center lg:flex-row md:flex-col gap-5">
                        <div className="w-1/2 md:w-full flex flex-col gap-2">
                            <label htmlFor="" className="text-sm font-semibold">Data de vencimento</label>
                            <input className="rounded border" type="date" required />
                        </div>
                        <div className="w-1/2 md:w-full flex flex-col gap-2">
                            <label htmlFor="" className="text-sm font-semibold">CVC</label>
                            <TextInput className="rounded border" type="number" required maxLength={3} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="text-sm font-semibold ">Nome completo</label>
                        <TextInput className="rounded border" type="text" required />
                    </div>
                    <Button type="submit" color={"dark"}>Realizar compra</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};
