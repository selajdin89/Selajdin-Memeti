import React, { Fragment } from "react";
import classes from "./CartItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";

function CartItem(props) {
  const currencyIndex = useSelector((state) => state.cart.currency);
  const {
    id,
    name,
    quantity,
    brand,
    prices,
    image,
    size,
    sizes,
    colors,
    capacity,
    color,
    selectedCapacity,
    usbPorts,
    withUsbPorts,
  } = props.item;
  const dispatch = useDispatch();

  console.log(id);
  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        name,
        quantity,
        brand,
        prices,
        id,
        image,
        size,
        sizes,
        colors,
        capacity,
        color,
        selectedCapacity,
        usbPorts,
        withUsbPorts,
      })
    );
  };

  const removeItemFromCartHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  return (
    <Fragment>
      <li>
        <div className={classes.cart}>
          <div>
            <p className={classes.brand}>{brand}</p>
            <h2 className={classes.title}>{name}</h2>
            <p className={classes.price}>
              {prices[currencyIndex].currency.symbol +
                prices[currencyIndex].amount}
            </p>
            <ul>
              {sizes && sizes.length !== 0 && (
                <>
                  <span>{sizes[0]?.name}</span>
                  <li className={classes["li-sizes"]}>
                    {sizes[0].items.map((item) => (
                      <p
                        key={item.id}
                        className={`${classes.squareButton} ${
                          size === item.id ? classes.bgColor : ""
                        }`}
                      >
                        {item.id}
                      </p>
                    ))}
                  </li>
                </>
              )}
              {capacity && capacity.length !== 0 && (
                <>
                  <span>{capacity[0]?.name}</span>
                  <li className={classes["li-sizes"]}>
                    {capacity[0].items.map((item) => (
                      <p
                        key={item.id}
                        className={`${classes.squareButton} ${
                          selectedCapacity === item.id ? classes.bgColor : ""
                        }`}
                      >
                        {item.id}
                      </p>
                    ))}
                  </li>
                </>
              )}
              {usbPorts && usbPorts.length !== 0 && (
                <>
                  <span>{usbPorts[0]?.name}</span>
                  <li className={classes["li-sizes"]}>
                    {usbPorts[0].items.map((item) => (
                      <p
                        key={item.id}
                        className={`${classes.squareButton} ${
                          withUsbPorts === item.id ? classes.bgColor : ""
                        }`}
                      >
                        {item.id}
                      </p>
                    ))}
                  </li>
                </>
              )}

              {colors && colors.length !== 0 && (
                <>
                  <span>{colors[0]?.name}</span>
                  <li className={classes["li-colors"]}>
                    {colors[0].items.map((item) => (
                      <p
                        key={item.id}
                        style={{ backgroundColor: `${item.value}` }}
                        className={`${classes.colorButtons} ${
                          color === item.value ? classes.borderStyle : ""
                        }`}
                      ></p>
                    ))}
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className={classes.actions}>
            <button onClick={addItemHandler}>+</button>
            <span>{quantity}</span>
            <button onClick={removeItemFromCartHandler}>−</button>
          </div>
          <div className={classes["image-container"]}>
            <img src={image} alt={name} />
          </div>
        </div>
      </li>
    </Fragment>
  );
}

export default CartItem;
