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
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useGetStorageMembers from '../../../hooks/query/get-storage-members-by-memberID';
import { useGetUser } from '../../../hooks/query/get-user';
import { isWebApiError } from '../../../services/web-api';

interface MemberPanelProps {
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

function MemberPanel({ index, value }: MemberPanelProps) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const user = useGetUser();
  const storMemb = useGetStorageMembers(user.data?.id as number, index === value);

  useEffect(() => {
    const error = storMemb.error;
    if (!(isWebApiError(error) && error.response)) return;
    for (let err of error.response.data.error.messages) {
      enqueueSnackbar(err, {
        variant: 'error',
        preventDuplicate: true,
        autoHideDuration: 2000
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storMemb.error, storMemb.error]);

  return (
    <div hidden={index !== value} className={classes.root}>
      <div className={classes.listContainer}>
        {storMemb.data?.length ? (
          <List>
            {storMemb.data?.map((sm) => (
              <Fragment key={sm.id}>
                <ListItem
                  disabled={!sm.isActive}
                  className={classes.listItem}
                  component={Link}
                  to={sm.isActive ? `/storage/${sm.storage.id}` : '#'}
                >
                  <ListItemText primary={sm.storage.name} />
                  <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="primary">
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

export default MemberPanel;
