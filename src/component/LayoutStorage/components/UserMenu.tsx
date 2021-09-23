import React, { MouseEvent, useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/PersonRounded';
import { useHistory } from 'react-router-dom';
import { useGetUser } from '../../../hooks/query/get-user';
import { useSignOut } from '../../../hooks/query/sign-out';

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const history = useHistory();
  const { data: userData } = useGetUser();
  const signOut = useSignOut();

  const handleOpen = (ev: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(ev.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateTo = (path: string) => () => {
    handleClose();
    history.push(path);
  };

  const handleSignOut = () => {
    signOut.mutate(undefined, {
      onSettled: () => {
        history.replace(`/signin`);
      }
    });
  };

  return (
    <>
      <IconButton color="primary" edge="end" onClick={handleOpen}>
        <UserIcon />
      </IconButton>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={handleClose}>
        <MenuItem onClick={navigateTo('/user')}>{userData?.username}</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;
