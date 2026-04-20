import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload; 
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {

            existingItem.quantity++;

        } else {

            state.items.push({ name, image, cost, quantity: 1 });
        
        }
    },
    removeItem: (state, action) => {

        state.items = state.items.filter(item => item.name !== action.payload);

    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload; 
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
             
            itemToUpdate.quantity = quantity; 

        }
    },
  },
});

export const addItem = (item) => ({
  type: "ADD_ITEM",
  payload: item,
});

export const removeItem = (id) => ({
  type: "REMOVE_ITEM",
  payload: id,
});

export const updateQuantity = ({ id, quantity }) => ({
  type: "UPDATE_QUANTITY",
  payload: { id, quantity },
});

const cartReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;

