import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import useGetStorage from '../../hooks/query/get-storage';
import useStyles from './styles';

function Overview() {
  const classes = useStyles();
  const { storageID } = useParams<{ storageID: string }>();
  const { data, isSuccess } = useGetStorage(parseInt(storageID));

  return (
    <div className={classes.root}>
      {isSuccess && (
        <Container maxWidth="md">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>{data?.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell>{data?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Supervisor</TableCell>
                <TableCell>{data?.supervisor.username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Deskripsi</TableCell>
                <TableCell>{data?.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Dibuat Pada</TableCell>
                <TableCell>{moment.unix(data!!.createdAt).format('ll')}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Container>
      )}
    </div>
  );
}

export default Overview;
