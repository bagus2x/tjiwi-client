import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import useStyles from './confirm-dialog-styles';

interface ConfirmDialogProps {
  open: boolean;
  basePaper: {
    gsm: number;
    width: number;
    io: number;
    materialNumber: number;
    quantity: number;
  } | null;
  onCancel: () => void;
  onSave: () => void;
}

function ConfirmDialog({ basePaper, open, onCancel, onSave }: ConfirmDialogProps) {
  const classes = useStyles();

  const handleClose = () => {
    onCancel();
  };

  return (
    <Dialog open={open} onBackdropClick={handleClose}>
      <DialogTitle>Konfirmasi Material</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell variant="head">GSM / Ukuran</TableCell>
              <TableCell>{`${basePaper?.gsm} / ${basePaper?.width}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">No. Material</TableCell>
              <TableCell>{basePaper?.io}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">I / O</TableCell>
              <TableCell>{`${basePaper?.materialNumber}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Kuantitas</TableCell>
              <TableCell>{basePaper?.quantity}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          BATAL
        </Button>
        <Button type="submit" color="primary" onClick={onSave}>
          SIMPAN
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
