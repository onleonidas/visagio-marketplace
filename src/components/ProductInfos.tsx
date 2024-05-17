import { Badge, Button, Rating, RatingStar } from "flowbite-react";
import { ProductsProps } from "../types/ProductsInterface";
import { useCartService } from "../services/useCartSerivce";
import { useToast } from "../context/ToastContext";

export const ProductInfos = ({ product }: ProductsProps) => {

    const { name, description, price, category, stock } = product;
    const { addToast } = useToast();
    const { addToCart } = useCartService();

    //Adicionar produto ao carrinho
    const handleAddToCart = (product: ProductsProps["product"]) => {
        addToCart(product, addToast);
    };

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
            <Button onClick={() => handleAddToCart(product)} color="dark" className="w-full h-12 flex items-center">
                <p>Adicionar ao carrinho</p>
            </Button>
        </div>
        <Badge size="sm" className="w-fit mt-5" color="warning">
            Restam {stock} {name} no estoque.
        </Badge>
    </>
    );
};

