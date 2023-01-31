import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataTableBody from '../DataTableBody/DataTableBody';

function DataTable({data}) {
  return (
    <div className="data-table">
      <div className="data-table__header">
        <Row>
          <Col md={3} className="data-table__caption">Товар</Col>
          <Col md={3} className="data-table__caption">Количество, шт.</Col>
          <Col md={3} className="data-table__caption">Сумма, руб.</Col>
          <Col md={3} className="data-table__caption">Остатки, шт.</Col>
        </Row>
      </div>
      <DataTableBody />
    </div>
  );
}

export default DataTable;
