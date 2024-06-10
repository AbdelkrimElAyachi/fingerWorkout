<script setup>
    import Popup from "./Popup.vue";
</script>

<template>
    <div class="mt-16 text-secondary">
        <p class="text-primary text-center text-2xl">{{time}}s</p>
        <p ref="phrase" class="text-bold text-2xl leading-[3rem]"></p>
        <p>wrong characters : {{results.wrongCharacters}}  correct characters : {{results.correctCharacters}}</p>
        <p>wrong words : {{results.wrongWords}}  correct words : {{results.correctWords}}</p>
        <div class="flex gap-2 mt-5 justify-center">
            <button @click="restart" class="text-primary border-2 px-4 border-primary hover:text-white hover:bg-primary">restart</button>
        </div>
        <div v-if="showResults">
            <Popup :result=results @close-results="closeResults" />
        </div>
    </div>
</template>


<script>
import getPhrases from "../utils/phrases.js";

export default {
    data() {
        return {
            // when we will store our 
            phrases : [],
            text : [],
            phraseIndex : 0,
            wordIndex : 0,
            charIndex : 0,
            start:false,
            finish:false,
            time:6,
            html : "",
            showResults : false,
            // css classes , we will use them to generate our html 
            wordClasses : [],
            charClasses : [],

            results : {
                wrongCharacters:0,
                wrongWords:0,
                correctCharacters:0,
                correctWords:0,
            }
        };
    },


    async mounted(){
        setInterval(() => {
            this.secondPassed();
        }, 1000);
        document.addEventListener("keydown",this.buttonClicked);
        this.phrases = await this.generatePhrases();
        this.generate();
        this.render();
    },


    methods: {
        // handling events
        secondPassed(){
            // lol variable to track if this.finish changes later on
            let lol = false;
            if(!this.finish){
                lol = true;
            }
            if(this.time <= 0){
                this.finish = true;
            }
            if(this.start && !this.finish){
                this.time--;
            }
            // now we are sure using lol that this.finish was false and become true then this means the test finished in this second
            if(lol && this.finish){
                this.showResults = true;
            }

        },
        closeResults() {
            this.showResults = false;
        },
        // generating methods
        async generatePhrases(){
            return await getPhrases("hard",8,"dog")
        },
        generate(){
            this.text = this.phrases[this.phraseIndex].split(" ").map((word)=>word.split(""));
            this.wordClasses = this.text.map((word)=>"");
            this.wordClasses[0] = "border-b-4 border-primary";
            this.charClasses = this.text.map((word)=>word.map((char)=>"text-secondary"));
        },
        generateHtml(){
            this.html = this.text.map((word,index)=>{
                let characters = word.map((char,ind)=>{
                    return `<span class="${this.charClasses[index][ind]}">${char}</span>`;
                }).join("");
                return `<span class="${this.wordClasses[index]}">${characters}</span>`;
            }).join(" ");
        },


        // handling actions methods
        spaceClicked(){
            this.charIndex = 0;
            this.wordIndex++;
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
            this.generate();
        },
        buttonClicked(e){
            console.log("button clicked")
            if(!this.finish){
                this.start = true;
            }
            else{
                this.start = false;
                return ;
            }
            // handling space key
            if(e.key == " ") {
                if(! ( this.text[this.wordIndex].length == this.charIndex ) ){
                    this.wordClasses[this.wordIndex] = "border-b-4 border-error";
                }
                this.spaceClicked();
            } 
            // ignoring any other keys except english letters and numbers , we can add other languages in the future
            if(!this.isLetter(e.key)) return false;
            if(e.key == this.text[this.wordIndex][this.charIndex]){
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
                this.text[this.wordIndex].push(e.key);
                this.charClasses[this.wordIndex].push("text-error");
            }
            this.charIndex++;
            this.render();
        },
        restart(){
            console.log("restart");
            this.phraseIndex = 0;
            this.wordIndex = 0;
            this.charIndex = 0;
            this.time = 60;
            this.finish = false;
            this.generate();
            this.render();
        },

        // checking methods
        isLetter(key){
            const code = key.charCodeAt(0);
            return key.length <= 1 && ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) ||(code >= 48 && code <= 57) ) ;
        },
        isWordEnding(){
            return ( this.charIndex < this.text[this.wordIndex].length );
        },
        isLineEnding(){
            return (this.wordIndex >= this.text.length);
        },

        // rendering the text 
        render(){
            // console.log("rendering text");
            this.generateHtml();
            this.$refs.phrase.innerHTML = this.html;
        },

    }
};
</script>
