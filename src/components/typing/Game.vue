<!-- Your main component (e.g., TypingTest.vue) -->
<template>
    <div class="mt-6 mx-auto text-secondary w-fit">
      <Timer 
        :timeLeft="timeLeft"
      />
      
      <p 
        ref="phrase"
        class="text-bold text-2xl leading-[3rem] w-[700px] max-w-[80vw] whitespace-nowrap overflow-hidden"
      />
      <RealTimeDisplayer
        :results="results"
      />
    </div>
  </template>
  
<script>
import { connectSocket, emit, registerEvents, unregisterEvents } from '@/services/socketService';
import Timer from '@/components/base/Timer.vue'
import RealTimeDisplayer from '@/components/typing/RealTimeDisplayer.vue'
import TypingArea from '@/components/typing/TypingArea.vue'
import { useSoundStore, useParameterStore } from "@/stores"
import { saveTestResults } from '@/utils/tests'

export default {
    components: { Timer, RealTimeDisplayer, TypingArea},
    props: {
        users: { type: Array, required: true },
        words: { type: Array, required: true },
        duration : { type: Number, required: true },
        user : { type: Object, required: true},
        index: { type: Number , required: true}
    },
    data() {
        return {
        audioPath: "",
        audio: null, 
        charIndex: 0,
        wordIndex: 0,
        // monitoring the test
        timeLeft: 0, 
        // css classes
        wordClasses: [],
        charClasses: [],
        // results
        showResults: false,
        results: {
            wrongCharacters: 0,
            wrongWords: 0,
            correctCharacters: 0,
            correctWords: 0,
            duration: 1,
            }
        }
    },
    watch: {
      index(newVal) {
        this.wordIndex = newVal; // update when parent changes the prop
        this.render();
      }
    },
    mounted() {
        // existing setup...
        connectSocket(this.user.id);
        document.addEventListener("keydown", this.buttonClicked);
        this.results.duration = this.duration;

        // Calculate timeLeft based on saved timestamp
        const startTs = parseInt(localStorage.getItem('gameStartTimestamp'));
        if(startTs) {
            const elapsed = Math.floor((Date.now() - startTs) / 1000);
            const totalTime = this.duration * 60;
            this.timeLeft = Math.max(totalTime - elapsed, 0);
        } else {
            this.timeLeft = this.duration * 60;
        }
        this.wordIndex = this.index;
        console.log(this.index);
        this.generatePhraseText();
        this.render();
        this.startTimer();
        this.start = true;
    },

    beforeUnmount() {
        document.removeEventListener('keydown', this.buttonClicked)
        unregisterEvents(['gameFinished']); // clean up
    },

    methods: {
        // Keep all your existing methods except render() and generateHtml()
        // which are now in RealTimeDisplayer
        startTimer() {
            this.timerInterval = setInterval(() => {
                this.secondPassed();
            }, 1000);
        },
        generatePhraseText(){
            this.currentText = this.words.map(word => word.split(""));
            this.wordClasses = this.currentText.map((word)=>"");
            this.wordClasses[0] = "border-b-4 border-primary";
            this.charClasses = this.currentText.map((word)=>word.map((char)=>"text-secondary"));
        },
        generateHtml(){
            const start = this.wordIndex;
            const end = Math.min(this.wordIndex+10, this.words.length);
            const visibleWords = this.currentText.slice(start, end);

            return visibleWords.map((word, idx) => {
                const realIndex = start + idx;
                let characters = word.map((char, ind) => {
                    return `<span class="${this.charClasses[realIndex][ind]}">${char}</span>`;
                }).join("");
                return `<span class="${this.wordClasses[realIndex]}">${characters}</span>`;
            }).join(" ");
        },

        render(){
            let html = this.generateHtml();
            this.$refs.phrase.innerHTML = html;
        },

        secondPassed(){
            if(this.timeLeft <= 0){
                this.finish = true;
                return;
            }
            this.timeLeft--;
            // now we are sure using lol that this.finish was false and become true then this means the test finished in this second
            /*
            if(!oldFinish && this.finish){
                const {correctCharacters, correctWords, wrongCharacters, wrongWords, duration} = this.results;
                saveTestResults(
                    correctCharacters,
                    correctWords,
                    wrongCharacters,
                    wrongWords,
                    duration
                ).then(()=> console.log("test results saved correctly"))
                .catch(()=> console.log("test results not saved correctly"))
            }
            */
        },

        spaceClicked(){
            // if used clicked space before finishing the word count it as falsse
            if(! ( this.currentText[this.wordIndex].length == this.charIndex ) ){
                this.wordClasses[this.wordIndex] = "border-b-4 border-error";
            }
            this.charIndex = 0;
            this.wordIndex++;
            // see if the word is correct by checking the boreder bottom color and increase other correct words or wrong words
            const isCorrect = this.wordClasses[this.wordIndex - 1] != "border-b-4 border-error";
            if(isCorrect){
                this.results.correctWords++;
                this.wordClasses[this.wordIndex - 1] = "";
            }
            else{
                this.results.wrongWords++;
            }

            // calling the finishWord event
            emit("finishWord", { isCorrect }, (response) => {
              if (!response.success) {
                console.error("Error updating progress:", response.error);
              }
            });

            // handling the display of the word
            this.wordClasses[this.wordIndex] = "border-b-4 border-primary";
            this.render();
        },
        buttonClicked(e){

            // ignoring any other keys except english letters and numbers , we can add other languages in the future
            if(!this.isLetter(e.key)) return false;

            this.audio = new Audio("/assets/sounds/" + useSoundStore().getSound + ".wav");
            this.audio.currentTime = 0.1;
            this.audio.volume = (useSoundStore().getSoundLevel/100);
            this.audio.play();

            // if the user press space key 
            if(e.key == " ") {
                this.spaceClicked();
                return ;
            } 
            if(e.key == this.currentText[this.wordIndex][this.charIndex]){
                this.results.correctCharacters++;
                this.charClasses[this.wordIndex][this.charIndex] = "text-primary";
            }
            else{
                this.results.wrongCharacters++;
                this.wordClasses[this.wordIndex] = "border-b-4 border-error";
                this.charClasses[this.wordIndex][this.charIndex] = "text-error";
            }
            // if the user add another charcter before taping space it will get added at the end as error and it will count
            if(this.isWordEnding()) {
                this.wrongCharacters++;
                this.currentText[this.wordIndex].push(e.key);
                this.charClasses[this.wordIndex].push("text-error");
            }
            this.charIndex++;
            this.render();
        },

        // checking methods
        isLetter(key){
            if(key == " ") return true;
            const code = key.charCodeAt(0);
            return key.length <= 1 && ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) ||(code >= 48 && code <= 57) ) ;
        },
        isWordEnding(){
            return ( this.charIndex >= this.currentText[this.wordIndex].length );
        },
        playSound(){
            console.log("../assets/sounds/"+useSoundStore().getSound+".wav");
        },
    }
}
</script>
