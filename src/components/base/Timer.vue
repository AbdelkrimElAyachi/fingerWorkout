<!-- Timer.vue -->
<template>
    <p class="text-primary text-center text-2xl">{{ timeLeft }} s</p>
</template>

<script>
export default {
    props: {
        timeLeft: {
            type: Number,
            required: true
        }
    },
}
</script>