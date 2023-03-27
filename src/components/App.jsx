import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import useOrderList from '../store/OrderListStore';
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
  } = useOrderList(
    (state) => ({
      orders: state.orders,
      products: state.products,
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
      111
    </ThemeProvider>
  )
};

export default App;