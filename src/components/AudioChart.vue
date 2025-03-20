<template>
  <div>
    <!-- Button để bắt đầu và dừng thu âm -->
    <el-button type="primary" @click="startRecording" :disabled="isRecording">
      Start Recording
    </el-button>
    <el-button type="danger" @click="stopRecording" :disabled="!isRecording">
      Stop Recording
    </el-button>

    <!-- Canvas để vẽ dạng sóng âm thanh -->
    <div class="waveform-container">
      <canvas ref="waveformCanvas" class="waveform"></canvas>
    </div>
  </div>
</template>

<script>
import { ElButton } from 'element-plus';

export default {
  components: {
    ElButton,
  },
  data() {
    return {
      isRecording: false, // Trạng thái ghi âm
      audioContext: null, // AudioContext để xử lý âm thanh
      analyser: null, // AnalyserNode để phân tích âm thanh
      microphone: null, // Luồng âm thanh từ microphone
      animationFrameId: null, // ID của requestAnimationFrame
    };
  },
  methods: {
    async startRecording() {
      try {
        // Khởi tạo AudioContext
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Lấy quyền truy cập microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.microphone = this.audioContext.createMediaStreamSource(stream);

        // Tạo AnalyserNode để phân tích âm thanh
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256; // Độ phân giải của FFT

        // Kết nối microphone với analyser
        this.microphone.connect(this.analyser);

        // Bắt đầu cập nhật dạng sóng
        this.isRecording = true;
        this.updateWaveform();
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    },
    stopRecording() {
      // Dừng ghi âm
      if (this.microphone) {
        this.microphone.disconnect();
      }
      if (this.audioContext) {
        this.audioContext.close();
      }
      this.isRecording = false;
      cancelAnimationFrame(this.animationFrameId); // Dừng vòng lặp cập nhật

      // Vẽ lại đường thẳng khi dừng thu âm
      this.drawStraightLine();
    },
    updateWaveform() {
      if (!this.isRecording) return;

      // Lấy dữ liệu âm thanh từ AnalyserNode
      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(dataArray);

      // Vẽ dạng sóng âm thanh
      this.drawWaveform(dataArray);

      // Lặp lại cập nhật
      this.animationFrameId = requestAnimationFrame(() => this.updateWaveform());
    },
    drawWaveform(dataArray) {
      const canvas = this.$refs.waveformCanvas;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      // Xóa canvas
      ctx.clearRect(0, 0, width, height);

      // Vẽ dạng sóng
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#409EFF';
      ctx.beginPath();

      const sliceWidth = (width * 1.0) / dataArray.length;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128.0; // Chuẩn hóa giá trị về khoảng -1 đến 1
        const y = (v * height) / 2 + height / 2; // Điều chỉnh vị trí y để căn giữa

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.stroke();
    },
    drawStraightLine() {
      const canvas = this.$refs.waveformCanvas;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      // Xóa canvas
      ctx.clearRect(0, 0, width, height);

      // Vẽ đường thẳng màu xanh
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#409EFF';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
    },
  },
  mounted() {
    // Vẽ đường thẳng khi component được mount
    this.drawStraightLine();
  },
  beforeUnmount() {
    // Dừng ghi âm khi component bị hủy
    this.stopRecording();
  },
};
</script>

<style scoped>
.waveform-container {
  width: 100%;
  margin-top: 20px;
  border: 1px solid #ddd; /* Thêm viền để dễ nhìn */
  background-color: #f0f0f0; /* Màu nền */
}

.waveform {
  width: 100%;
  height: 50px; /* Chiều cao của canvas */
  display: block;
}
</style>