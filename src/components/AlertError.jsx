import { Snackbar, Alert } from '@mui/material';

function AlertError({ errorMsg }) {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      open
      autoHideDuration={6000}
      message={errorMsg}
      key="error"
    >
      <Alert severity="error" variant="filled" sx={{ width: '100%' }}>{errorMsg}</Alert>
    </Snackbar>
  )
};

export default AlertError;
