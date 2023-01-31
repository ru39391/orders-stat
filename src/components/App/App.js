import React from 'react';
import Container from 'react-bootstrap/Container';
import Sidebar from '../Sidebar/Sidebar';
import Main from '../Main/Main';
import api from '../../utils/api';
import './App.scss';

function App() {
  const [Products, setProductsList] = React.useState([]);
  React.useEffect(() => {
    api.getInitialData()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (  
    <Container fluid className="d-flex">
      <Sidebar />
      <Main data={Products} />
    </Container>
  );
}

export default App;
