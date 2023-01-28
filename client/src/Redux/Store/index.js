import { configureStore } from "@reduxjs/toolkit";

import {
  brandSlice,
  cartSlice,
  categoriesSlice,
  facturaSlice,
  notificationSlice,
  productsSlice,
  providerSlice,
  userSlice,
} from "../Slices";
import { themeSlice } from "../Slices/theme";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    theme: themeSlice.reducer,
    categories: categoriesSlice.reducer,
    providers: providerSlice.reducer,
    brands: brandSlice.reducer,
    users: userSlice.reducer,
    notification: notificationSlice.reducer,
    cart: cartSlice.reducer,
    factura: facturaSlice.reducer,
  },
});
