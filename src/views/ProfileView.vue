<script setup>
const tabs = [
    { name:'tab1', title:'Profile'},
    { name:'tab2', title:'History'},
]

//test objet example
/*
_id: "6855f8b4096b449ee6f539c2"
datetime: "2025-06-21T00:11:32.548Z"
duration: 1
numberCorrectCharacters: 304
numberCorrectWords: 58
numberWrongCharacters: 8
numberWrongWords: 6
userId: "68446bad74c5f8340bac86d6"
*/

let testsResultsData;
let lineChartData;
let lineChartOptions;
onMounted(async ()=>{
    let wpmResults = []
    let dates = [];
    testsResultsData = await getTestResults()
    testsResultsData.forEach(test=> {
        wpmResults.push(test.numberCorrectWords / test.duration);
        let d = new Date(test.datetime).toLocaleDateString();
        dates.push(d);
    });

    console.log(wpmResults);
    console.log(dates);

    lineChartData = {
        labels: dates.reverse(),
        datasets: [{
            label: 'WPM',
            data: wpmResults.reverse(),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }

    lineChartOptions = {
        responsive: true
    }
})


</script>

<template>
    <main class="main-container bg-backgroundColor min-h-screen text-textColor">
        <Header />
        <div class="flex gap-16 w-10/12 mx-auto mt-12">
            <ImageInput v-model:editMode="editMode" v-model:picture="picture" v-model:pictureData="pictureData"/>
            <div class="w-7/12" >
                <TabsHeader v-model="currentTab" :tabs="tabs" />
                <div v-if="currentTab=='tab1'" class="p-4 flex flex-col pt-10 rounded-tr-md rounded-bl-md rounded-br-md gap-10 bg-backgroundColorDarker">
                    <div v-if="editMode" class="grid grid-cols-[1fr] gap-6 text-xl font-bold">
                        <BaseInput 
                            v-model="name"
                            label=""
                            type="text"
                            placeholder="your name"
                            :error="nameError"
                            required 
                        />
                        <BaseInput 
                            v-model="email"
                            label=""
                            type="email"
                            placeholder="your@gmail.com"
                            :error="emailError"
                            required 
                        />
                        <div class="flex items-center">
                            <input for="includePassword" id="incluePassword" name="includePassword" v-model="includePassword" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="includePassword" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Update Password</label>
                        </div>
                        <BaseInput 
                            v-if="includePassword"
                            v-model="newPassword"
                            label=""
                            type="password"
                            placeholder="******"
                            :error="newPasswordError"
                            required 
                        />
                        <BaseInput 
                            v-if="includePassword"
                            v-model="verifyNewPassword"
                            label=""
                            type="password"
                            placeholder="******"
                            :error="newPasswordError"
                            required 
                        />
                    </div>
                    <div v-else class="grid grid-cols-[150px_300px] gap-6 font-bold">
                        <div>Username : </div>
                        <div>{{ name }}</div>
                        <div>Email : </div>
                        <div>{{ email }}</div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <BaseButton v-if="editMode" @click="save" variant="primary">{{ isLoading ? "Loading..." : "Save" }}</BaseButton>
                        <BaseButton v-if="editMode" @click="annuler" variant="danger">Annuler</BaseButton>
                        <BaseButton v-if="!editMode" @click="activateEditMode" variant="primary">Edit</BaseButton>
                        <BaseButton v-if="!editMode" @click="handleLogout" variant="danger" :disalbed="isLoading">{{isLoading ? 'Logging out...' : 'Log out'}}</BaseButton>
                    </div>
                </div>
                <div v-if="currentTab=='tab2'" class="p-4 flex flex-col pt-10 rounded-tr-md rounded-bl-md rounded-br-md gap-10 bg-backgroundColorDarker">
                    <Line 
                    :data="lineChartData"
                    :options="chartOptions"
                    />
                </div>
            </div>
        </div>
    </main> 
</template>
<script>
import Header from '@/components/layout/Header.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import TabsHeader from '@/components/layout/TabsHeader.vue';
import ImageInput from "@/components/base/ImageInput.vue";
import { useAuthStore } from '@/stores';
import { updateProfile } from '@/utils/auth';
import { getTestResults } from '@/utils/tests';
import { onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import {Chart as ChartJS} from 'chart.js/auto';

export default {
    data(){
        return{
            name: null,
            nameError:null,
            email: null,
            emailError: null,
            picture: null,
            pictureData: null,
            pictureError: null,
            editedPicture: false,
            newPassword: null,
            verifyNewPassword: null,
            newPasswordError: null,
            editMode: false,
            includePassword: false,
            isLoading: false,
            currentTab:'tab1',
        }
    },
    components:{
        BaseButton,
        BaseInput,
        Header,
        TabsHeader,
        ImageInput,
        Line
    },
    computed:{
        authStore(){
            return useAuthStore();
        }
    },
    async created(){
        if(!this.authStore.isAuthenticated){
            this.$router.push('/login');
        }
        this.email = this.authStore.email;
        this.name = this.authStore.name;
        this.picture = this.authStore.picture;
    },
    methods:{
        // logout logic
        async handleLogout(){
            this.isLoading = true;
            await this.authStore.clear();
            this.isLoading = false;
            this.$router.push('/');
        },
        // state handling
        activateEditMode(){
            this.clearErros();
            this.editMode = true;
        },
        async save(){
            let isValid = true;
            let res = null;

            this.clearErros();

            if(!this.name){
                this.nameError = "The field name is required";
                isValid = false;
            }
            if(!this.email){
                this.emailError = "The field email is required";
                isValid = false;
            }
            if(this.includePassword && !this.newPassword){
                this.newPasswordError = "The field password is required";
                isValid = false;
            }
            if(this.includePassword && this.newPassword != this.verifyNewPassword){
                this.newPasswordError = "The password does not match";
                isValid = false;
            }
            if(!isValid){
                return;
            }
            let formData = new FormData();

            formData.append('name',this.name);
            formData.append('email',this.email);
            if(this.includePassword){
                formData.append('password',this.newPassword);
            }
            formData.append('picture',this.pictureData);

            this.isLoading = true;
            try{
                res = await updateProfile(formData);
            }
            catch(error){
                this.newPasswordError = "Sorry an unexpecated error happened, try again later"
                this.isLoading = false;
                return;
            }
            if(!res?.success){
                if(res.errors.validationErrors){
                    this.nameError = res.errors.validationErrors['name'];
                    this.emailError = res.errors.validationErrors['email'];
                    this.newPasswordError = res.errors.validationErrors['password'];
                }
                else{
                    this.emailError = res.errors.authError;
                }
                this.isLoading = false;
                return ;
            }
            this.authStore.setUser(res.user, false);
            this.isLoading = false;
            this.editMode = false;
            this.editedPicture = false;
            this.picture = this.authStore.picture;
        },
        annuler(){
            this.name = this.authStore.name;
            this.email = this.authStore.email;
            this.picture = this.authStore.picture;
            this.editMode = false;
            this.editedPicture = false;
        },
        clearErros(){
            this.nameError = "";
            this.emailError = "";
            this.newPasswordError = "";
        },
        onUnmounted(){
            URL.revokeObjectURL(this.picture);
        }
        
    }
}

</script>
