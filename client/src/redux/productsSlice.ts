import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  // добавлен экспорт интерфейса
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  status: "active" | "archived";
}

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
