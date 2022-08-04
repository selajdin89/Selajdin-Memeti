import React, { useRef, useEffect } from "react";
import classes from "./Dropdown.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { uiActions } from "../store/ui-slice";

function Dropdown() {
  const ref = useRef();
  const cartCurrency = useSelector((state) => state.ui.cartCurrency);
  const dispatch = useDispatch();

  const toggleCurrencyHandler = (event) => {
    dispatch(cartActions.toggleCurrency(event.target.value));
    dispatch(cartActions.toggleSymbolCurrency(event.target.id));
    dispatch(uiActions.toggleCartCurrency());
  };

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (cartCurrency && ref.current && !ref.current.contains(event.target)) {
        dispatch(uiActions.toggleCartCurrency());
      }
    });

    return () => {
      document.removeEventListener("click", (event) => {
        if (
          cartCurrency &&
          ref.current &&
          !ref.current.contains(event.target)
        ) {
          dispatch(uiActions.toggleCartCurrency());
        }
      });
    };
  }, [cartCurrency, dispatch]);
  return (
    <div ref={ref} className={classes["dropdown-container"]}>
      <ul className={classes.dropdownList}>
        <li id="$" value="0" onClick={toggleCurrencyHandler}>
          $ USD
        </li>
        <li id="£" value="1" onClick={toggleCurrencyHandler}>
          £ GBP
        </li>
        <li id="A$" value="2" onClick={toggleCurrencyHandler}>
          A$ AUD
        </li>
        <li id="¥" value="3" onClick={toggleCurrencyHandler}>
          ¥ JPY
        </li>
        <li id="₽" value="4" onClick={toggleCurrencyHandler}>
          ₽ RUB
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
