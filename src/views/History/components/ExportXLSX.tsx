import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import xlsx from 'xlsx';
import useSearchHistories from '../../../hooks/query/search-histories';
import DownloadIcon from '@material-ui/icons/GetAppRounded';
import moment from 'moment';
import FileSaver from 'file-saver';
import useQueryString from '../../../hooks/query-string';
import useGetStorage from '../../../hooks/query/get-storage';
import { useParams } from 'react-router';

interface History {
  gsm: number;
  width: number;
  io: number;
  materialNumber: number;
  location: string;
  affected: number;
  status: string;
  member: string;
  timestamp: string;
}

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';
const heading = [
  {
    gsm: 'Gsm',
    width: 'Width',
    io: 'I/O',
    materialNumber: 'No. Material',
    location: 'location',
    affected: 'Affected',
    status: 'Status',
    member: 'Member',
    timestamp: 'Timestamp'
  }
];

function ExportXLSX() {
  const { data: histories } = useSearchHistories();
  const queryString = useQueryString();
  const { storageID } = useParams<{ storageID: string }>();
  const { data: storage } = useGetStorage(parseInt(storageID));

  const getHeader = () => {
    return Object.keys(heading[0]);
  };

  const getData = () => {
    const data: Array<History> = [];
    if (!histories) return [];

    histories.pages.forEach((page) =>
      page.histories.forEach((history) => {
        data.push({
          gsm: history.basePaper.gsm,
          width: history.basePaper.width,
          io: history.basePaper.io,
          materialNumber: history.basePaper.materialNumber,
          location: history.basePaper.location,
          affected: history.affected,
          status: history.status,
          member: history.member.username,
          timestamp: moment.unix(history.createdAt).format('DD-MM-YYYY HH:mm')
        });
      })
    );

    return data;
  };

  const getFileName = () => {
    const storageName = storage?.name.replace(/\s\s+/g, '-');
    const time = Math.round(Date.now() / 1000);
    const status = queryString.get('status') || 'all';

    return `${time}-${storageName}-${status}`;
  };

  const save = (header: Array<string>, data: Array<History>, fileName: string) => {
    const ws = xlsx.utils.json_to_sheet(heading, {
      header: header,
      skipHeader: true
    });

    xlsx.utils.sheet_add_json(ws, data, {
      header: header,
      skipHeader: true,
      origin: -1
    });

    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
    const xlsxData = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(xlsxData, fileName + fileExtension);
  };

  const handleExport = () => {
    const header = getHeader();
    const data = getData();
    const fileName = getFileName();

    save(header, data, fileName);
  };

  return (
    <IconButton color="primary" size="small" onClick={handleExport}>
      <DownloadIcon />
    </IconButton>
  );
}

export default ExportXLSX;
