import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetUser } from '../../../hooks/query/get-user';
import { useSignOut } from '../../../hooks/query/sign-out';
import path from '../../path';
import useStyles from './profile-header-styles';

function ProfileHeader() {
  const classes = useStyles();
  const { data, isLoading } = useGetUser();
  const signOut = useSignOut();

  const handleSignOut = () => {
    signOut.mutate();
  };

  return (
    <Container maxWidth="md" component="header" className={classes.header}>
      <Avatar className={classes.avatar} />
      <div className={classes.userInfo}>
        <Typography variant="h6">{isLoading ? 'Loading...' : data?.username}</Typography>
        <Typography variant="subtitle2">{isLoading ? '...' : data?.email}</Typography>
        <span className={classes.headerAction}>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            disableElevation
            startIcon={<SettingsIcon />}
            component={Link}
            to={path.userSettings}
          >
            Pengaturan
          </Button>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            disableElevation
            startIcon={<SignOutIcon />}
            onClick={handleSignOut}
            disabled={signOut.isLoading}
          >
            Keluar
          </Button>
        </span>
      </div>
    </Container>
  );
}

export default ProfileHeader;
