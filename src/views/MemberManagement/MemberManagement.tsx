import React from 'react';
import MemberList from './components/MemberList';
import NewMember from './components/NewMember';
import useStyles from './styles';

function MemberManagement() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NewMember />
      <MemberList />
    </div>
  );
}

export default MemberManagement;
