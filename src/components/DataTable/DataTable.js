import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { sortArr } from '../../utils/constants';
import DataTableRow from '../DataTableRow/DataTableRow';
import './DataTable.scss';

function DataTable({ products }) {
  const [TableData, setTableData] = React.useState([]);
  const [SortDirAsc, setSortDirAsc] = React.useState(true);

  function sortTableData(paramName) {
    const sortedArr = sortArr(products, paramName);
    if(SortDirAsc) {
      setTableData(sortedArr);
      setSortDirAsc(false);
    } else {
      setTableData(sortedArr.reverse());
      setSortDirAsc(true);
    }
  }

  React.useEffect(() => {
    setTableData(products);
  }, [products]);

  return (
    <div className="data-table">
      <div className="data-table__header">
        <Row className="mx-0">
          <Col>
            <button className="data-table__caption py-3" type="button" onClick={() => sortTableData('name')}>Товар</button>
          </Col>
          <Col>
            <button className="data-table__caption py-3" type="button" onClick={() => sortTableData('counter')}>Частота заказов</button>
          </Col>
          <Col>
            <button className="data-table__caption py-3" type="button" onClick={() => sortTableData('count')}>Количество, шт.</button>
          </Col>
          <Col>
            <button className="data-table__caption py-3" type="button" onClick={() => sortTableData('cost')}>Сумма, руб.</button>
          </Col>
          <Col>
            <button className="data-table__caption py-3" type="button" onClick={() => sortTableData('remains')}>Остатки, шт.</button>
          </Col>
        </Row>
      </div>
      <div className="data-table__body pb-4">
        {TableData.map((tableDataItem) => (
          <DataTableRow
            product={tableDataItem}
            key={tableDataItem.product_id}
            id={tableDataItem.product_id}
            name={tableDataItem.name}
            counter={tableDataItem.counter}
            count={tableDataItem.count}
            cost={tableDataItem.cost}
            weight={tableDataItem.weight}
            orders={tableDataItem.orders}
            remains={tableDataItem.remains}
            image={tableDataItem.image}
          />
        ))}
      </div>
    </div>
  );
}

export default DataTable;
