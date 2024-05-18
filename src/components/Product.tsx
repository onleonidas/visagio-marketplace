import { TbShoppingCartPlus } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { ProductsProps } from '../types/ProductsInterface';
import { useCartService } from "../hooks/useCartSerivce";
import { Badge } from "flowbite-react";

export const Product = ({ product }: ProductsProps) => {
  const { id, name, price, category, imageUrl, stock } = product;
  const { addToast } = useToast();
  const { addToCart } = useCartService();

  //Adicionar produto ao carrinho
  const handleAddToCart = (product: ProductsProps["product"]) => {
    addToCart(product, addToast);
  };

  return (
    <div key={id} className='flex flex-col gap-2'>

      <Link to={`/catalog/${id}`}>
        <div className='w-full hover:cursor-pointer below-sm:h-[200px] h-[350px] flex items-center justify-center rounded-lg bg-stone-200'>
          <img className='lg:max-h-[300px] w-[260px] below-sm:w-[200px]  block below-sm:max-h-[240px] sm:max-h-[260px] hover:scale-90 duration-300 ease-in-out' src={imageUrl} alt="" />
        </div>
      </Link>


      <div className='flex justify-between items-center'>
        <div>
          <p className='text-gray-500 below-sm:text-[14px]'>R$: {price}</p>
          <h2 className='font-semibold text-1xl below-sm:text-[14px]'>{name}</h2>
          <p className='text-sm text-gray-400 below-sm:text-[10px]'>{category}</p>

        </div>

        {stock > 0 &&
          <button onClick={() => handleAddToCart(product)}
            className='below-sm:h-10 below-sm:w-10 hover:shadow-md border text-[19px] flex items-center justify-center rounded-lg h-12 w-12 text-black'>
            <TbShoppingCartPlus />
          </button>
        }
        {stock === 0 &&
          <Badge color="failure" className="below-sm:text-[10px]">Desculpe, não temos o item em estoque.</Badge>
        }

      </div>
    </div>
  );
};
