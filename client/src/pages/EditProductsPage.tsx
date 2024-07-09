import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { updateProduct } from "../redux/productsSlice";
import { Product } from "../redux/productsSlice";

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(id))
  );

  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [image, setImage] = useState(product?.image || "");
  const [price, setPrice] = useState(product?.price.toString() || "");
  const [status, setStatus] = useState<"active" | "archived">(
    product?.status || "active"
  );

  useEffect(() => {
    if (!product) {
      alert("Product not found!");
      navigate("/products");
    }
  }, [product, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && image && price) {
      dispatch(
        updateProduct({
          id: Number(id),
          title,
          description,
          image,
          price: parseFloat(price),
          status,
        })
      );
      navigate("/products");
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-5xl font-bold mb-5">Редактировать</h1>
      <input
        type="text"
        placeholder="Title"
        className="input input-bordered input-primary w-full max-w-xs block mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Описание"
        className="textarea textarea-primary w-full max-w-xs block mb-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        className="input input-bordered input-primary w-full max-w-xs block mb-3"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Цена"
        className="input input-bordered input-primary w-full max-w-xs block mb-3"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <select
        value={status}
        className="select select-primary w-full max-w-xs block mb-3"
        onChange={(e) => setStatus(e.target.value as "active" | "archived")}
      >
        <option value="active">Active</option>
        <option value="archived">Archived</option>
      </select>
      <button type="submit" className="btn btn-primary mr-2">
        Сохранить
      </button>
      <button
        type="button"
        className="btn btn-accent"
        onClick={() => navigate("/products")}
      >
        Отменна
      </button>{" "}
    </form>
  );
};

export default EditProductPage;
