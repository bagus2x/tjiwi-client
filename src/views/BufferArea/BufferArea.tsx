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
import DoubleArrowRoundedIcon from '@material-ui/icons/DoubleArrowRounded';
import { useSnackbar } from 'notistack';
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useDebouncedCallback } from 'use-debounce/lib';
import useSearchBasePaperBufferArea from '../../hooks/query/search-base-paper-buffer-area';
import { isWebApiError } from '../../services/web-api';
import MoveToList from './components/MoveToListDialog';
import useStyles from './styles';
import columns from './table-colums';

function BufferArea() {
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
  } = useSearchBasePaperBufferArea();
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
        variant: 'error',
        preventDuplicate: true,
        autoHideDuration: 2 * 1000
      });
    }
  }, [basePapersPage, enqueueSnackbar, error]);

  const handleOpenDialog = (id: number) => () => {
    setBasePaperID(id);
  };

  const handleCloseDialog = () => {
    setBasePaperID(-1);
  };

  const handleLoadMore = useDebouncedCallback(() => {
    fetchNextPage();
  }, 1000);

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
                    <TableCell align="left" className={classes.action}>
                      {basePaper.quantity}
                      <IconButton
                        disabled={basePaper.quantity === 0}
                        size="small"
                        color="primary"
                        onClick={handleOpenDialog(basePaper.id)}
                      >
                        <DoubleArrowRoundedIcon />
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
            <Typography className={classes.infoMessage}> Not found</Typography>
          ) : (
            <Button
              disabled={isLoading || isFetching}
              className={classes.buttonFetchMore}
              variant="outlined"
              size="small"
              color="primary"
              disableElevation
              onClick={handleLoadMore}
            >
              Muat Lebih Banyak
            </Button>
          )}
        </div>
      </TableContainer>
      <MoveToList basePaperID={basePaperID} open={basePaperID > 0} onClose={handleCloseDialog} />
    </Paper>
  );
}

export default BufferArea;
