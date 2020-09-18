import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import List from "../List";
import NoteEditor from "../NoteEditor";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { fetchLists } from "../../store/list/actions";

import { selectedItem } from "../../store/appState/selectors";
import { selectLists } from "../../store/list/selectors";

export default () => {
  const dispatch = useDispatch();
  const lists = useSelector(selectLists);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    root: {
      textAlign: "center",
      alignItems: "center",
      height: "100%",
      flexGrow: 1,
    },
    layoutFrame: {
      background: "lightblue",
      padding: 30,
      marginTop: 15,
    },
    listNav: {
      marginTop: 20,
      minHeight: 100,
      background: "#F0F0F0",
    },

    loadButton: {
      color: "white",
      background: "orange",
      borderRadius: 10,
    },
    section: {
      padding: theme.spacing(2),
      textAlign: "center",
      background: "white",
    },
    sectionList: {
      padding: theme.spacing(2),
      minHeight: 500,
      minWidth: 400,
      textAlign: "center",
      background: "white",
    },
    sectionTop: {
      padding: theme.spacing(0),
      textAlign: "center",
    },
    sectionContent: {
      padding: theme.spacing(2),
      minHeight: 500,
      minWidth: 400,
      background: "white",
      textAlign: "left",
    },
    cardGridItems: {
      marginTop: 10,
      background: "blue",
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={3} className={classes.listNav}>
          LIST CARDS HERE
        </Grid>
      </Container>
      <Container>
        <Grid container spacing={3} className={classes.layoutFrame}>
          <Grid item xs={12} sm={6}>
            <Container className={classes.sectionList}>
              <Container>
                {lists.map((list) => (
                  <List key={list.id} list={list} />
                ))}
              </Container>
            </Container>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Container className={classes.sectionContent}>
              <Grid container spacing={3}>
                <NoteEditor />
              </Grid>
              <Grid item xs={12} sm={12}></Grid>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
