import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { ChangeEvent, useState } from 'react';
import MemberPanel from './components/MemberPanel';
import ProfileHeader from './components/ProfileHeader';
import SupervisorPanel from './components/SupervisorPanel';
import useStyles from './styles';

function User() {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_ev: ChangeEvent<{}>, newTabValue: number) => {
    setTabValue(newTabValue);
  };

  return (
    <div className={classes.root}>
      <ProfileHeader />
      <Container
        textColor="secondary"
        component={Tabs}
        maxWidth="sm"
        variant="fullWidth"
        onChange={handleTabChange}
        value={tabValue}
      >
        <Tab label="Supervisor" />
        <Tab label="Anggota" />
      </Container>
      <Container maxWidth="md">
        <SupervisorPanel index={0} value={tabValue} />
        <MemberPanel index={1} value={tabValue} />
      </Container>
    </div>
  );
}

export default User;
