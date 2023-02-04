const apiUrl = 'http://o-batat.local/api';

function sortArr(arr, key = '') {
  const sortedArr = arr.map((item, index) => {
    return {
      'index': index,
      'value': Boolean(key) ? item[key] : item
    };
  });

  sortedArr.sort((a, b) => {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });

  return sortedArr.map(item => arr[item.index]);
}

export {
  apiUrl,
  sortArr
}