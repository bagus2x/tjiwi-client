import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';

function ProgressBar() {
  return (
    <LinearProgress
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100vw',
        zIndex: 9999
      }}
      color="secondary"
    />
  );
}

export default ProgressBar;
