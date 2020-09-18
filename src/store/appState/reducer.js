import { SELECTED_ITEM } from "./actions";

const initialState = {
  selectedItem: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SELECTED_ITEM:
      return {
        ...state,
        selectedItem: payload,
      };

    default:
      return state;
  }
};
