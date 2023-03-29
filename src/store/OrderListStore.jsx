import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import api from '../utils/Api';
import {
  SITE_URL,
  ORDERS_PATH,
  PRODUCTS_PATH,
} from '../utils/config';
import { ERROR_MSG } from '../utils/constants';

const useOrderList = create(devtools((set, get) => ({
  orders: [],
  products: [],
  isLoading: true,
  error: null,
  handleDate: (value) => {
    const handleDateValue = (str) => {
      const arr = str.split(' ');
      const date = arr[0].split('-').reverse().join('.');
      return [date, arr[1]].join(' ');
    };
    return Boolean(value) ? handleDateValue(value) : value;
  },
  handleOrders: (ordersArr, productsArr) => ordersArr.map(
    (order) => ({
      ...order,
      createdon: get().handleDate(order.createdon),
      updatedon: get().handleDate(order.updatedon),
      products: productsArr.filter(({ order_id }) => order_id === order.id).map(({ product_id }) => product_id),
    })
  ),
  handleProducts: (productsArr) => productsArr.map(product => ({ ...product, image: `${SITE_URL}${product.image}` })),
  fetchOrderList: Promise.all([ORDERS_PATH, PRODUCTS_PATH].map(item => api.fetchData(item)))
    .then(([...res]) => {
      const [orders, products] = res.map(({ data }) => data);
      set({
        orders: get().handleOrders(orders, products),
        products: get().handleProducts(products),
        isLoading: false,
        error: null,
      })
    })
    .catch((err) => set({
      isLoading: false,
      error: ERROR_MSG
    })),
})));

export default useOrderList;
