<template>
    <div>
         <h1>Truyền dữ liệu từ component cha sang con - đây là component cha</h1>
         <p>B1: khai báo component chile và component parent </p>
         <p>B2: Import component Child vào component parent </p>
         <p>B3: Khai báo tên thuộc tính trên component cha</p>
         <Child message="hab555"  :dataInReturn="nameUser" :userAge="setAge()"/>
    </div>
</template>
<script>
import Child from './Child.vue';
export default {
    components: {
        Child
    },
    data () {
        return {
            nameUser : 'Nguyễn văn ABC',
            age: 15
        }
        
    },
    methods: {
        setAge(){
            return 155;
        }
    }
}
</script>