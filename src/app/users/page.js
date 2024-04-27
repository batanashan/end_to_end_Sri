'use client'
import { Table } from '@/Components/Table/Table'
import axios from 'axios'
import React, { useContext, useEffect,useState } from 'react'
import { appCtx } from '@/constants/createCtx'

const Users = () => {
    const [users,setUsers]= useState([])
   const ctxData =  useContext(appCtx)
    useEffect(()=>{
fnUsers()
    },[])

const fnUsers=async()=>{
    ctxData.dispatch({type:"LOADER",payload:true})
    try{
  const result=await  axios.get("http://localhost:2020/std/get-user")
setUsers(result.data)
    }catch(err){
        console.error("users",err)
    }
    finally{
        ctxData.dispatch({ type: "LOADER", payload: false })
    }
}
    return <div>
      <h1 className='text-center bg-primary'>Users Data</h1>
     <Table headings={["NAME", "EMAIL", "MOBILENO", "GENDER", "COUNTRY","ADDRESS"]} data={users} columns={["name", "email", "phn", "gender", "country","add"]} />
    </div>
}

export default Users;