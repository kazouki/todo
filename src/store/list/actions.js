import api from "../../api";

export function fetchLists() {
  return async (dispatch) => {
    try {
      const res = await api(`lists`);
      if (res) {
        dispatch({ type: "LOAD_LISTS", payload: res.data });
        return res;
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  };
}
