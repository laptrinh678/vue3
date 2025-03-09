<template>
    <div v-html="rawHtml">
        
        
    </div>
    <button @click="addAudio">Add audio</button>
</template>
<script setup>
import { ref } from "vue"
const rawHtml = ref('<audio controls>'+ '<source src="" type="audio/ogg">'+'</audio>')
const audioSrc = ref(null)
const addAudio = ()=> {
    rawHtml.value = '<audio controls autoplay>'+ 
    '<source src="'+'https://www.w3schools.com/html/horse.ogg'+'"' + 'type="audio/ogg">'+'</audio>'
}
</script>