import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsProps } from "../types/ProductsInterface";
import { ProductInfos } from "../components/ProductInfos";
import { apiUrls } from "../config/apiUrls";

const ProductPage = () => {
  const [product, setProduct] = useState<ProductsProps["product"]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    console.warn("product page com loop")

    const fetchProduct = async () => {
      try {
        const response = await fetch(`${apiUrls.products}${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError('Error fetching product');
      }
      finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      {loading && <p>Loading banners...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && product &&
        <>
          <div className="container mx-auto md:w-[90vw] sm:w-[900vw] lg:w-[80vw] h-auto
          my-5 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            <div className="bg-stone-200 rounded-lg mx-5  flex items-center justify-center">
              <img className="max-h-[600px]" src={product.imageUrl} alt="" />
            </div>
            <div className="p-5 ">
              <ProductInfos product={product}/>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default ProductPage;