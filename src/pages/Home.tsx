import { useEffect, useState } from 'react';
import { Product } from '../components/Product';
import { Header } from '../components/Header';
import { Button, Pagination, TextInput } from 'flowbite-react';
import { useCart } from '../context/CartContext';
import { FaSearch } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

const ITEMS_PER_PAGE = 8;

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { catalogItems } = useCart();

    const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });

    // Função para atualizar a página atual
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Função para atualizar a categoria selecionada
    const handleCategoryChange = (category: string) => {
        setCurrentPage(1);
        setSelectedCategory(category);
    };

    // Função para atualizar o termo de pesquisa
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(1);
        setSearchTerm(event.target.value);
    };

    // Função para obter os produtos visíveis com base na categoria selecionada, termo de pesquisa e na página atual
    const getVisibleProducts = () => {
        if (!catalogItems) return [];
        let filteredItems = catalogItems;

        if (selectedCategory) {
            filteredItems = filteredItems.filter(item => item.category === selectedCategory);
        }

        if (searchTerm) {
            filteredItems = filteredItems.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredItems.slice(startIndex, endIndex);
    };

    // useEffect para calcular o número total de páginas com base na quantidade de itens no catálogo
    useEffect(() => {
        if (catalogItems) {
            let filteredItems = catalogItems;

            if (selectedCategory) {
                filteredItems = filteredItems.filter(item => item.category === selectedCategory);
            }

            if (searchTerm) {
                filteredItems = filteredItems.filter(item =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            const totalItems = filteredItems.length;
            setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
        }
    }, [catalogItems, selectedCategory, searchTerm]);

    return (
        <>
            <Header />
            <section className="container mx-auto">
                <div className="my-4 below-sm:mx-5 flex gap-2 xl:mx-10 items-center justify-between">
                    {isSmallScreen ? (
                        <select
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            value={selectedCategory}
                            className="px-4 py-2 border rounded-md"
                        >
                            <option value="">All</option>
                            <option value="Acessórios">Acessórios</option>
                            <option value="Eletrônicos">Eletrônicos</option>
                            <option value="Periféricos">Periféricos</option>
                        </select>
                    ) : (
                        <div className='flex items-center gap-2'>
                            <Button color={"dark"} onClick={() => handleCategoryChange('')} className={`px-4 py-2 w-auto h-10 flex items-center justify-center ${selectedCategory === '' ? 'bg-zinc-900 text-white' : 'bg-zinc-600'}`}>All</Button>
                            <Button color={"dark"} onClick={() => handleCategoryChange('Acessórios')} className={`px-4 py-2 w-auto h-10 flex items-center justify-center ${selectedCategory === 'Acessórios' ? 'bg-zinc-900 text-white' : 'bg-zinc-600'}`}>Acessórios</Button>
                            <Button color={"dark"} onClick={() => handleCategoryChange('Eletrônicos')} className={`px-4 py-2 w-auto h-10 flex items-center justify-center ${selectedCategory === 'Eletrônicos' ? 'bg-zinc-900 text-white' : 'bg-zinc-600'}`}>Eletrônicos</Button>
                            <Button color={"dark"} onClick={() => handleCategoryChange('Periféricos')} className={`px-4 py-2 w-auto h-10 flex items-center justify-center ${selectedCategory === 'Periféricos' ? 'bg-zinc-900 text-white' : 'bg-zinc-600'}`}>Periféricos</Button>
                        </div>
                    )}
                    <TextInput
                        type="text"
                        placeholder="Pesquisar..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        color={"dark"}
                        className=""
                        icon={FaSearch}
                    />
                </div>
                <div className="grid below-sm:mx-4 below-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:mx-10 gap-4">
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
