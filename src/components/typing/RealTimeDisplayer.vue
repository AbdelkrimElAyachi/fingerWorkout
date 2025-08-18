<!-- RealTimeDisplayer.vue -->
<template>
    <div>
        <p>wrong characters : {{ results.wrongCharacters }}  correct characters : {{ results.correctCharacters }}</p>
        <p>wrong words : {{ results.wrongWords }}  correct words : {{ results.correctWords }}</p>
    </div>
</template>
<script>
    export default {
        props: {
            results: Object
        },
        watch: {
        }
    }
</script>
