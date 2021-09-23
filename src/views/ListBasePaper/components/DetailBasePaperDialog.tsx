import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect } from 'react';
import useGetBasePaper from '../../../hooks/query/get-base-paper';

interface DeleteBasePaperDialogProps {
  basePaperID: number;
  open: boolean;
  onClose: () => void;
}

const DeleteBasePaperDialog = ({ basePaperID, open, onClose }: DeleteBasePaperDialogProps) => {
  const { data: basePaper } = useGetBasePaper(basePaperID);

  useEffect(() => {
    console.log(basePaper);
  }, [basePaper]);

  return (
    <Dialog open={open} onBackdropClick={onClose}>
      <DialogTitle>Delete Base</DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>GSM/Width</TableCell>
              <TableCell>I/O</TableCell>
              <TableCell>No. Material</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{basePaper?.id}</TableCell>
              <TableCell>
                {basePaper?.gsm} / {basePaper?.width}
              </TableCell>
              <TableCell>{basePaper?.io}</TableCell>
              <TableCell>{basePaper?.materialNumber}</TableCell>
              <TableCell>{basePaper?.quantity}</TableCell>
              <TableCell>{basePaper?.location}</TableCell>
              <TableCell>{basePaper?.updatedAt}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBasePaperDialog;
