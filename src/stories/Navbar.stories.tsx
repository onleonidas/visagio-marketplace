import { Meta, StoryObj } from '@storybook/react'
import { Navbar } from "../components/Navbar";
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';

export default {
    title: "Components/Navbar",
    component: Navbar,
    decorators: [
        (Story) => {
            return (
                <BrowserRouter>
                    <CartProvider>
                        <Story />
                    </CartProvider >
                </BrowserRouter >
            )
        }
    ]

} as Meta;

export const Default: StoryObj = {};