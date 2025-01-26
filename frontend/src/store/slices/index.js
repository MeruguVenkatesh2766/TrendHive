// third-party
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist-indexeddb-storage";
import cartSlice from "./cartSlice";
import categorySlice from "./categorySlice";
import locationSlice from "./locationSlice";
import orderSlice from "./orderSlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";

const reducers = combineReducers({
  cart: persistReducer(
    {
      key: "cart",
      // storage,
      storage: storage("STORE"),
      keyPrefix: "EIS-",
    },
    cartSlice
  ),
  category: persistReducer(
    {
      key: "category",
      // storage,
      storage: storage("STORE"),
      keyPrefix: "EIS-",
    },
    categorySlice
  ),
  location: persistReducer(
    {
      key: "location",
      // storage,
      storage: storage("STORE"),
      keyPrefix: "EIS-",
    },
    locationSlice
  ),
  order: persistReducer(
    {
      key: "order",
      // storage,
      storage: storage("ModuleLayers"),
      keyPrefix: "EIS-",
    },
    orderSlice
  ),
  product: persistReducer(
    {
      key: "product",
      // storage,
      storage: storage("STORE"),
      keyPrefix: "EIS-",
    },
    productSlice
  ),
  user: persistReducer(
    {
      key: "user",
      // storage,
      storage: storage("STORE"),
      keyPrefix: "EIS-",
    },
    userSlice
  ),
});

export default reducers;
