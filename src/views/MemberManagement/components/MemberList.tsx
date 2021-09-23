import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import PersonIcon from '@material-ui/icons/PersonRounded';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Del from '../../../component/Del/Del';
import useDeleteStorageMember from '../../../hooks/query/delete-storage-member';
import useGetStorageMembers from '../../../hooks/query/get-storage-members-by-storageID';
import useUpdateStorageMember from '../../../hooks/query/update-storage-member';
import { isWebApiError } from '../../../services/web-api';

interface StorageMember {
  id: number;
  isActive: boolean;
  isAdmin: boolean;
}

function MemberList() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { storageID } = useParams<{ storageID: string }>();
  const { data: storageMembers, isSuccess } = useGetStorageMembers(parseInt(storageID));
  const [currentStorMemb, setCurrentMembState] = useState<StorageMember | null>(null);
  const deleteStorMemb = useDeleteStorageMember();
  const updateStorMemb = useUpdateStorageMember();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenOptionsMenu = (storMemb: StorageMember) => (ev: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(ev.currentTarget);
    setCurrentMembState(storMemb);
  };

  const handleCloseOptionsMenu = () => {
    setAnchorEl(null);
    setCurrentMembState(null);
  };

  const handleDeleteStormMemb = () => {
    handleCloseOptionsMenu();
    deleteStorMemb.mutate(currentStorMemb?.id as number, {
      onSuccess: () => {
        enqueueSnackbar('Anggota dihapus');
      },
      onError: (error) => {
        if (!(isWebApiError(error) && error.response)) return;
        for (let err of error.response.data.error.messages) {
          enqueueSnackbar(err, { variant: 'error' });
        }
      }
    });
  };

  const handleUpdateStorMemb = (field: 'IS_ACTIVE' | 'IS_ADMIN') => () => {
    if (!currentStorMemb) return;
    handleCloseOptionsMenu();
    updateStorMemb.mutate(
      field === 'IS_ACTIVE'
        ? { ...currentStorMemb, isActive: !currentStorMemb.isActive }
        : { ...currentStorMemb, isAdmin: !currentStorMemb.isAdmin },
      {
        onError: (error) => {
          if (!(isWebApiError(error) && error.response)) return;
          for (let err of error.response.data.error.messages) {
            enqueueSnackbar(err, { variant: 'error' });
          }
        }
      }
    );
  };

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h5">Anggota</Typography>
        {isSuccess && (
          <List dense>
            {storageMembers?.map((storMemb) => (
              <ListItem key={storMemb.member.id}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Del isDeleted={!storMemb.isActive}>{storMemb.member.username}</Del>}
                  secondary={storMemb.isAdmin ? 'Admin' : ''}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="more-vert" onClick={handleOpenOptionsMenu(storMemb)}>
                    <MoreVertRoundedIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
        {currentStorMemb && (
          <Menu id="option-user" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={handleCloseOptionsMenu}>
            <MenuItem onClick={handleUpdateStorMemb('IS_ADMIN')}>
              {currentStorMemb?.isAdmin ? 'Hapus admin' : 'Jadikan admin'}
            </MenuItem>
            <MenuItem onClick={handleUpdateStorMemb('IS_ACTIVE')}>
              {currentStorMemb?.isActive ? 'Nonaktifkan' : 'Aktifkan'}
            </MenuItem>
            <MenuItem onClick={handleDeleteStormMemb}>Hapus</MenuItem>
          </Menu>
        )}
      </Container>
    </div>
  );
}

export default MemberList;
