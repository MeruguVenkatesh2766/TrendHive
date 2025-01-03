import { useRoutes, Outlet, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import GlobalStyles from "../styles/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../slices/userSlice";
import { initCart } from "../slices/cartSlice";
import AppRoutes from "./routes";

const App = () => {
  const loginUser = useSelector((state) => state.user.loginUser);
  const cartItems = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const localUser = localStorage.getItem("digiUser");
    if (localUser && !loginUser.userId) {
      dispatch(getUserInfo(JSON.parse(localUser)));
    }

    const localCart = JSON.parse(localStorage.getItem("digiCart")) || [];
    if (localCart.length > 0 && cartItems.length === 0) {
      dispatch(initCart(localCart));
    }
  }, [cartItems, dispatch, loginUser.userId]);

  const authAdmin = useSelector((state) => state.user.loginUser.authAdmin);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <AppRoutes authAdmin={authAdmin} />
    </BrowserRouter>
  );
};

export default App;
