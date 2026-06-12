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

const colors = ['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
const colorNames = ['White', 'Black', 'Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Cyan']
const selectedIndex = ref(0)
const enableGrid = ref(false)

function handleMouseMove() {
  showToolbar.value = true
  clearTimeout(toolbarTimeout)
  toolbarTimeout = setTimeout(() => {
    showToolbar.value = false
  }, 2500)
}

function startTest() {
  isActive.value = true
  selectedIndex.value = 0
  enableGrid.value = false
  emit('toggle-fullscreen')
}

function exitTest() {
  isActive.value = false
}

function nextColor() {
  if (selectedIndex.value < colors.length - 1) {
    selectedIndex.value++
  } else {
    emit('complete')
  }
}

function prevColor() {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  }
}

function handleScreenClick() {
  nextColor()
}

function toggleGrid() {
  enableGrid.value = !enableGrid.value
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
          <i class="bi bi-dot text-danger fs-3" style="font-size: 3rem !important; line-height: 0.5;"></i>
        </div>
        <h2 class="font-outfit fw-bold text-white mb-2">{{ $t('test.deadpixel') }}</h2>
        <p class="text-secondary font-outfit px-3 mb-0" style="font-size: 1.05rem;">
          {{ $t('deadpixel.instructions') }}
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
         :style="{ backgroundColor: colors[selectedIndex] }"
         :class="{ 'show-toolbar': showToolbar }"
         @mousemove="handleMouseMove"
         @touchmove="handleMouseMove"
         @click="handleScreenClick">
      
      <!-- Grid pattern overlay if enabled -->
      <div v-if="enableGrid" class="grid-overlay position-absolute top-0 start-0 w-100 h-100"
           :style="{ 
             backgroundImage: `linear-gradient(rgba(${selectedIndex === 1 ? '55,55,55' : '128,128,128'}, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(${selectedIndex === 1 ? '55,55,55' : '128,128,128'}, 0.25) 1px, transparent 1px)`,
             backgroundSize: '25px 25px'
           }"></div>
      
      <!-- Subtle Exit & Navigation Toolbar -->
      <div class="test-toolbar d-flex align-items-center gap-3" @click.stop>
        <span class="text-white-50 fs-8 fw-semibold me-2">Dead Pixel Test: {{ colorNames[selectedIndex] }}</span>
        
        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="emit('goBack')">
          <i class="bi bi-house-door me-1"></i>Home
        </button>

        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="prevColor" :disabled="selectedIndex === 0">
          <i class="bi bi-chevron-left me-1"></i>Prev
        </button>
        
        <button class="btn btn-xs px-3 py-1 fs-8 animate__animated animate__pulse animate__infinite" 
                :class="enableGrid ? 'btn-primary' : 'btn-glass'" 
                @click="toggleGrid">
          <i class="bi bi-grid-3x3 me-1"></i>
          {{ enableGrid ? 'Disable Grid' : 'Enable Grid' }}
        </button>

        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="nextColor">
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
        Color {{ selectedIndex + 1 }} / {{ colors.length }} (Tap to progress)
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
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-overlay {
  pointer-events: none;
  z-index: 1;
}

.btn-xs {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.fs-8 {
  font-size: 0.8rem;
}
</style>
