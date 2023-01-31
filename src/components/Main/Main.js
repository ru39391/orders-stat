import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataTable from '../DataTable/DataTable';

function Main({data}) {
  return (
    <Col sm={10}>
      <div className="main">
        <div className="panel">
          <DataTable data={data} />
        </div>
      </div>
    </Col>
  );
}

export default Main;
