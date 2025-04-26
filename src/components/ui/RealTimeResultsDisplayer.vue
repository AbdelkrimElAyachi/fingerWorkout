<!-- RealTimeDisplayer.vue -->
<template>
    <div>
      <p ref="phrase" class="text-bold text-2xl leading-[3rem]"></p>
      <p>wrong characters : {{ results.wrongCharacters }}  correct characters : {{ results.correctCharacters }}</p>
      <p>wrong words : {{ results.wrongWords }}  correct words : {{ results.correctWords }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentText: Array,
      wordClasses: Array,
      charClasses: Array,
      results: Object
    },
    methods: {
      generateHtml() {
        return this.currentText.map((word, index) => {
          let characters = word.map((char, ind) => {
            return `<span class="${this.charClasses[index][ind]}">${char}</span>`
          }).join("")
          return `<span class="${this.wordClasses[index]}">${characters}</span>`
        }).join(" ")
      },
      render() {
        let html = this.generateHtml()
        this.$refs.phrase.innerHTML = html
      }
    },
    watch: {
      currentText: {
        handler() {
          this.render()
        },
        deep: true
      },
      wordClasses: {
        handler() {
          this.render()
        },
        deep: true
      },
      charClasses: {
        handler() {
          this.render()
        },
        deep: true
      }
    },
    mounted() {
      this.render()
    }
  }
  </script>