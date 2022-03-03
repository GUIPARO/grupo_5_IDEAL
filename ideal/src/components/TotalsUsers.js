import React from 'react';
import { useState, useEffect } from 'react';

function  TotalsUsers() {

    const [total, setTotal] = useState([]);

    const users = async () => {
      try {
        // let api = await fetch("https://grupo5ideal.herokuapp.com/api/products");
        let api = await fetch("http://localhost:3001/api/users");
        let data = await api.json();
        return data
      } catch (error) {
      console.log(error)
      }
    }
    
    useEffect(async () => {
      const newTotal = await users()
      setTotal(newTotal)
    }, [])

    return (
      <div>
          <div>
              <span>Total Usuarios</span>
              <span>{total.totalCount}</span>
          </div>
      </div>
    );
}


export default TotalsUsers;