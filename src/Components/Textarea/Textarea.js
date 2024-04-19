import React from 'react'

const Textarea = (props) => {
    const {lbl,errMsg,fnChange,name,value,id}=props;
  return (
    <div className='row my-3'>
     <div className='col-sm-4 text-end'><b>{lbl} :</b></div>
     <div className='col-sm-4'>
        <textarea  id={id} name={name} value={value} onChange={fnChange} className='form-control'></textarea>
        
        </div>
     <div className='col-sm-4 text-start'>
      {errMsg &&  <span className='text-danger'>{errMsg}</span> }
        </div>
    </div>
  )
}

export default Textarea ;
