import React, { useState, useEffect } from "react";
import api from "../../api";

import Item from "../Item";

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
    maxWidth: 460,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  datetag: {
    float: "right",
    fontSize: 12,
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
      const res = await api(`lists/${props.listId}`);
      setState(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const list = state.list || {};
  const items = list.items || [];

  const RenderItem = (props) => {
    return (
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={props.title} />
        <div className={classes.datetag}>{props.date.split("T")[0]}</div>
      </ListItem>
    );
  };

  return (
    <div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {list.name}
          </ListSubheader>
        }
        className={classes.root}
      >
        {items
          ? items.map((item) => (
              <RenderItem
                key={item.id}
                title={item.title}
                date={item.createdAt}
              />
            ))
          : null}
      </List>
    </div>
  );
};
