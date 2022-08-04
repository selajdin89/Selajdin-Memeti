import { Fragment } from "react";
import ViewBagItem from "./ViewBagItem";
import { useSelector } from "react-redux";
import classes from "./ViewBag.module.css";

const ViewBag = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartIsEmpty = cartItems.length === 0;
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const currencyIndex = useSelector((state) => state.cart.currency);
  const currency = cartItems[0]?.prices[currencyIndex].currency.symbol;

  return (
    <Fragment>
      <h2 className={classes.title}>Cart</h2>
      <ul className={classes.ul}>
        {cartItems.map((item) => (
          <ViewBagItem
            key={item.id}
            item={{
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              brand: item.brand,
              prices: item.prices,
              image: item.image,
              gallery: item.gallery,
              size: item.size,
              sizes: item.sizes,
              colors: item.colors,
              capacity: item.capacity,
              color: item.color,
              selectedCapacity: item.selectedCapacity,
              withUsbPorts: item.withUsbPorts,
              usbPorts: item.usbPorts,
            }}
          />
        ))}
      </ul>
      {cartIsEmpty && (
        <p className={classes.empty}>You have no products added to the cart!</p>
      )}
      {!cartIsEmpty && (
        <div className={classes["cart-footer"]}>
          <div className={classes.total}>
            <div className={classes.paragraph}>
              <p>Tax 21%:</p>
              <p>Quantity:</p>
              <p>Total:</p>
            </div>
            <div className={classes.values}>
              <p>{currency}42</p>
              <p>{totalQuantity}</p>
              <p>{currency + `${totalPrice.toFixed(2)}`}</p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ViewBag;
