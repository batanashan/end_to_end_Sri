import React from 'react'

const Input = (props) => {
    const {lbl,type,errMsg,fnChange,name,value,id}=props;
  return (
    <div className='row my-3'>
     <div className='col-sm-4 text-end'><b>{lbl} :</b></div>
     <div className='col-sm-4'><input id={id} name={name} value={value} type={type} className='form-control' onChange={fnChange}/></div>
     <div className='col-sm-4 text-start'>
        <span className='text-danger'>{errMsg}</span> 
        </div>
    </div>
  )
}

export default Input
