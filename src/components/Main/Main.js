import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataTable from '../DataTable/DataTable';

function Main({ products }) {
  return (
    <Col sm={10}>
      <div className="main">
        <div className="panel">
          <DataTable products={products} />
        </div>
      </div>
    </Col>
  );
}

export default Main;
