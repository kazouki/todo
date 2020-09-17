import React, { useState, useEffect } from "react";
import api from "../../api";

export default (props) => {
  const [state, setState] = useState({});

  const fetchList = async () => {
    try {
      const res = await api(`list/${props.listNr}`);
      setState(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const listMap = state
    ? Object.keys(state).map((item) => {
        return { item };
      })
    : null;

  return <div>{JSON.stringify(listMap)} </div>;
};
