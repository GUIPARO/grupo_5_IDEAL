import React from 'react';
import { useState, useEffect } from 'react';

function LastUser() {

  const [User, setUser] = useState([]);

  const Users = async () => {
    try {
      // let api = await fetch("https://grupo5ideal.herokuapp.com/api/products");
      let api = await fetch("http://localhost:3001/api/users/lastUser");
      let data2 = await api.json();
      console.log(data2)
      
    
  
      return data2;

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    async function fetchData() {
      const total =  await Users()
      setUser(total)
      
    }
  
    
    fetchData();
  }, [])


  return (
    <div className = "contentLastUser">

      <h3>Último Usuario</h3>
      <div className = "info">
          <figure className = "containerImage"><img src= {User.url} alt = 'user'></img></figure>
          <div className = "containerInfo">
          <div>{User.name}</div>
          <div>{User.lastname}</div>
          <div>{User.email}</div>
          </div>
          

      </div>
      

    </div>



  );
}


export default LastUser;