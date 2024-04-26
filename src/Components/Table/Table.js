import React from 'react'

export const Table = (props) => {
    const {headings,data,columns} = props;

  return <div className='table'>
    <table className='table'>
       <thead>
        <tr>

{ data.length>0 && headings.map((val,index)=>{
return <th key={`th_${index}`}>{val}</th>
})
                  }</tr>
       </thead>
       <tbody>
        {
            data.map((obj,ind)=>{
return <tr key={`tr_${ind}`}>

    {
        columns.map((val,ind)=>{
return <td key={`td_${ind}`}>{obj[val]}</td>
        })
    }
</tr>
            })
        }
       </tbody>

    </table>
  </div>
}


