import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Theme, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useAddStorageMember from '../../../hooks/query/add-storage-member';
import useGetStorageMembers from '../../../hooks/query/get-storage-members-by-storageID';
import useSearchUsernames from '../../../hooks/query/search-username';
import { isWebApiError } from '../../../services/web-api';

interface FormField {
  memberID: number;
  isActive: boolean;
  isAdmin: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  })
);

function NewMember() {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: usernames, handleUsernameChange } = useSearchUsernames();
  const { storageID } = useParams<{ storageID: string }>();
  const { data: stormembs } = useGetStorageMembers(parseInt(storageID));
  const newMember = useAddStorageMember();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormField>({
    defaultValues: {
      isActive: true,
      isAdmin: false
    }
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    reset();
  };

  const handleAddNewMember = handleSubmit((data) => {
    if (stormembs?.find((stormemb) => stormemb.member.id === data.memberID)) {
      enqueueSnackbar(`Anggota telah ditambahkan`);
      return;
    }
    newMember.mutate(
      { ...data, storageID: parseInt(storageID) },
      {
        onSuccess: () => {
          enqueueSnackbar('Anggota telah berhasil ditambahkan');
          handleCloseDialog();
        },
        onError: (error) => {
          if (!(isWebApiError(error) && error.response)) return;
          for (let err of error.response.data.error.messages) {
            enqueueSnackbar(err, {
              variant: 'error'
            });
          }
        }
      }
    );
  });

  return (
    <Container maxWidth="md" className={classes.header}>
      <Button color="secondary" variant="contained" size="small" disableElevation onClick={handleOpenDialog}>
        TAMBAH
      </Button>
      <Dialog open={openDialog} onBackdropClick={handleCloseDialog} maxWidth="xs" fullWidth fullScreen={fullScreen}>
        <form onSubmit={handleAddNewMember}>
          <DialogTitle>Tambah Anggota Baru</DialogTitle>
          <DialogContent>
            <Controller
              name="memberID"
              control={control}
              rules={{ required: 'Penguna tidak ditemukan' }}
              render={(props) => (
                <Autocomplete
                  freeSolo
                  options={usernames}
                  autoComplete
                  getOptionLabel={(option) => option.username}
                  filterOptions={(options, _state) => options}
                  onInputChange={handleUsernameChange}
                  onChange={(_, data: any) => (!!data ? props.field.onChange(data.id) : props.field.onChange(null))}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nama pengguna"
                      error={!!errors.memberID}
                      helperText={errors.memberID?.message || ' '}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="isAdmin"
              control={control}
              defaultValue={false}
              render={({ field }) => <FormControlLabel control={<Checkbox {...field} />} label="Admin" />}
            />
            <Controller
              name="isActive"
              control={control}
              defaultValue={true}
              render={({ field }) => (
                <FormControlLabel control={<Checkbox {...field} defaultChecked />} label="Active" />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              BATAL
            </Button>
            <Button type="submit" color="primary" disabled={newMember.isLoading}>
              TAMBAH
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}

export default NewMember;
