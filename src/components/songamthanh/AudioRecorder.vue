<template>
  <div>
    <el-button type="primary" @click="startRecording" :disabled="isRecording">Start</el-button>
    <el-button type="danger" @click="stopRecording" :disabled="!isRecording">Stop</el-button>
    <WaveformCanvas :audioData="audioData" keyData="" />
  </div>
</template>

<script>
import { ref } from 'vue';
import WaveformCanvas from './WaveformCanvas.vue';

export default {
  components: {
    WaveformCanvas
  },
  setup() {
    const isRecording = ref(false);
    const audioData = ref(new Uint8Array(0));
    const keyData = ref(100);
    let audioContext;
    let analyser;
    let dataArray;
    let source;
    let stream;

    const startRecording = async () => {
      try {
        console.log("Requesting microphone access...");
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Microphone access granted.");

        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 256;
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        isRecording.value = true;
        console.log("Recording started.");
        updateWaveform();
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    const stopRecording = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        console.log("Recording stopped.");
      }
      if (audioContext) {
        audioContext.close();
        console.log("Audio context closed.");
      }
      isRecording.value = false;
    };

    const updateWaveform = () => {
      if (!isRecording.value) return;

      analyser.getByteTimeDomainData(dataArray);
      audioData.value = dataArray;
      keyData.value += keyData.value
      console.log("Audio data in parent component:", audioData.value); // Kiểm tra dữ liệu

      requestAnimationFrame(updateWaveform);
    };

    return {
      isRecording,
      audioData,
      startRecording,
      stopRecording
    };
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>