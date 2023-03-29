import { GridActionsCellItem } from '@mui/x-data-grid';

function DataTableActions({ icon, label, handleAction, orders, url, url_edit }) {
  return (
    <GridActionsCellItem
      icon={icon}
      label={label}
      onClick={() => handleAction({ orders, url, url_edit })}
    />
  );
};

export default DataTableActions;
