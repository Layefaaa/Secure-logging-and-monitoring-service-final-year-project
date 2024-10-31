"use client"
export const clientIp=async()=>{
    try{
    const response=await fetch('https://api64.ipify.org?format=json');
    const client=await response.json();
    return client.ip;
    }catch(error){
        console.log("error",error)
        return {ip:''}

    }

    
}
