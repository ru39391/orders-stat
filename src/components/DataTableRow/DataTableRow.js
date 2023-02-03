import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DataTableRow({
  product,
  id,
  name,
  counter,
  count,
  cost,
  weight,
  orders,
}) {
  return (
    <>
      <Row>
        <Col className="data-table__cell">
          <a className="data-table__link" href={`manager/?a=resource/update&id=${id}`}>{name}</a>
        </Col>
        <Col className="data-table__cell">{counter}</Col>
        <Col className="data-table__cell">{count}</Col>
        <Col className="data-table__cell">{cost}</Col>
        <Col className="data-table__cell"></Col>
      </Row>
      <Row>
        <Col className="data-table__cell"></Col>
      </Row>
    </>
  );
}

export default DataTableRow;
