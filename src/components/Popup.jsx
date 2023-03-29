import {
  useState,
  useEffect,
  forwardRef
} from 'react';
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
} from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Popup({ productsList, ordersList, currOrders, handlePopup }) {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (e, value) => {
    setTabValue(value);
  };

  const isOpen = Boolean(currOrders.length);
  const ordersData = ordersList.filter(({ id }) => currOrders.includes(id)).reverse();
  const productsData = ordersData.map(
    ({ id, products }) => ({
      order_id: id,
      products: products.map(item => productsList.find(({ order_id, product_id }) => product_id === item && order_id === id)),
    })
  );

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
      <DialogTitle></DialogTitle>
      <DialogContent>
        {isOpen && <>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider'
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons={true}
            >
              {ordersData.map(
                ({ id, createdon, cost }) =>
                <Tab
                  key={id}
                  label={`Заказ от ${createdon}`}
                />
              )}
            </Tabs>
          </Box>
          {ordersData.map(
            ({ id, createdon, cost }, index) =>
            <Box
              key={id}
              component="div"
              role="tabpanel"
              hidden={tabValue !== index}
              id={`order-${id}`}
            >
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
