<template>
<p>Masony555</p>
  <div class="items">
  <div class="item">
    <div class="content">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </div>
  </div>
  <div class="item">
    <div class="content">
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
       when an unknown printer took a galley of type and scrambled it to make a type specimen book.
       It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
    </div>
  </div>
  <div class="item">
    <div class="content">
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
      and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </div>
  </div>
  <div class="item">
    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Vestibulum eget nisl nulla. Duis aliquam posuere placerat.
      Ut condimentum purus id magna pellentesque, vel faucibus nunc pretium.
    </div>
  </div>
  <div class="item">
    <div class="content">
      Nulla justo lacus, sagittis nec nunc et, varius egestas risus. Aenean malesuada consectetur felis, quis hendrerit lorem ultricies et.
      Etiam at nibh a lacus pellentesque semper ut hendrerit dui. Nullam vitae lobortis tellus, in dignissim turpis.
      Nam molestie odio at accumsan pellentesque.
    </div>
  </div>
  <div class="item">
    <div class="content">
      Fusce fermentum, augue et interdum pharetra, turpis elit rhoncus sem, eu luctus enim velit ac turpis. Phasellus et porta mi.
      Morbi nisi lorem, vehicula in tellus id, blandit imperdiet velit. Ut dignissim eget odio lobortis posuere. Integer a ullamcorper erat.
    </div>
  </div>
  <div class="item">
    <div class="content">
      Etiam vel laoreet mi. Morbi ultricies velit vel sapien porta, vitae rutrum eros efficitur.
      Quisque sagittis, enim sit amet convallis fermentum, nisl metus dapibus massa, vitae auctor ligula nisi ac neque.
      Suspendisse interdum et purus sed lacinia.
    </div>
  </div>
  <div class="item">
    <div class="content">
      Suspendisse consectetur, magna non scelerisque semper, nisl nisi vulputate nisi, vitae luctus urna sapien eget massa.
      Donec non pharetra sem. Aliquam vitae pellentesque mi, et convallis nisl. Nulla facilisi. Vestibulum vitae condimentum nulla.
    </div>
  </div>
  <div class="item">
    <div class="content">
      Duis luctus malesuada tellus, ut cursus ligula pretium eu. Quisque nisl urna, pellentesque sed laoreet eget,
      imperdiet in tellus. Ut porttitor hendrerit erat.
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
const items = [
  {
    title: 'First',
    description: 'The first item.',
    url: 'https://cdnphoto.dantri.com.vn/g5fQvlQqJktHSTRaxq9qG-tkwn8=/zoom/240_160/2025/02/05/tet-2025-cuoc-thi-anh-20250125161535875-2-1738204285263jpg-1738733886654.jpg'
  },
  {
    title: 'Second',
    description: 'The second item.',
    url: 'https://cdnphoto.dantri.com.vn/WDOv1a7AppwXgekWrvNz2MEWDzE=/zoom/240_160/2025/02/05/thuyen1-edited-1738745062087.jpeg'
  },
   
   {
    title: 'Second3',
    description: 'The second item.',
    url: 'https://cdnphoto.dantri.com.vn/HzCSTwdDIEkOwtlDvAr5tTpA_7g=/zoom/351_234/2025/02/05/trumpreuters-1738732303277.jpg'
  },
   {
    title: 'Second3',
    description: 'The second item.',
    url: 'https://cdnphoto.dantri.com.vn/dZqjrsqajkjoIkPTCiKrt5P4nwQ=/zoom/468_312/2025/02/04/thumb-1738680031722.jpg'
  },
   {
    title: 'Second6',
    description: 'The second item.',
    url: 'https://cdnphoto.dantri.com.vn/AkBejTjZ9vC8U_fBA-5ppjX_T8o=/zoom/468_312/2025/02/05/nguoi-dan-ong-o-tra-vinh-trung-so-doc-dac-thumb-588-8679-crop-1738747111118.jpeg'
  },
]
</script>
<style scoped>
.items {
  column-count: 3;
  column-gap: 2px;
}
.item {
  break-inside: avoid;
}
.content {
  background: #CCC;
  padding: 15px;
  margin-top: 10px;
}
.item:first-child .content {
  margin-top: 0;
}
</style>