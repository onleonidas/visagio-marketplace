import { Meta, StoryObj } from '@storybook/react'
import { Navbar } from "../components/Navbar";
import { BrowserRouter } from 'react-router-dom';

export default {
    title: "Components/Navbar",
    component: Navbar,
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