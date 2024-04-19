'use client'
import Input from '@/Components/Input'
import React, { useState } from 'react'
import configuration from './configuration.json'
import {fnFieldValidation,fnFormValidation} from '../../validations/validation.js'
const Login = () => {
    const [inputCntrls,setInputCntrls]=useState(configuration)
    const [data,setData]=useState({})
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
  return (
    <div>
     {
        inputCntrls.map((obj,ind)=>{
return <Input key={`input_${ind}`}   {...obj} fnChange={fnChange}/>
        })
     }
     <div className='row'>
<div className='offset-sm-4 col-sm-4'><button className='btn btn-primary' onClick={fnClick}>Login</button></div>
     </div>
    </div>
  )
}

export default Login
