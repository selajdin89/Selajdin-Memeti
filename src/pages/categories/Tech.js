import { Fragment } from "react";
import useTech from "../../hooks/useTech";
import Card from "../UI/Card";
import TechItem from "./TechItem";
import classes from "./All.module.css";
import { useSelector } from "react-redux";

function Tech() {
  const currency = useSelector((state) => state.cart.currency);
  const { error, loading, data } = useTech();

  if (loading) {
    return <div>Loading....⏳</div>;
  }

  if (error) {
    return <div>Error</div>;
  }
  return (
    <Fragment>
      <h2 className={classes.title}>Tech</h2>
      <Card>
        {data.category.products.map((product) => (
          <div
            key={product.id}
            className={`${classes["image-container"]} ${classes["text-link"]}`}
          >
            <TechItem
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

export default Tech;
