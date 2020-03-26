import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "../css/DisplayName.css";

interface DisplayNameProps {
  displayname: DisplayName;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "hidden",
      padding: theme.spacing(0, 2)
    },
    paper: {
      width: 350,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
      height: 12
    }
  })
);

export const DisplayName: React.FunctionComponent<DisplayNameProps> = ({
  displayname
}) => {
  const classes = useStyles();
  return (
    <div className="display">
      <Paper className={classes.paper}>
        <span>
          {displayname.id}
          <Grid container wrap="nowrap" spacing={10}>
            <Grid item> </Grid>
            <Grid item xs zeroMinWidth>
              <Typography noWrap></Typography>
            </Grid>
          </Grid>
        </span>
      </Paper>
    </div>
  );
};
