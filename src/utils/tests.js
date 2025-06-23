import { api_url } from "@/globals";


const saveTestResults = (numberCorrectCharacters, numberCorrectWords, numberWrongCharacters, numberWrongWords, duration)=>{
    const token = localStorage.getItem('auth_token');
    if(!token){
        return;
    }
    try{
        return new Promise(async (resolve, reject) => {
            let now = new Date().toISOString();
            const res = await fetch(`${api_url}/json/test/save`,{
                method:'post',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify({
                    numberCorrectCharacters,
                    numberCorrectWords,
                    numberWrongCharacters,
                    numberWrongWords,
                    duration,
                    datetime:now
                })
            });
            const data = await res.json();
            if(!data.success){
                reject(false);
            }
            resolve(true);
        })
    }
    catch(error){
        console.log("Error fetching data : ",error);
        reject(false);
    }  
}


const getTestResults = () => {
    const token = localStorage.getItem('auth_token');
    if(!token){
        return;
    }
    try{
        return new Promise(async (resolve, reject) => {
            const res = await fetch(`${api_url}/json/test/all`, {
                method: 'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            })
            const data = await res.json();
            if(!data.success){
                reject(false);
            }
            resolve(data.data);
        })
    }
    catch(error){
        console.log("Error fetching data : ",error);
        reject(false);
    }  
}

export {saveTestResults, getTestResults};