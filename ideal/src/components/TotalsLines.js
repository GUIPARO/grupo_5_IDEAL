import React from 'react';
import { useState, useEffect } from 'react';

function  TotalsLines() {

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
          <div className = " itemList">
              <span>Total Lineas</span> <br></br>
              <span>{total.totalLines}</span>
          </div>
      </div>
    );
}


export default TotalsLines;