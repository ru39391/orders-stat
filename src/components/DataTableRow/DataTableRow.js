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
  remains,
  image,
  orders,
}) {
  return (
    <div className="data-table__row">
      <Row className="mx-0">
        <Col className="data-table__cell py-2">
          <img className="data-table__picture" src={`http://o-batat.local/${image}`} alt={name}/>
          <a className="data-table__link" href={`manager/?a=resource/update&id=${id}`}>{name}</a>
        </Col>
        <Col className="data-table__cell py-2">{counter}</Col>
        <Col className="data-table__cell py-2">{count}</Col>
        <Col className="data-table__cell py-2">{cost}</Col>
        <Col className="data-table__cell py-2">{remains}</Col>
      </Row>
      {/*
      <Row className="mx-0">
        <Col className="data-table__cell py-2"></Col>
      </Row>
      */}
    </div>
  );
}

export default DataTableRow;
