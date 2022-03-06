import React from 'react';
import { Link } from 'react-router-dom';
import ContentTop from './ContentTop';
import TotalsProductsLines from './TotalProductsLines';

function Main() {
    return (
      <div className = "contentMain">
        <ContentTop />
        <TotalsProductsLines/>
      </div>
    );
  }


export default Main;