import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    currency: "0",
    textCurrency: "$",
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      const differrentSizeItem = state.items.find(
        (item) => item.size === newItem.size
      );
      const differrentColorItem = state.items.find(
        (item) => item.color === newItem.color
      );
      const differrentSizeCapacityItem = state.items.find(
        (item) => item.selectedCapacity === newItem.selectedCapacity
      );
      const withUsbPorts = state.items.find(
        (item) => item.withUsbPorts === newItem.withUsbPorts
      );

      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          priceCurrency: newItem.priceCurrency,
          brand: newItem.brand,
          quantity: 1,
          image: newItem.image,
          gallery: newItem.gallery,
          description: newItem.description,
          size: newItem.size,
          sizes: newItem.sizes,
          colors: newItem.colors,
          capacity: newItem.capacity,
          color: newItem.color,
          selectedCapacity: newItem.selectedCapacity,
          prices: newItem.prices,
          withUsbPorts: newItem.withUsbPorts,
          usbPorts: newItem.usbPorts,
          attributes: newItem.attributes,
        });
      } else if (!differrentSizeItem) {
        state.items.push({
          id: newItem.id + newItem.size,
          name: newItem.name,
          price: newItem.price,
          priceCurrency: newItem.priceCurrency,
          brand: newItem.brand,
          quantity: 1,
          image: newItem.image,
          gallery: newItem.gallery,
          description: newItem.description,
          size: newItem.size,
          sizes: newItem.sizes,
          colors: newItem.colors,
          capacity: newItem.capacity,
          color: newItem.color,
          selectedCapacity: newItem.selectedCapacity,
          prices: newItem.prices,
          withUsbPorts: newItem.withUsbPorts,
          usbPorts: newItem.usbPorts,
          attributes: newItem.attributes,
        });
      } else if (!differrentColorItem) {
        state.items.push({
          id: newItem.id + newItem.color,
          name: newItem.name,
          price: newItem.price,
          priceCurrency: newItem.priceCurrency,
          brand: newItem.brand,
          quantity: 1,
          image: newItem.image,
          gallery: newItem.gallery,
          description: newItem.description,
          size: newItem.size,
          sizes: newItem.sizes,
          colors: newItem.colors,
          capacity: newItem.capacity,
          color: newItem.color,
          selectedCapacity: newItem.selectedCapacity,
          prices: newItem.prices,
          withUsbPorts: newItem.withUsbPorts,
          usbPorts: newItem.usbPorts,
          attributes: newItem.attributes,
        });
      } else if (!differrentSizeCapacityItem) {
        state.items.push({
          id: newItem.id + newItem.selectedCapacity,
          name: newItem.name,
          price: newItem.price,
          priceCurrency: newItem.priceCurrency,
          brand: newItem.brand,
          quantity: 1,
          image: newItem.image,
          gallery: newItem.gallery,
          description: newItem.description,
          size: newItem.size,
          sizes: newItem.sizes,
          colors: newItem.colors,
          capacity: newItem.capacity,
          color: newItem.color,
          selectedCapacity: newItem.selectedCapacity,
          prices: newItem.prices,
          withUsbPorts: newItem.withUsbPorts,
          usbPorts: newItem.usbPorts,
          attributes: newItem.attributes,
        });
      } else if (!withUsbPorts) {
        state.items.push({
          id: newItem.id + newItem.withUsbPorts,
          name: newItem.name,
          price: newItem.price,
          priceCurrency: newItem.priceCurrency,
          brand: newItem.brand,
          quantity: 1,
          image: newItem.image,
          gallery: newItem.gallery,
          description: newItem.description,
          size: newItem.size,
          sizes: newItem.sizes,
          colors: newItem.colors,
          capacity: newItem.capacity,
          color: newItem.color,
          selectedCapacity: newItem.selectedCapacity,
          prices: newItem.prices,
          withUsbPorts: newItem.withUsbPorts,
          usbPorts: newItem.usbPorts,
          attributes: newItem.attributes,
        });
      } else {
        existingItem.quantity++;
      }

      let sum = 0;
      state.items.forEach(function (item) {
        let calculation = item.prices[state.currency].amount * item.quantity;
        sum += calculation;
      });

      state.totalPrice = sum;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;

      state.totalPrice -= existingItem.prices[state.currency].amount;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
    toggleCurrency(state, action) {
      state.currency = action.payload;
      let sum = 0;
      state.items.forEach(function (item) {
        let calculation = item.prices[state.currency].amount * item.quantity;
        sum += calculation;
      });
      state.totalPrice = sum;
    },
    toggleSymbolCurrency(state, action) {
      state.textCurrency = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
