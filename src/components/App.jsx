import { useEffect } from 'react';

import { shallow } from 'zustand/shallow';
import useOrderList from '../store/OrderListStore';
import AlertError from './AlertError';
import { LinearProgress } from '@mui/material';
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

  useEffect(() => {
    console.log(orders);
    console.log(products);
  }, [orders, products]);

  useEffect(() => {
    document.title = DEFAULT_DOC_TITLE;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoading && <LinearProgress />}
      {error && <AlertError errorMsg={error} />}
    </ThemeProvider>
  )
};

export default App;