import { api_url } from "@/globals";

function getValidationsMessagesBasedOnFields(data){
    const messages = {};
    for(let i = 0; i<data.issues.length; i++){
        const field = data.issues[i].path[0];
        const message = data.issues[i].message;
        messages[field] = message;
    }
    return messages
}

const login = async (email, password)=>{
    try{
        const res = await fetch(`${api_url}/json/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: email,
                password: password
            })
        })
        const data = await res.json();
        if(!data?.success){
            const errors = {};
            if(data?.issues){
                errors['validationErrors'] = getValidationsMessagesBasedOnFields(data);
            }
            if(data?.message){
                errors['authError'] = data?.message
            }
            return {success:false,errors:errors};
        }
        return data;
    }
    catch(error){
        throw Error("Error establishing connection : "+error)
    }
}


const register = async (name, email, password)=>{
    try{
        const res = await fetch(`${api_url}/json/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        const data = await res.json();
        if(!data?.success){
            const errors = {};
            if(data?.issues){
                errors['validationErrors'] = getValidationsMessagesBasedOnFields(data);
            }
            if(data?.message){
                errors['authError'] = data?.message
            }
            return {success:false,errors:errors};
        }
        return data;
    }
    catch(error){
        throw Error("Error establishing connection : "+error)
    }
}

export const updateProfile = async(formData)=>{
    const token = localStorage.getItem('auth_token');
    if(!token){
        return false;
    }
    try{
        const res = await fetch(`${api_url}/profile/update`,{
            method:'POST',
            headers:{
                // dont set the content-type manuall to multipart/form-data the browser will do it better than you
                'Authorization':`Bearer ${token}`
            },
            body: formData
        })
        const data = await res.json();
        if(!data?.success){
            const errors = {};
            if(data?.issues){
                errors['validationErrors'] = getValidationsMessagesBasedOnFields(data);
            }
            if(data?.message){
                errors['authError'] = data?.message
            }
            return {success:false,errors:errors};
        }
        return data;
    }
    catch(err){
        console.log(err)
        throw Error("Error establishing connection : "+err)
    }
}


const getUser = async ()=>{
    const token = localStorage.getItem('auth_token');
    if(!token){
        return false;
    }
    try{
        const res = await fetch(`${api_url}/json/profile`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        });
        const data = await res.json();
        if(!data.success){
            return false;
        }
        return data.user;
    }
    catch(error){
        console.log("Error fetching data : ",error);
    }  
}

const saveTestResults = (numberCorrectCharacters, numberCorrectWords, numberWrongCharacters, numberWrongWords, duration)=>{
    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem('auth_token');
        if(!token){
            reject(false);
        }
        try{
            let now = new Date().toISOString();
            const res = await fetch(`${api_url}/json/test/save`,{
            method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify({
                    numberCorrectCharacters:numberCorrectCharacters,
                    numberCorrectWords:numberCorrectWords,
                    numberWrongCharacters:numberWrongCharacters,
                    numberWrongWords:numberWrongWords,
                    duration:duration,
                    datetime:now
                })
            });
            const data = await res.json();
            if(!data.success){
                reject(false);
            }
            resolve(true);
        }
        catch(error){
            console.log("Error fetching data : ",error);
            reject(false);
        }  
    })
}



export {login, register, getUser, saveTestResults};