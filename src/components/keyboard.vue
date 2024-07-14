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
            rows : []
        };
    },

    async mounted(){
        document.addEventListener('keydown',this.clicked);
        if(this.keyboardType == "AZERTY"){
            this.rows.push(["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "°", "+"]);
            this.rows.push(["a", "z", "e", "r", "t", "y", "u", "i", "o", "p", "^", "$"]);
            this.rows.push(["q", "s", "d", "f", "g", "h", "j", "k", "l", "m", "ù", "%"]);
            this.rows.push(["w", "x", "c", "v", "b", "n", ",", ";", ":", "!"]);
        }
        this.render();
    },

    methods: {
        clicked(e){
            this.render(e.key);
        },
        render(keyClicked=null){
            console.log("find it ",keyClicked);
            let html = this.rows.map((row)=>{
                let rowHTML = row.map((key) => {
                    if(key==keyClicked && key != null){
                        return `<div class="keyword clicked" >${ key }</div>`
                    }
                    return `<div class="keyword" >${ key }</div>`
                }).join("");
                return `<div class="row">${rowHTML}</div>`;
            }).join("");
            this.$refs.keyboard.innerHTML = html;
        }
    }
};

</script>


<style>

.keyboard .row {
    padding:5px;
    width:fit-content;
    margin-inline:auto;
    margin-top:10px;
    background:#000;
    display:flex;
    gap:15px;
}
.clicked{
    background: #00FFFF!important;
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

</style>
