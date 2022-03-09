import React from 'react';
import { useState, useEffect } from 'react';

function LastProduct() {

  const [Product, setProduct] = useState([]);

  const products = async () => {
    try {
      // let api = await fetch("https://grupo5ideal.herokuapp.com/api/products");
      let api = await fetch("http://localhost:3001/api/products");
      let data2 = await api.json();
      console.log(data2)
      
    
    //  console.log(data);
      return data2.lastProduct;

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    async function fetchData() {
      const total =  await products()
      setProduct(total)
      
    }
    // console.log(fetchData());
    
    fetchData();
  }, [])


  
  // console.log(total.lines.map(line=>{
  //   return line.line
  // }))

  return (
    <div className = "contentLastProduct">

      <h3>Último Producto</h3>
      <div>
          <span>{Product.product_id}</span>
          <span>{Product.fullname}</span>
          <span>{Product.price}</span>
      </div>
      

    </div>



  );
}


export default LastProduct;