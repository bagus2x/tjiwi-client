import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {TextFieldNumberRHF as TextFieldNumber} from '../../../component/TextFieldNumber/TextFieldNumber';
import useGetBasePaper from '../../../hooks/query/get-base-paper';
import useMoveToBufferArea from '../../../hooks/query/move-to-list';
import { isWebApiError } from '../../../services/web-api';

interface MoveToListProps {
  basePaperID: number;
  open: boolean;
  onClose: () => void;
}

interface FormField {
  quantity: string;
  location: string;
}

function MoveToList({ basePaperID, open, onClose }: MoveToListProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: basePaper, error, isLoading, isError } = useGetBasePaper(basePaperID, open);
  const moveToBufferArea = useMoveToBufferArea();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors }
  } = useForm<FormField>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!(isWebApiError(error) && error.response)) return;
    for (const err of error.response.data.error.messages) {
      enqueueSnackbar(err, { variant: 'error', preventDuplicate: true });
    }
  }, [enqueueSnackbar, error]);

  const handleClose = () => {
    onClose();
    reset();
  };

  const handleMove = handleSubmit((data) => {
    if (basePaper)
      moveToBufferArea.mutate(
        {
          basePaperID: basePaper.id,
          location: data.location,
          quantity: parseInt(data.quantity)
        },
        {
          onError: (error) => {
            if (!(isWebApiError(error) && error.response)) return;
            for (const err of error.response.data.error.messages) {
              enqueueSnackbar(err, { variant: 'error', preventDuplicate: true });
            }
          },
          onSuccess: () => {
            handleClose();
          }
        }
      );
  });

  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="move-to-list"
    >
      <form onSubmit={handleMove}>
        <DialogTitle id="move-to-penyimpanan">Move to List</DialogTitle>
        <DialogContent>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell variant="head">ID</TableCell>
                <TableCell>{basePaper?.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">GSM/Width</TableCell>
                <TableCell>
                  {basePaper?.gsm} / {basePaper?.width}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">I/O</TableCell>
                <TableCell>{basePaper?.io}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">No. Material</TableCell>
                <TableCell>{basePaper?.materialNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Quantity</TableCell>
                <TableCell>{basePaper?.quantity}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogContent>
          <TextField
            label="Lokasi"
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.location}
            helperText={errors.location?.message || ' '}
            {...register('location', { required: 'This field is required' })}
          />
          <TextFieldNumber
            name="quantity"
            label="Kuantitas"
            fullWidth
            error={!!errors.quantity}
            helperText={errors.quantity?.message || ' '}
            InputLabelProps={{ shrink: true }}
            type="telp"
            control={control}
            rules={{
              required: 'This field is required',
              validate: (value) => basePaper!!.quantity - parseInt(value) >= 0 || 'Quantity exceeds the limit'
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={isLoading || moveToBufferArea.isLoading} onClick={handleClose} color="primary">
            CANCEL
          </Button>
          <Button disabled={isLoading || isError || moveToBufferArea.isLoading} type="submit" color="primary" autoFocus>
            SAVE
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default MoveToList;
