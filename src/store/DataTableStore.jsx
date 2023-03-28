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
  tableRowData: {},
  handleRows: null,
  renderCell: (handler) => get().handleRows = handler,
  setCols: () => {
    const columnsArr = Object.values(COL_TITLES).map(
      (item, index) => ({
        field: `col${index + 1}`,
        headerName: item,
        flex: item.length > 4 ? 1 : 0,
        width: item.length > 4 ? 'auto' : 100,
        renderCell: ({ row }) => {
          const key = Object.keys(COL_TITLES)[index].toLowerCase();
          return key === NAME_KEY ? get().handleRows(row) : row[key];
        }
      })
    );

    columnsArr.unshift({
      field: ID_KEY,
      hide: true,
    });

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
      const currProductsArr = array.filter(product => product.product_id === product_id);
      const productOrdersArr = currProductsArr.map(product => product.order_id);

      return {
        product_id,
        image: `${SITE_URL}${image}`,
        name,
        counter: currProductsArr.length,
        count: getArrSumm(currProductsArr, COUNT_KEY),
        cost: getArrSumm(currProductsArr, COST_KEY),
        remains,
        weight: getArrSumm(currProductsArr, WEIGHT_KEY),
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
  getRowData: ({ row }) => {
    console.log(row);
  },
})));

export default useDataTable;
