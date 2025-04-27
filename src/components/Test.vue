<!-- Your main component (e.g., TypingTest.vue) -->
<template>
    <div class="mt-16 mx-auto text-secondary w-fit">
      <Timer 
        :timeLeft="timeLeft"
        @time-up="handleTimeUp" 
      />
      
      <p ref="phrase" class="text-bold text-2xl leading-[3rem]"></p>
      <RealTimeDisplayer
        :results="results"
      />
      
      <TypingArea @restart="restart" />
      
      <div v-if="showResults">
        <Popup :result="results" @close-results="closeResults" />
      </div>
    </div>
  </template>
  
<script>

  import Timer from '@/components/ui/Timer.vue'
  import RealTimeDisplayer from '@/components/ui/RealTimeDisplayer.vue'
  import TypingArea from '@/components/ui/TypingArea.vue'
  import Popup from '@/components/ui/Popup.vue'
  import { getPhrases, shuffleArray } from "@/utils/phrases.js"
  import { useSoundStore, useParameterStore } from "@/store.js"
  
  export default {
    components: { Timer, RealTimeDisplayer, TypingArea, Popup },
    props: {
      items: { type: Array, required: true }
    },
    data() {
      return {
        // audio
        audioPath: "",
        audio: null,
        // text data
        phrases: [],
        currentText: [],
        // indexes
        phraseIndex: 0,
        wordIndex: 0,
        charIndex: 0,
        // monitoring the test
        start: false,
        finish: false,
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
    async mounted() {
      document.addEventListener("keydown", this.buttonClicked)
      this.results.duration = this.duration
      await this.generatePhrases()
      this.duration = useParameterStore.getDuration
      this.results.duration = this.duration;
      this.timeLeft = this.duration * 60;
      this.generatePhraseText()
      this.audioPath = "/assets/sounds/" + useSoundStore.getSound + ".wav"
      this.render();
      this.startTimer();
    },
    unmounted() {
      document.removeEventListener('keydown', this.buttonClicked)
    },
    methods: {
        // Keep all your existing methods except render() and generateHtml()
        // which are now in RealTimeDisplayer
        startTimer() {
            this.timerInterval = setInterval(() => {
                this.secondPassed();
            }, 1000);
        },
        handleTimeUp() {
            this.finish = true
            this.showResults = true
        },
        // ... rest of your methods
        async generatePhrases(){
            let words = this.items;
            shuffleArray(words);
            this.phrases =  await getPhrases(8,words[0]);
        },
        generatePhraseText(){
            this.currentText = this.phrases[this.phraseIndex].split(" ").map((word)=>word.split(""));
            this.wordClasses = this.currentText.map((word)=>"");
            this.wordClasses[0] = "border-b-4 border-primary";
            this.charClasses = this.currentText.map((word)=>word.map((char)=>"text-secondary"));
        },
        generateHtml(){
            return this.currentText.map((word,index)=>{
                let characters = word.map((char,ind)=>{
                    return `<span class="${this.charClasses[index][ind]}">${char}</span>`;
                }).join("");
                return `<span class="${this.wordClasses[index]}">${characters}</span>`;
            }).join(" ");
        },
        render(){
            // console.log("rendering text");
            let html = this.generateHtml();
            this.$refs.phrase.innerHTML = html;
        },
        secondPassed(){
            // lol variable to track if this.finish changes later on
            let lol = !this.finish;
            if(this.timeLeft <= 0){
                this.finish = true;
            }
            if(this.start && !this.finish){
                this.timeLeft--;
            }
            // now we are sure using lol that this.finish was false and become true then this means the test finished in this second
            if(lol && this.finish){
                this.showResults = true;
            }

        },
        closeResults() {
            this.showResults = false;
        },
        spaceClicked(){
            // if used clicked space before finishing the word count it as falsse
            if(! ( this.currentText[this.wordIndex].length == this.charIndex ) ){
                this.wordClasses[this.wordIndex] = "border-b-4 border-error";
            }
            this.charIndex = 0;
            this.wordIndex++;
            // see if the word is correct by checking the boreder bottom color and increase other correct words or wrong words
            if(this.wordClasses[this.wordIndex - 1] != "border-b-4 border-error"){
                this.results.correctWords++;
                this.wordClasses[this.wordIndex - 1] = "";
            }
            else{
                this.results.wrongWords++;
            }
            if(this.isLineEnding()) this.nextLine();
            // handling the display of the word
            this.wordClasses[this.wordIndex] = "border-b-4 border-primary";
            this.render();
        },
        nextLine(){
            this.phraseIndex++;
            this.wordIndex = 0;
            this.charIndex = 0;
            this.generatePhraseText();
        },
        buttonClicked(e){
            this.audio = new Audio("/assets/sounds/" + useSoundStore.getSound + ".wav");
            this.audio.currentTime = 0.1;
            console.log(useSoundStore.getSoundLevel/100);
            this.audio.volume = (useSoundStore.getSoundLevel/100);
            this.audio.play();
            // if user start typing and the test is not finished start the test else if the test is finished stop the test and return nothing
            if(!this.finish){
                this.start = true;
            }
            else{
                this.start = false;
                return ;
            }
            // if the user press space key 
            if(e.key == " ") {
                this.spaceClicked();
                return ;
            } 
            // ignoring any other keys except english letters and numbers , we can add other languages in the future
            if(!this.isLetter(e.key)) return false;
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
            if(!this.isWordEnding()) {
                this.wrongCharacters++;
                this.currentText[this.wordIndex].push(e.key);
                this.charClasses[this.wordIndex].push("text-error");
            }
            this.charIndex++;
            this.render();
        },
        restart(){
            this.generatePhraseText();
            this.phraseIndex = 0;
            this.wordIndex = 0;
            this.charIndex = 0;
            this.duration = useParameterStore.getDuration
            this.timeLeft = this.duration * 60;
            this.finish = false;
            this.results = {
                wrongCharacters:0,
                wrongWords:0,
                correctCharacters:0,
                correctWords:0,
                duration:1,
            }
            this.start = false;
            this.finish = false;
            this.showResults = false;
            this.render();
        },

        // checking methods
        isLetter(key){
            const code = key.charCodeAt(0);
            return key.length <= 1 && ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) ||(code >= 48 && code <= 57) ) ;
        },
        isWordEnding(){
            return ( this.charIndex < this.currentText[this.wordIndex].length );
        },
        isLineEnding(){
            return (this.wordIndex >= this.currentText.length);
        },
        playSound(){
            console.log("../assets/sounds/"+useSoundStore.getSound+".wav");
        },
    }
  }
  </script>