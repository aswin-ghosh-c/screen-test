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

// Gray scales for screen uniformity check
const levels = [
  { value: '#ffffff', label: '100% White (Backlight & Shadow Check)' },
  { value: '#cccccc', label: '80% Light Gray (Panel Bleed Check)' },
  { value: '#808080', label: '50% Mid Gray (Dirty Screen Effect Check)' },
  { value: '#333333', label: '20% Dark Gray (OLED Uniformity Check)' },
  { value: '#000000', label: '0% Black (IPS Glow & Backlight Bleed)' }
]
const levelIndex = ref(0)

function handleMouseMove() {
  showToolbar.value = true
  clearTimeout(toolbarTimeout)
  toolbarTimeout = setTimeout(() => {
    showToolbar.value = false
  }, 2500)
}

function startTest() {
  isActive.value = true
  levelIndex.value = 2 // default to 50% gray which is the most common test level
  emit('toggle-fullscreen')
}

function exitTest() {
  isActive.value = false
}

function nextLevel() {
  if (levelIndex.value < levels.length - 1) {
    levelIndex.value++
  } else {
    emit('complete')
  }
}

function prevLevel() {
  if (levelIndex.value > 0) {
    levelIndex.value--
  }
}

function handleScreenClick() {
  nextLevel()
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
          <i class="bi bi-grid-3x3-gap text-warning fs-3"></i>
        </div>
        <h2 class="font-outfit fw-bold text-white mb-2">{{ $t('test.uniformity') }}</h2>
        <p class="text-secondary font-outfit px-3 mb-0" style="font-size: 1.05rem;">
          {{ $t('uniformity.instructions') }}
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

    <!-- Step 2: Interactive Fullscreen Mode -->
    <div v-else 
         class="fullscreen-test-container"
         :style="{ backgroundColor: levels[levelIndex].value }"
         :class="{ 'show-toolbar': showToolbar }"
         @mousemove="handleMouseMove"
         @touchmove="handleMouseMove"
         @click="handleScreenClick">
      
      <!-- Subtle Exit & Navigation Toolbar -->
      <div class="test-toolbar d-flex align-items-center gap-3" @click.stop>
        <span class="text-white-50 fs-8 fw-semibold me-2">Uniformity: {{ levels[levelIndex].label }}</span>
        
        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="emit('goBack')">
          <i class="bi bi-house-door me-1"></i>Home
        </button>

        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="prevLevel" :disabled="levelIndex === 0">
          <i class="bi bi-chevron-left me-1"></i>Prev
        </button>
        
        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="nextLevel">
          Next <i class="bi bi-chevron-right ms-1"></i>
        </button>
        
        <div class="vr bg-secondary opacity-30 my-1"></div>
        
        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="emit('toggle-fullscreen')">
          <i class="bi bi-arrows-fullscreen"></i>
        </button>
        
        <button class="btn btn-xs btn-danger px-3 py-1 fs-8" @click="exitTest">
          Exit
        </button>
      </div>

      <!-- Corner info indicator -->
      <div class="position-fixed bottom-0 start-0 m-3 px-2 py-1 rounded bg-black bg-opacity-40 text-white-50 fs-8" style="pointer-events: none;">
        Luminance Level {{ levelIndex + 1 }} / {{ levels.length }} (Tap to progress)
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
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid rgba(255, 193, 7, 0.25);
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
</style>
