import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DataTableRow() {
  return (
    <Row>
      <Col md={3} className="data-table__cell">
        <a className="data-table__link" href="#">Томаты черри</a>
      </Col>
      <Col md={3} className="data-table__cell">2</Col>
      <Col md={3} className="data-table__cell">300</Col>
      <Col md={3} className="data-table__cell">8</Col>
    </Row>
  );
}

export default DataTableRow;
