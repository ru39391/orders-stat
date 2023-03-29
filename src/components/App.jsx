import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import useOrderList from '../store/OrderListStore';
import useDataTable from '../store/DataTableStore';

import Popup from './Popup';
import DataTable from './DataTable';
import AlertError from './AlertError';
import DataTableProduct from './DataTableProduct';
import DataTableActions from './DataTableActions';

import { Box, LinearProgress } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  ModeEdit,
  Visibility,
  AssignmentTurnedIn,
} from '@mui/icons-material';

import {
  DEFAULT_DOC_TITLE,
  ORDERS_ACTION_LABEL,
  VIEW_ACTION_LABEL,
  EDIT_ACTION_LABEL,
} from '../utils/constants';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

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
    setCellHandler,
    setActionHandler,
    setRowActions,
    setRowData,
  } = useDataTable(
    (state) => ({
      tableCols: state.tableCols,
      tableRows: state.tableRows,
      tableRowData: state.tableRowData,
      renderRows: state.renderRows,
      setCellHandler: state.setCellHandler,
      setActionHandler: state.setActionHandler,
      setRowActions: state.setRowActions,
      setRowData: state.setRowData,
    }),
    shallow
  );

  useEffect(() => {
    renderRows(products);
    setCellHandler(DataTableProduct);
    setActionHandler(DataTableActions);
    setRowActions([{
      icon: <AssignmentTurnedIn />,
      label: ORDERS_ACTION_LABEL,
      handleAction: ({ orders }) => setRowData(orders),
    },{
      icon: <Visibility />,
      label: VIEW_ACTION_LABEL,
      handleAction: ({ url }) => window.open(url, '_blank'),
    },{
      icon: <ModeEdit />,
      label: EDIT_ACTION_LABEL,
      handleAction: ({ url_edit }) => window.open(url_edit, '_blank'),
    }]);
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
          tableCols={tableCols}
          tableRows={tableRows}
        />
      </Box>
      <Popup
        ordersList={orders}
        productsList={products}
        currOrders={tableRowData}
        handlePopup={setRowData}
      />
      {isLoading && <LinearProgress />}
      {error && <AlertError errorMsg={error} />}
    </ThemeProvider>
  )
};

export default App;