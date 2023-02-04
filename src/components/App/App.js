import React from 'react';
import Container from 'react-bootstrap/Container';
import api from '../../utils/api';
import { sortArr } from '../../utils/constants';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';
import './App.scss';

function App() {
  const [Products, setProductsList] = React.useState([]);

  function calcArrSumm(arr) {
    return arr.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  }

  function handleProductsList(data) {
    const { products, orders } = data;

    const productsArr = products.map((item, index, arr) => {
      const currProductsArr = arr.filter(product => product.product_id === item.product_id);
      const productOrders = currProductsArr.map(product => product.order_id);

      return {
        'product_id': item.product_id,
        'name': item.name,
        'counter': currProductsArr.length,
        'product_orders': sortArr(productOrders).reverse(),
        'orders': sortArr(orders.filter(order => productOrders.includes(order.id)), 'id').reverse(),
        'count': calcArrSumm(currProductsArr.map(product => product.count)),
        'cost': calcArrSumm(currProductsArr.map(product => product.cost)),
        'weight': calcArrSumm(currProductsArr.map(product => product.weight)),
        'remains': item.remains,
        'image': item.image,
      };
    });

    const productsListArr = productsArr.reduce((acc, item) => {
      if(acc.find(product => product.product_id === item.product_id)) {
        return acc;
      }
      return [...acc, item];
    }, []);

    setProductsList(sortArr(productsListArr, 'name'));
  }

  React.useEffect(() => {
    api.getInitialData()
    .then((res) => {
      handleProductsList(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <Container fluid className="d-flex py-4">
      <Sidebar />
      <Main products={Products} />
    </Container>
  );
}

export default App;
