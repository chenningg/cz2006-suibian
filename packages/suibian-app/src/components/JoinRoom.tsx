import React from "react";
import "../css/JoinRoom.css";
import { Icon } from "@material-ui/core";
import NavBar from "./NavBar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(0),
        width: "41ch"
      }
    }
  })
);
function JoinRoom() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className="main-container">
        <div className="navbar-container">
          <NavBar />
        </div>
        <div className="spacer"></div>
        <div className="title">
          <h1>ROOM CODE:</h1>
        </div>
        <div className="text-field">
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="roomcode"
              label="ENTER 4-LETTER CODE"
              variant="filled"
            />
          </form>
        </div>
        <div className="title">
          <h1>NAME:</h1>
        </div>
        <div className="text-field">
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="roomcode" label="ENTER YOUR NAME" variant="filled" />
          </form>
        </div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <button
          type="button"
          className="standard-button red-button fixed-button"
        >
          <Link to="/roompagejoin" className="red-button-hyperlink-stripped">
            JOIN ROOM
          </Link>
        </button>
      </div>
    </React.Fragment>
  );
}

export default JoinRoom;
