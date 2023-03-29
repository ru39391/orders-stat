import Popup from './Popup';
import NoRowsOverlay from './NoRowsOverlay';
import { DataGrid } from '@mui/x-data-grid';

function DataTable({ src, tableCols, tableRows, rowData, setRowData }) {
  const ordersData = src.filter(({ id }) => rowData.includes(id)).reverse();
  const productsData = ordersData.map(
    ({ id, products }) => ({ order_id: id, products: products.map(id => tableRows.find(({ product_id }) => product_id === id))})
  );

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
      <Popup products={productsData} orders={ordersData} closePopup={setRowData} />
    </>
  )
}

export default DataTable;
