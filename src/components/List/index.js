import React, { useState, useEffect } from "react";
import api from "../../api";

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default (props) => {
  const [state, setState] = useState({});
  const classes = useStyles();
  const [done, setDone] = useState(false);

  const handleClick = () => {
    setDone(!done);
  };

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

  return (
    <div>
      {JSON.stringify(listMap)}

      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            todo items
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem button>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="send a mail" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="write a mail" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
};
