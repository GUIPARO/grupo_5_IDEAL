import React from 'react';
import TotalsProducts from './TotalProducts';
import TotalsUsers from './TotalsUsers';
import TotalsLines from './TotalsLines';

function ContentTop() {
    return (
      <div>
          <TotalsProducts />
          <TotalsUsers />
          <TotalsLines />
      </div>
    );
  }



export default ContentTop;