import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataTableRow from '../DataTableRow/DataTableRow';

function DataTable({ products }) {
  return (
    <div className="data-table">
      <div className="data-table__header">
        <Row>
          <Col className="data-table__caption">Товар</Col>
          <Col className="data-table__caption">Частота заказов</Col>
          <Col className="data-table__caption">Количество, шт.</Col>
          <Col className="data-table__caption">Сумма, руб.</Col>
          <Col className="data-table__caption">Остатки, шт.</Col>
        </Row>
      </div>
      <div className="data-table__body">
        {products.map((productsItem) => (
          <DataTableRow
            product={productsItem}
            key={productsItem.product_id}
            id={productsItem.product_id}
            name={productsItem.name}
            counter={productsItem.counter}
            count={productsItem.count}
            cost={productsItem.cost}
            weight={productsItem.weight}
            orders={productsItem.orders}
          />
        ))}
      </div>
    </div>
  );
}

export default DataTable;
