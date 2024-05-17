import { useEffect, useState } from 'react';
import { Product } from '../components/Product';
import { Header } from '../components/Header';
import { apiUrls } from '../config/apiUrls';
import { ProductsProps } from '../types/ProductsInterface';
import { Pagination } from 'flowbite-react';

const ITEMS_PER_PAGE = 8;

const Home = () => {
    const [products, setProducts] = useState<ProductsProps['product'][]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(apiUrls.products);
                const data = await response.json();
                setProducts(data);

                // Calculando total de paginas: itens total e itens por página
                const totalItems = data.length;
                setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const getVisibleProducts = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        return products.slice(startIndex, endIndex);
    };

    return (
        <>
            <Header />
            <section>
                <div className="container  mx-auto">
                    <div className="grid below-sm:mx-4 below-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                        {getVisibleProducts().map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                    <div className='w-full flex justify-center my-16'>
                        <Pagination key={currentPage} currentPage={currentPage} totalPages={totalPages}
                            onPageChange={handlePageChange} showIcons />
                    </div>

                </div>
            </section>
        </>
    );
};

export default Home;