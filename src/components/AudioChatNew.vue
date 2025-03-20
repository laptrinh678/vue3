<template>
  <div>
    <el-button @click="startRecording" :disabled="isRecording">Start Recording</el-button>
    <el-button @click="stopRecording" :disabled="!isRecording">Stop Recording</el-button>
    <canvas ref="waveformCanvas" width="600" height="200"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const isRecording = ref(false);
    const mediaRecorder = ref(null);
    const audioChunks = ref([]);
    const waveformCanvas = ref(null);
    const audioContext = ref(null);
    const analyser = ref(null);
    const dataArray = ref(null);
    const canvasCtx = ref(null);

    // Khởi tạo AudioContext và Analyser
    const initAudioContext = () => {
      audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
      analyser.value = audioContext.value.createAnalyser();
      analyser.value.fftSize = 2048;
      const bufferLength = analyser.value.frequencyBinCount;
      dataArray.value = new Uint8Array(bufferLength);
    };

    // Bắt đầu ghi âm
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        initAudioContext();

        const source = audioContext.value.createMediaStreamSource(stream);
        source.connect(analyser.value);

        mediaRecorder.value = new MediaRecorder(stream);
        mediaRecorder.value.ondataavailable = (event) => {
          audioChunks.value.push(event.data);
        };
        mediaRecorder.value.onstop = () => {
          const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          console.log('Audio URL:', audioUrl);
        };
        mediaRecorder.value.start();
        isRecording.value = true;

        // Bắt đầu vẽ dạng sóng
        drawWaveform();
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    // Dừng ghi âm
    const stopRecording = () => {
      mediaRecorder.value.stop();
      isRecording.value = false;
    };

    // Vẽ dạng sóng
   const drawWaveform = () => {
  const bufferLength = analyser.value.frequencyBinCount;
  dataArray.value = new Uint8Array(bufferLength);

  const draw = () => {
    if (!isRecording.value) return;

    requestAnimationFrame(draw);
    analyser.value.getByteTimeDomainData(dataArray.value);

    canvasCtx.value.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.value.fillRect(0, 0, waveformCanvas.value.width, waveformCanvas.value.height);

    canvasCtx.value.lineWidth = 2;
    canvasCtx.value.strokeStyle = 'rgb(0, 0, 255)';
    canvasCtx.value.beginPath();

    const sliceWidth = waveformCanvas.value.width * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray.value[i] / 128.0;
      const y = (v * waveformCanvas.value.height) / 2;

      // Thay đổi màu sắc dựa trên cường độ âm thanh
      const colorValue = Math.abs(v) * 100;
      canvasCtx.value.strokeStyle = `rgb(${colorValue}, 0, 255)`;

      if (i === 0) {
        canvasCtx.value.moveTo(x, y);
      } else {
        canvasCtx.value.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.value.lineTo(waveformCanvas.value.width, waveformCanvas.value.height / 2);
    canvasCtx.value.stroke();
  };

  draw();
};

    // Khởi tạo canvas khi component được mount
    onMounted(() => {
      canvasCtx.value = waveformCanvas.value.getContext('2d');
    });

    return {
      isRecording,
      startRecording,
      stopRecording,
      waveformCanvas,
    };
  },
};
</script>

<style scoped>
canvas {
  border: 1px solid #ccc;
  margin-top: 20px;
}
</style>