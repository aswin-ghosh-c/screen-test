<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits(['start'])

// Local state for the animated mockup screen color
const mockupColors = ['#6C63FF', '#38ef7d', '#ff0055', '#00f2fe', '#f9d423']
const activeColorIndex = ref(0)
let colorInterval

onMounted(() => {
  colorInterval = setInterval(() => {
    activeColorIndex.value = (activeColorIndex.value + 1) % mockupColors.length
  }, 3000)
})

onBeforeUnmount(() => {
  clearInterval(colorInterval)
})
</script>

<template>
  <div class="glass-panel text-center animate__animated animate__fadeIn mx-auto" style="max-width: 800px; width: 90%;">
    
    <!-- Hero Mockup Display -->
    <div class="mockup-display-wrapper mb-4 position-relative mx-auto">
      <div class="mockup-monitor">
        <div class="mockup-screen d-flex align-items-center justify-content-center" :style="{ backgroundColor: mockupColors[activeColorIndex], transition: 'background-color 1.5s ease' }">
          <i class="bi bi-display text-white fs-1" style="opacity: 0.95; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.3));"></i>
        </div>
        <div class="mockup-stand"></div>
        <div class="mockup-base"></div>
      </div>
    </div>

    <!-- Title and Subtitle -->
    <h1 class="font-outfit fw-bold mb-3" style="font-size: 2.8rem; letter-spacing: -0.5px;">
      {{ $t('appName') }}
    </h1>
    <p class="text-secondary mx-auto mb-4 font-outfit" style="font-size: 1.15rem; max-width: 600px; line-height: 1.6;">
      {{ $t('welcomeMessage') }}
    </p>

    <!-- Diagnostics Feature Grid -->
    <div class="row text-start g-3 mb-5 mx-auto" style="max-width: 650px;">
      <div class="col-6 col-md-4">
        <div class="d-flex align-items-center gap-2 text-white-50">
          <i class="bi bi-dot text-danger fs-4"></i>
          <span>{{ $t('test.deadpixel') }}</span>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <div class="d-flex align-items-center gap-2 text-white-50">
          <i class="bi bi-palette-fill text-success fs-5"></i>
          <span>{{ $t('test.rgb') }}</span>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <div class="d-flex align-items-center gap-2 text-white-50">
          <i class="bi bi-hand-index-thumb-fill text-primary fs-5"></i>
          <span>{{ $t('test.touch') }}</span>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <div class="d-flex align-items-center gap-2 text-white-50">
          <i class="bi bi-grid-3x3-gap-fill text-warning fs-5"></i>
          <span>{{ $t('test.uniformity') }}</span>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <div class="d-flex align-items-center gap-2 text-white-50">
          <i class="bi bi-bar-chart-steps text-info fs-5"></i>
          <span>{{ $t('test.gradients') }}</span>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <div class="d-flex align-items-center gap-2 text-white-50">
          <i class="bi bi-lightning-charge-fill text-white fs-5"></i>
          <span>{{ $t('test.response-time') }}</span>
        </div>
      </div>
    </div>

    <!-- Start Action Button -->
    <button class="btn btn-premium btn-lg px-5 py-3 fs-5" @click="emit('start')" aria-label="Start testing your screen">
      <i class="bi bi-play-circle-fill me-2"></i>
      {{ $t('startTest') }}
    </button>
  </div>
</template>

<style scoped>
.mockup-display-wrapper {
  width: 220px;
  height: 180px;
}

.mockup-monitor {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mockup-screen {
  width: 200px;
  height: 120px;
  border-radius: 12px;
  border: 5px solid #1a1a1a;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.mockup-stand {
  width: 16px;
  height: 25px;
  background-color: #2a2a2a;
}

.mockup-base {
  width: 70px;
  height: 6px;
  background-color: #3a3a3a;
  border-radius: 3px;
}

.font-outfit {
  font-family: 'Outfit', sans-serif;
}
</style>
