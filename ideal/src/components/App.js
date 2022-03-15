import React from 'react';
import Header from "./Header.js"
import Sidebar from "./Sidebar.js"
import Main from './Main.js'
import '../assets/css/styles.css'
import AppRoutes from './AppRoutes.js';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <AppRoutes />
    </div>
  );
}

export default App;
