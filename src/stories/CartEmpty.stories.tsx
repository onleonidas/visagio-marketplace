import { Meta, StoryObj } from '@storybook/react'
import { EmptyCart } from "../components/EmptyCart";

export default {
    title: "Components/EmptyCart",
    component: EmptyCart,
    decorators: [
        (Story) => {
            return (
                <div className='w-[800px]'>
                    <Story />
                </div>
            )
        }
    ]

} as Meta;

export const Default: StoryObj = {};