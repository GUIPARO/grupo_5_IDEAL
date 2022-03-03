import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
      <div>
        <ul>
            <li>
                <Link to="products">Listado de productos</Link>
            </li>
        </ul>
      </div>
    );
  }


export default Sidebar;