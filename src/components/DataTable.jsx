import NoRowsOverlay from './NoRowsOverlay';
import { DataGrid } from '@mui/x-data-grid';

function DataTable({ tableCols, tableRows }) {
  return (
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
  )
}

export default DataTable;
