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

function Popup({ products, orders, closePopup }) {
  const isOpen = Boolean(orders.length);
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (e, value) => {
    setTabValue(value);
  };

  useEffect(() => {
    setTabValue(0);
  }, [orders.length]);

  return (
    <Dialog
      open={isOpen}
      maxWidth="sm"
      fullWidth={true}
      onClose={() => closePopup()}
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
              {orders.map(
                ({ id, createdon, cost }) =>
                <Tab
                  key={id}
                  label={`Заказ от ${createdon}`}
                />
              )}
            </Tabs>
          </Box>
          {orders.map(
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
        <Button onClick={() => closePopup()}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  )
};

export default Popup;
