'use client'
import React ,{useState} from 'react'
import configuration from './configuration.json'
import Input from '@/Components/Input'
import Select from '@/Components/Select'
import Textarea from '@/Components/Textarea'
import {fnFieldValidation,fnFormValidation} from '../../validations/validation.js'

const Register = () => {
    const [inputCntrls,setInputCntrls]=useState(configuration)
    const fnChange =(eve)=>{
        const   inputClonedObj = fnFieldValidation(eve,inputCntrls)
        
            setInputCntrls( inputClonedObj )
        }
        const fnClick = ()=>{
     
    const [dataObject,isFormInvalid,inputClonedObj ]=fnFormValidation(inputCntrls)
    if(isFormInvalid){
      setInputCntrls(inputClonedObj )
      return;
    }
    console.log(JSON.stringify(dataObject))
        }
  return <div>
      {
        inputCntrls.map((obj,ind)=>{
          switch(obj.tag){
    case 'select':
        return <Select  key={`select_${ind}`}   {...obj} fnChange={fnChange}/>
break;
case 'textarea':
    return <Textarea  key={`textarea_${ind}`}   {...obj}  fnChange={fnChange}/>
default:
 return <Input key={`input_${ind}`}   {...obj}  fnChange={fnChange} />
}
        })
    
     }
     <div className='row'>
<div className='offset-sm-4 col-sm-4'><button className='btn btn-primary'onClick={fnClick}>Register</button></div>
     </div>
    </div>
   
  
}

export default Register
