import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiLink from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useSignIn } from '../../hooks/query/sign-in';
import { isAuthenticated } from '../../services/storage';
import { isWebApiError } from '../../services/web-api';
import useStyles from './styles';
import validation from './validation';

interface FormField {
  usernameOrEmail: string;
  password: string;
}

function SignIn() {
  const classes = useStyles();
  const [pwdVisiblity, setPwdVisibility] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormField>();
  const mutation = useSignIn();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  if (isAuthenticated()) {
    history.replace('/user');
  }

  const handlePasswordVisiblityChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setPwdVisibility(ev.target.checked);
  };

  const handleLogin = handleSubmit((data) => {
    mutation.mutate(data, {
      onError: (error: any, _req, _ctx) => {
        if (isWebApiError(error) && error.response) {
          for (let errMessage of error.response.data.error.messages) {
            if (errMessage.includes('not found')) {
              setError('usernameOrEmail', { message: 'Pengguna tidak ditemukan' });
              continue;
            }
            if (errMessage.includes('Password')) {
              setError('password', { message: 'Password tidak cocok' });
            }
          }
          return;
        }
        enqueueSnackbar((error as Error).message, {
          variant: 'error'
        });
      },
      onSuccess: () => {
        history.replace('/user');
      }
    });
  });

  return (
    <div className={classes.root}>
      <Container className={classes.signUpOption}>
        <MuiLink color="secondary" component={Link} to="/signup">
          Belum punya akun?
        </MuiLink>
      </Container>
      <Container component="form" maxWidth="xs" className={classes.formContainer} onSubmit={handleLogin}>
        <Typography variant="h5">Masuk ke Akun Anda</Typography>
        <TextField
          label="Nama pengguna"
          error={!!errors.usernameOrEmail}
          helperText={errors.usernameOrEmail?.message || ' '}
          {...register('usernameOrEmail', validation.usernameOrEmail)}
        />
        <TextField
          type={pwdVisiblity ? 'text' : 'password'}
          label="Kata sandi"
          error={!!errors.password}
          helperText={errors.password?.message || ' '}
          {...register('password', validation.password)}
        />
        <FormControlLabel
          control={<Checkbox color="primary" onChange={handlePasswordVisiblityChange} value={pwdVisiblity} />}
          label="Tampilkan kata sandi"
        />
        <Button type="submit" variant="contained" color="secondary">
          MASUK
        </Button>
      </Container>
    </div>
  );
}

export default SignIn;
