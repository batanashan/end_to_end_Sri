'use client'
import React, { useContext, useEffect, useState } from 'react'
import configuration from './configuration.json'
import Input from '@/Components/Input'
import Select from '@/Components/Select'
import Textarea from '@/Components/Textarea'
import { fnFieldValidation, fnFormValidation, fnReset } from '../../validations/validation.js'
import axios from 'axios'
import { appCtx } from '@/constants/createCtx'
import { toast } from 'react-toastify'
import { Modal } from '@/Components/Modal/Modal'
import { useRouter } from 'next/navigation';
const Profile = () => {
    const [inputCntrls, setInputCntrls] = useState(configuration)
    const [isShowModal, setIsShowModal] = useState(false)
    const router =  useRouter()
    const ctxData = useContext(appCtx)
    useEffect(() => {
        fnSetFormData()
    }, [])
    const fnSetFormData = () => {
        const clonedObject = JSON.parse(JSON.stringify(configuration))
        const userInfo = JSON.parse(sessionStorage.userInfo);


        clonedObject.forEach((obj) => {
            obj.value = userInfo[obj.name]

        })
        setInputCntrls(clonedObject)
    }
    // const ctxData = useContext(appCtx)
    const fnChange = (eve) => {
        const inputClonedObj = fnFieldValidation(eve, inputCntrls)

        setInputCntrls(inputClonedObj)
    }

    const fnUpdate = async () => {

        const [dataObject, isFormInvalid, inputClonedObj] = fnFormValidation(inputCntrls)
        if (isFormInvalid) {
            setInputCntrls(inputClonedObj)
            return;
        }

        try {
            ctxData.dispatch({ type: "LOADER", payload: true })
            const result = await axios.put(`http://localhost:2020/std/send-put?id=${ctxData.state.user._id}`, { data: dataObject })

            const { acknowledged, modifiedCount } = result.data
            if (acknowledged && modifiedCount) {
                const userInfo = JSON.parse(sessionStorage.userInfo)
                sessionStorage.userInfo = JSON.stringify({ ...userInfo, ...dataObject })
                ctxData.dispatch({ type: "LOGIN", isLoggedIn: true, user: { ...userInfo, ...dataObject } })
                toast.success("successfully Updated")
            } else {
                toast.error("failed to Update")
            }
        } catch (err) {
            toast.error("something went wrong")
            console.log("profile", err)
        }
        finally {
            ctxData.dispatch({ type: "LOADER", payload: false })
        }


    }
    const fnTerminate = () => {
        setIsShowModal(true)
    }
    const fnOk = async () => {
        try {
            setIsShowModal(false)
            ctxData.dispatch({ type: "LOADER", payload: true })
            const res = await axios.delete(`http://localhost:2020/std/send-delete/${ctxData?.state?.user?._id}`)
            const { acknowledged, deletedCount } = res.data
            if (acknowledged && deletedCount) {
                toast.success("successfully Terminated")
                setInputCntrls(fnReset(inputCntrls))
             ctxData.dispatch({ type: "LOGIN", isLoggedIn: false})
              router.push('/')
           
            } else {


                toast.error("Not Terminated try again ")
            }




        } catch (ex) {
            toast.error("something went wrong,Please check console")
            console.error("profile_", ex)

        } finally {
            ctxData.dispatch({ type: "LOADER", payload: false })
        }
    }
    const fnClose = () => {
        setIsShowModal(false)

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
            <div className='offset-sm-4 col-sm-4'><button className='btn btn-primary  me-5' onClick={fnUpdate}>Update</button>
                <button className='btn btn-primary' onClick={fnTerminate}>Delete</button>

            </div>
        </div>
        {isShowModal && <Modal text={"R u sure ............"} isShowOk={true} fnOk={fnOk} fnClose={fnClose} />}

    </div>
}

export default Profile