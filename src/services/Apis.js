import { commonrequest } from "./ApiCall";

import {BASE_URL } from './helper';


export const  registerfunc = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/register`,data,header);
    
}

export const usergetfunc = async()=>{
    return commonrequest("GET",`${BASE_URL}/user/details`,"")
}