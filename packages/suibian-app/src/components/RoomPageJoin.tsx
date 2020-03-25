import * as React from "react";
import { Component } from "react";
import "../css/RoomPageJoin.css";
import NavBar from "./NavBar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { DisplayName } from "./DisplayName";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "hidden",
      padding: theme.spacing(0, 2)
    },
    paper: {
      width: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(1)
    }
  })
);

const displaynames: Array<DisplayName> = [
  { id: "1." },
  { id: "2." },
  { id: "3." },
  { id: "4." },
  { id: "5." },
  { id: "6." },
  { id: "7." },
  { id: "8." },
  { id: "9." },
  { id: "10." }
];
const displaynameslist = displaynames.map(displayname => (
  <DisplayName displayname={displayname} />
));

const roomcode = "#1234";

function RoomPageJoin() {
  const classes = useStyles();
  return (
    <>
      <NavBar />
      <div className="title">
        <h1> &emsp;ROOM CODE: &emsp; {roomcode}</h1>
      </div>
      <div className={classes.root}>{displaynameslist}</div>
      <div>
        <button
          type="button"
          className="standard-button red-button fixed-button"
          disabled
          style={{ opacity: 0.5 }}
        >
          START
        </button>
        <canvas className="space" width="1000" height="20"></canvas>
      </div>
    </>
  );
}
export default RoomPageJoin;
