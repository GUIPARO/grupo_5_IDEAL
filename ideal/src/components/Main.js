import React from 'react';
import { Link } from 'react-router-dom';
import ContentTop from './ContentTop';
import TotalsProductsLines from './TotalProductsLines';
import LastProduct from './LastProduct';

function Main() {
    return (
      <div className = "contentMain">
        <ContentTop />
        <TotalsProductsLines/>
        <LastProduct/>
      </div>
    );
  }


export default Main;