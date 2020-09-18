import api from "../../api";

export const LOAD_LISTS = "LOAD_LISTS";
export const SAVE_NOTE = "SAVE_NOTE";
export const ADD_ITEM = "ADD_ITEM";

export function fetchLists() {
  return async (dispatch) => {
    try {
      const res = await api(`lists`);
      if (res) {
        dispatch({ type: LOAD_LISTS, payload: res.data });
        return res;
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  };
}
export function saveNote({ itemId, text }) {
  return async (dispatch) => {
    try {
      const res = await api(`items/note`, {
        method: "PUT",
        data: { itemId, text },
      });
      if (res) {
        dispatch({ type: SAVE_NOTE, payload: res.data });
        return res;
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  };
}

export function addItem({ title, listId }) {
  return async (dispatch) => {
    try {
      const res = await api(`items`, {
        method: "POST",
        data: { title, listId },
      });
      if (res) {
        console.log("heeeeeeeeeeeeee");
        dispatch({ type: ADD_ITEM, payload: { listId, item: res.data } });
      }
    } catch (e) {
      console.log(e);
    }
  };
}
