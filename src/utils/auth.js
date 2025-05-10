const api_url = import.meta.env.VITE_API_URL;

function getValidationMessageFromResponse(field,data){

}

const login = async ()=>{
    try{
        const res = await fetch(`${api_url}/user/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: 'est',
                password: 'test'
            }),
            credentials: 'include'
        })
        const data = await res.json();
        if(data?.issues){
            console.log(data.issues);
            for(let i = 0; i<data.issues.length; i++){
                console.log(data.issues[i].path[0]);
            }
        }
    }
    catch(error){
        console.log("Error fetching data : ",error);
    }
}



export {login};