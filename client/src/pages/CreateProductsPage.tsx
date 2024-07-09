

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { addProduct } from "../redux/productsSlice";

const CreateProductPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState<"active" | "archived">("active");

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && image && price) {
      dispatch(
        addProduct({
          id: Date.now(),
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-5xl font-bold mb-5">Добавить товары</h1>
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
      <div className="mb-3">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs block mb-3"
          onChange={handleImageUpload}
        />
        {image && (
          <div>
            <img src={image} alt="Uploaded" className="max-w-xs block mb-3" />
          </div>
        )}
      </div>
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
      </button>
    </form>
  );
};

export default CreateProductPage;
