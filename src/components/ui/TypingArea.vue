<!-- TypingArea.vue -->
<template>
<div class="flex gap-2 mt-5 justify-center">
    <button 
        @click="restart" 
        class="text-primary border-2 px-4 py-1 border-primary hover:text-white hover:bg-primary"
    >
    restart
    </button>
</div>
</template>

<script>
export default {
    methods: {
        restart(e) {
        e.target.blur()
        this.$emit('restart')
        }
    }
}
</script>