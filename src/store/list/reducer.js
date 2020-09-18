const initialState = {
  lists: [],
};

export default function listSliceReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case "LOAD_LISTS":
      return {
        ...state,
        lists: payload.lists,
      };

    default:
      return state;
  }
}
