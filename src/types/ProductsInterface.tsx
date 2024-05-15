export interface ProductsProps {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        category: string;
        imageUrl: string;
        stock: number;
    }

}