import React, { useState } from "react";
import api from "../../api";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default (props) => {
  const [itemTitle, setItemTitle] = useState("");

  const handleButtonClick = async () => {
    try {
      const res = await api(`items`, {
        method: "POST",
        data: { title: itemTitle, listId: props.listId },
      });
    } catch (e) {
      console.log(e);
    }
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
