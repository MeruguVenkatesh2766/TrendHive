import { useSelector } from "react-redux";

import styled from "styled-components";
import { COLORS } from "../../styles/constants";
import { Cart } from "@styled-icons/ionicons-outline";
import CartWidget from "./CartWidget";

const CartSpot = () => {
  const { products, subtotal } = useSelector((state) => state.cart);

  return (
    <Wrapper>
      <CartIcon size="36" />
      <Count>{products.length}</Count>
      <CartWidget products={products} subtotal={subtotal} />
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  position: relative;
  z-index: 1;

  &:hover .widget {
    display: block;
  }
`;

const CartIcon = styled(Cart)`
  color: currentColor;
  opacity: 0.7;
  cursor: pointer;

  &:hover {
    color: ${COLORS.text};
    opacity: 1;
  }
`;

const Count = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: ${COLORS.secondary};
  color: ${COLORS.white};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  right: -8px;
`;

export default CartSpot;
