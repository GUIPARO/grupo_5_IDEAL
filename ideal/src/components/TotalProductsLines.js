import React from 'react';
import { useState, useEffect } from 'react';

function TotalsProductsLines() {

  const [listLines, setLines] = useState([]);

  const lines = async () => {
    try {
      // let api = await fetch("https://grupo5ideal.herokuapp.com/api/products");
      let api = await fetch("http://localhost:3001/api/products");
      let data = await api.json();
      console.log(data.lines)
      return data.lines

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const total = await lines()
      setLines(total)
    }
    fetchData();
  }, [])
  
  // console.log(total.lines.map(line=>{
  //   return line.line
  // }))

  return (
    <div className = "contentProductsLine">

      <h3>Total Productos Por Linea</h3>
      <div className="itemLine">

        {listLines.map((line, i) => {
          return <span className = "contentLines" key={i + line}> {line.line} <span> {line.totalLine} </span> </span>

        })}


      </div>

    </div>



  );
}


export default TotalsProductsLines;