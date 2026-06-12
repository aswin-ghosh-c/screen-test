<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  currentIndex: Number,
  totalTests: Number
})
const emit = defineEmits(['complete', 'back', 'goBack', 'toggle-fullscreen'])

const isActive = ref(false)
const showToolbar = ref(false)
let toolbarTimeout = null

// Game state
const level = ref(1)
const maxLevel = 12
const gridCount = ref(4) // grid dimension: 4x4, then 5x5, etc.
const baseHue = ref(0)
const baseSat = ref(60)
const baseLight = ref(50)
const differentCellIndex = ref(0)
const delta = ref(15) // Lightness difference percentage, starts high, decreases

function handleMouseMove() {
  showToolbar.value = true
  clearTimeout(toolbarTimeout)
  toolbarTimeout = setTimeout(() => {
    showToolbar.value = false
  }, 2500)
}

function startTest() {
  isActive.value = true
  level.value = 1
  gridCount.value = 3
  delta.value = 15
  generateNewGrid()
  emit('toggle-fullscreen')
}

function exitTest() {
  isActive.value = false
}

function generateNewGrid() {
  // Select a random base color
  baseHue.value = Math.floor(Math.random() * 360)
  baseSat.value = 50 + Math.floor(Math.random() * 30) // 50-80%
  baseLight.value = 40 + Math.floor(Math.random() * 20) // 40-60%
  
  // Calculate grid size based on level
  if (level.value <= 2) gridCount.value = 3
  else if (level.value <= 6) gridCount.value = 4
  else if (level.value <= 10) gridCount.value = 5
  else gridCount.value = 6
  
  // Set shade distance delta
  // level 1: 15%, level 2: 12%, level 3: 9%, level 4: 7%, level 5: 5%, level 6: 4%, level 7: 3%, level 8: 2.5%, level 9: 2%, level 10: 1.5%, level 11: 1%, level 12: 0.7%
  const deltas = [15, 12, 9, 7, 5, 4, 3, 2.5, 2, 1.5, 1, 0.7]
  delta.value = deltas[level.value - 1] || 0.5
  
  // Pick random index for the odd cell
  const totalCells = gridCount.value * gridCount.value
  differentCellIndex.value = Math.floor(Math.random() * totalCells)
}

function handleCellClick(index) {
  if (index === differentCellIndex.value) {
    if (level.value < maxLevel) {
      level.value++
      generateNewGrid()
    } else {
      emit('complete')
    }
  } else {
    // Flash visual error hint or shake
    console.log("Wrong cell clicked")
  }
}
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
          <i class="bi bi-droplet-half text-info fs-3"></i>
        </div>
        <h2 class="font-outfit fw-bold text-white mb-2">{{ $t('test.color-distance') }}</h2>
        <p class="text-secondary font-outfit px-3 mb-0" style="font-size: 1.05rem;">
          Test your display's contrast rendering. Find and tap the block that is slightly different in shade. The shade difference will shrink at each level.
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
      <div class="test-toolbar d-flex align-items-center gap-3">
        <span class="text-white-50 fs-8 fw-semibold me-2">Color Distance: Level {{ level }} / {{ maxLevel }}</span>
        
        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="emit('goBack')">
          <i class="bi bi-house-door me-1"></i>Home
        </button>

        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="exitTest">
          <i class="bi bi-x-circle me-1"></i>Exit
        </button>
        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="emit('toggle-fullscreen')">
          <i class="bi bi-arrows-fullscreen me-1"></i>Fullscreen
        </button>
        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="emit('complete')">
          Skip <i class="bi bi-chevron-right ms-1"></i>
        </button>
      </div>

      <!-- Game grid -->
      <div class="d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100 p-3">
        <div class="grid-container w-100" 
             :style="{ 
               maxWidth: '450px', 
               aspectRatio: '1', 
               display: 'grid', 
               gridTemplateColumns: `repeat(${gridCount}, 1fr)`,
               gridTemplateRows: `repeat(${gridCount}, 1fr)`,
               gap: '8px',
               padding: '12px',
               backgroundColor: 'rgba(255,255,255,0.05)',
               borderRadius: '16px',
               border: '1px solid rgba(255,255,255,0.1)'
             }">
          <div v-for="i in gridCount * gridCount" :key="i"
               class="grid-cell"
               :style="{
                 backgroundColor: (i - 1) === differentCellIndex 
                   ? `hsl(${baseHue}, ${baseSat}%, ${baseLight + delta}%)`
                   : `hsl(${baseHue}, ${baseSat}%, ${baseLight}%)`,
                 cursor: 'pointer',
                 borderRadius: '8px',
                 transition: 'transform 0.15s ease'
               }"
               @click="handleCellClick(i - 1)"></div>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="position-fixed bottom-0 start-0 m-3 px-3 py-1 rounded bg-dark bg-opacity-70 text-white-50 fs-8" style="pointer-events: none;">
        Delta Shade: {{ delta.toFixed(1) }}% | Grid: {{ gridCount }}x{{ gridCount }}
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
  background: rgba(23, 162, 184, 0.1);
  border: 1px solid rgba(23, 162, 184, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-cell:hover {
  transform: scale(0.97);
}

.btn-xs {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.fs-8 {
  font-size: 0.8rem;
}
</style>
