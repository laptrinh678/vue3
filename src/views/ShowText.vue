<template>
  <div>{{ displayedText }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const words = ['hà', 'nội', 'là', 'thành'];
const displayedText = ref('');
let wordIndex = 0;
let charIndex = 0;

onMounted(() => {
  displayNextChar();
});

function displayNextChar() {
  if (wordIndex < words.length) {
    const currentWord = words[wordIndex];
    if (charIndex < currentWord.length) {
      displayedText.value += currentWord[charIndex];
      charIndex++;
      setTimeout(displayNextChar, 300); // Điều chỉnh tốc độ hiển thị ở đây (300ms)
    } else {
      displayedText.value += ' '; // Thêm khoảng trắng giữa các từ
      wordIndex++;
      charIndex = 0;
      setTimeout(displayNextChar, 300);
    }
  }
}
</script>