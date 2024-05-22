import React from 'react';
import "../App.css"
import { MdClose } from 'react-icons/md';

const FloatingWindow = ({handleSubmit, handleOnChange, handleClose, rest}) => {
  return (
    <div className="addContainer">
        <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleClose}><MdClose/></div>
          <label htmlFor="name">Name:</label>
          <input type="text" id='name' name='name' onChange={handleOnChange} value={rest.name}/>
  
          <label htmlFor="mobile">Mobile:</label>
          <input type="text" id='mobile' name='mobile' onChange={handleOnChange} value={rest.mobile}/>
  
          <button className='btn'>Submit</button>
        </form>
      </div>
  )
}

export default FloatingWindow;