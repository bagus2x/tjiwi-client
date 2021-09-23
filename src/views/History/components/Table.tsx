import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useSearchHistories from '../../../hooks/query/search-histories';
import colummns from './table-columns';

function AllStatusTable() {
  const { data: historyPages, refetch, fetchNextPage } = useSearchHistories();
  const location = useLocation();

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <TableContainer>
      <Table id="table-history" stickyHeader>
        <TableHead>
          <TableRow>
            {colummns.map((column) => (
              <TableCell key={column.id} align={column.align as any}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {historyPages?.pages.map((page) =>
            page.histories.map((history, i) => (
              <TableRow key={i}>
                <TableCell>
                  {history.basePaper.gsm} / {history.basePaper.width}
                </TableCell>
                <TableCell>{history.basePaper.io}</TableCell>
                <TableCell>{history.basePaper.materialNumber}</TableCell>
                <TableCell>{history.basePaper.location}</TableCell>
                <TableCell>{history.affected}</TableCell>
                <TableCell>{history.status}</TableCell>
                <TableCell>{history.member.username}</TableCell>
                <TableCell>{moment.unix(history.createdAt).format('DD-MM-YYYY HH:mm')}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Box display="flex" justifyContent="center" m={4}>
        <Button onClick={handleLoadMore} size="small" variant="outlined">
          Muat Lebih Banyak
        </Button>
      </Box>
    </TableContainer>
  );
}

export default AllStatusTable;
