<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  isSimulated: Boolean,
  currentIndex: Number,
  totalTests: Number
})
const emit = defineEmits(['complete', 'back', 'goBack', 'toggle-fullscreen'])

const isActive = ref(false)
const showToolbar = ref(false)
let toolbarTimeout = null

// Grid diagnostics configuration
const cols = 8
const rows = 12
const totalCells = cols * rows
const touchedCells = ref(new Set())
const isDrawing = ref(false)
const canvasRef = ref(null)
let ctx = null

// Canvas sizing
const width = ref(360)
const height = ref(640)

function handleMouseMove() {
  showToolbar.value = true
  clearTimeout(toolbarTimeout)
  toolbarTimeout = setTimeout(() => {
    showToolbar.value = false
  }, 3000)
}

function startTest() {
  isActive.value = true
  touchedCells.value.clear()
  // Trigger full-screen suggestion
  emit('toggle-fullscreen')
  
  // Wait for canvas mounting
  setTimeout(() => {
    initCanvas()
  }, 100)
}

function exitTest() {
  isActive.value = false
  isDrawing.value = false
}

function initCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  
  // Set dimensions based on parent container
  const parent = canvas.parentElement
  width.value = parent.clientWidth
  height.value = parent.clientHeight
  
  canvas.width = width.value
  canvas.height = height.value
  
  ctx = canvas.getContext('2d')
  ctx.strokeStyle = '#6C63FF'
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  
  drawGrid()
}

function drawGrid() {
  if (!ctx) return
  ctx.clearRect(0, 0, width.value, height.value)
  
  const cellW = width.value / cols
  const cellH = height.value / rows
  
  // Draw filled cells
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c
      if (touchedCells.value.has(idx)) {
        ctx.fillStyle = 'rgba(56, 239, 125, 0.25)'
        ctx.fillRect(c * cellW, r * cellH, cellW, cellH)
        
        ctx.strokeStyle = 'rgba(56, 239, 125, 0.5)'
        ctx.lineWidth = 1
        ctx.strokeRect(c * cellW, r * cellH, cellW, cellH)
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
        ctx.lineWidth = 1
        ctx.strokeRect(c * cellW, r * cellH, cellW, cellH)
      }
    }
  }
}

// Draw trace
let lastX = 0
let lastY = 0

function handlePointerDown(e) {
  isDrawing.value = true
  const rect = canvasRef.value.getBoundingClientRect()
  lastX = e.clientX - rect.left
  lastY = e.clientY - rect.top
  checkCellCollision(lastX, lastY)
}

function handlePointerMove(e) {
  if (!isDrawing.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  ctx.beginPath()
  ctx.strokeStyle = '#6C63FF'
  ctx.lineWidth = 4
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(x, y)
  ctx.stroke()
  
  lastX = x
  lastY = y
  
  checkCellCollision(x, y)
  handleMouseMove()
}

function handlePointerUp() {
  isDrawing.value = false
}

function checkCellCollision(x, y) {
  if (x < 0 || x > width.value || y < 0 || y > height.value) return
  
  const cellW = width.value / cols
  const cellH = height.value / rows
  
  const colIdx = Math.floor(x / cellW)
  const rowIdx = Math.floor(y / cellH)
  
  if (colIdx >= 0 && colIdx < cols && rowIdx >= 0 && rowIdx < rows) {
    const idx = rowIdx * cols + colIdx
    if (!touchedCells.value.has(idx)) {
      touchedCells.value.add(idx)
      drawGrid()
      
      // Auto complete when all cells are drawn
      if (touchedCells.value.size === totalCells) {
        setTimeout(() => {
          emit('complete')
        }, 300)
      }
    }
  }
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
          <i class="bi bi-hand-index-thumb text-primary fs-3"></i>
        </div>
        <h2 class="font-outfit fw-bold text-white mb-2">{{ $t('test.touch') }}</h2>
        <p class="text-secondary font-outfit px-3 mb-0" style="font-size: 1.05rem;">
          {{ $t('touch.instructions') }}
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
         class="fullscreen-test-container bg-black d-flex align-items-center justify-content-center"
         :class="{ 'show-toolbar': showToolbar }"
         @mousemove="handleMouseMove"
         @touchmove="handleMouseMove">
      
      <!-- Subtle Exit & Navigation Toolbar -->
      <div class="test-toolbar d-flex align-items-center gap-3">
        <span class="text-white-50 fs-8 fw-semibold me-2">{{ $t('test.touch') }}</span>
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

      <!-- Grid Status Overlay -->
      <div class="grid-status-badge position-fixed bottom-0 start-0 m-3 px-3 py-1 rounded bg-dark bg-opacity-70 text-white-50 fs-8" style="z-index: 10000; pointer-events: none;">
        Grid Coverage: {{ touchedCells.size }} / {{ totalCells }} ({{ Math.round((touchedCells.size / totalCells) * 100) }}%)
      </div>

      <!-- Active Drawing Area (Simulated phone frame on desktop or true full screen) -->
      <div :class="[isSimulated ? 'simulated-phone-frame shadow-2xl' : 'w-100 h-100']" style="position: relative; overflow: hidden; background: #000;">
        <canvas ref="canvasRef" 
                class="touch-canvas" 
                style="display: block; width: 100%; height: 100%; touch-action: none;"
                @pointerdown="handlePointerDown"
                @pointermove="handlePointerMove"
                @pointerup="handlePointerUp"
                @pointerleave="handlePointerUp"></canvas>
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

.simulated-phone-frame {
  width: 360px;
  height: 680px;
  border: 12px solid #222;
  border-radius: 36px;
  background-color: black;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(108, 99, 255, 0.2);
}

.touch-canvas {
  cursor: crosshair;
}

.fs-8 {
  font-size: 0.8rem;
}

.btn-xs {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}
</style>
