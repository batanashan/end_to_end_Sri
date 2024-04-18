export const appValidation = {
    "Required":{
        regex:/./,
        errorMsg:"Required!.."
    },
    "EmailFormat":{
        regex:/^[a-zA-Z][a-zA-Z0-9_&#$]*@[a-zA-Z]{3,5}\.[a-zA-Z]{2,3}$/,
        errorMsg:"Please Enter Email Format"
    },
    "Min6Char":{
regex:/^[a-zA-Z0-9&$#@*_]{6,11}$/,
errorMsg:"Minimum 6 characters required"
    }
}

 export const fnFieldValidation = (eve,inputCntrls)=>{
    const {name,value}=eve.target;
    const inputClonedObj = JSON.parse(JSON.stringify(inputCntrls))
   const inputObject =  inputClonedObj.find((obj)=>{
        return obj.name===name
    })
 inputObject.errMsg=""
    inputObject.value=value;
    for(let i=0 ;i<inputObject.criteria.length;i++){
         
      const {regex, errorMsg} = appValidation[ inputObject.criteria[i]]
      if(!regex.test(value)){
        inputObject.errMsg=errorMsg
        break;
      }
    }
    return inputClonedObj;
}