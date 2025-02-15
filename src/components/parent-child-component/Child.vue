<template>
    <div>
        <p>Đây là component con</p>
        <p>Data fix cứng: {{ message }} --thì property ở component cha không cần có dấu : ở trước (message="hab555") </p>
        <p>Data động : {{ dataInReturn }} -- thì property ở component cha cần có dấu : ở trước (:dataInReturn="nameUser")</p>
        <p>Nhận dữ liệu từ method ở component cha: {{ userAge }}</p>
    </div>
</template>
<script>
export default {
    // cần khai báo các props ở đây, và định kiểu dữ liệu thì mới hiển thị được
    props: {
        message: String,
        dataInReturn: String,
        userAge: String
    }
}
</script>