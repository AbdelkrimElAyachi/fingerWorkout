<script setup>
import { api_url } from "@/globals";

const apiUrl = api_url;
</script>

<template>
    <div class="hidden">
        <input ref="pictureInput" type="file" name="file" @change="handlePictureChange">
    </div>
    <div v-if="editMode" class="w-4/12 p-6 relative group ">
        <img v-if="editedPicture" class="rounded-full w-full aspect-square object-cover group-hover:opacity-50" :src="picture" alt="avatar">
        <img v-else-if="picture" class="rounded-full w-full aspect-square object-cover group-hover:opacity-50" :src="apiUrl+'/uploads/'+picture" alt="avatar">
        <img v-else src="/assets/avatar.webp" class="rounded-full w-full aspect-square object-cover group-hover:opacity-50" alt="avatar">
        <div
            class="absolute inset-0 opacity-0 flex items-center z-10 justify-center group-hover:opacity-50"
            @click="openFileInput"
        >
            <p class="text-xl font-bold" >choose image</p>
        </div>
    </div>
    <div v-else class="w-4/12 p-6">
        <img v-if="picture" class="rounded-full w-full aspect-square object-cover" :src="apiUrl+'/uploads/'+picture" alt="avatar">
        <img v-else src="/assets/avatar.webp" class="rounded-full" alt="avatar">
    </div>
</template>
<script>

export default {
    props:{
        editMode:{
            type: Boolean,
            required: true,
        },
        picture:{
            type: String,
            required: false,
            default: null
        },
        pictureData:{
            type: String,
            required: false,
            default: null
        }
    },
    emits: ['update:pictureData','update:picture'],
    data(){
        return {
            editedPicture: false,
        }
    },
    methods:{
        openFileInput(){
            this.$refs.pictureInput.click();
        },
        handlePictureChange(event){
            this.previewImage(event);
            // handle uploading image
            this.$emit('update:pictureData',event.target.files[0]);
        },
        previewImage(event){
            const file = event.target.files[0];
            if(!file) return ;
            this.editedPicture = true;
            const image = URL.createObjectURL(file);
            this.$emit('update:picture', image)
        },
    }
}
</script>