// store.js
import { configureStore } from '@reduxjs/toolkit';
import CartSlice, { getTotal } from './Cart/CartSlice';

const store = configureStore({
    reducer: {
        carts: CartSlice,
    },
});

store.dispatch(getTotal());

export default store;
