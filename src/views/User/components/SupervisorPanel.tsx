import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import EditIcon from '@material-ui/icons/Edit';
import { useSnackbar } from 'notistack';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import useDeleteStorage from '../../../hooks/query/delete-storage';
import useGetStorages from '../../../hooks/query/get-storages';
import trunc from '../../../services/truncate';
import { isWebApiError } from '../../../services/web-api';
import NewStorage from './NewStorage';
interface SupervisorPanelProps {
  index: number;
  value: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2)
    },
    listItem: {
      ...theme.overrides?.MuiListItem,
      color: theme.palette.text.primary
    },
    listContainer: {
      marginTop: theme.spacing(2)
    },
    listItemSecondaryAction: {
      display: 'none',
      ':hover > &': {
        display: 'block'
      }
    }
  })
);

function SupervisorPanel({ index, value }: SupervisorPanelProps) {
  const classes = useStyles();
  const deleteStorage = useDeleteStorage();
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useGetStorages();

  const handleDeleteStorage = (storageID: number) => () => {
    deleteStorage.mutate(storageID, {
      onError: (error) => {
        if (!(isWebApiError(error) && error.response)) return;
        enqueueSnackbar(error);
      }
    });
  };

  return (
    <div hidden={index !== value} className={classes.root}>
      <NewStorage />
      <div className={classes.listContainer}>
        {data?.length ? (
          <List>
            {data?.map((storage) => (
              <Fragment key={storage.id}>
                <ListItem className={classes.listItem} component={Link} to={`/storage/${storage.id}`}>
                  <ListItemText primary={storage.name} secondary={trunc(storage.description, 100, '...')} />
                  <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="primary" onClick={handleDeleteStorage(storage.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </Fragment>
            ))}
          </List>
        ) : (
          <Typography variant="subtitle1" align="center">
            --Kosong---
          </Typography>
        )}
      </div>
    </div>
  );
}

export default SupervisorPanel;
