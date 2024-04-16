'use client'
import Input from '@/Components/Input'
import React, { useState } from 'react'
import configuration from './configuration.json'
const Login = () => {
    const [inputCntrls,setInputCntrls]=useState(configuration)
    const [data,setData]=useState({})
    const fnChange =(eve)=>{
        const {name,value}=eve.target;
        const inputClonedObj = JSON.parse(JSON.stringify(inputCntrls))
       const inputObject =  inputClonedObj.find((obj)=>{
            return obj.name===name
        })
       inputObject.errMsg=""
        inputObject.value=value;
        if(!value){
            inputObject.errMsg="Please Enter"
        }
    
        setInputCntrls( inputClonedObj )
    }
  return (
    <div>
     {
        inputCntrls.map((obj,ind)=>{
return <Input key={`input_${ind}`}   {...obj} fnChange={fnChange}/>
        })
     }
     <div className='row'>
<div className='offset-sm-4 col-sm-4'><button className='btn btn-primary'>Login</button></div>
     </div>
    </div>
  )
}

export default Login
