import {
  useState,
  useEffect,
  forwardRef
} from 'react';
import Product from './Product';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import {
  ORDER_TITLE,
  ORDER_CREATEDON,
  ORDER_UPDATEDON,
  ORDER_COST,
  ORDER_PRODUCTS_LIST,
  POPUP_TITLE,
} from '../utils/constants';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Popup({ productsList, ordersList, currOrders, handlePopup }) {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (e, value) => {
    setTabValue(value);
  };

  const isOpen = Boolean(currOrders.length);
  const ordersData = ordersList.filter(({ id }) => currOrders.includes(id)).map(
    (order) => ({
      ...order,
      products: order.products.map(item => productsList.find(({ order_id, product_id }) => product_id === item && order_id === order.id)),
    })
  ).reverse();

  useEffect(() => {
    setTabValue(0);
  }, [currOrders.length]);

  return (
    <Dialog
      open={isOpen}
      maxWidth="sm"
      fullWidth={true}
      onClose={() => handlePopup()}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>{POPUP_TITLE}</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        {isOpen && <>
          <Box
            sx={{
              borderBottom: 1,
              marginBottom: 2,
              borderColor: 'divider'
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons={true}
            >
              {ordersData.map(({ id, num }) => <Tab key={id.toString()} label={`${ORDER_TITLE} ${num}`} />)}
            </Tabs>
          </Box>
          {ordersData.map(
            ({
              id,
              createdon,
              updatedon,
              cost,
              products,
            }, index) =>
            <Box
              key={`order-${id.toString()}`}
              id={`order-${id.toString()}`}
              hidden={tabValue !== index}
              component="div"
              role="tabpanel"
            >
              <Typography variant="subtitle2">{ORDER_CREATEDON}</Typography>
              <Typography variant="h6" gutterBottom>{createdon}</Typography>

              {updatedon && <>
                <Typography variant="subtitle2">{ORDER_UPDATEDON}</Typography>
                <Typography variant="h6" gutterBottom>{updatedon}</Typography>
              </>}

              <Typography variant="subtitle2">{ORDER_COST}</Typography>
              <Typography variant="h6" gutterBottom>{cost}</Typography>

              <Typography variant="subtitle2" gutterBottom>{ORDER_PRODUCTS_LIST}</Typography>
              {products.map((product, index) => <Product key={`product-${id.toString()}-${index.toString()}`} {...product} />)}
            </Box>
          )}
        </>}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handlePopup()}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  )
};

export default Popup;
