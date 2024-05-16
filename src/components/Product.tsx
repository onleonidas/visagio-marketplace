import { TbShoppingCartPlus } from "react-icons/tb";
import { ProductsProps } from "../types/ProductsInterface";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { CartService } from "../services/cartService";

export const Product = ({ product }: ProductsProps) => {
  const { id, name, price, category, imageUrl } = product;

  const { addToast } = useToast();

  const handleAddToCart = (name: string) => {
    CartService.addToCart(name, addToast);
  };

  return (
    <div key={id} className='flex flex-col gap-2'>
      <Link to={`/catalog/${id}`}>
        <div className='w-full hover:cursor-pointer h-[400px] flex items-center justify-center rounded-lg bg-stone-200'>
          <img className='max-h-72 hover:scale-90 duration-300 ease-in-out' src={imageUrl} alt="" />
        </div>
      </Link>

      <div className='flex justify-between items-center'>
        <div>
          <p className='text-gray-500'>R$: {price}</p>
          <h2 className='font-semibold'>{name}</h2>
          <p className='text-sm text-gray-400'>{category}</p>
        </div>
        <button onClick={() => handleAddToCart(name)}
        className='hover:shadow-md border text-[19px] flex items-center justify-center rounded-lg h-12 w-12 text-black'>
          <TbShoppingCartPlus />
        </button>
      </div>
    </div>
  );
};
