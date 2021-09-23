import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React, { MouseEvent, useState } from 'react';
import { useHistory } from 'react-router';
import useQueryString from '../../../hooks/query-string';

interface InputDateProps {
  label: string;
  queryString: string;
  storageID: number;
  minDate: number;
}

const getNullDate = (stringUnix: string | null) => {
  if (!stringUnix) return null;
  const numUnix = parseInt(stringUnix);
  if (!numUnix) return null;
  return new Date(numUnix * 1000);
};

const InputDate = ({ label, queryString: queryStr, minDate }: InputDateProps) => {
  const queryString = useQueryString();
  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null>(getNullDate(queryString.get(queryStr)));
  const history = useHistory();

  const handleStartDateChange = (date: MaterialUiPickersDate) => {
    setStartDate(date);
    queryString.set(queryStr, (new Date(date.toString()).getTime() / 1000).toString());
    history.push('?' + queryString.toString());
  };

  const handleClearStartDate = (ev: MouseEvent<{}>) => {
    ev.stopPropagation();
    setStartDate(null);
    queryString.delete(queryStr);
    history.push('?' + queryString.toString());
  };

  return (
    <DateTimePicker
      label={label}
      value={startDate}
      minDate={minDate}
      inputVariant="outlined"
      size="small"
      onChange={handleStartDateChange}
      ampm={false}
      InputProps={{
        endAdornment: (
          <IconButton size="small" color="primary" onClick={handleClearStartDate}>
            <ClearIcon />
          </IconButton>
        )
      }}
    />
  );
};

export default InputDate;
