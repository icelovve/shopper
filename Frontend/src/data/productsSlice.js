import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch products thunk
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        try {
            const response = await axios.get('http://localhost:3000/product');
            console.log('API Response:', response.data); 

            return response.data.data || response.data;
        } catch (error) {
            console.error('Fetch Error:', error);  
            throw new Error(`Failed to fetch products: ${error.message}`);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        cart: [],
        status: 'idle',
        error: null
    },
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.cart.find((item) => item.id === action.payload.id);
            if (existingProduct) {
                //existingProduct.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'An unknown error occurred';
            });
    },
});

export const { addToCart, removeFromCart } = productsSlice.actions;

export default productsSlice.reducer;