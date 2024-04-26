'use client'
import React, { useContext, useState } from 'react'
import configuration from './configuration.json'
import Input from '@/Components/Input'
import Select from '@/Components/Select'
import Textarea from '@/Components/Textarea'
import { fnFieldValidation, fnFormValidation, fnReset } from '../../validations/validation.js'
import axios from 'axios'
import { toast } from 'react-toastify';
import { appCtx } from '@/constants/createCtx'
import Link from 'next/link'
const Register = () => {
  const [inputCntrls, setInputCntrls] = useState(configuration)
  const ctxData = useContext(appCtx)

  const fnChange = (eve) => {
    const inputClonedObj = fnFieldValidation(eve, inputCntrls)

    setInputCntrls(inputClonedObj)
  }
  const fnClick = async () => {

    const [dataObject, isFormValid, inputClonedObj] = fnFormValidation(inputCntrls)

    if (isFormValid) {
      setInputCntrls(inputClonedObj)
      return;
    }
    ctxData.dispatch({ type: "LOADER", payload: true })
    try {
      const result = await axios.post("http://localhost:2020/std/send-post", { data: dataObject })
      const { acknowledged, insertedId } = result.data
      if (acknowledged && insertedId) {

        toast.success("successfully registered")
        setInputCntrls(fnReset(inputCntrls))
      } else {
        toast.error("Not inserted")
      }
    } catch (err) {
      console.error("Register", err)
      toast.error("Please check console")
    }
    finally {
      ctxData.dispatch({ type: "LOADER", payload: false })
    }
  }
  return <div className='container-fluid'>
    {
      inputCntrls.map((obj, ind) => {
        switch (obj.tag) {
          case 'select':
            return <Select key={`select_${ind}`}   {...obj} fnChange={fnChange} />
            break;
          case 'textarea':
            return <Textarea key={`textarea_${ind}`}   {...obj} fnChange={fnChange} />
          default:
            return <Input key={`input_${ind}`}   {...obj} fnChange={fnChange} />
        }
      })

    }
    <div className='row'>
      <div className='offset-sm-4 col-sm-4'><button className='btn btn-primary me-5' onClick={fnClick}>Register</button>
        <Link href="/login">To Login</Link>
      </div>
    </div>

  </div>


}

export default Register
