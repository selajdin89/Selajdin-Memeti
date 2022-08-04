import React from "react";
import classes from "./Header.module.css";
import { BsCart2 } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";

function Header() {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartIsShown = useSelector((state) => state.ui.cartIsVisible);
  const cartCurrency = useSelector((state) => state.ui.cartCurrency);
  const symbolCurrency = useSelector((state) => state.cart.textCurrency);

  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  const toggleCartCurrencyHandler = () => {
    dispatch(uiActions.toggleCartCurrency());
    if (cartIsShown) {
      dispatch(uiActions.toggleCart());
    }
  };

  const navLinkStyles = ({ isActive }) => {
    return {
      borderBottom: isActive ? "2px solid #5ece7b" : "none",
    };
  };

  return (
    <div className={classes["header-container"]}>
      <div className={classes.header}>
        <nav
          className={
            !cartIsShown
              ? classes["list-items"]
              : `${classes["list-items"]} ${classes.disabled}`
          }
        >
          <NavLink style={navLinkStyles} to="/">
            ALL
          </NavLink>
          <NavLink style={navLinkStyles} to="/tech">
            TECH
          </NavLink>
          <NavLink style={navLinkStyles} to="/clothes">
            CLOTHES
          </NavLink>
        </nav>
        <div className={classes.actions}>
          <div className={classes.icons}>
            {symbolCurrency}
            {!cartCurrency && (
              <MdOutlineKeyboardArrowDown
                className={classes.arrow}
                onClick={toggleCartCurrencyHandler}
              />
            )}
            {cartCurrency && (
              <MdOutlineKeyboardArrowUp
                className={classes.arrow}
                onClick={toggleCartCurrencyHandler}
              />
            )}
            <BsCart2
              className={classes["cart-icon"]}
              onClick={toggleCartHandler}
            />
            {cartCurrency && <Dropdown />}
          </div>
          <div className={classes.span}>
            <span>{cartQuantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
