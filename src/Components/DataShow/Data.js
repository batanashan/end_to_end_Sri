import React from 'react'
import styles from './Data.module.css'
const Data = (props) => {
    const {show,isShow,name,email,pwd,phn,gender,hob,country,add} = props;
    const fnClick = ()=>{
        isShow(false)
    }
  return (<div>
    <div className={`${styles.hide}`}></div>
    <div className={`${styles.box}`}>
      <p className='text-end'><button className="btn btn-danger " onClick={fnClick}> X</button></p>
      <h4><b>FUll Name</b>:..........      {name}</h4>
      <h4><b>Email</b>:............     {email}</h4>
      <h4><b>Password</b>:..........        {pwd}    </h4>
      <h4><b>Phone No</b>:.............    {phn}</h4>
      <h4><b>Gender</b>:.............      {gender}</h4>
      <h4><b>Hobbies</b>:............      {hob}</h4>
      <h4><b>Country</b>: ...........     {country}</h4>
      <h4><b>Address</b>: ...........     {add}</h4>
    </div></div>
  )
}

export default Data;
