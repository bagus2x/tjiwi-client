import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router';
import useQueryString from '../../../hooks/query-string';

type Status = 'ALL' | 'STORED' | 'MOVED' | 'DELETED' | 'DELIVERED';

const getStatus = (status: string | null): Status => {
  if (!status) return 'ALL';
  status = status.toUpperCase();
  if (!['ALL', 'STORED', 'MOVED', 'DELETED', 'DELIVERED'].includes(status)) return 'ALL';
  return status as Status;
};

function FilterStatus() {
  const history = useHistory();
  const queryString = useQueryString();
  const [status, setStatus] = useState<Status>(getStatus(queryString.get('status')));

  const handleChange = (ev: ChangeEvent<{ value: any }>) => {
    const status: Status = ev.target.value;
    setStatus(status);

    if (status === 'ALL') {
      queryString.delete('status');
      history.push('?' + queryString.toString());
      return;
    }

    queryString.set('status', status.toLowerCase());
    history.push('?' + queryString.toString());
  };

  return (
    <FormControl size="small">
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        variant="outlined"
        value={status}
        onChange={handleChange}
      >
        <MenuItem value="ALL">Semua</MenuItem>
        <MenuItem value="STORED">Disimpan</MenuItem>
        <MenuItem value="MOVED">Dipindahkan</MenuItem>
        <MenuItem value="DELETED">Dihapus</MenuItem>
        <MenuItem value="DELIVERED">Dikirim</MenuItem>
      </Select>
    </FormControl>
  );
}

export default FilterStatus;
