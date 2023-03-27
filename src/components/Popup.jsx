import { forwardRef } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
  TextField,
} from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Popup({ data, labels, closePopup }) {
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
        <DialogContentText></DialogContentText>
        {isOpen && inputsArr.map(
          (item, index) =>
          <TextField
            key={index.toString()}
            id=""
            label=""
            defaultValue=""
            fullWidth
            variant="outlined"
            margin="dense"
            type="text"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closePopup()}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  )
};

export default Popup;
