import React from 'react';
import { formatNumber } from '../utils/formatNumber';

const RevenueTable = ({ products, totalRevenue }) => {
  // make header and footer fixed by using display:block on tbody and scrolling it
  const tableStyle = { width: '100%', borderCollapse: 'collapse' };
  const theadTfootStyle = { display: 'table', width: '100%', tableLayout: 'fixed' };
  const tbodyStyle = { display: 'block', maxHeight: '360px', overflowY: 'auto' };
  const trStyle = { display: 'table', width: '100%', tableLayout: 'fixed' };

  return (
    <table className="revenue-table" style={tableStyle}>
      <thead style={theadTfootStyle}>
        <tr>
          <th>ID</th>
          <th>Product Name</th>
          <th>Unit Price</th>
          <th>Total Sold</th>
          <th>Total Revenue</th>
        </tr>
      </thead>
      <tbody style={tbodyStyle}>
        {products.map((product) => (
          console.log(product,"product"),
          
          <tr key={product.id} style={trStyle}>
            <td>{product.id}</td>
            <td>{product.name}</td>
             <td>{product.unitPrice}</td>
              <td>{product.sold}</td>
            <td>{formatNumber(product.totalRevenue)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot style={theadTfootStyle}>
        <tr>
          <td>Total</td>
          <td>{formatNumber(totalRevenue)}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default React.memo(RevenueTable);
