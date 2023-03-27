import { Component } from 'react';
import { COL_TITLES } from './constants';

class TableData extends Component {
  constructor() {
    super();
  }

  _popItems(arr, poppedCounter = 0) {
    if(poppedCounter) {
      let i = 0;
      while(i < poppedCounter) {
        arr.pop();
        i++;
      }
    }
    return arr;
  }

  setColumns(array, poppedCounter = 0) {
    const keysArr = Object.keys(array[0]);
    this._popItems(keysArr, poppedCounter);

    const columns = keysArr.filter(
      item => Object.keys(COL_TITLES).includes(item.toUpperCase())
    ).map(
      (item, index) => {
        const caption = COL_TITLES[item.toUpperCase()];

        return {
          field: `col${index}`,
          headerName: caption,
          flex: caption.length > 4 ? 1 : 0,
          width: caption.length > 4 ? 'auto' : 100,
        };
      }
    );

    columns.unshift({
      field: 'id',
      hide: true,
    });
    return columns;
  }

  setRows(array, poppedCounter = 0) {
    return array.map((item) => {
      const data = {};
      const valuesArr = Object.values(item);

      this._popItems(valuesArr, poppedCounter);
      valuesArr.forEach((el, idx) => {
        idx === 0 ? data.id = el : data[`col${idx}`] = el;
      });
      console.log(data);
      return data;
    });
  }
}

const tableData = new TableData();

export default tableData;
