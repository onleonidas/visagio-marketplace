import { Meta, StoryObj } from '@storybook/react'
import { ConfirmPaymentModal } from "../components/ConfirmPaymentModal";
import { BrowserRouter } from 'react-router-dom';

export default {
    title: "Components/ConfirmPaymentModal",
    component: ConfirmPaymentModal,
    decorators: [
        (Story) => {
            return (
                <BrowserRouter>
                    <Story />
                </BrowserRouter>
            )
        }
    ],
} as Meta;

export const Default: StoryObj = {};