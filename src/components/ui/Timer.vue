<!-- Timer.vue -->
<template>
    <p class="text-primary text-center text-2xl">{{ timeLeft }} s</p>
</template>

<script>
export default {
    props: {
        duration: {
        type: Number,
        required: true
        }
    },
    data() {
        return {
        timeLeft: 0,
        timerInterval: null
        }
    },
    mounted() {
        this.timeLeft = this.duration * 60
        this.timerInterval = setInterval(() => {
        this.timeLeft--
        if (this.timeLeft <= 0) {
            this.$emit('time-up')
            clearInterval(this.timerInterval)
        }
        }, 1000)
    },
    beforeUnmount() {
        clearInterval(this.timerInterval)
    }
}
</script>