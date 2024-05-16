import { useEffect, useState } from "react";
import { ProductsProps } from "../types/ProductsInterface";
import apiUrls from "../config/apiUrls";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { HiOutlineTrash } from "react-icons/hi";

const ShoppingCart = () => {

    const [cart, setCart] = useState<ProductsProps["product"][]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(apiUrls.cart);
                const data = await response.json();
                setCart(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>

            <div className="container mx-auto grid grid-cols-3">


                <div className="col-span-2">
                    {cart.map((item) => {
                        return (
                            <div className="flex items-center justify-between gap-5 mt-5 border p-5 rounded-lg bg-gray-50">
                                <div className="flex items-center gap-5">
                                    <div>
                                        <img src={item.imageUrl} className="max-h-36 max-w-36 border bg-white rounded-lg p-5" alt="" />
                                    </div>
                                    <div>
                                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            <p>{item.name}</p>
                                        </h5>
                                        <p className="font-normal text-gray-700 dark:text-gray-400">
                                            <p className="w-72">{item.description}</p>
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <TextInput type="number" name="" id="" placeholder="Quantidade" />
                                </div>

                                <Button color="dark">
                                    <HiOutlineTrash className="mr-2 h-5 w-5" />
                                    Remover
                                </Button>

                            </div>
                        )
                    })}
                </div>

                <div className="px-10">
                    <form className="flex max-w-md flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Your email" />
                            </div>
                            <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Your password" />
                            </div>
                            <TextInput id="password1" type="password" required />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>
                        <Button color={"dark"} type="submit">Submit</Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ShoppingCart;