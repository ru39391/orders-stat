import { GridActionsCellItem } from '@mui/x-data-grid';

function DataTableActions({ icon, label, handleAction, product_id, orders }) {
  return (
    <GridActionsCellItem
      icon={icon}
      label={label}
      onClick={() => handleAction({ product_id, orders })}
    />
  );
};

export default DataTableActions;
