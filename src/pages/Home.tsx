import { useEffect, useState } from 'react';
import { Product } from '../components/Product';
import { Header } from '../components/Header';
import apiUrls from '../config/apiUrls';

interface ProductProperties {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number;
}

const Home = () => {

    const [products, setProducts] = useState<ProductProperties[]>([]);

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
            <Header />
            <section>
                <div className='container mx-auto'>
                    <div className='grid sm:grid-cols-1 md:grid-cols-2
                    lg:grid-cols-4 xl:grid-cols-4 gap-4'>
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