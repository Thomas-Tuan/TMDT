import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    itemCount: 1,
    cartTotalAmount: 0,
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
            }
            else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
            }
        },
        removeItem: (state, action) => {
            const nextCartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            state.cartItems = nextCartItems;
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(cartItem => cartItem.id === action.payload.id);
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
            }
            else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id)
                state.cartItems = nextCartItems;
            }
        },
        clearCart: (state, action) => {
            state.cartItems = [];
        },
        getTotal: (state, action) => {
            let { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;
                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;

                return cartTotal
            }, {
                total: 0,
                quantity: 0,
            })
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        updateQuantity: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.product.id);
            console.log(itemIndex)
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
            }
            else {
                const tempProduct = { ...action.payload.product, cartQuantity: action.payload.quantity };
                state.cartItems.push(tempProduct);
            }
        },
    },
});

export const { addItem, removeItem, decreaseCart, clearCart, getTotal, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
