import { useEffect, useState } from 'react';
import { Product } from '../components/Product';
import { Header } from '../components/Header';
import apiUrls from '../config/apiUrls';
import { ToastProvider } from '../context/ToastContext';
import { ProductsProps } from '../types/ProductsInterface';

const Home = () => {

    const [products, setProducts] = useState<ProductsProps["product"][]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(apiUrls.products);
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
            <ToastProvider>
                <Header />
                <section>
                    <div className='container mx-auto'>
                        <div
                            className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4'>
                            {products.map((product) => {
                                return (
                                    <Product key={product.id} product={product} />
                                );
                            })}
                        </div>
                    </div>
                </section>
            </ToastProvider>
        </>
    );
};

export default Home;