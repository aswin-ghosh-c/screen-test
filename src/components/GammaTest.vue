<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'

const props = defineProps({
  currentIndex: Number,
  totalTests: Number
})
const emit = defineEmits(['complete', 'back', 'goBack', 'toggle-fullscreen'])

const isActive = ref(false)
const showToolbar = ref(false)
let toolbarTimeout = null

// Gamma calibration variables
const gamma = ref(2.2)

// Math: V = 255 * (0.5 ^ (1 / gamma))
const greyValue = computed(() => {
  const v = Math.round(255 * Math.pow(0.5, 1 / gamma.value))
  return `rgb(${v},${v},${v})`
})

function handleMouseMove() {
  showToolbar.value = true
  clearTimeout(toolbarTimeout)
  toolbarTimeout = setTimeout(() => {
    showToolbar.value = false
  }, 2500)
}

function startTest() {
  isActive.value = true
  gamma.value = 2.2 // reset to default target
  emit('toggle-fullscreen')
}

function exitTest() {
  isActive.value = false
}

onBeforeUnmount(() => {
  clearTimeout(toolbarTimeout)
})
</script>

<template>
  <div class="test-wrapper w-100 h-100 d-flex align-items-center justify-content-center">
    
    <!-- Step 1: Instructions Mode -->
    <div v-if="!isActive" class="glass-panel text-center animate__animated animate__fadeIn max-width-card">
      <div class="mb-3 text-secondary fs-8 font-outfit uppercase">
        {{ $t('language') === 'Language' ? 'DIAGNOSTIC TEST' : 'TEST' }} {{ currentIndex + 1 }} / {{ totalTests }}
      </div>
      
      <div class="mb-4">
        <div class="icon-indicator mx-auto mb-3">
          <i class="bi bi-brightness-high text-secondary fs-3" style="color: #6C63FF !important;"></i>
        </div>
        <h2 class="font-outfit fw-bold text-white mb-2">{{ $t('test.gamma') }}</h2>
        <p class="text-secondary font-outfit px-3 mb-0" style="font-size: 1.05rem;">
          {{ $t('gamma.instructions') }} Adjust the slider until the solid square in the center blends in and becomes nearly invisible against the striped background.
        </p>
      </div>

      <!-- Action buttons -->
      <div class="d-flex flex-row justify-content-center gap-3 mt-4">
        <button class="btn btn-glass px-3" @click="emit('goBack')" title="Go to Home">
          <i class="bi bi-house-door"></i>
        </button>
        <button class="btn btn-glass px-4" @click="emit('back')">
          <i class="bi bi-arrow-left me-2"></i>{{ $t('previous') }}
        </button>
        <button class="btn btn-premium px-4" @click="startTest">
          <i class="bi bi-play-fill me-2"></i>Start Test
        </button>
      </div>
    </div>

    <!-- Step 2: Interactive Diagnostic Mode -->
    <div v-else 
         class="fullscreen-test-container bg-black d-flex flex-column align-items-center justify-content-center"
         :class="{ 'show-toolbar': showToolbar }"
         @mousemove="handleMouseMove"
         @touchmove="handleMouseMove">
      
      <!-- Subtle Exit & Navigation Toolbar -->
      <div class="test-toolbar d-flex align-items-center gap-3" @click.stop>
        <span class="text-white-50 fs-8 fw-semibold me-2">Gamma Estimation</span>
        
        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="emit('goBack')">
          <i class="bi bi-house-door me-1"></i>Home
        </button>

        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="emit('toggle-fullscreen')">
          <i class="bi bi-arrows-fullscreen me-1"></i>Fullscreen
        </button>
        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="emit('complete')">
          Next <i class="bi bi-chevron-right ms-1"></i>
        </button>
        
        <button class="btn btn-xs btn-danger px-3 py-1 fs-8" @click="exitTest">
          Exit
        </button>
      </div>

      <!-- Gamma Pattern Area -->
      <div class="flex-grow-1 w-100 d-flex align-items-center justify-content-center position-relative"
           style="background: repeating-linear-gradient(#000000 0px, #000000 1px, #ffffff 1px, #ffffff 2px);">
        
        <!-- Center Square that shifts luminance -->
        <div class="shadow-lg rounded"
             :style="{ 
               backgroundColor: greyValue, 
               width: '200px', 
               height: '200px',
               border: '1px solid rgba(0,0,0,0.2)'
             }"></div>
        
        <!-- Value Label Overlay -->
        <div class="position-absolute translate-y-4 px-3 py-1 rounded bg-black text-white fs-8 font-monospace" style="bottom: 120px;">
          Gamma: {{ gamma.toFixed(1) }} (Ideal target: 2.2)
        </div>
      </div>

      <!-- Control Panel overlay at the bottom -->
      <div class="w-100 py-4 d-flex justify-content-center align-items-center bg-dark bg-opacity-90 border-top border-secondary border-opacity-10" style="z-index: 10;">
        <div class="d-flex flex-column align-items-center" style="width: 80%; max-width: 400px;">
          <label for="gamma-slider" class="text-white-50 fs-8 mb-2">Adjust slider until center block blends in:</label>
          <div class="d-flex w-100 align-items-center gap-3">
            <span class="text-muted fs-8 font-monospace">1.6</span>
            <input id="gamma-slider" 
                   type="range" 
                   v-model.number="gamma" 
                   min="1.6" 
                   max="2.8" 
                   step="0.05" 
                   class="form-range flex-grow-1" />
            <span class="text-muted fs-8 font-monospace">2.8</span>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.max-width-card {
  max-width: 580px;
  width: 90%;
}

.icon-indicator {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(108, 99, 255, 0.1);
  border: 1px solid rgba(108, 99, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-range::-webkit-slider-thumb {
  background: #6C63FF;
}

.form-range::-moz-range-thumb {
  background: #6C63FF;
}

.btn-xs {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.fs-8 {
  font-size: 0.8rem;
}

.translate-y-4 {
  transform: translateY(20px);
}
</style>
