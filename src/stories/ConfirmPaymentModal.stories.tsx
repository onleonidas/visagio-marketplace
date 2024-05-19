import { Meta, StoryObj } from '@storybook/react'
import { ConfirmPaymentModal } from "../components/ConfirmPaymentModal";
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';

export default {
    title: "Components/ConfirmPaymentModal",
    component: ConfirmPaymentModal,
    decorators: [
        (Story) => {
            return (
                <BrowserRouter>
                    <CartProvider>
                        <Story />
                    </CartProvider>
                </BrowserRouter>
            )
        }
    ],
} as Meta;

export const Default: StoryObj = {};