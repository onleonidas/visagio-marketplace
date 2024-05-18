import { Meta, StoryObj } from '@storybook/react'
import { ProductPromo } from "../components/ProductPromo";
import { BrowserRouter as Router } from 'react-router-dom';

export default {
    title: "Components/ProductPromo",
    component: ProductPromo,
    decorators: [
        (Story) => {
            return (
                <div className='w-[500px] h-[500px]'>
                    <Router>
                        <Story />
                    </Router>
                </div>
            )
        }
    ]

} as Meta;

export const Default = () => <ProductPromo
    id={11}
    imageUrl={"https://www.svgrepo.com/show/508699/landscape-placeholder.svg"}
    name={"PSVR2"}
    description={"Óculos de realidade virtual"}
    category={"Eletrônicos"}
    price={1.500}
    stock={10} />;