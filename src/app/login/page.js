'use client'
import Input from '@/Components/Input'
import React, { useState } from 'react'
import configuration from './configuration.json'
const Login = () => {
    const [data,setData]=useState({})
    const fnChange =(eve)=>{
        const {name,value}=eve.target;
setData({
    ...data,
    [name]:value})
console.log(data)
    }
  return (
    <div>
     {
        configuration.map((obj,ind)=>{
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
