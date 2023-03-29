import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  SITE_URL,
  ID_KEY,
  NAME_KEY,
  COUNT_KEY,
  COST_KEY,
  WEIGHT_KEY,
  RES_EDIT_PATH,
} from '../utils/config';
import { COL_TITLES } from '../utils/constants';

const useDataTable = create(devtools((set, get) => ({
  tableCols: [],
  tableRows: [],
  tableRowData: [],
  cellHandler: null,
  actionHandler: null,
  rowActions: [],
  setCellHandler: (handler) => set({ cellHandler: handler }),
  setActionHandler: (handler) => set({ actionHandler: handler }),
  setRowActions: (arr) => set({ rowActions: arr }),
  setCols: (arr = COL_TITLES) => {
    const columnsArr = Object.values(arr).map((item, index) => {
      const key = Object.keys(arr)[index].toLowerCase();
      return {
        field: key,
        headerName: item,
        flex: item.length > 4 ? 1 : 0,
        width: item.length > 4 ? 'auto' : 100,
        renderCell: ({ row }) => key === NAME_KEY ? get().cellHandler(row) : row[key]
      }
    });

    columnsArr.unshift({
      field: ID_KEY,
      hide: true,
    });

    columnsArr.push({
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: ({ row }) => get().rowActions.map(props => get().actionHandler({ ...props, ...row })),
    });

    return columnsArr;
  },
  setData: (arr = get().tableRows) => set(
    {
      tableCols: arr.length ? get().setCols() : get().tableCols,
      tableRows: arr,
    }
  ),
  renderRows: (arr) => {
    const getArrSumm = (array, key) => array.map(item => item[key]).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    const handledArr = arr.map(({
      product_id,
      name,
      remains,
      image,
      url
    }, _, array) => {
      const productsArr = array.filter(product => product.product_id === product_id);
      const productOrdersArr = productsArr.map(product => product.order_id);

      return {
        product_id,
        image,
        name,
        counter: productsArr.length,
        count: getArrSumm(productsArr, COUNT_KEY),
        cost: getArrSumm(productsArr, COST_KEY),
        remains,
        weight: getArrSumm(productsArr, WEIGHT_KEY),
        orders: productOrdersArr,
        url: `${SITE_URL}${url}`,
        url_edit: `${SITE_URL}${RES_EDIT_PATH}${product_id}`,
      };
    });

    const productsArr = handledArr.reduce((acc, item) => {
      if(acc.find(product => product.product_id === item.product_id)) return acc;
      return [...acc, item];
    }, []);

    get().setData(productsArr.map(
      (item, index) => ({
        id: index + 1,
        ...item
      })
    ));
  },
  setRowData: (arr = []) => set({ tableRowData: arr }),
})));

export default useDataTable;
