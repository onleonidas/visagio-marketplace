import { Button, TextInput } from "flowbite-react";
import { CartItemProps } from "../types/CartItemInterface";
import { HiOutlineTrash } from "react-icons/hi";
import { formatCurrency } from "../utils/formatCurrency";

interface CartProductProps {
    product: CartItemProps;
    handleQuantityChange: (product: CartItemProps, quantity: number) => void;
    handleRemoveFromCart: (id: number) => void;
}

export const CartProduct = ({ product, handleQuantityChange, handleRemoveFromCart }: CartProductProps) => {

    return (
        <div key={product.id} className="grid grid-cols-3 bg-gray-50 rounded-lg p-2 mb-2 border">

            <div className="col-span-3 flex items-center gap-5">
                <div>
                    <img src={product.imageUrl} className="max-h-36 sm:max-w-24 max-w-36 border bg-white rounded-lg p-5" alt={product.name} />
                </div>
                <div>
                    <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {product.name}
                    </h5>
                    <div className="font-normal text-gray-700 dark:text-gray-400">
                        <p className="hidden sm:block w-72 text-sm">{product.description}</p>
                    </div>
                </div>
            </div>

            <div className="col-span-3 mt-2 border p-2 bg-gray-100 rounded-lg flex justify-between items-center">
                <div className="flex gap-5 items-center">
                    <TextInput
                        className="w-20"
                        type="number"
                        defaultValue={product.quantity}
                        min="1"
                        onChange={(e) => handleQuantityChange(product, parseInt(e.target.value))}
                    />
                    <p className="text-sm font-semibold text-gray-500">{formatCurrency(product.unit_price * product.quantity)}</p>
                </div>
                <Button onClick={() => handleRemoveFromCart(product.id)} color="dark">
                    <HiOutlineTrash className="mr-2 h-5 w-5" />
                    Remover
                </Button>
            </div>
        </div>
    );
};
