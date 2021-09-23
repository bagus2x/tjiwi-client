import React from 'react';
import MuiBackdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './backdrop-styles';

function Backdrop() {
  const classes = useStyles();
  return (
    <MuiBackdrop className={classes.backdrop} open>
      <CircularProgress color="inherit" />
    </MuiBackdrop>
  );
}

export default Backdrop;
