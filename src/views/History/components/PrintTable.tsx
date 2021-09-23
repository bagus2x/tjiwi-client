import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/PrintRounded';

function PrintTable() {
  const handlePrint = () => {
    const el = document.getElementById('table-history') as HTMLTableElement;
    const wd = window.open('');
		if(!wd) return;

    wd.document.write(el.outerHTML);
		
    wd.print();
    wd.close();
  };

  return (
    <IconButton color="primary" size="small" onClick={handlePrint}>
      <PrintIcon />
    </IconButton>
  );
}

export default PrintTable;
