import { IResponse } from '@/server/common/types';
import axios from 'axios'
import toast from 'react-hot-toast';
export const verifyAccount= async(token:string,ip:string):  Promise<IResponse>=>{
    let client_response:IResponse={
        status:401,
        msg:'',
    }
try {
    const response =await axios.get(`/api/auth/verify-account?t=${token}&ip=${ip}`);
    if(response.status===200){
        client_response=response.data      
    }
} catch (error) {
    toast.error("error")
    if (axios.isAxiosError(error)) {
        console.error('Axios error occurred:',error.response);

    }  
}
return client_response
}