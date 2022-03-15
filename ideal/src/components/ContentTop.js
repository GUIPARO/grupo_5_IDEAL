import React from 'react';
import TotalsProducts from './TotalProducts';
import TotalsUsers from './TotalsUsers';
import TotalsLines from './TotalsLines';

function ContentTop() {
    return (
      <div className = "listTop">
          <div className = "contentTotals "><TotalsProducts /></div>
          <div className = "contentTotals "><TotalsUsers /></div>
          <div className = "contentTotals "><TotalsLines /></div>
          
      </div>
    );
  }



export default ContentTop;