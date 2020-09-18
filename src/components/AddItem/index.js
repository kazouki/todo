import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useDispatch } from "react-redux";
import { addItem } from "../../store/list/actions";

export default (props) => {
  const [itemTitle, setItemTitle] = useState("");
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(addItem({ title: itemTitle, listId: props.listId }));
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <form noValidate autoComplete="off">
        <TextField
          value={itemTitle}
          onChange={(e) => setItemTitle(e.target.value)}
          id="filled-basic"
          label="Your new task"
          variant="filled"
        />
      </form>
      <div style={{ marginLeft: 20 }}>
        <Button variant="contained" onClick={handleButtonClick}>
          Add task
        </Button>
      </div>
    </div>
  );
};
