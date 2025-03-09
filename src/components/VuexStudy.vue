<template>
    <p>vuexyyyy --- {{ name }}</p>
    <p><button @click="setName('hoàng')">setname</button></p>
</template>
<script >
import { computed } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
export default {
    computed :{
        ...mapGetters(['name'])
    },methods: {
        // lấy hàm setName trong store về component sử dụng, giờ hàm setName trong store gọi như hàm bình thường trong component
        ...mapMutations(['setName'])
    
    }
}

</script>