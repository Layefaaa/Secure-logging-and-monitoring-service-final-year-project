import axios from "axios";


export async function getAccounts(){
    try{
        const response= await axios.get('/api/accounts');
        return response.data
    }catch(error){
        console.error(error);
    }
}