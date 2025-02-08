<template>

<input type="text" v-model="text">
<button @click="sendDataToParentComponent()">Send data to Parent Component</button>    
<button @click="changeTabFromComponentChild()">Change tab from component child</button>
<div class="items" >
    <div class="item" v-for="item in hab" :key="item.key">
        <img :src="item.url" alt="" class="content">
        <p class="action-gallery">{{message}}</p>
    </div>
   

  </div>
  </template>
<script >
export default {
  props: {
    message: String
  },
  data() {
    return {
      hab: [
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
       {'name': 'l3', 'url': 'https://cdnphoto.dantri.com.vn/s8mbgenQOnl_RymHHGEIUORioLg=/thumb_w/480/thumb-video/short-video/2025/02/05/8568-1738744524328/0_00_00.jpg'},
       {'name': 'l4', 'url': 'https://cdnphoto.dantri.com.vn/ySXrsKbpP3oz1hMReEE0eN6GmvQ=/zoom/240_160/2024/04/22/bhyt-1713764279210.jpeg'}
      ],
      text: null
    }

  },
  methods:{
    sendDataToParentComponent(){
      this.$emit('updateDataParent', this.text)
    },
    changeTabFromComponentChild(){
      this.$emit('changeTabFromChild')
    }
  }

}

</script>
<style scoped>
.items {
  column-count: 3;
  column-gap: 5px;
  column-rule-style:double;
  column-rule:0cqmax;
  position: relative;
}
.content {
 background: #CCC;
  padding: 0px;
  margin-top: 0px;
  width: 300px;
  height: auto;
}

.item:first-child .content {
  margin-top: 0;
}
.itemImage {
  width: 100%;
  height: auto;
}
.action-gallery {
  position: absolute;
}
</style>