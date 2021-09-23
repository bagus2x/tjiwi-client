import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import DeleteBasePaperDialog from './DeleteBasePaperDialog';
import HistoryIcon from '@material-ui/icons/HistoryRounded';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

interface ActionMenuProps {
  basePaperID: number;
  open: boolean;
  anchorEl?: HTMLElement;
  onClose: () => void;
}

const ActionMenu = ({ basePaperID, open, anchorEl, onClose }: ActionMenuProps) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
    onClose();
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <Menu id="list-action-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl && open} onClose={onClose}>
        <MenuItem>
          <ListItemIcon style={{ minWidth: 40 }}>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText>Detil</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleOpenDeleteDialog}>
          <ListItemIcon style={{ minWidth: 40 }}>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Hapus</ListItemText>
        </MenuItem>
      </Menu>
      <DeleteBasePaperDialog basePaperID={basePaperID} onClose={handleCloseDeleteDialog} open={openDeleteDialog} />
    </>
  );
};

export default ActionMenu;
