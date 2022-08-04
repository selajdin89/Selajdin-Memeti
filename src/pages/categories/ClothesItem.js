import { useState, Fragment } from "react";
import classes from "./ClothesItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";

function ClothesItem(props) {
  const currencyIndex = useSelector((state) => state.cart.currency);
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useDispatch();

  const {
    name,
    id,
    image,
    brand,
    inStock,
    attributes,
    description,
    gallery,
    prices,
    sizes,
    colors,
    capacity,
    usbPorts,
    size,
    color,
    selectedCapacity,
    withUsbPorts,
  } = props;

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
        attributes,
      })
    );
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <Fragment>
      <Link
        className={`${!inStock ? classes["outOfStock-container"] : ""}`}
        to={"/product/" + id}
        key={id}
        state={{
          id: id,
          name: name,
          brand: brand,
          gallery: gallery,
          image: image,
          attributes: attributes,
          description: description,
          inStock: inStock,
          prices: prices,
        }}
      >
        <div
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className={!isHovering ? classes["image-container"] : classes.hover}
        >
          {!inStock && (
            <div>
              <p className={classes.outOfStock}>OUT OF STOCK</p>
            </div>
          )}
          <div className={classes.image}>
            <img src={image} alt={name} />
          </div>

          <div className={classes.description}>
            <h2>{brand + " " + name}</h2>
            <p>
              {prices[currencyIndex].currency.symbol +
                prices[currencyIndex].amount}
            </p>
          </div>
        </div>
      </Link>
      {isHovering && (
        <div
          onMouseOver={handleMouseOver}
          className={`${classes["green-icon"]}`}
          onClick={inStock && attributes.length === 0 ? addItemToCart : null}
        >
          <BsCart2 className={`${classes["icon-cart"]}`} />
        </div>
      )}
    </Fragment>
  );
}

export default ClothesItem;
