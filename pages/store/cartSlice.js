
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import { toast } from "react-toastify";


// if (typeof window !== 'undefined') {
//   const items = localStorage.getItem('cartItems') ? JSON.parse(JSON.stringify(localStorage.getItem('cartItems'))): []
// }

const getFromLocalStorage = (key) => {
  if (!key || typeof window === 'undefined') {
      return ""
  }
  return localStorage.getItem(key)
}
const initialState = {
  cartItem: getFromLocalStorage("cartItems") ? JSON.parse(getFromLocalStorage("cartItems") || '{}') : [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart(state, action) {
    
      const itemIndex = state.cartItem.findIndex((item) =>  item._id === action.payload._id);
      if (itemIndex >= 0) {
        state.cartItem[itemIndex].cartQuantity += 1;
        toast.info('Increased Product quantity', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
  
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItem.push(tempProduct);
        toast.success(`${action.payload.name} Added to cart`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }

      localStorage.setItem('cartItems',  JSON.stringify(state.cartItem))
      // state.cartItem.push(action.payload)
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
