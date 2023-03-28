import { useEffect } from 'react';

import { shallow } from 'zustand/shallow';
import useOrderList from '../store/OrderListStore';
import useDataTable from '../store/DataTableStore';
import AlertError from './AlertError';
import DataTable from './DataTable';
import DataTableProduct from './DataTableProduct';
import { Box, LinearProgress } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DEFAULT_DOC_TITLE } from '../utils/constants';
import '@fontsource/roboto/400.css';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
      background: {
        body: '#F4F5FA'
      }
    },
    custom: {
      dFlexColumn: {
        display: 'flex',
        flexDirection: 'column',
      }
    }
  });

  const {
    orders,
    products,
    isLoading,
    error,
  } = useOrderList(
    (state) => ({
      orders: state.orders,
      products: state.products,
      isLoading: state.isLoading,
      error: state.error,
    }),
    shallow
  );

  const {
    tableCols,
    tableRows,
    tableRowData,
    renderRows,
    renderCell,
    getRowData,
  } = useDataTable(
    (state) => ({
      tableCols: state.tableCols,
      tableRows: state.tableRows,
      tableRowData: state.tableRowData,
      renderRows: state.renderRows,
      renderCell: state.renderCell,
      getRowData: state.getRowData,
    }),
    shallow
  );

  useEffect(() => {
    renderRows(products);
    renderCell(DataTableProduct);
  }, [products]);

  useEffect(() => {
    document.title = DEFAULT_DOC_TITLE;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <DataTable
          src={orders}
          tableCols={tableCols}
          tableRows={tableRows}
          rowData={tableRowData}
          getRowData={getRowData}
        />
      </Box>
      {isLoading && <LinearProgress />}
      {error && <AlertError errorMsg={error} />}
    </ThemeProvider>
  )
};

export default App;