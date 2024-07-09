import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteProduct } from '../redux/productsSlice';
import { Link } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="">
      <h1 className="text-5xl font-bold mb-5">Товары</h1>
      <input
        type="text"
        className="input input-bordered input-primary w-full max-w-xs"
        placeholder="Поиск по названию"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Link to="/products/create" className="btn btn-primary">
        Добавить товары
      </Link>
      <div className="overflow-x-auto mt-5">
        <table className="table text-lg">
          <thead>
            <tr>
              <th>Картинка</th>
              <th>Названия</th>
              <th>Статус</th>
              <th>Цена</th>
              <th>Ред/Удалить</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.slice(0, 5).map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.title} width="50" />
                </td>
                <td>{product.title}</td>
                <td>{product.status}</td>
                <td>{product.price}</td>
                <td>
                  <Link
                    to={`/products/edit/${product.id}`}
                    className="btn btn-accent"
                  >
                    Редактировать
                  </Link>
                  <button
                    className="btn btn-secondary ml-2"
                    onClick={() => handleDelete(product.id)}
                  >
                    Удалть
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;