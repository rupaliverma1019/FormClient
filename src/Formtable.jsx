import React from 'react'
import {MdCancel} from "react-icons/md"
import "./Formtable.css"
const Formtable = ({handleSubmit, handleOnChange , handleClose, rest}) => {
  return (
    <div className='container'>
      <div className='cancel'  onClick={handleClose}><MdCancel/></div>
      <form className='form'  onSubmit={handleSubmit}>
        
        <label htmlFor='name'>Name:</label>
        <input type='text' id='' name='name' onChange={handleOnChange} value={rest.name}></input>
        <label htmlFor='number'>Mobile Number</label>
        <input type='text' id='' name='mobile' onChange={handleOnChange} value={rest.mobile}></input>
        <label htmlFor='name'>Designation</label>
        <input type='text' id='' name='designation' onChange={handleOnChange} value={rest.designation}></input>
        <label htmlFor='name'>Address</label>
        <input type='text' id='' name='address' onChange={handleOnChange} value={rest.address}></input>
        <label htmlFor='name'>Email</label>
        <input type='email' id='' name='email' onChange={handleOnChange} value={rest.email}></input>
        <button type='submit'> Submit </button>

      </form>
    </div>
  )
}

export default Formtable
