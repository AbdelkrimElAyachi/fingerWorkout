<script setup>
    import Popup from "./Popup.vue";
</script>

<template>
    <div class="mt-16 mx-auto text-secondary w-fit">
        <p class="text-primary text-center text-2xl"> {{timeLeft}} s</p>
        <p ref="phrase" class="text-bold text-2xl leading-[3rem]"></p>
        <p>wrong characters : {{results.wrongCharacters}}  correct characters : {{results.correctCharacters}}</p>
        <p>wrong words : {{results.wrongWords}}  correct words : {{results.correctWords}}</p>
        <div class="flex gap-2 mt-5 justify-center">
            <button @click="restart" class="text-primary border-2 px-4 py-1  border-primary hover:text-white hover:bg-primary">restart</button>
        </div>
        <div v-if="showResults">
            <Popup :result=results @close-results="closeResults" />
        </div>
    </div>
</template>


<script>
import {getPhrases,shuffleArray} from "../utils/phrases.js";

export default {
    props: {
        duration:{
            type: Number,
            required:true
        },
        items:{
            type: Array,
            required:true
        }
    },
    data() {
        return {
            // customization attributes
            // when we will store our 
            phrases : [],
            currentText : [],
            timeLeft : 0,
            phraseIndex : 0, // changes when the phrase end in the function nextLine , restart when the test restart used to decide which phrase we are in
            wordIndex : 0, // 
            charIndex : 0,
            start:false,
            finish:false,
            showResults : false,
            // css classes , we will use them to generate our html 
            wordClasses : [],
            charClasses : [],

            results : {
                wrongCharacters:0,
                wrongWords:0,
                correctCharacters:0,
                correctWords:0,
                duration:1,
            }
        };
    },

    unmounted(){
        document.removeEventListener('keydown',this.buttonClicked);
        console.log("test unmounted");
    },

    async mounted(){
        setInterval(() => {
            this.secondPassed();
        }, 1000);
        this.results.duration = this.duration;
        this.timeLeft = this.duration * 60;
        document.addEventListener("keydown",this.buttonClicked);
        this.phrases = await this.generatePhrases();
        this.generatePhraseText();
        this.render();
    },


    methods: {
        async generatePhrases(){
            let words = this.items;
            shuffleArray(words);
            return await getPhrases(8,words[0]);
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
        restart(e){
            e.target.blur();
            this.phraseIndex = 0;
            this.wordIndex = 0;
            this.charIndex = 0;
            this.timeLeft = 60;
            this.finish = false;
            this.results = {
                wrongCharacters:0,
                wrongWords:0,
                correctCharacters:0,
                correctWords:0,
                duration:1,
            }
            this.generatePhraseText();
            this.render();
            this.start = false;
            this.finish = false;
            this.showResults = false;

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

    }
};
</script>
