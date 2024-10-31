



import axios from "axios";

export async function getAccount(id:string){
    try{
        const response= await axios.get(`/api/account?id=${id}`);
        return response.data
    }catch(error){
        console.error(error);
    }
}
