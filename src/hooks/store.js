// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { getTotal } from './useReducer';

const store = configureStore({
    reducer: {
        carts: cartReducer,
    },
});

store.dispatch(getTotal());

export default store;
