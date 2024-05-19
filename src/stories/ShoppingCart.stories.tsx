import { Meta, StoryObj } from '@storybook/react'
import ShoppingCart from "../pages/ShoppingCart";
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';

export default {
    title: "Pages/ShoppingCart",
    component: ShoppingCart,
    decorators: [
        (Story) => {
            return (
                <div className=''>
                    <BrowserRouter>
                        <CartProvider>
                            <ToastProvider>
                            <div className=''>
                                <Story />
                            </div>
                            </ToastProvider>
                        </CartProvider>
                    </BrowserRouter>
                </div>
            )
        }
    ]

} as Meta;

export const Default: StoryObj = {};