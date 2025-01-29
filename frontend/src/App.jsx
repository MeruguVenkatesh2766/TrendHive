import { useRoutes, Outlet, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "./store/slices/userSlice";
import { initCart } from "./store/slices/cartSlice";
import AppRoutes from "./AppRoutes";

const App = () => {
  const isLoggedIn = useSelector((state) => state.user.loginUser);
  const cartItems = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const localUser = localStorage.getItem("digiUser");
    if (localUser && !isLoggedIn.userId) {
      dispatch(getUserInfo(JSON.parse(localUser)));
    }

    const localCart = JSON.parse(localStorage.getItem("digiCart")) || [];
    if (localCart.length > 0 && cartItems.length === 0) {
      dispatch(initCart(localCart));
    }
  }, [cartItems, dispatch, isLoggedIn.userId]);

  const authAdmin = useSelector((state) => state.user.loginUser.authAdmin);

  return (
    <BrowserRouter>
      <AppRoutes isLoggedIn={isLoggedIn} authAdmin={authAdmin} />
    </BrowserRouter>
  );
};

export default App;
