import React from 'react';
import { useState, useEffect } from 'react';

function TotalsProductsLines() {

  const [total, setTotal] = useState([]);

  const lines = async () => {
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
    const newTotal = await lines()
    setTotal(newTotal)
  }, [])
  return (
    <div>
      <div>
        <span>Productos por</span>
      </div>
      <div>
        <div>
          <span>{total.lines[0].line}</span>
          <span>{total.lines[0].totalLine}</span>
        </div>
        <div>
          <span>{total.lines[1].line}</span>
          <span>{total.lines[1].totalLine}</span>
        </div>
        <div>
          <span>{total.lines[2].line}</span>
          <span>{total.lines[2].totalLine}</span>
        </div>
        <div>
          <span>{total.lines[3].line}</span>
          <span>{total.lines[3].totalLine}</span>
        </div>
      </div>
    </div>
  );
}


export default TotalsProductsLines;