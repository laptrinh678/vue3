<template>
  <div>
    <el-button @click="startRecording" :disabled="isRecording">Start Recording</el-button>
    <el-button @click="stopRecording" :disabled="!isRecording">Stop Recording</el-button>
    <canvas ref="canvas" width="600" height="200"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref(null);
const isRecording = ref(false);
let audioContext;
let analyser;
let dataArray;
let animationFrameId;
let mediaStream;

const startRecording = async () => {
  if (isRecording.value) return;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStream = stream; // Lưu stream để dừng sau này
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    isRecording.value = true;
    draw();
  } catch (error) {
    console.error('Error accessing microphone:', error);
  }
};

const stopRecording = () => {
  if (!isRecording.value) return;

  // Dừng các track trong stream
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
  }

  // Dừng vẽ dạng sóng
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  // Đóng AudioContext
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }

  isRecording.value = false;

  // Vẽ lại canvas thành đường thẳng màu xanh
  const ctx = canvas.value.getContext('2d');
  const width = canvas.value.width;
  const height = canvas.value.height;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgb(200, 200, 200)';
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = 'rgb(0, 0, 255)';
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();
};

const draw = () => {
  if (!isRecording.value) return;

  const ctx = canvas.value.getContext('2d');
  const width = canvas.value.width;
  const height = canvas.value.height;

  analyser.getByteTimeDomainData(dataArray);

  ctx.fillStyle = 'rgb(200, 200, 200)';
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgb(0, 0, 255)';
  ctx.beginPath();

  const sliceWidth = (width * 1.0) / dataArray.length;
  let x = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * height) / 2;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  ctx.lineTo(width, height / 2);
  ctx.stroke();

  animationFrameId = requestAnimationFrame(draw);
};

onMounted(() => {
  canvas.value.width = canvas.value.offsetWidth;
  canvas.value.height = canvas.value.offsetHeight;
});

onUnmounted(() => {
  stopRecording(); // Dọn dẹp khi component bị unmount
});
</script>

<style scoped>
canvas {
  border: 1px solid #000;
  margin-top: 20px;
}
</style>