import React from 'react';
import ActionToolBar from './components/ActionsToolBar';
import Table from './components/Table';
import useStyles from './styles';

function History() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ActionToolBar />
      <Table />
    </div>
  );
}

export default History;
