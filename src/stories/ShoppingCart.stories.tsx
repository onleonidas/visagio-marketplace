import { Meta, StoryObj } from '@storybook/react'
import ShoppingCart from "../pages/ShoppingCart";
import { BrowserRouter } from 'react-router-dom';

export default {
    title: "Pages/ShoppingCart",
    component: ShoppingCart,
    decorators: [
        (Story) => {
            return (
                <div className=''>
                    <BrowserRouter>
                        <div className=''>
                            <Story />
                        </div>
                    </BrowserRouter>
                </div>
            )
        }
    ]

} as Meta;

export const Default: StoryObj = {};