import React, { Fragment } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Cart.module.css";
import { uiActions } from "../store/ui-slice";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const currencyIndex = useSelector((state) => state.cart.currency);

  const cartIsEmpty = cartItems.length === 0;
  const currency = cartItems[0]?.prices[currencyIndex].currency.symbol;

  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  return (
    <Fragment>
      <Modal>
        <ul className={classes.ul}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={{
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                brand: item.brand,
                prices: item.prices,
                image: item.image,
                size: item.size,
                sizes: item.sizes,
                colors: item.colors,
                capacity: item.capacity,
                color: item.color,
                selectedCapacity: item.selectedCapacity,
                usbPorts: item.usbPorts,
                withUsbPorts: item.withUsbPorts,
              }}
            />
          ))}
        </ul>
        {cartIsEmpty && (
          <p className={classes.empty}>
            You have no products added to the cart!
          </p>
        )}
        {!cartIsEmpty && (
          <div className={classes["cart-footer"]}>
            <div className={classes.total}>
              <p>Total</p>
              <span>{currency + `${Number(totalPrice).toFixed(2)}`}</span>
            </div>
            <div className={classes.buttons}>
              <Link to="/bag/">
                <button
                  onClick={toggleCartHandler}
                  className={classes["view-button"]}
                >
                  VIEW BAG
                </button>
              </Link>
              <button className={classes["checkout-button"]}>CHECK OUT</button>
            </div>
          </div>
        )}
      </Modal>
    </Fragment>
  );
};

export default Cart;
