import * as React from "react";
import { Component } from "react";
import NavBar from "./NavBar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752
    },
    demo: {
      backgroundColor: theme.palette.background.paper
    },
    title: {
      margin: theme.spacing(4, 0, 2)
    }
  })
);
const Li = styled(Button)({
  boxShadow: "0 1px 5px 1px #CCCACA",
  height: 44,
  width: 400,
  padding: "0 30px",
  borderRadius: 0,
  margin: 5
});

function generate(element: React.ReactElement) {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return numbers.map(value =>
    React.cloneElement(element, {
      key: value
    })
  );
}

function RoomPageJoin() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className="main-container">
        <div className="navbar-container">
          <NavBar />
        </div>
        <div className="title">
          <h1>ROOM CODE: #1234</h1>
        </div>
        <section className="names">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div className={classes.demo}>
                {generate(
                  <Li>
                    {/* <ListItemIcon>
                    
                  </ListItemIcon> */}
                    <ListItemText primary="Single-line item" />
                  </Li>
                )}
              </div>
            </Grid>
          </Grid>
        </section>
      </div>
    </React.Fragment>
  );
}
export default RoomPageJoin;
