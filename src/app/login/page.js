'use client'
import Input from '@/Components/Input'
import React, { useContext, useState } from 'react'
import configuration from './configuration.json'
import { fnFieldValidation, fnFormValidation } from '../../validations/validation.js'
import { useRouter } from 'next/navigation';
import axios from 'axios'
import { appCtx } from '@/constants/createCtx'
import { toast } from 'react-toastify'
import Link from 'next/link'
const Login = () => {
  const [inputCntrls, setInputCntrls] = useState(configuration)
  const ctxData = useContext(appCtx)
  const [data, setData] = useState({})
  const router = useRouter();
  const fnChange = (eve) => {
    const inputClonedObj = fnFieldValidation(eve, inputCntrls)

    setInputCntrls(inputClonedObj)
  }

  const fnClick = async () => {

    const [dataObject, isFormInvalid, inputClonedObj] = fnFormValidation(inputCntrls)
    if (isFormInvalid) {
      setInputCntrls(inputClonedObj)
      return;
    }
    try {
      ctxData.dispatch({ type: "LOADER", payload: true })
      const result = await axios.post("http://localhost:2020/std/login", { data: dataObject })
     
       if(result.data.length){
        ctxData.dispatch({type:"LOGIN",isLoggedIn:true,user:result.data[0]})
        sessionStorage.userInfo =JSON.stringify(result.data[0])
         router.push('/home')
       }else{
toast.error("Please check uid & password")
       }
    } catch (err) {
      console.error("Login", err)
      toast.error("something went wrong")
    } finally {
      ctxData.dispatch({ type: "LOADER", payload: false })
    }
  }
  return (
    <div>
      {
        inputCntrls.map((obj, ind) => {
          return <Input key={`input_${ind}`}   {...obj} fnChange={fnChange} />
        })
      }
      <div className='row'>
        <div className='offset-sm-4 col-sm-4'><button className='btn btn-primary me-5' onClick={fnClick}>Login</button>
        <Link href="/register">To Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login;
