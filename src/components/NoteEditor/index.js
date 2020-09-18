import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectedItem } from "../../store/appState/selectors";
import { saveNote } from "../../store/list/actions";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default (props) => {
  const [edit, setEdit] = useState(false);
  const [note, setNote] = useState("");
  const dispatch = useDispatch();
  const itemContent = useSelector(selectedItem);

  const handleNoteSubmit = () => {
    dispatch(saveNote({ itemId: itemContent.id, text: note }));
    setEdit(false);
  };

  const renderContent = (
    <div>
      <div>{itemContent.content}</div>
      <div>
        <Button variant="contained" onClick={() => setEdit(!edit)}>
          Edit note
        </Button>
      </div>
    </div>
  );

  const renderEditor = (
    <div>
      <TextField
        style={{
          marginTop: 30,
        }}
        id="standard-multiline-flexible"
        label=""
        multiline
        rowsMax={20}
        rows={20}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <Button variant="contained" onClick={handleNoteSubmit}>
        Save Note
      </Button>
    </div>
  );

  const renderNote = (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>Notes for item '{itemContent.title}'</div>
      <div>{edit ? renderEditor : renderContent}</div>
    </Container>
  );
  return renderNote;
};
