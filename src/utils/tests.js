import api from "@/utils/api";

const saveTestResults = (numberCorrectCharacters, numberCorrectWords, numberWrongCharacters, numberWrongWords, duration)=>{
    try{
        return new Promise(async (resolve, reject) => {
            let now = new Date().toISOString();
            const res = await api.post('/json/test/save',{
                numberCorrectCharacters,
                numberCorrectWords,
                numberWrongCharacters,
                numberWrongWords,
                duration,
                datetime:now
            });
            const data = await res.data;
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


const getTestResults = (page, limit) => {
    try{
        return new Promise(async (resolve, reject) => {
            const res = await api.get(`/json/test/all?page=${page}&limit=${limit}`)
            const data = await res.data;
            if(!data.success){
                reject(false);
            }
            resolve({
                testResults: data.data, 
                total : data.total, 
                pages : data.pages, 
                page : data.page, 
                limit : data.limit
            });
        })
    }
    catch(error){
        console.log("Error fetching data : ",error);
        reject(false);
    }  
}

const getTopTestResult = () => {
    try{
        return new Promise(async (resolve, reject) => {
            const res = await api.get('/json/test/top')
            const data = await res.data;
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

export {saveTestResults, getTestResults, getTopTestResult};
