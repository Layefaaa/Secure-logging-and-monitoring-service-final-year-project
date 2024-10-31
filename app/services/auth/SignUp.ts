
import { IResponse, UserRegisterTy } from '@/server/common/types';
import axios from 'axios'
export const signUp= async(userDetails:UserRegisterTy): Promise<IResponse>=>{
let client_response:IResponse={
    status:401,
    msg:'',
}
const formData=userDetails;

try {
    const response =await axios.post('/api/auth/signup', formData)
 
    if(response.status===200){
        client_response=response.data      
    }

} catch (error) {
    if (axios.isAxiosError(error)) {
        console.error('Axios error occurred:',error.response);

    }  
}

return client_response
}