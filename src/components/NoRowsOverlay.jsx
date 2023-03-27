import { Box, CircularProgress } from '@mui/material';

function NoRowsOverlay() {
  return (
    <Box sx={{
      flexGrow: 1,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <CircularProgress />
    </Box>
  );
};

export default NoRowsOverlay;
