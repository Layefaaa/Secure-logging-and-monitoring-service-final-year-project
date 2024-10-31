import { IResponse } from '@/server/common/types';
import axios from 'axios'
export const controlUser= async(id:string):Promise<IResponse>=>{
const formData={id}
let client_response:IResponse={
    status:401,
    msg:'',
}
try {
    const response =await axios.post('/api/control_user', formData)
    client_response=response.data;
} catch (error) {
    if (axios.isAxiosError(error)) {
        console.error('Axios error occurred:',error);

    }  
}
return client_response
}