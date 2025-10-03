import React, { useState } from 'react'

const Quotation = () => {
  
  const [product,setProduct]=useState();
  const [quantity,setQuantity]=useState();
  const [total,setTotal]=useState();

  const calculateQuote=()=>{
    setTotal(product*quantity);
  };
  
  
    return (
    <div>
        <h1>Quotation</h1>

         <div className="">
            <label htmlFor="">Product:</label>
            <select
             value={product}
             onChange={(e)=>setProduct(Number(e.target.value))}>   
             

             <option value={100}>Website Design ($100)</option>
             <option value={200}>Mobaile App ($200)</option>
             <option value={50}>Logo design ($50)</option>

             </select>

             <br/><br/>

             <label htmlFor="">Quantity:</label>
             <input 
             type={Number}
             value={quantity}
             min={1}
             onChange={(e)=>setQuantity(Number(e.target.value))} />

             <br/><br/>

             <button onClick={calculateQuote}>Get Quotetion</button>

             <h1>Total: {total}</h1>
         </div>

    </div>
  )
}

export default Quotation