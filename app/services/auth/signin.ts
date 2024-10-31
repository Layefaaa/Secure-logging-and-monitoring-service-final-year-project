
import { IResponse } from '@/server/common/types';
import axios from 'axios'
interface UserDetails{
    email: string;
    password: string;
    ip:string;
}

export const signIn= async(userDetails:UserDetails):Promise<IResponse>=>{
const formData=userDetails
let client_response:IResponse={
    status:401,
    msg:'',
}
try {
    const response =await axios.post('/api/auth/signin', formData)
    client_response=response.data     
} catch (error) {
    if (axios.isAxiosError(error)) {
        console.error('Axios error occurred:',error);

    }  
}

return client_response
}