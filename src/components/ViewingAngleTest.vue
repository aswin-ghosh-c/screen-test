<script setup>
import { ref, onBeforeUnmount } from 'vue'

const props = defineProps({
  currentIndex: Number,
  totalTests: Number
})
const emit = defineEmits(['complete', 'back', 'goBack', 'toggle-fullscreen'])

const isActive = ref(false)
const showToolbar = ref(false)
let toolbarTimeout = null

function handleMouseMove() {
  showToolbar.value = true
  clearTimeout(toolbarTimeout)
  toolbarTimeout = setTimeout(() => {
    showToolbar.value = false
  }, 2500)
}

function startTest() {
  isActive.value = true
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
          <i class="bi bi-arrows-angle-expand fs-3" style="color: #6C63FF !important;"></i>
        </div>
        <h2 class="font-outfit fw-bold text-white mb-2">{{ $t('test.viewing-angle') }}</h2>
        <p class="text-secondary font-outfit px-3 mb-0" style="font-size: 1.05rem;">
          {{ $t('viewingangle.instructions') }} View the display from the sides, top, and bottom. Compare how much the colors shift, wash out, or dim compared to direct front viewing.
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
         class="fullscreen-test-container bg-black overflow-hidden d-flex flex-column"
         :class="{ 'show-toolbar': showToolbar }"
         @mousemove="handleMouseMove"
         @touchmove="handleMouseMove">
      
      <!-- Subtle Exit & Navigation Toolbar -->
      <div class="test-toolbar d-flex align-items-center gap-3">
        <span class="text-white-50 fs-8 fw-semibold me-2">Viewing Angle Test</span>
        
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

      <!-- Test Chart Grid Pattern -->
      <div class="w-100 h-100 position-relative d-flex align-items-stretch justify-content-stretch flex-grow-1" style="pointer-events: none;">
        
        <!-- Symmetrical High-contrast Color blocks -->
        <div class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column">
          <!-- Top half colors -->
          <div class="flex-fill d-flex">
            <div class="flex-fill" style="background: linear-gradient(135deg, #ff0055 0%, #00f2fe 100%);"></div>
            <div class="flex-fill" style="background: linear-gradient(225deg, #38ef7d 0%, #11998e 100%);"></div>
          </div>
          <!-- Bottom half colors -->
          <div class="flex-fill d-flex">
            <div class="flex-fill" style="background: linear-gradient(45deg, #fcb045 0%, #fd1d1d 50%, #833ab4 100%);"></div>
            <div class="flex-fill" style="background: linear-gradient(315deg, #00c6ff 0%, #0072ff 100%);"></div>
          </div>
        </div>

        <!-- Center Guide Overlay -->
        <div class="position-absolute top-50 start-50 translate-middle p-4 rounded-4 shadow-lg text-center"
             style="background: rgba(15, 15, 20, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.15); max-width: 380px;">
          <div class="head-tilt-guide mb-3">
            <i class="bi bi-arrow-left-right text-primary fs-3 animate__animated animate__headShake animate__infinite"></i>
            <i class="bi bi-person-fill text-white fs-1 mx-3"></i>
            <i class="bi bi-arrow-up-down text-primary fs-3 animate__animated animate__bounce animate__infinite"></i>
          </div>
          <h5 class="text-white font-outfit fw-semibold fs-7 mb-2">Viewing Angle Calibration</h5>
          <p class="text-white-50 fs-9 mb-0">
            Tilt your screen or move your head horizontally and vertically. Notice if colors turn yellow, wash out, lose contrast, or if details disappear from corners.
          </p>
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

.head-tilt-guide {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-xs {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.fs-8 {
  font-size: 0.8rem;
}

.fs-9 {
  font-size: 0.75rem;
  line-height: 1.4;
}
</style>
