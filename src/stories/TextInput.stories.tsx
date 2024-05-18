import { Meta, StoryObj } from '@storybook/react'
import { TextInput } from "../components/TextInput";

export default {
    title: "Components/TextInput",
    component: TextInput,
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