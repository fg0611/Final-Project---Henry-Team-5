import React from "react";
import { Grid, makeStyles, Avatar, Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

export const CartReview = ({ productUuid }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium reiciendis ducimus itaque inventore quas recusandae,
              quisquam eligendi repudiandae, a tempora mollitia dolorum magnam
              qui sint eius rem facere quis distinctio!
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CartReview;
