import api from "@/utils/api";

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
        const res = await api.post('/json/login',{
            email,
            password,
        });

        const data = res.data;

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
        const res = await api.post('/json/register',{
            name: name,
            email: email,
            password: password
        });

        const data = await res.data;
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
    try{
        const res = await api.post('/profile/update', formData);

        const data = await res.data;

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
    try{
        const res = await api.get('/json/profile');
        const data = await res.data;
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
