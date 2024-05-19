import { useEffect, useState } from 'react';
import { Product } from '../components/Product';
import { Header } from '../components/Header';
import { Pagination } from 'flowbite-react';
import { useCart } from '../context/CartContext';

const ITEMS_PER_PAGE = 8;

const Home = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const { catalogItems } = useCart();

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const getVisibleProducts = () => {
        if (!catalogItems) return [];
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return catalogItems.slice(startIndex, endIndex);
    };

    useEffect(() => {
        if (catalogItems) {
            const totalItems = catalogItems.length;
            setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
        }
    }, [catalogItems]);

    return (
        <>
            <Header />

            <section className="container  mx-auto">
                <div className="grid below-sm:mx-4 below-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                    {getVisibleProducts().map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
                <div className='w-full flex justify-center my-16'>
                    <Pagination key={currentPage} currentPage={currentPage} totalPages={totalPages}
                        onPageChange={handlePageChange} showIcons />
                </div>

            </section>

        </>
    );
};

export default Home;