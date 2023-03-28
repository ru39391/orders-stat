import { Box } from '@mui/material';

function DataTableProduct({ image, name }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img src={image} alt={name} />
      {name}
    </Box>
  );
};

export default DataTableProduct;
