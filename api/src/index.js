import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { configureStore } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';

import productsReducer, {productsFetch} from './components/features/productsSlice';

import { productsApi } from './components/features/productApi';

import cartReducer, { getTotals } from './components/features/carSlice'



const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware)

});

store.dispatch(productsFetch());
store.dispatch(getTotals());



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);


