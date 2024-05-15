import { PiShoppingCartSimple } from "react-icons/pi";
import { Navbar as Nav } from "flowbite-react";
import Link from 'react-router-dom';
import Logo from '../assets/vstore.svg'

const MenuLinks = [
    {
        id: 1,
        name: "Home",
        link: "/#"
    },
    {
        id: 2,
        name: "Catálogo",
        link: "/catalogo"
    }
]

export const Navbar = () => {
    return (
        <Nav className="container mx-auto py-5" fluid rounded>
            <Nav.Brand  href="">
                <img src={Logo} className="mr-3 h-6 sm:h-9" alt="" />
            </Nav.Brand>
            <Nav.Toggle />
            <Nav.Collapse>
                {MenuLinks.map((link) => {
                    return (
                        <Nav.Link key={link.id} href={link.link} className="">
                            <p className="text-gray-600 hover:text-black">{link.name}</p>
                        </Nav.Link>
                    )
                })}
            </Nav.Collapse>
        </Nav>
    );
}
