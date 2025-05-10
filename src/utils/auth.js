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
        localStorage.setItem('token',data.token);
        return {success:true};
    }
    catch(error){
        console.log("Error fetching data : ",error);
    }
}



export {login, getValidationsMessagesBasedOnFields};