import React from 'react'

export default function InputComponent ({inputObj}){
return <input type={inputObj.type} id={'input'+ inputObj.id} value={inputObj.value} onChange={inputObj.onChange}/>
}