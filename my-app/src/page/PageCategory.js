import React,{useEffect} from 'react';

export default function PageCategory({match:{params:{_id}}, getData}){
    useEffect(()=> (getData(_id), undefined), [_id])
    return (<><h1>Категория {_id}</h1></>)
}

