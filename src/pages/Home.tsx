import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import Navbar from '../components/Navbar';
import { Carousel } from "flowbite-react";


const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/catalog');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <div className='h-96 container mx-auto rounded-lg my-5 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
                <div className='bg-blue-500 lg:col-span-2 md:col-span-1 rounded-lg overflow-hidden'>
                    <div className="h-full sm:h-64 xl:h-80 2xl:h-96">
                        <Carousel className=''>
                            <img  className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1604212666403-8af98b2081e4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="..." />
                            <img  className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="..." />
                            <img  className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1636487658582-96efd1693bcb?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="..." />
                            <img  className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1530319067432-f2a729c03db5?q=80&w=1989&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="..." />
                            <img  className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1553179459-4514c0f52f41?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="..." />
                        </Carousel>
                    </div>
                </div>
                <div className='bg-gray-500 hidden lg:block lg:col-span-1 rounded-lg'>

                </div>
            </div>

            <section>
                <div className='container mx-auto'>
                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4'>
                        {products.map((product) => {
                            return (
                                <Product key={product.id} product={product} />
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;