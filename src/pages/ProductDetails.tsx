import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsProps } from "../types/ProductsInterface";
import apiUrls from "../config/apiUrls";

const ProductDetails = () => {
  const [product, setProduct] = useState<ProductsProps["product"]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
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
          <div>{product.name}</div>
        </>
      }
    </div>
  );
};

export default ProductDetails;