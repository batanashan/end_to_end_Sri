'use client'
import React,{useState} from 'react'
import configuration from './configuration.json'
import Input from '@/Components/Input'
import Select from '@/Components/Select'
import Textarea from '@/Components/Textarea'
import { fnFieldValidation, fnFormValidation } from '../../validations/validation.js'
// import axios from 'axios'
import { appCtx } from '@/constants/createCtx'
// import { toast } from 'react-toastify'
const Profile = () => {
    const [inputCntrls, setInputCntrls] = useState(configuration)
    // const ctxData = useContext(appCtx)
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

    }
    return <div className='container-fluid'>
        <h1 className='bg-primary text-center m-0 my-3'>Profile</h1>
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
            <div className='offset-sm-4 col-sm-4'><button className='btn btn-primary  me-5' onClick={fnClick}>Update</button>
                <button className='btn btn-primary ' onClick={fnClick}>Delete</button>

            </div>
        </div>

    </div>
}

export default Profile