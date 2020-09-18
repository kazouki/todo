import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { SELECTED_ITEM } from "../../store/appState/actions";

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
  const [iconHover, setIconHover] = useState({});
  const [hover, setHover] = useState({});
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleItemClick = (itemId) => {
    //TODO dispatch selectedItem action
    dispatch({
      type: SELECTED_ITEM,
      payload: items.find((item) => item.id === itemId),
    });
  };

  const handleDeleteItem = async (itemId) => {
    //TODO  dispatch delete action
    try {
      await api(`items/${itemId}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleIconClick = (itemId) => {
    //TODO dispatch change icon action

    console.log("icon clocker", itemId);
    // api(`icon/${itemId}`, {
    //   method: "POST",
    // });
  };

  const list = props.list || {};
  const items = props.list.items || [];

  const RenderItem = (props) => {
    return (
      <>
        <ListItem
          onClick={() => handleItemClick(props.id)}
          onMouseOver={() => setHover({ [props.id]: true })}
          onMouseOut={() => setHover({ [props.id]: false })}
        >
          <ListItemIcon>
            <div
              onMouseOver={() => setIconHover({ [props.id]: true })}
              onMouseOut={() => setIconHover({ [props.id]: false })}
            >
              {iconHover[props.id] ? (
                <IconSwitch icon={props.icon} size={"l"} />
              ) : (
                <IconSwitch icon={props.icon} size={"m"} />
              )}
            </div>
          </ListItemIcon>
          <ListItemText primary={props.title} />
          {hover[props.id] ? (
            <div onClick={() => handleDeleteItem(props.id)}>
              <DeleteOutlineIcon />
            </div>
          ) : (
            <div />
          )}
          <div className={classes.datetag}>{props.date.split("T")[0]}</div>
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
