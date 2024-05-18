import { Meta, StoryObj } from '@storybook/react'
import ConfirmPaymentPage from "../pages/ConfirmPaymentPage"
import { BrowserRouter } from "react-router-dom";

export default {
    title: "Pages/ConfirmPaymentPage",
    component: ConfirmPaymentPage,
    decorators: [
        (Story) => {
            return (
                <BrowserRouter>
                    <Story />
                </BrowserRouter>
            )
        }
    ]

} as Meta;

export const Default: StoryObj = {};