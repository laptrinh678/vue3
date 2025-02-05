<template>
    <masonry-wall :items="items" :ssr-columns="4" :column-width="300" :gap="1">
      <template #default="{ item, index }">
        <div>
         <img :src="item.url" alt="" class="item-img">
        </div>
      </template>
    </masonry-wall>
  </template>
<script setup lang="ts">
const items = [
       { 'name':'lap1', 'url':'https://cdnphoto.dantri.com.vn/RDxnGFEEl3hhrsI9K6F4Ei7s3WE=/zoom/351_234/2024/07/03/kremlintass-crop-1719965063577.jpeg' },
       { 'name':'lap2', 'url':'https://cdnphoto.dantri.com.vn/pwdJPryH1rbyas7KcJNxQBZcz1M=/zoom/468_312/2025/02/05/mua-vang-via-than-tai17-1738736657876.jpg' },
       { 'name':'lap3', 'url':'https://cdnphoto.dantri.com.vn/kNsjxAt7Xs3mDQBDFJ021lXMaCo=/zoom/300_200/2025/02/05/khach-dat-phong-qua-mang-mat-1-ty-dong-khu-nghi-duong-o-ninh-binh-noi-gi-2-edited-crop-1738746570905.jpeg' },
       { 'name':'lap1', 'url':'https://cdnphoto.dantri.com.vn/6-gbcpmczslX3Rt8zpQ97vsFZew=/zoom/468_312/2025/02/04/780780-1738637021710.jpg' },
       { 'name':'lap1', 'url':'https://cdnphoto.dantri.com.vn/RDxnGFEEl3hhrsI9K6F4Ei7s3WE=/zoom/351_234/2024/07/03/kremlintass-crop-1719965063577.jpeg' },
       { 'name':'lap1', 'url':'https://cdnphoto.dantri.com.vn/3vX9FjDThdJ_ruvqDtudJaa4-sU=/zoom/240_160/2024/03/24/vang-crop-1711251509264.jpeg' },
       { 'name':'lap1', 'url':'https://cdnphoto.dantri.com.vn/RDxnGFEEl3hhrsI9K6F4Ei7s3WE=/zoom/351_234/2024/07/03/kremlintass-crop-1719965063577.jpeg' },
       { 'name':'lap1', 'url':'https://cdnphoto.dantri.com.vn/dsOzGw7VTprEUJlhIQKCXnByPbo=/zoom/468_312/2025/02/05/my-trung-1544671056193532835314-crop-1738757942702.jpeg' },
       { 'name':'lap1', 'url':'https://cdnphoto.dantri.com.vn/uO7gg2xIkAKDIJLsEzHDww_j0ZE=/zoom/288_192/2025/02/05/foto-bij-netcongestie-crop-1738756767957.jpeg' },
       { 'name':'lap1', 'url':'https://icdn.dantri.com.vn/zoom/300_200/2025/02/04/ngoaitruongmyreuters-1738663635859.jpg' },
       { 'name':'lap1', 'url':'https://cdnphoto.dantri.com.vn/wY5GZKhuOQB283bqHCTQjiqRROc=/zoom/300_200/2025/02/05/vu-dang-minh-1738756664167.jpg' },
]
</script>
<style scoped>
.item-img {
    width: 300px;
}
</style>