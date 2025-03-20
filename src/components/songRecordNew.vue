<template>
  <div>
    <el-button @click="startRecording" v-if="!isRecording">Start Recording</el-button>
    <el-button @click="stopRecording" v-else>Stop Recording</el-button>
    <canvas ref="waveformCanvas" v-show="isRecording"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ElButton } from 'element-plus';

const isRecording = ref(false);
const audioContext = ref(null);
const analyser = ref(null);
const dataArray = ref(null);
const waveformCanvas = ref(null); // Sử dụng ref để tham chiếu đến canvas
let animationFrameId = ref(null);

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
    analyser.value = audioContext.value.createAnalyser();
    const source = audioContext.value.createMediaStreamSource(stream);
    source.connect(analyser.value);
    analyser.value.fftSize = 2048;
    const bufferLength = analyser.value.frequencyBinCount;
    dataArray.value = new Uint8Array(bufferLength);
    isRecording.value = true;
    drawWaveform();
  } catch (error) {
    console.error('Error accessing microphone:', error);
  }
};

const stopRecording = () => {
  isRecording.value = false;
  if (audioContext.value) {
    audioContext.value.close();
  }
  cancelAnimationFrame(animationFrameId.value);
  waveformCanvas.value.style.display = 'none';
};

const drawWaveform = () => {
  if (!isRecording.value) return;

  animationFrameId.value = requestAnimationFrame(drawWaveform);
  analyser.value.getByteTimeDomainData(dataArray.value);

  const canvas = waveformCanvas.value;
  const canvasCtx = canvas.getContext('2d');

  canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = 'rgb(0, 0, 255)';

  canvasCtx.beginPath();

  const sliceWidth = canvas.width * 1.0 / analyser.value.fftSize;
  let x = 0;

  for (let i = 0; i < analyser.value.fftSize; i++) {
    const v = dataArray.value[i] / 128.0;
    const y = v * canvas.height / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();
};

onMounted(() => {
  // Đảm bảo rằng canvas đã được render trước khi sử dụng
  if (waveformCanvas.value) {
    const canvas = waveformCanvas.value;
    const canvasCtx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
});

onUnmounted(() => {
  if (isRecording.value) {
    stopRecording();
  }
});
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100px;
  background-color: #f0f0f0;
}
</style>