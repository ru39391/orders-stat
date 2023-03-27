import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { SITE_URL } from '../utils/config';
import tableData from '../utils/TableData';

const useDataTable = create(devtools((set, get) => ({
  tableCols: [],
  tableRows: [],
  tableRowData: {},
  getArrLength: (arr) => arr.length ? Object.keys(arr[0]).length : 0,
  setData: (rowsArr, colsArr = rowsArr) => {
    const poppedCount = get().getArrLength(colsArr) - get().getArrLength(rowsArr);
    set({
      tableCols: colsArr.length ? tableData.setColumns(colsArr, poppedCount) : get().tableCols,
      tableRows: rowsArr.length ? tableData.setRows(rowsArr) : get().tableRows,
    })
  },
  renderRows: (array) => {
    const getArrSumm = (arr, param) => arr.map(item => item[param]).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    const handledArr = array.map(({
      product_id,
      name,
      remains,
      image
    }, index, arr) => {
      const currProductsArr = arr.filter(product => product.product_id === product_id);
      const productOrdersArr = currProductsArr.map(product => product.order_id);

      return {
        id: index + 1,
        image: `${SITE_URL}${image}`,
        name,
        counter: currProductsArr.length,
        count: getArrSumm(currProductsArr, 'count'),
        cost: getArrSumm(currProductsArr, 'cost'),
        remains,
        weight: getArrSumm(currProductsArr, 'weight'),
        orders: productOrdersArr,
      };
    });

    array.length ? get().setData(handledArr) : get().setData(get().tableCols, get().tableRows);
  },
  getRowData: (data = {}) => {
  },
})));

export default useDataTable;
