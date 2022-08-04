import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import ProductPageItem from "./ProductPageItem";
import { useSelector } from "react-redux";

function ProductPage(props) {
  const currency = useSelector((state) => state.cart.currency);
  const location = useLocation();

  const { state } = location;

  return (
    <Fragment>
      <ProductPageItem
        image={state.image}
        name={state.name}
        brand={state.brand}
        price={state.prices[currency].amount}
        priceCurrency={state.prices[currency].currency.symbol}
        description={state.description}
        id={state.id}
        colors={state.attributes.filter((item) => item.id === "Color")}
        sizes={state.attributes.filter((item) => item.id === "Size")}
        capacity={state.attributes.filter((item) => item.id === "Capacity")}
        usbPorts={state.attributes.filter(
          (item) => item.id === "With USB 3 ports"
        )}
        attribute={state.attributes}
        gallery={state.gallery}
        inStock={state.inStock}
        prices={state.prices}
      />
    </Fragment>
  );
}

export default ProductPage;
