import { LOAD_LISTS, SAVE_NOTE, ADD_ITEM } from "./actions";

const initialState = {
  lists: [
    {
      items: [],
    },
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_LISTS:
      return {
        ...state,
        lists: payload.lists,
      };
    case ADD_ITEM:
      const itemList = state.lists.find((list) =>
        list.items.find((item) => item.id === payload.listId)
      );
      console.log(itemList);
      console.log("itemList");
      return {
        ...state,
      };

    default:
      return state;
  }
};
