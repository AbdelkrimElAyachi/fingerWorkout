<template>
    <div ref="keyboard" class="keyboard">
    </div>
</template>


<script>

export default {

    name: "Keyboard",

    props: {
        keyboardType: {
          type: String,
          required: true
        }
    },

    data(){
        return {
            rows : [],
            timeOut : true
        };
    },

    async mounted(){
        document.addEventListener('keydown',this.clicked);
        if(this.keyboardType == "AZERTY"){
            this.rows.push(["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"]);
            this.rows.push(["q", "s", "d", "f", "g", "h", "j", "k", "l", "m", "ù", "%"]);
            this.rows.push(["w", "x", "c", "v", "b", "n", ",", ";", ":", "!"]);
            this.rows.push(["space"]);
        }
        this.render();
    },

    methods: {

        clicked(e){
            this.render(e.key,true);
        },

        render(keyClicked=".",true_or_false=true,duration=3){
            console.log(duration);

            let html = this.rows.map((row)=>{
                let rowHTML = row.map((key) => {
                    if(key == "space"){
                        return `<div class="keyword space ${keyClicked==' ' ?  true_or_false ? '!bg-primary' : '!bg-error' : ''}" >space</div>`
                    }
                    return `<div class="keyword ${key==keyClicked.toLowerCase() ? true_or_false ? '!bg-primary' : '!bg-error' : '' }" >${ key }</div>`
                }).join("");
                return `<div class="row">${rowHTML}</div>`;
            }).join("");
            this.$refs.keyboard.innerHTML = html;

        },

        off(duration=3){
            setTimeout(()=>{
                if(this.timeout){
                    this.render();
                }
            },duration * 1000);
        }
    }
};

</script>


<style>

.keyboard .row {
    padding:5px;
    width:fit-content;
    background:#000;
    margin-inline:auto;
    margin-top:10px;
    display:flex;
    gap:15px;
}

.keyboard .row .keyword {
    height:42px;
    width:42px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#222;
    border-top: 2px solid #444;
    border-left: 1px solid #444;
}
.space{
    width: 210px!important;
}

</style>
