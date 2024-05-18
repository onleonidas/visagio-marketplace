import { Navbar as Nav, TextInput } from "flowbite-react";
import Logo from '../assets/vstore.svg'
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";

//Contador de produtos no carrinho

const MenuLinks = [
    {
        id: 1,
        name: "Home",
        link: "/home"
    },
    {
        id: 2,
        name: "Catálogo",
        link: "/catalogo"
    }
]

export const Navbar = () => {
    
    return (
        <Nav className="container mx-auto py-5 my-5" fluid rounded>
            <Nav.Brand href="/home">
                <img src={Logo} className="mr-3 h-6 sm:h-9" alt="" />
            </Nav.Brand>

            <Nav.Toggle />

            <Nav.Collapse>
                {MenuLinks.map((link) => {
                    return (
                        <Nav.Link key={link.id} href={link.link} className="">
                            <p className="text-gray-600 hover:text-black">
                                {link.name}
                            </p>
                        </Nav.Link>
                    )
                })}
            </Nav.Collapse>


            <Nav.Collapse>
                
                
                <Link to="/shoppingcart">
                    <div className="flex items-center justify-center">
                        <PiShoppingCartSimpleBold className="text-[22px] mx-2" />
                    </div>
                </Link>
            </Nav.Collapse>



        </Nav>
    );
}

