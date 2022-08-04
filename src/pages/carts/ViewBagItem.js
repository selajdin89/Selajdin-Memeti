import { Fragment, useState } from "react";
import classes from "./ViewBagItem.module.css";
import { cartActions } from "../store/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

function ViewBagItem(props) {
  const currencyIndex = useSelector((state) => state.cart.currency);
  const [index, setIndex] = useState(0);
  const {
    id,
    name,
    quantity,
    brand,
    prices,
    image,
    gallery,
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

  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        name,
        quantity,
        brand,
        prices,
        id,
        image,
        gallery,
        size,
        sizes,
        colors,
        capacity,
        color,
        selectedCapacity,
        withUsbPorts,
      })
    );
  };

  const next = () => {
    if (index === gallery.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };
  const prev = () => {
    if (index === 0) {
      setIndex(gallery.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const removeItemFromCartHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };
  return (
    <Fragment>
      <li className={classes.items}>
        <div className={classes.cart}>
          <div>
            <h2 className={classes.brand}>{brand}</h2>
            <h2 className={classes.title}>{name}</h2>
            <p className={classes.price}>
              {prices[currencyIndex].currency.symbol +
                prices[currencyIndex].amount}
            </p>
            <div>
              <ul className={classes.attributes}>
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
          </div>
          <div className={classes.actions}>
            <button onClick={addItemHandler}>+</button>
            <span>{quantity}</span>
            <button onClick={removeItemFromCartHandler}>−</button>
          </div>
          <div className={classes["image-container"]}>
            {gallery && gallery.length > 1 && (
              <div className={classes.arrowButtons}>
                <span>
                  <MdOutlineKeyboardArrowLeft onClick={prev} />
                </span>
                <span>
                  <MdOutlineKeyboardArrowRight onClick={next} />
                </span>
              </div>
            )}
            <img src={gallery[index]} alt={name} />
          </div>
        </div>
      </li>
    </Fragment>
  );
}

export default ViewBagItem;
