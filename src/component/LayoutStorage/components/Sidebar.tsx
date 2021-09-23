import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HistoryIcon from '@material-ui/icons/HistoryRounded';
import PenerimaanIcon from '@material-ui/icons/NoteAddRounded';
import MemberIcon from '@material-ui/icons/PeopleRounded';
import ListIcon from '@material-ui/icons/PlaylistAddCheckRounded';
import DeliveryIcon from '@material-ui/icons/SendRounded';
import BufferAreaIcon from '@material-ui/icons/StorageRounded';
import React, { useMemo } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import use100vh from '../../../hooks/100vh';
import useGetStorage from '../../../hooks/query/get-storage';
import useGetStorageMember from '../../../hooks/query/get-storage-members-by-id';
import useSupervisor from '../../../hooks/query/supervisor';
import { getStorageMemberID } from '../../../services/storage';
import path from '../../../views/path';
import { TOOLBAR_HEIGHT_LG, TOOLBAR_HEIGHT_SM } from '../constants';
import useStyles from './sidebar-styles';
import SideBarMenu from './SideBarMenu';

interface SideBarProps {
  onDrawerClose: () => void;
  open: boolean;
}

const route = (storageID: number) => {
  return {
    manageMember: path.memberManagement.replace(':storageID', storageID.toString()),
    history: path.history.replace(':storageID', storageID.toString()),
    penerimaan: path.penerimaan.replace(':storageID', storageID.toString()),
    bufferArea: path.bufferArea.replace(':storageID', storageID.toString()),
    list: path.list.replace(':storageID', storageID.toString()),
    delivery: path.delivery.replace(':storageID', storageID.toString())
  };
};

function Sidebar({ onDrawerClose, open }: SideBarProps) {
  const screenHeight = use100vh();
  const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const classes = useStyles({ screenHeight, toolbarHeight: isMdUp ? TOOLBAR_HEIGHT_LG : TOOLBAR_HEIGHT_SM });
  const { storageID } = useParams<{ storageID: string }>();
  const history = useHistory();
  const loc = useLocation();
  const path = useMemo(() => route(parseInt(storageID)), [storageID]);
  const storage = useGetStorage(parseInt(storageID));
  const storMemb = useGetStorageMember(getStorageMemberID(parseInt(storageID)) as number);
  const supervisor = useSupervisor();

  const container = window !== undefined ? () => window.document.body : undefined;

  const navigateTo = (dest: string) => () => {
    if (!isMdUp) onDrawerClose();
    history.push(dest);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      keepMounted
      disableEnforceFocus
      hideBackdrop={isMdUp}
      onBackdropClick={onDrawerClose}
      container={container}
      anchor="left"
      open={open}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerHeader}>
        <Hidden mdUp>
          <IconButton color="primary" onClick={onDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Hidden>
      </div>
      <Divider />
      {storage.isSuccess && storMemb.isSuccess && (
        <>
          <List>
            <ListItem button onClick={navigateTo(`/storage/${storage?.data?.id}`)}>
              <ListItemText primary={storage?.data?.name.toUpperCase()} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <SideBarMenu
              icon={<MemberIcon />}
              text="Kelola Anggota"
              visible={!supervisor.isLoading && supervisor.isSuccess && supervisor.isSupervisor}
              selected={loc.pathname === path.manageMember}
              onClick={navigateTo(path.manageMember)}
            />
            <SideBarMenu
              icon={<HistoryIcon />}
              text="Riwayat"
              visible={!storMemb.isLoading && storMemb.isSuccess && storMemb.data.isActive}
              selected={loc.pathname === path.history}
              onClick={navigateTo(path.history)}
            />
            <SideBarMenu
              icon={<PenerimaanIcon />}
              text="Penerimaan"
              visible={!storMemb.isLoading && storMemb.isSuccess && storMemb.data.isActive}
              selected={loc.pathname === path.penerimaan}
              onClick={navigateTo(path.penerimaan)}
            />
            <SideBarMenu
              icon={<BufferAreaIcon />}
              text="Buffer Area"
              visible={!storMemb.isLoading && storMemb.isSuccess && storMemb.data.isActive}
              selected={loc.pathname === path.bufferArea}
              onClick={navigateTo(path.bufferArea)}
            />
            <SideBarMenu
              icon={<ListIcon />}
              text="Penyimpanan"
              visible={!storMemb.isLoading && storMemb.isSuccess && storMemb.data.isActive && storMemb.data.isAdmin}
              selected={loc.pathname === path.list}
              onClick={navigateTo(path.list)}
            />
            <SideBarMenu
              icon={<DeliveryIcon />}
              text="Pengiriman"
              visible={!storMemb.isLoading && storMemb.isSuccess && storMemb.data.isActive}
              selected={loc.pathname === path.delivery}
              onClick={navigateTo(path.delivery)}
            />
          </List>
        </>
      )}
    </Drawer>
  );
}

export default Sidebar;
