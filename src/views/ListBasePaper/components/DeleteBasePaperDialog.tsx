import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSnackbar } from 'notistack';
import React from 'react';
import useDeleteBasePaper from '../../../hooks/query/delete-base-paper';
import useGetBasePaper from '../../../hooks/query/get-base-paper';
import theme from '../../../services/theme';
import { isWebApiError } from '../../../services/web-api';

interface DeleteBasePaperDialogProps {
  basePaperID: number;
  open: boolean;
  onClose: () => void;
}

const DeleteBasePaperDialog = ({ basePaperID, open, onClose }: DeleteBasePaperDialogProps) => {
  const { data: basePaper } = useGetBasePaper(basePaperID, open);
  const deleteBasePaper = useDeleteBasePaper();
  const { enqueueSnackbar } = useSnackbar();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDelete = () => {
    deleteBasePaper.mutate(basePaperID, {
      onError: (error) => {
        if (!(isWebApiError(error) && error.response)) return;
        for (const err of error.response.data.error.messages) {
          enqueueSnackbar(err, { autoHideDuration: 2000 });
        }
      },
      onSuccess: () => {
        enqueueSnackbar('Base paper dihapus');
        onClose();
      }
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      fullScreen={fullScreen}
      fullWidth
      open={open}
      onBackdropClick={onClose}
      disableBackdropClick={deleteBasePaper.isLoading}
    >
      <DialogTitle>Delete Base Paper</DialogTitle>
      <DialogContent>
        <DialogContentText>Aoakah anda yakin menghapus ini?</DialogContentText>
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
              <TableCell variant="head">Quantity</TableCell>
              <TableCell>{basePaper?.quantity}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Lokasi</TableCell>
              <TableCell>{basePaper?.location}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button disabled={deleteBasePaper.isLoading} onClick={onClose} color="primary">
          BATAL
        </Button>
        <Button disabled={deleteBasePaper.isError || deleteBasePaper.isLoading} onClick={handleDelete} color="primary" autoFocus>
          KONFIRMASI
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBasePaperDialog;
