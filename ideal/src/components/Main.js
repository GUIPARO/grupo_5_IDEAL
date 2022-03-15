import React from 'react';
import { Link } from 'react-router-dom';
import ContentTop from './ContentTop';
import TotalsProductsLines from './TotalProductsLines';
import LastProduct from './LastProduct';
import LastUser from './LastUser';

function Main() {
    return (
      <div className = "contentMain">
        <ContentTop />
        <TotalsProductsLines />
        <div className = "contentLast"><LastProduct/> <LastUser/></div>
      </div>
    );
  }


export default Main;