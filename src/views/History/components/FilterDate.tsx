import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { useParams } from 'react-router';
import useGetStorage from '../../../hooks/query/get-storage';
import InputDate from './InputDate';

function FilterDate() {
  const { storageID } = useParams<{ storageID: string }>();
  const { data: storage, isSuccess } = useGetStorage(parseInt(storageID));

  const minDate = isSuccess ? storage!!.createdAt * 1000 : new Date().getTime();

  return (
    <>
      {isSuccess && (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <InputDate storageID={storage!!.id} label="Awal" queryString="start" minDate={minDate} />
          <InputDate storageID={storage!!.id} label="Akhir" queryString="end" minDate={minDate} />
        </MuiPickersUtilsProvider>
      )}
    </>
  );
}

export default FilterDate;
