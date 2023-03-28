import Popup from './Popup';
import NoRowsOverlay from './NoRowsOverlay';
import { DataGrid } from '@mui/x-data-grid';

function DataTable({ src, tableCols, tableRows, rowData }) {
  return (
    <>
      <DataGrid
        sx={{
          border: 0,
          flexGrow: 1,
          boxShadow: '0 2px 10px 0 rgba(0,0,0,.045)',
          bgcolor: 'background.default',
        }}
        rows={tableRows}
        columns={tableCols}
        slots={{ noRowsOverlay: NoRowsOverlay }}
      />
      {/*
      <Popup labels={tableCols} data={rowData} closePopup={getRowData} />
      */}
    </>
  )
}

export default DataTable;
