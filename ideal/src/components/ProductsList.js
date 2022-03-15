import React from 'react';
import { useState, useEffect } from 'react';

function ProductsList () {

    const [Product, setProduct] = useState([]);
    
    let fetchProducts = async () => {
        try {
            let api = await fetch("http://localhost:3001/api/products");
            let list = await api.json();
            console.log(list.listProducts)
            return list.listProducts;
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function products() {
          const total =  await fetchProducts()
          setProduct(total)
          
        }
        products();
      }, [])
    
    return (

        <div className = "productsMain">
            {Product.map((newProduct) => (
                <div className = "containerProductMain">
                    <div className = "info" key={newProduct.image}>
                        <figure className = "containerImage"><img src= {newProduct.url} alt ='product'></img></figure>
                        <div className = "containerInfo">
                        <div>{newProduct.fullname}</div>
                        <div>{newProduct.price}</div>
                        </div>
                    </div>
                </div>
            ))}         
        </div>
    )
}

export default ProductsList