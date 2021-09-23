import React from 'react';
import Container from '@material-ui/core/Container';
import FilterStatus from './FilterStatus';
import ExportXLSX from './ExportXLSX';
import PrintTable from './PrintTable';
import FilterDate from './FilterDate';
import useStyles from './actions-toolbar-styles';

function ActionToolBar() {
  const classes = useStyles();
	
  return (
    <Container maxWidth="xl" className={classes.actionContainer}>
      <FilterStatus />
      <FilterDate />
      <ExportXLSX />
      <PrintTable />
    </Container>
  );
}

export default ActionToolBar;
