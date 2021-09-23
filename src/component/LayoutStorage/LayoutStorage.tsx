import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import use100vh from '../../hooks/100vh';
import AppBar from './components/AppBar';
import Sidebar from './components/Sidebar';
import { TOOLBAR_HEIGHT_LG, TOOLBAR_HEIGHT_SM } from './constants';
import useStyles from './styles';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [openDrawerAndShift, setOpenDrawerAndShift] = useState(false);
  const screenHeight = use100vh();
  const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const classes = useStyles({ screenHeight, toolbarHeight: isMdUp ? TOOLBAR_HEIGHT_LG : TOOLBAR_HEIGHT_SM });
  
  useEffect(() => {
    if (isMdUp) setOpenDrawerAndShift(true);
  }, [isMdUp]);

  const handleOpenDrawer = () => {
    setOpenDrawerAndShift(!openDrawerAndShift);
  };

  const handleDrawerClose = () => {
    setOpenDrawerAndShift(false);
  };

  return (
    <div className={classes.root}>
      <AppBar onToggleClick={handleOpenDrawer} shift={openDrawerAndShift} />
      <Sidebar onDrawerClose={handleDrawerClose} open={openDrawerAndShift} />
      <main className={clsx(classes.content, { [classes.contentShift]: openDrawerAndShift && isMdUp })}>
        {children}
      </main>
    </div>
  );
}

export default Layout;
