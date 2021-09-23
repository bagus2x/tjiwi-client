import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import useStyles from './styles';

function UserSettings() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h5">Umum</Typography>
      </Container>
      <Container>
        <Typography variant="h5">Akun</Typography>
      </Container>
    </div>
  );
}

export default UserSettings;
