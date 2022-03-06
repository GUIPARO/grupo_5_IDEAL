import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/img/logo_blanco_negro.png";

function Sidebar() {
    return (
      <div className = "sideBar">
         <figure className = " containerLogo">
              <img src={Logo}></img>
          </figure>
        <ul>
            <li>
                <Link to="products">Listado de productos</Link>
            </li>
            <li>
            <Link to="users">Listado de usuarios</Link>
            </li>
        </ul>

       
      </div>
    );
  }


export default Sidebar;