import React from 'react';
import Header from "./Header.js"
import Sidebar from "./Sidebar.js"
import Main from './Main.js'
import '../assets/css/styles.css'

function App() {
  return (
    <div className="App">
     
      <Sidebar />
      <Main />
    </div>
  );
}

export default App;
