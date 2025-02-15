<template>
    <div>
       <button @click="sendMessage()">SendData</button>
    </div>
</template>
<script>
export default {
  methods:{
    sendMessage() {
       // hàm emit sẽ nhận 2 tham số là property tại component cha và dữ liệu của component con muốn gửi lên component cha
        this.$emit("propertyParent", "data : nguyen van a");
    }
  }
    
}
</script>