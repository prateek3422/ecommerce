const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";
import { toast } from "react-toastify";

// if (typeof window !== 'undefined') {
//   const items = localStorage.getItem('cartItems') ? JSON.parse(JSON.stringify(localStorage.getItem('cartItems'))): []
// }


// export const cartdata =  createAsyncThunk('cart/fetchCart' , async () =>{
// const res = await axios('http://localhost:3000/api/cart')
// console.log(res.data)
// return res.data
// })

const getFromLocalStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};
const initialState = {
  cartItem: getFromLocalStorage("cartItems")
    ? JSON.parse(getFromLocalStorage("cartItems") || "{}")
    : [],
    // cartdata,
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItem.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItem[itemIndex].cartQuantity += 1;
        toast.info("Increased Product quantity", {
          position: "top-center",
          autoClose: 1000,
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
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
      // state.cartdata.push(action.payload)
    },

    removeFromCart(state, action) {
      const nextCartItem = state.cartItem.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );

      state.cartItem = nextCartItem;

      toast.error(`${action.payload.name} Remove from cart`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },

    decreaseFromCart(state, action) {
      const itemIndex = state.cartItem.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );

      if (state.cartItem[itemIndex].cartQuantity > 1) {
        state.cartItem[itemIndex].cartQuantity -= 1;
        toast.info("Decreased Product quantity", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (state.cartItem[itemIndex].cartQuantity === 1) {
        const nextCartItem = state.cartItem.filter(
          (cartItem) => cartItem._id !== action.payload._id
        );

        state.cartItem = nextCartItem;

        toast.error(`${action.payload.name} Remove from cart`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
      }
    },
    getTotla(state, action){
      const {total, quantity} = state.cartItem.reduce(
        (cartTotal,cartItem) => {
          const {price, cartQuantity} = cartItem
          const totalItem  = price * cartQuantity

          cartTotal.total += totalItem
          cartTotal.quantity += cartQuantity

          return cartTotal
        },
        {
          total :0,
          quantity : 0
        }
      )
      state.totalPrice = total,
      state.totalQuantity = quantity 
    }
  },
});

export const { addToCart, removeFromCart, decreaseFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
