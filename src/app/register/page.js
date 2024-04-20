'use client'
import React ,{useState} from 'react'
import configuration from './configuration.json'
import Input from '@/Components/Input'
import Select from '@/Components/Select'
import Textarea from '@/Components/Textarea'
import {fnFieldValidation,fnFormValidation} from '../../validations/validation.js'
import Data from '@/Components/DataShow/Data'

const Register = () => {
    const [inputCntrls,setInputCntrls]=useState(configuration)
    const [show,isShow] = useState(false)
    const [result,setResult] = useState("")
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
    isShow(true)
 setResult(dataObject)
        }
  return <div className='container-fluid'>
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
   { show && <Data show={show} isShow={isShow} {...result}/>}
    </div>
   
  
}

export default Register
