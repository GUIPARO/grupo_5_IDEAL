import React from 'react';
import { useState, useEffect } from 'react';

function  TotalsProducts() {

    const [total, setTotal] = useState([]);

    const products = async () => {
      try {
        // let api = await fetch("https://grupo5ideal.herokuapp.com/api/products");
        let api = await fetch("http://localhost:3001/api/products");
        let data = await api.json();
        return data
      } catch (error) {
      console.log(error)
      }
    }
    
    useEffect(async () => {
      const newTotal = await products()
      setTotal(newTotal)
    }, [])

    return (
      <div>
          <div>
              <span>Total Productos</span>
              <span>{total.totalcount}</span>
          </div>
      </div>
    );
}


export default TotalsProducts;