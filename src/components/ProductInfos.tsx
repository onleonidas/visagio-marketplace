import { Badge, Button, Rating, RatingStar } from "flowbite-react";
import { ProductsProps } from "../types/ProductsInterface";
import { TbShoppingCartPlus } from "react-icons/tb";


export const ProductInfos = ({ product }: ProductsProps) => {

    const { name, description, price, category, stock } = product;

    return (<>
        <div className="flex justify-between">
            <h2 className="text-3xl font-semibold">{name}</h2>
            <Badge size="md" color="gray">{category}</Badge>
        </div>
        <p className="text-2xl text-gray-500">R$: {price}</p>
        <Rating className="mt-2">
            <RatingStar />
            <RatingStar />
            <RatingStar />
            <RatingStar />
            <RatingStar filled={false} />
        </Rating>
        <p className="w-4/5 mt-5 text-gray-700">{description}</p>

        <div className="flex items-center gap-4 mt-5">
            <Button color="dark" className="w-full h-12 flex items-center">
                Comprar agora
            </Button>
            <Button color="light" className="flex items-center h-12">
                <TbShoppingCartPlus className="text-[20px]" />
            </Button>
        </div>
        <Badge size="sm" className="w-fit mt-5" color="warning">
            Restam {stock} {name} no estoque.
        </Badge>
    </>
    );
};

