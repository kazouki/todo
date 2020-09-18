import React, { useState, useEffect } from "react";
import api from "../../api";

import IconSwitch from "../Icons";
import AddItem from "../AddItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
    marginRight: 10,
  },
}));

export default (props) => {
  const [state, setState] = useState({});
  const [done, setDone] = useState(false);
  const [hover, setHover] = useState({});
  const classes = useStyles();

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

  const handleItemClick = () => {
    setDone(!done);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const res = await api(`items/${itemId}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleIconClick = (itemId) => {
    console.log("icon clocker", itemId);
    // api(`icon/${itemId}`, {
    //   method: "POST",
    // });
  };

  const list = state.list || {};
  const items = list.items || [];

  const RenderItem = (props) => {
    return (
      <>
        <ListItem button onClick={() => handleIconClick(props.id)}>
          <ListItemIcon>
            <div
              onMouseOver={() => setHover({ [props.id]: true })}
              onMouseOut={() => setHover({ [props.id]: false })}
            >
              {hover[props.id] ? (
                <IconSwitch icon={props.icon} size={"l"} />
              ) : (
                <IconSwitch icon={props.icon} size={"m"} />
              )}
            </div>
          </ListItemIcon>
          <ListItemText primary={props.title} />
          <div className={classes.datetag}>{props.date.split("T")[0]}</div>
          {hover[props.id] ? (
            <DeleteOutlineIcon onClick={() => handleDeleteItem(props.id)} />
          ) : null}
        </ListItem>
      </>
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
                id={item.id}
                title={item.title}
                icon={item.icon}
                date={item.createdAt}
              />
            ))
          : null}
        <ListItem>
          <AddItem listId={props.listId} />
        </ListItem>
      </List>
    </div>
  );
};
