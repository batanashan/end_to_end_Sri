import React from 'react'

const Select = (props) => {
    const {lbl,errMsg,fnChange,name,value,id,options,values}=props;
  return (
    <div className='row my-3'>
     <div className='col-sm-4 text-end'><b>{lbl} :</b></div>
     <div className='col-sm-4'>
        
        <select id={id} name={name}   className='form-control' onChange={fnChange}>
            <option value="">select options</option>
            {
                options.map((opt,ind)=>{
                return <option key={`opt_${ind}`} value = {values[ind]}>{opt}</option>
                })
            }
            </select>
        </div>
     <div className='col-sm-4 text-start'>
      {errMsg &&  <span className='text-danger'>{errMsg}</span> }
        </div>
    </div>
  )
}

export default Select;
