<script setup>
const props = defineProps({
  keyData: {
    type: String,
    required: true
  },
});
</script>
<template>
    <div>
        <p> child: {{keyData}}</p>
    </div>
</template>
