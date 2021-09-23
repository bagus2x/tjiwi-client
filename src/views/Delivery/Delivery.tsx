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
import SendIcon from '@material-ui/icons/SendRounded';
import { useSnackbar } from 'notistack';
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import useSearchBasePaperList from '../../hooks/query/search-base-paper-list';
import { isWebApiError } from '../../services/web-api';
import SendBasePaperDialog from './components/SendPaperDialog';
import useStyles from './styles';
import columns from './table-colums';

function Delivery() {
  const classes = useStyles();
  const [basePaperID, setBasePaperID] = useState(-1);
  const {
    data: basePapersPage,
    error,
    isLoading,
    isError,
    isFetching,
    refetch,
    fetchNextPage
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

  const handleOpenDialog = (id: number) => () => {
    setBasePaperID(id);
  };

  const handelCloseDialog = () => {
    setBasePaperID(-1);
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
                      <IconButton
                        disabled={basePaper.quantity === 0}
                        size="small"
                        color="primary"
                        onClick={handleOpenDialog(basePaper.id)}
                      >
                        <SendIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      <SendBasePaperDialog basePaperID={basePaperID} open={basePaperID > 0} onClose={handelCloseDialog} />
    </Paper>
  );
}

export default Delivery;
