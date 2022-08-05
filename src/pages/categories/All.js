import { Fragment } from "react";
import classes from "./All.module.css";
import AllItems from "./AllItems";
import useAll from "../../hooks/useAll";
import Card from "../UI/Card";
import { useSelector } from "react-redux";

function All() {
  const { error, loading, data } = useAll();
  const currency = useSelector((state) => state.cart.currency);

  if (loading) {
    return <div className={classes.loading}>Loading....⏳</div>;
  }

  if (error) {
    return <div className={classes.error}>Something went wrong!!</div>;
  }

  return (
    <Fragment>
      <h2 className={classes.title}>All</h2>
      <Card>
        {data.category.products.map((product) => (
          <div
            key={product.id}
            className={`${classes["image-container"]} ${classes["text-link"]}`}
          >
            <AllItems
              inStock={product.inStock}
              id={product.id}
              image={product.gallery[0]}
              gallery={product.gallery}
              name={product.name}
              brand={product.brand}
              price={product.prices[currency].amount}
              priceCurrency={product.prices[currency].currency.symbol}
              prices={product.prices}
              description={product.description}
              attributes={product.attributes}
              sizes={product.attributes.filter((item) => item.id === "Size")}
              colors={product.attributes.filter((item) => item.id === "Color")}
              capacity={product.attributes.filter(
                (item) => item.id === "Capacity"
              )}
              usbPorts={product.attributes.filter(
                (item) => item.id === "With USB 3 ports"
              )}
              size={""}
              color={""}
              selectedCapacity={""}
              withUsbPorts={""}
            />
          </div>
        ))}
      </Card>
    </Fragment>
  );
}

export default All;
