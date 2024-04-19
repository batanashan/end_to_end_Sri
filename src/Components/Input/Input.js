import React, { Fragment } from 'react'

const Input = (props) => {
    const {lbl,type,errMsg,fnChange,name,value,id,options,values}=props;
    const fnInputTypeChanges = ()=>{
      switch(type){
        case 'text':
        case 'password':
          case 'number':
            return <input id={id} name={name} value={value} type={type} className='form-control' onChange={fnChange}/>
         break;
 case 'radio':
  return   options.map((opt,ind)=>{
 return <Fragment key={`in_${ind}`}><input type={type} name={name} value={values[ind]} className="me-1" onChange={fnChange}/><span className="me-3">{opt}</span></Fragment> 
    })
    break;
  case 'checkbox':
    return   options.map((opt,ind)=>{
      return <Fragment key={`in_${ind}`} ><input name={name}  type={type} value={values[ind]} className="me-1" onChange={fnChange}/><span className="me-3">{opt}</span></Fragment> 
         })
         

      }
    }
  return (
    <div className='row my-3'>
     <div className='col-sm-4 text-end'><b>{lbl} :</b></div>
     <div className='col-sm-4'>
     {fnInputTypeChanges()}
     </div>
     <div className='col-sm-4 text-start'>
       {errMsg && <span className='text-danger'>{errMsg}</span> }
        </div>
    </div>
  )
}

export default Input
