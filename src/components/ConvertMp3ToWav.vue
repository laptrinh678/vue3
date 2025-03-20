<template>
  <el-upload
    action="#"
    :auto-upload="false"
    :on-change="handleFileChange"
    :show-file-list="false"
  >
    <el-button type="primary">Upload MP3 File</el-button>
  </el-upload>
</template>

<script>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import wavEncoder from 'wav-encoder';

export default {
  setup() {
    const handleFileChange = (file) => {
      if (file.raw.type !== 'audio/mpeg') {
        ElMessage.error('Please upload a valid MP3 file');
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        try {
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          const wavBlob = await encodeAudioBufferToWav(audioBuffer);
          downloadWavFile(wavBlob, 'converted.wav');
          ElMessage.success('File converted and downloaded successfully');
        } catch (error) {
          ElMessage.error('Error converting file');
          console.error(error);
        }
      };

      reader.readAsArrayBuffer(file.raw);
    };

    const encodeAudioBufferToWav = async (audioBuffer) => {
      const samples = [];
      for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
        samples.push(audioBuffer.getChannelData(i));
      }

      const wavData = {
        sampleRate: audioBuffer.sampleRate,
        channelData: samples,
      };

      const wavBlob = await wavEncoder.encode(wavData);
      return new Blob([wavBlob], { type: 'audio/wav' });
    };

    const downloadWavFile = (blob, filename) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    };

    return {
      handleFileChange,
    };
  },
};
</script>