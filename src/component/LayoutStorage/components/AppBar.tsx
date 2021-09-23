import useMediaQuery from '@material-ui/core/useMediaQuery';
import MuiAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import useStyles from './appbar-styles';
import Searchbar from './SearchBar';
import UserMenu from './UserMenu';

interface AppBarProps {
  shift: boolean;
  onToggleClick: () => void;
}

function AppBar({ shift, onToggleClick }: AppBarProps) {
  const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const classes = useStyles({ toolbarHeight: isMdUp ? 64 : 48 });

  return (
    <MuiAppBar
      color="inherit"
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: shift && isMdUp
      })}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton color="primary" onClick={onToggleClick} edge="start">
          <MenuIcon />
        </IconButton>
        <Searchbar />
        <UserMenu />
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
