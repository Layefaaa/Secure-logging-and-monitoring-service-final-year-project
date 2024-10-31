

import axios from 'axios'
export const fetchApiCall= async()=>{
try {
    const response =await axios.get('/api/calls');
    return response.data;
} catch (error) {
    if (axios.isAxiosError(error)) {
        console.error('Axios error occurred:',error);

    }  
}

}