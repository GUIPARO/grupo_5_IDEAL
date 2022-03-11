import React from 'react';
import { useState, useEffect } from 'react';

function LastProduct() {

  const [Product, setProduct] = useState([]);

  const products = async () => {
    try {
      // let api = await fetch("https://grupo5ideal.herokuapp.com/api/products");
      let api = await fetch("http://localhost:3001/api/products/lastProduct");
      let data2 = await api.json();
      console.log(data2)
      
    
  
      return data2;

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    async function fetchData() {
      const total =  await products()
      setProduct(total)
      
    }
  
    
    fetchData();
  }, [])


  return (
    <div className = "contentLastProduct">

      <h3>Último Producto</h3>
      <div className = "info">
          <figure className = "containerImage"><img src= {Product.url} alt = 'product'></img></figure>
          <div>{Product.fullname}</div>
          <div>{Product.price}</div>

      </div>
      

    </div>



  );
}


export default LastProduct;