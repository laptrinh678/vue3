<template>
    <div>
        <p>Tow way binding</p>
        <p>{{name}}</p>
    </div>
     <input type="text" v-model="name">
</template>
<script>
export default {
    data() {
        return {
            name: null
        }
    },
}
</script>