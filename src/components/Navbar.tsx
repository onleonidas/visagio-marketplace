import { Navbar as Nav } from "flowbite-react";
import { useEffect, useState } from "react";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext';

const MenuLinks = [
    {
        id: 1,
        name: "Home",
        link: "/home"
    },
    {
        id: 2,
        name: "Carrinho",
        link: "/shoppingcart"
    }
];

export const Navbar = () => {
    const { cartItems } = useCart();
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        let count = 0;
        cartItems.forEach((item) => {
            count += item.quantity;
        });
        setCartItemCount(count);
    }, [cartItems]);

    return (
        <Nav className="container mx-auto py-5 my-5" fluid rounded>
            <Nav.Brand href="/home">
                <img src="../src/assets/vstore.svg" className="mr-3 h-6 sm:h-9" alt="VStore" />
            </Nav.Brand>

            <Nav.Toggle />

            <Nav.Collapse>
                {MenuLinks.map((link) => (
                    <Nav.Link key={link.id} href={link.link}>
                        <p className="text-gray-600 hover:text-black">
                            {link.name}
                        </p>
                    </Nav.Link>
                ))}
            </Nav.Collapse>

            <Nav.Collapse>
                <Link to="/shoppingcart">
                    <button type="button" className="relative inline-flex items-center font-medium text-center rounded-full">
                        <PiShoppingCartSimpleBold className="text-[26px] mx-2" />
                        {cartItemCount > 0 && (
                            <div className="absolute text-[11px] inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500 rounded-full -top-2 -right-2">
                                {cartItemCount}
                            </div>
                        )}
                    </button>
                </Link>
            </Nav.Collapse>
        </Nav>
    );
};
