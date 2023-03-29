import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import api from '../utils/Api';
import { ORDERS_PATH, PRODUCTS_PATH } from '../utils/config';
import { ERROR_MSG } from '../utils/constants';

const useOrderList = create(devtools((set, get) => ({
  orders: [],
  products: [],
  isLoading: true,
  error: null,
  handleOrders: (ordersArr, productsArr) => ordersArr.map(order => ({ ...order, products: productsArr.filter(({ order_id }) => order_id === order.id).map(({ product_id }) => product_id) })),
  fetchOrderList: Promise.all([ORDERS_PATH, PRODUCTS_PATH].map(item => api.fetchData(item)))
    .then(([...res]) => {
      const [orders, products] = res.map(({ data }) => data);
      set({
        orders: get().handleOrders(orders, products),
        products,
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
