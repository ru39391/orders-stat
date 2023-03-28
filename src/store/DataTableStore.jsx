import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  SITE_URL,
  ID_KEY,
  NAME_KEY,
  COUNT_KEY,
  COST_KEY,
  WEIGHT_KEY,
} from '../utils/config';
import { COL_TITLES } from '../utils/constants';

const useDataTable = create(devtools((set, get) => ({
  tableCols: [],
  tableRows: [],
  cellHandler: null,
  actionHandler: null,
  rowActions: [],
  setCellHandler: (handler) => get().cellHandler = handler,
  setActionHandler: (handler) => get().actionHandler = handler,
  setRowActions: (arr) => get().rowActions = arr,
  setCols: () => {
    const columnsArr = Object.values(COL_TITLES).map((item, index) => {
      const key = Object.keys(COL_TITLES)[index].toLowerCase();
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
      getActions: ({ row }) => get().rowActions.map(data => get().actionHandler({ ...data, ...row })),
    });
    console.log(get().rowActions[0]);
    return columnsArr;
  },
  setData: (arr = get().tableRows) => {
    set({
      tableCols: arr.length ? get().setCols() : get().tableCols,
      tableRows: arr,
    })
  },
  renderRows: (arr) => {
    const getArrSumm = (array, key) => array.map(item => item[key]).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    const handledArr = arr.map(({
      product_id,
      name,
      remains,
      image
    }, _, array) => {
      const productsArr = array.filter(product => product.product_id === product_id);
      const productOrdersArr = productsArr.map(product => product.order_id);

      return {
        product_id,
        image: `${SITE_URL}${image}`,
        name,
        counter: productsArr.length,
        count: getArrSumm(productsArr, COUNT_KEY),
        cost: getArrSumm(productsArr, COST_KEY),
        remains,
        weight: getArrSumm(productsArr, WEIGHT_KEY),
        orders: productOrdersArr,
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
})));

export default useDataTable;
