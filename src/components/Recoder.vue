<template>
    <div>
      <el-button type="primary" @click="startRecording" :disabled="isRecording">Start Recording</el-button>
      <el-button type="danger" @click="stopRecording" :disabled="!isRecording">Stop Recording</el-button>
      <el-button type="success" @click="downloadAudio" :disabled="!audioBlob">Download Audio</el-button>
  
      <audio v-if="audioUrl" :src="audioUrl" controls></audio>
      <div class="custom-audio-player">
        <audio controls>
            <source src="https://www.w3schools.com/Tags/horse.ogg" type="audio/wav">
            Your browser does not support the audio element.
        </audio>
        </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { ElButton } from 'element-plus';
  import { encode } from 'wav-encoder';
  
  export default {
    components: {
      ElButton,
    },
    setup() {
      const isRecording = ref(false);
      const audioBlob = ref(null);
      const audioUrl = ref('');
      let mediaRecorder;
      let audioChunks = [];
  
      const startRecording = async () => {
        audioChunks = [];
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
  
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };
  
        mediaRecorder.onstop = async () => {
          // Kết hợp tất cả các chunk thành một Blob
          const audioBlobData = new Blob(audioChunks, { type: 'audio/webm' });
  
          // Chuyển đổi Blob sang ArrayBuffer
          const arrayBuffer = await audioBlobData.arrayBuffer();
  
          // Decode ArrayBuffer thành AudioBuffer
          const audioContext = new AudioContext();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
          // Mã hóa AudioBuffer thành WAV
          const wavBlob = await encodeWAV(audioBuffer);
            console.log(wavBlob);
            console.log('ssss');
          // Lưu WAV Blob và tạo URL
          audioBlob.value = wavBlob;
          audioUrl.value = URL.createObjectURL(wavBlob);
        };
  
        mediaRecorder.start();
        isRecording.value = true;
      };
  
      const stopRecording = () => {
        mediaRecorder.stop();
        isRecording.value = false;
      };
  
      const downloadAudio = () => {
        const url = URL.createObjectURL(audioBlob.value);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'recording.wav';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
      };
  
      // Hàm mã hóa AudioBuffer thành WAV
      const encodeWAV = async (audioBuffer) => {
        const audioData = {
          sampleRate: audioBuffer.sampleRate,
          channelData: Array.from({ length: audioBuffer.numberOfChannels }, (_, i) =>
            audioBuffer.getChannelData(i)
          ),
        };
  
        // Mã hóa thành WAV
        const wavBuffer = await encode(audioData);
        return new Blob([wavBuffer], { type: 'audio/wav' });
      };
  
      return {
        isRecording,
        audioBlob,
        audioUrl,
        startRecording,
        stopRecording,
        downloadAudio,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */

  .custom-audio-player {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-audio-player audio {
  width: 100%;
  max-width: 400px;
}

.custom-audio-player audio::-webkit-media-controls-panel {
  background-color: #f0f0f0;
  border-radius: 20px;
}

.custom-audio-player audio::-webkit-media-controls-play-button,
.custom-audio-player audio::-webkit-media-controls-mute-button {
  background-color: #4CAF50;
  border-radius: 50%;
  color: white;
}

.custom-audio-player audio::-webkit-media-controls-current-time-display,
.custom-audio-player audio::-webkit-media-controls-time-remaining-display {
  color: #333;
}

.custom-audio-player audio::-webkit-media-controls-timeline {
  background-color: #ddd;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
}

.custom-audio-player audio::-webkit-media-controls-volume-slider {
  background-color: #ddd;
  border-radius: 5px;
}
  </style>