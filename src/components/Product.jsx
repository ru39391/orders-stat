import DataTableProduct from './DataTableProduct';
import { Box, Typography } from '@mui/material';
import { ORDER_COUNT, ORDER_COST } from '../utils/constants';

function Product({ name, count, cost, image }) {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <DataTableProduct image={image} name={name} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 1,
            marginRight: 3,
          }}
        >
          <Typography sx={{ marginRight: .5 }} variant="caption">{ORDER_COUNT}</Typography>
          <Typography sx={{ fontWeight: 700 }} variant="caption">{count}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 1,
          }}
        >
          <Typography sx={{ marginRight: .5 }}  variant="caption">{ORDER_COST}</Typography>
          <Typography sx={{ fontWeight: 700 }} variant="caption">{cost}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
