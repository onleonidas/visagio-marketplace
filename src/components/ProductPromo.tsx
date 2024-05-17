import { Badge, Button } from 'flowbite-react'
import { ProductsProps } from '../types/ProductsInterface';
import { HiClock } from "react-icons/hi";

export const ProductPromo = ({ imageUrl, name, description, category }: ProductsProps["product"]) => {
    return (
        <div className="flex flex-col m-5 h-full items-center justify-center space-y-2">
            <Badge color="gray" size="sm" icon={HiClock}>Promoção na categoria {category}</Badge>
            <div className='h-5/6 items-center flex'>
                <img className="max-h-72 hover:scale-90 duration-300 ease-in-out" src={imageUrl} alt="" />
            </div>
            <div className='h-12 w-full items-center justify-between flex'>
                <div>
                    <h2 className='font-semibold md:text-[20px] lg:text-2xl'>{name}</h2>
                    <p className='text-md md:text-sm text-gray-600'>{description}</p>
                </div>
                <Button color={"dark"} pill className=" bg-black flex hover:bg-gray-500 w-2/4 items-center">
                    Ver mais
                </Button>   
            </div>
            
        </div>
    );
}