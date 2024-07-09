import React from "react";
import { Product } from "../redux/productsSlice";

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Status: {product.status}</p>
      <button onClick={() => onEdit(product.id)}>Edit</button>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </div>
  );
};

export default ProductCard;
