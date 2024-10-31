import { IResponse } from '@/server/common/types';
import axios from 'axios'
interface props{
    id: string;
    msg: string;

}

export const sendNotification= async({id,msg}:props):Promise<IResponse>=>{
const formData={id,msg}
let client_response:IResponse={
    status:401,
    msg:'',
}
try {
    const response =await axios.post('/api/message', formData)
    client_response=response.data;
} catch (error) {
    if (axios.isAxiosError(error)) {
        console.error('Axios error occurred:',error);

    }  
}

return client_response
}