import { Fragment, useState } from "react";
import classes from "./ProductPageItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";

function ProductPageItem(props) {
  const [source, setSource] = useState(props.image);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [withUsbPorts, setWithUsbPorts] = useState("");

  const currencyIndex = useSelector((state) => state.cart.currency);
  const {
    name,
    prices,
    id,
    image,
    brand,
    description,
    inStock,
    colors,
    sizes,
    capacity,
    usbPorts,
    gallery,
  } = props;
  const dispatch = useDispatch();
  const addItemToCart = () => {
    dispatch(
      cartActions.addItemToCart({
        description,
        brand,
        name,
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
        gallery,
      })
    );
  };

  const btnDisAllowed =
    (sizes.length !== 0 && size === "") ||
    (colors.length !== 0 && color === "") ||
    (capacity.length !== 0 && selectedCapacity === "") ||
    (usbPorts.length !== 0 && withUsbPorts === "");

  const images = props.gallery.map((id) => ({ id }));

  const changeImageSourceHandler = (event) => {
    setSource(event.currentTarget.src);
  };

  return (
    <Fragment>
      <div className={classes["cart-container"]}>
        <div>
          {images.map((img) => (
            <li key={img.id} className={classes["small-image"]}>
              <img src={img.id} alt={name} onClick={changeImageSourceHandler} />
            </li>
          ))}
        </div>
        <div className={classes["image-container"]}>
          <img src={source} alt={name} />
        </div>
        <div className={classes.description}>
          <div>
            <h2>{props.brand}</h2>
            <p className={classes.type}>{props.name}</p>
          </div>
          {sizes && (
            <div>
              <p className={classes.attributes}>{sizes[0]?.name}</p>
              <ul className={classes.squares}>
                {sizes[0]?.items.map((item) => (
                  <li
                    key={item.id}
                    className={classes["li-sizes"]}
                    value={item.value}
                  >
                    <button
                      className={`${classes.squareButton} ${
                        size === item.id ? classes.bgColor : ""
                      }`}
                      onClick={() => setSize(item.id)}
                    >
                      {item.id}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {capacity && (
            <div>
              <p className={classes.attributes}>{capacity[0]?.name}</p>
              <ul className={classes.squares}>
                {capacity[0]?.items.map((item) => (
                  <li
                    key={item.id}
                    className={classes["li-sizes"]}
                    value={item.value}
                  >
                    <button
                      className={`${classes.squareButton} ${
                        selectedCapacity === item.id ? classes.bgColor : ""
                      }`}
                      onClick={() => setSelectedCapacity(item.id)}
                    >
                      {item.id}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {usbPorts && (
            <div>
              <p className={classes.attributes}>{usbPorts[0]?.name}</p>
              <ul className={classes.squares}>
                {usbPorts[0]?.items.map((item) => (
                  <li
                    key={item.id}
                    className={classes["li-sizes"]}
                    value={item.value}
                  >
                    <button
                      className={`${classes.squareButton} ${
                        withUsbPorts === item.id ? classes.bgColor : ""
                      }`}
                      onClick={() => setWithUsbPorts(item.id)}
                    >
                      {item.id}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {colors && (
            <div>
              <p className={classes.attributes}>{colors[0]?.name}</p>
              <ul className={classes.squares}>
                {colors[0]?.items.map((item) => (
                  <li
                    key={item.id}
                    className={classes["li-colors"]}
                    value={item.value}
                  >
                    <button
                      style={{ backgroundColor: `${item.value}` }}
                      className={`${classes.colorButtons} ${
                        color === item.value ? classes.borderStyle : ""
                      }`}
                      onClick={() => setColor(item.value)}
                    >
                      {/* {item.id} */}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <p className={classes.attributes}>Price</p>
            <span>
              {prices[currencyIndex].currency.symbol +
                prices[currencyIndex].amount}
            </span>
            <button
              className={
                btnDisAllowed || !inStock
                  ? classes.disabledButton
                  : classes.addButton
              }
              onClick={btnDisAllowed ? () => null : addItemToCart}
            >
              Add To Cart
            </button>
            <div className={classes.text}>
              <p dangerouslySetInnerHTML={{ __html: description }}></p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductPageItem;
