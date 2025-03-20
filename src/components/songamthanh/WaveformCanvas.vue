<template>
  <canvas ref="canvas" width="600" height="200"></canvas>
  <p> aaaa: {{keyData}}</p>
</template>

<script>
export default {
  name: 'WaveformCanvas',
  props: {
    audioData: {
      type: Uint8Array,
      default: () => new Uint8Array(0)
    },
    keyData: {
      type: Number,
      default: null
    }
  },
  mounted() {
    console.log("WaveformCanvas component mounted."); // Kiểm tra component con được render
  },
  watch: {
    audioData(newData) {
      console.log("Audio data received in WaveformCanvas:", newData); // Kiểm tra dữ liệu nhận được
      this.drawWaveform(newData);
    }
  },
  methods: {
    drawWaveform(data) {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      console.log("Drawing waveform with data length:", data.length); // Kiểm tra độ dài dữ liệu

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Set line style
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'blue';
      ctx.beginPath();

      const sliceWidth = (width * 1.0) / data.length;
      let x = 0;

      for (let i = 0; i < data.length; i++) {
        const v = data[i] / 128.0; // Normalize data to range [0, 2]
        const y = (v * height) / 2; // Scale to canvas height

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2); // Vẽ đường kết thúc
      ctx.stroke();
    }
  }
};
</script>

<style scoped>
canvas {
  border: 1px solid #ccc;
  background-color: #f0f0f0;
}
</style>