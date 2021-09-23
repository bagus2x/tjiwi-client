import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import useStyles from './styles';

interface EditItemPenyimpananDialogProps {
  itemId: number;
  open: boolean;
  onClose: () => void;
}

function EditItemPenyimpananDialog({
  itemId,
  open,
  onClose
}: EditItemPenyimpananDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      keepMounted
      aria-labelledby="edit-data"
    >
      <DialogTitle id="edit-data">Sunting Material</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <form className={classes.form}>
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            autoFocus
            label="Lokasi"
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            label="No. Material"
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            label="I / O"
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            label="Jumlah"
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            label="Lokasi"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Batal
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditItemPenyimpananDialog;
