import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import api from '../utils/Api';
import { ORDERS_PATH } from '../utils/config';
import { ERROR_MSG } from '../utils/constants';

const useOrderList = create(devtools((set, get) => ({
  orders: [],
  products: [],
  isLoading: true,
  error: null,
  fetchOrderList: api.fetchData(ORDERS_PATH)
    .then(({ data }) => {
      const { orders, products } = data;
      set({
        orders,
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
