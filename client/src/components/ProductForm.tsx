import React, { useState, useEffect } from "react";
import { Product } from "../redux/productsSlice";

interface ProductFormProps {
  initialProduct?: Product;
  onSubmit: (product: Omit<Product, "id">) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialProduct,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialProduct?.title || "");
  const [description, setDescription] = useState(
    initialProduct?.description || ""
  );
  const [image, setImage] = useState(initialProduct?.image || "");
  const [price, setPrice] = useState(initialProduct?.price.toString() || "");
  const [status, setStatus] = useState<"active" | "archived">(
    initialProduct?.status || "active"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && image && price) {
      onSubmit({
        title,
        description,
        image,
        price: parseFloat(price),
        status,
      });
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Названия товар"
        className="input input-bordered input-secondary w-full max-w-xs"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Загрузить картинка"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Цена"
        className="input input-bordered input-secondary w-full max-w-xs"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as "active" | "archived")}
      >
        <option value="active">Активный</option>
        <option value="archived">Активирован</option>
      </select>
      <button type="submit">Сохранить</button>
      <button type="button" onClick={onCancel}>
        Отмена
      </button>
    </form>
  );
};

export default ProductForm;
