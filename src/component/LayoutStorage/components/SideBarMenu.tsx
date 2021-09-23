import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React, { Fragment, MouseEventHandler, ReactNode } from 'react';
import useStyles from './sidebar-menu-styles';

interface SideBarMenuProps {
  selected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  icon: ReactNode;
  text: string;
  visible: boolean;
}

const SideBarMenu = ({ selected, onClick, icon, text, visible }: SideBarMenuProps) => {
  const classes = useStyles();

  return (
    <>
      {visible && (
        <ListItem button classes={{ selected: classes.selected }} selected={selected} onClick={onClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      )}
    </>
  );
};

export default SideBarMenu;
