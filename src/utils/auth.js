const api_url = import.meta.env.VITE_API_URL;

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
        const res = await fetch(`${api_url}/user/login`,{
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
        const res = await fetch(`${api_url}/user/register`,{
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
        throw Error("")
    }
}

const uploadProfilePicture = async(file)=>{
    if(!this.file){
        return ;
    }
    const formData = new FormData();
    formData.append('file',file);

    try{
        const res = await fetch(`${api_url}/upload`,{
            method:'POST',
            body: formData
        })

        const data = await res.json();
        console.log(data);
    }
    catch(err){
        throw Error("Error establishing connection : "+error)
    }
}


const getUser = async ()=>{
    const token = localStorage.getItem('auth_token');
    if(!token){
        return false;
    }
    try{
        const res = await fetch(`${api_url}/profile`,{
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

export {login, register, getUser};