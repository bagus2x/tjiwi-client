import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useSignUp } from '../../hooks/query/sign-up';
import { isAuthenticated } from '../../services/storage';
import MuiLink from '@material-ui/core/Link';
import { isWebApiError } from '../../services/web-api';
import useStyles from './styles';
import validation from './validation';

interface FormField {
  username: string;
  email: string;
  password: string;
}

function SignUp() {
  const classes = useStyles();
  const [pwdVisiblity, setPwdVisibility] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormField>();
  const signUp = useSignUp();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handlePasswordVisiblityChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setPwdVisibility(ev.target.checked);
  };

  const handleSignUp = handleSubmit((data) => {
    signUp.mutate(data, {
      onError: (error, _req, _ctx) => {
        if (!(isWebApiError(error) && error.response)) return;
        for (let errMessage of error.response.data.error.messages) {
          if (errMessage.includes('Username')) {
            setError('username', { message: 'Nama pengguna sudah dipakai' });
            continue;
          }
          if (errMessage.includes('Email')) {
            setError('email', { message: 'Email sudah dipakai' });
          }
        }
      },
      onSuccess: () => {
        enqueueSnackbar('Akun telah berhasil dibuat', {
          variant: 'success',
          preventDuplicate: true,
          autoHideDuration: 3000
        });
        history.replace('/user');
      }
    });
  });

  if (isAuthenticated()) {
    history.replace('/user');
  }

  return (
    <div className={classes.root}>
      <Container className={classes.signInOption}>
        <MuiLink color="secondary" component={Link} to="/signin">
          Sudah punya akun?
        </MuiLink>
      </Container>
      <Container component="form" maxWidth="xs" className={classes.formContainer} onSubmit={handleSignUp}>
        <Typography variant="h5">Buat Akun</Typography>
        <TextField
          label="Nama pengguna"
          autoComplete="off"
          error={!!errors.username}
          helperText={errors.username?.message || ' '}
          {...register('username', validation.username)}
        />
        <TextField
          label="Email"
          autoComplete="off"
          error={!!errors.email}
          helperText={errors.email?.message || ' '}
          {...register('email', validation.email)}
        />
        <TextField
          type={pwdVisiblity ? 'text' : 'password'}
          label="Password"
          error={!!errors.password}
          helperText={errors.password?.message || ' '}
          {...register('password', validation.password)}
        />
        <FormControlLabel
          control={<Checkbox color="primary" onChange={handlePasswordVisiblityChange} value={pwdVisiblity} />}
          label="Tampilkan kata sandi"
        />
        <Button type="submit" variant="contained" color="secondary">
          DAFTAR
        </Button>
      </Container>
    </div>
  );
}

export default SignUp;
