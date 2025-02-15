<template>
    <div>
         <h1>TRUYỀN DỮ LIỆU TỪ COMPONENT CON LÊN COMPONENT CHA</h1>
         <p>B1: Khai báo thuộc tính property tại parent compinent sử dụng dấu @ đằng trước là viết tắt của sự kiện v-on</p>
         <p>Trong Vue.js, ký tự @ là một shorthand (viết tắt) của v-on, được dùng để lắng nghe sự kiện từ component con hoặc phần tử HTML.</p>
         <p>
            khai bao sự kiện  @propertyParent tại component cha, thuộc tính này sẽ lắng nghe sự kiện tại component con thông qua và được
          truyền tải dữ liệu thông qua hàm $emit("ten_sukien", "tham_so_gui_len_parent")
         </p>  

         <Child @propertyParent="getDataInChild"/>
         <p>Data from component Child: {{ message }}</p>
    </div>
</template>
<script>
import Child from './Child.vue';
export default {
    components: {
        Child
    },
    data() {
        return {
            message : null
        }
    },
    methods: {
        // function này sẽ nhận dữ liệu thông qua event propertyParent và xử lý để thay đổi dữ liệu tại component cha
        getDataInChild (dataFromChild) {
            console.log(dataFromChild);
            this.message = dataFromChild
        }
    }
}
</script>