import React from 'react';
import { Link } from 'react-router-dom';


function Donation() {

  return (
    <div className='footer'>
      <button><Link to="/donate" className="btnLink" >Donate!</Link></button>
    </div>
  );
}


export default Donation;