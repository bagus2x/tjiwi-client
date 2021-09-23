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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextFieldNumberRHF as TextFieldNumber } from '../../../component/TextFieldNumber/TextFieldNumber';
import useDeliverBasePaper from '../../../hooks/query/deliver-base-paper';
import useGetBasePaper from '../../../hooks/query/get-base-paper';
import { isWebApiError } from '../../../services/web-api';

interface MoveToListProps {
  basePaperID: number;
  open: boolean;
  onClose: () => void;
}

interface FormField {
  quantity: string;
}

function MoveToList({ basePaperID, open, onClose }: MoveToListProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: basePaper } = useGetBasePaper(basePaperID, open);
  const deliverBasePaper = useDeliverBasePaper();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormField>();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    onClose();
    reset();
  };

  const handleMove = handleSubmit((data) => {
    if (basePaper)
      deliverBasePaper.mutate(
        { basePaperID: basePaper.id, quantity: parseInt(data.quantity) },
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
      keepMounted
    >
      <form onSubmit={handleMove}>
        <DialogTitle id="move-to-penyimpanan">Kirim</DialogTitle>
        <DialogContent>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell variant="head">ID</TableCell>
                <TableCell>{basePaper?.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">GSM/Ukuran</TableCell>
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
                <TableCell variant="head">Kuantitas</TableCell>
                <TableCell>{basePaper?.quantity}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Ukuran</TableCell>
                <TableCell>{basePaper?.location}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogContent>
          <TextFieldNumber
            name="quantity"
            label="Kuantitas"
            fullWidth
            error={!!errors.quantity}
            helperText={errors.quantity?.message || ' '}
            InputLabelProps={{ shrink: true }}
            control={control}
            rules={{
              required: 'This field is required',
              validate: (value) => basePaper!!.quantity - parseInt(value) >= 0 || 'Kuantitas melebihi batas'
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            BATAL
          </Button>
          <Button type="submit" color="primary" autoFocus>
            KONFIRMASI
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default MoveToList;
