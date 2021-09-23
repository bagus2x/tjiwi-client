import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVertRounded';
import { useSnackbar } from 'notistack';
import { Fragment, MouseEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import useSearchBasePaperList from '../../hooks/query/search-base-paper-list';
import { isWebApiError } from '../../services/web-api';
import ActionMenu from './components/ActionMenu';
import useStyles from './styles';
import columns from './table-colums';

function BufferArea() {
  const classes = useStyles();
  const [basePaper, setBasePaper] = useState<{ id: number; anchor?: HTMLElement }>({ id: -1 });
  const {
    data: basePapersPage,
    error,
    fetchNextPage,
    refetch,
    isLoading,
    isError,
    isFetching
  } = useSearchBasePaperList();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    if (!(isWebApiError(error) && error.response)) return;
    for (let err of error.response.data.error.messages) {
      enqueueSnackbar(err, {
        variant: 'error'
      });
    }
  }, [basePapersPage, enqueueSnackbar, error]);

  const handleOpenDialog = (id: number) => (ev: MouseEvent<HTMLElement>) => {
    setBasePaper({ id, anchor: ev.currentTarget });
  };

  const handelCloseActionMenu = () => {
    setBasePaper((prev) => ({ id: prev.id }));
  };

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align="left" style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {basePapersPage?.pages.map((page, i) => (
              <Fragment key={i}>
                {page.basePapers.map((basePaper) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={basePaper.id}>
                    <TableCell align="left">
                      {basePaper.gsm} / {basePaper.width}
                    </TableCell>
                    <TableCell align="left">{basePaper.materialNumber}</TableCell>
                    <TableCell align="left">{basePaper.io}</TableCell>
                    <TableCell align="left">{basePaper.quantity}</TableCell>
                    <TableCell align="left" className={classes.action}>
                      {basePaper.location}
                      <IconButton size="small" color="primary" onClick={handleOpenDialog(basePaper.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
        <div className={classes.footer}>
          {isLoading && <Typography className={classes.infoMessage}>Loading...</Typography>}
          {isError && !basePapersPage ? (
            <Typography className={classes.infoMessage}>Tidak ditemukan</Typography>
          ) : (
            <Button
              disabled={isLoading || isFetching}
              className={classes.buttonFetchMore}
              variant="outlined"
              size="small"
              color="primary"
              disableElevation
              onClick={() => fetchNextPage()}
            >
              Muat Lebih Banyak
            </Button>
          )}
        </div>
      </TableContainer>
      <ActionMenu
        open={!!basePaper}
        anchorEl={basePaper?.anchor}
        basePaperID={basePaper.id}
        onClose={handelCloseActionMenu}
      />
    </Paper>
  );
}

export default BufferArea;
