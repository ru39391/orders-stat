import { Box } from '@mui/material';

function DataTableProduct({ image, name }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          marginRight: 3,
          borderRadius: '50%',
          objectFit: 'cover',
        }}
        component="img"
        src={image}
        alt={name}
      />
      {name}
    </Box>
  );
};

export default DataTableProduct;
