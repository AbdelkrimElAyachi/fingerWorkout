<template>
    <button 
        v-for="tab in tabs"
        @click="updateTab(tab.name)" 
        :class="['text-lg', 'font-bold', 'rounded-tl-md', 'rounded-tr-md', 'p-2', 'pl-2', 'pr-6', currentTab==tab.name ? 'bg-backgroundColorDarker' : '']"
    >
        {{ tab.title }}
    </button>
</template>
<script>

export default {
    props:{
        tabs:{
            type: Array,
            required: true
        },
        currentTab:{
            type: String,
            required: true,
        }
    },
    emits:['update:currentTab'],
    methods:{
        updateTab(tabName){
            this.$emit('update:currentTab',tabName);
        }
    }
}

</script>