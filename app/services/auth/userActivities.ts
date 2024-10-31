

import axios from 'axios'
export const fetchUserActivities= async()=>{

try {
    const response =await axios.get('/api/request');
    return response.data;

} catch (error) {
    if (axios.isAxiosError(error)) {
        console.error('Axios error occurred:',error);

    }  
}

}