import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const reducer = {
    cart: cartSlice,
  };

 const store = configureStore({
    reducer,
})


export default store;