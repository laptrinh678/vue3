<template>
  <div class="custom-textarea">
    <el-input
      v-model="inputText"
      type="textarea"
      :placeholder="placeholder"
      :autosize="{ minRows: minRows }"
       show-word-limit
    >
      <!-- Sử dụng slot suffix để custom hiển thị -->
      <template #suffix>
        <span class="custom-input__count">{{ inputText.length }}</span>
      </template>
    </el-input>
  </div>
  <p>{{inputText.length }}</p>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    maxlength: {
      type: Number,
      default: 50000,
    },
    placeholder: {
      type: String,
      default: 'Nhập, sao chép hoặc tải văn bản lên để chuyển đổi thành giọng nói uu',
    },
    minRows: {
      type: Number,
      default: 4,
    },
  },
  setup(props) {
    const inputText = ref('');

    return {
      inputText,
    };
  },
};
</script>

<style scoped>
.custom-textarea {
  position: relative;
}

.custom-input__count {
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 12px;
  color: #909399;
}
</style>