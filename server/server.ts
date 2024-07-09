import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let products = [
  { id: 1, title: 'Product 1', description: '<p>Product 1 Description</p>', image: 'https://via.placeholder.com/150', price: 100, status: 'active' },
  { id: 2, title: 'Product 2', description: '<p>Product 2 Description</p>', image: 'https://via.placeholder.com/150', price: 200, status: 'archived' },
  // Добавьте другие тестовые данные по мере необходимости
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/products', (req, res) => {
  const product = req.body;
  product.id = Date.now();
  products.push(product);
  res.json(product);
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === parseInt(id));
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...req.body };
    res.json(products[productIndex]);
  } else {
    res.status(404).send('Product not found');
  }
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter(p => p.id !== parseInt(id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log('Server is running on http://localhost:${port}');
});