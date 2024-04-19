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
    },
    "Exact_10_digits":{
        regex:/^[0-9]{10}$/,
        errorMsg:"Enter 10 digits only"
    }
}



export const validationCriteria = (inputObject)=>{
    for(let i=0 ;i<inputObject.criteria.length;i++){
         
        const {regex, errorMsg} = appValidation[ inputObject.criteria[i]]
        if(!regex.test(inputObject.value)){
          inputObject.errMsg=errorMsg
          break;
        }
      }
}

 export const fnFieldValidation = (eve,inputCntrls)=>{
    debugger;
    const {name,value,type,checked}=eve.target;
    const inputClonedObj = JSON.parse(JSON.stringify(inputCntrls))
   const inputObject =  inputClonedObj.find((obj)=>{
        return obj.name===name
    })
    inputObject.errMsg=""
if(type === "checkbox"){
const checkedValues = inputObject.value ? inputObject.value.split(',') : [] ;
if(checked){
    checkedValues.push(value)
}
else{
    const index = checkedValues.indexOf(value)
    checkedValues.splice(index,1)
   
}
inputObject.value = checkedValues.join(',')
}else{
    inputObject.value=value;
}

    validationCriteria(inputObject)
  
    return inputClonedObj;
}


export const fnFormValidation = (inputCntrls)=>{

    const inputClonedObj = JSON.parse(JSON.stringify(inputCntrls))
 
const dataObject = {}
    inputClonedObj.forEach((inputObject)=>{
        dataObject[inputObject.name] = inputObject.value
        validationCriteria(inputObject)
    })
    const isFormInvalid = inputClonedObj.some((obj)=>{return obj.errMsg})
    return [dataObject,isFormInvalid ,inputClonedObj]
}