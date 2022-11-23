<script setup>
  defineProps(["height"])
</script>

<template>
    <div class="async-component fast-gradient" style="width: 475px; background-color: aqua;" :style="{height: height}">
        
    </div>
</template>

<style scoped>
.fast-gradient {
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
  background-size: 200% 200%;
  animation: gradient 2s ease-in-out infinite;
  z-index: 10;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>