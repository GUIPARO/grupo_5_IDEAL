import React from 'react';
import { Link } from 'react-router-dom';
import ContentTop from './ContentTop';
import TotalsProductsLines from './TotalProductsLines';

function Main() {
    return (
      <div>
        <ContentTop />
        <TotalsProductsLines/>
      </div>
    );
  }


export default Main;