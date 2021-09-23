import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useCreateStorage from '../../../hooks/query/create-storage';
import useGetStorageMembers from '../../../hooks/query/get-storage-members-by-memberID';
import { useGetUser } from '../../../hooks/query/get-user';
import sleep from '../../../services/sleep';
import { isWebApiError } from '../../../services/web-api';

interface NewStorageField {
  name: string;
  description: string;
}

function NewStorage() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [openDialog, setOpenDialog] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<NewStorageField>();
  const createStorage = useCreateStorage();
  const { enqueueSnackbar } = useSnackbar();
  const user = useGetUser();
  const storMemb = useGetStorageMembers(user.data?.id as number, true);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    reset();
    setOpenDialog(false);
  };

  const handleSave = handleSubmit((data) => {
    createStorage.mutate(data, {
      onSuccess: () => {
        handleCloseDialog();
        storMemb.refetch();
      },
      onError: async (error: any) => {
        if (isWebApiError(error) && error.response) {
          for (let err of error.response?.data.error.messages) {
            enqueueSnackbar(err, { variant: 'error' });
            await sleep(500);
          }
        }
      }
    });
  });

  return (
    <>
      <Button variant="contained" size="small" color="primary" disableElevation onClick={handleOpenDialog}>
        TAMBAH
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullScreen={fullScreen} keepMounted>
        <DialogTitle>Tambah Gudang</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSave}>
            <TextField
              size="small"
              label="Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message || ' '}
              {...register('name', {
                required: 'Field ini wajib diisi',
                minLength: {
                  value: 5,
                  message: 'Panjang minimum 5 karakter'
                },
                maxLength: {
                  value: 50,
                  message: 'Panjang maximum 50 karakter'
                }
              })}
            />
            <TextField
              size="small"
              label="Deskripsi"
              fullWidth
              multiline
              error={!!errors.description}
              helperText={errors.description?.message || ' '}
              {...register('description', {
                maxLength: {
                  value: 500,
                  message: 'Panjang maximum 500 karakter'
                }
              })}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleCloseDialog} disabled={createStorage.isLoading}>
            BATAL
          </Button>
          <Button color="primary" onClick={handleSave} disabled={createStorage.isLoading}>
            SIMPAN
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NewStorage;
