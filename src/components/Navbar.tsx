import React from "react";
import { FaSearch } from "react-icons/fa";
import { PiShoppingCartSimple } from "react-icons/pi";
import { LiaSearchSolid } from "react-icons/lia";

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

const Navbar = () => {
    return (
        <div className=" container mx-auto duration-200 relative z-40">
            <div className="py-4">
                <div className="flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <a href="" className="">Viságio</a>
                        <div className="hidden lg:block">
                            <ul className="flex items-center gap-4">
                                {
                                    MenuLinks.map((data, index) =>(
                                        <li key={index}>
                                            <a href={data.link}
                                            className="hover:bg-gray-100 py-2 rounded-md inline-block px-4 font-semibold text hover:text-black duration-200"
                                        >{data.name}</a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <button>
                            <PiShoppingCartSimple className="text-2xl" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
  