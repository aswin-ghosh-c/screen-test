<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  currentIndex: Number,
  totalTests: Number
})
const emit = defineEmits(['complete', 'back', 'goBack', 'toggle-fullscreen'])

const isActive = ref(false)
const showToolbar = ref(false)
let toolbarTimeout = null

// Motion configurations
const speed = ref(8) // pixels per frame
const theme = ref('bw') // bw (black/white), gg (gray-to-gray), spectrum
const shape = ref('ufo') // box, circle, ufo

const canvasRef = ref(null)
let animationId = null
let x = 0
let direction = 1

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
  
  setTimeout(() => {
    startAnimation()
  }, 100)
}

function exitTest() {
  isActive.value = false
  stopAnimation()
}

function startAnimation() {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const parent = canvas.parentElement
  canvas.width = parent.clientWidth
  canvas.height = parent.clientHeight
  
  x = 0
  direction = 1
  
  const tick = () => {
    renderFrame()
    animationId = requestAnimationFrame(tick)
  }
  animationId = requestAnimationFrame(tick)
}

function stopAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

function renderFrame() {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height
  
  // Apply Background Theme
  let bgStyle, fillStyle
  if (theme.value === 'bw') {
    bgStyle = '#000000'
    fillStyle = '#ffffff'
  } else if (theme.value === 'gg') {
    bgStyle = '#333333'
    fillStyle = '#999999'
  } else {
    bgStyle = '#111122'
    fillStyle = '#00ffcc'
  }
  
  ctx.fillStyle = bgStyle
  ctx.fillRect(0, 0, w, h)
  
  // Update motion coordinates
  x += direction * speed.value
  const size = 60
  
  // Boundary check
  if (x > w - size || x < 0) {
    direction *= -1
    // Clamp
    x = Math.max(0, Math.min(x, w - size))
  }
  
  // Draw track lanes to make comparing trails easier
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'
  ctx.lineWidth = 2
  
  // Lane 1: Top (Current Speed)
  ctx.strokeRect(0, h * 0.25 - 40, w, 80)
  drawMovingTarget(ctx, x, h * 0.25, size, fillStyle)
  ctx.fillStyle = 'rgba(255,255,255,0.2)'
  ctx.font = '12px Courier'
  ctx.fillText(`Target Speed: ${speed.value} px/frame`, 20, h * 0.25 - 20)
  
  // Lane 2: Middle (Double Speed)
  const xDouble = (x * 2) % (w - size)
  ctx.strokeRect(0, h * 0.5 - 40, w, 80)
  drawMovingTarget(ctx, xDouble, h * 0.5, size, fillStyle)
  ctx.fillStyle = 'rgba(255,255,255,0.2)'
  ctx.fillText(`Double Speed: ${speed.value * 2} px/frame`, 20, h * 0.5 - 20)
  
  // Lane 3: Bottom (Half Speed)
  const xHalf = x * 0.5
  ctx.strokeRect(0, h * 0.75 - 40, w, 80)
  drawMovingTarget(ctx, xHalf, h * 0.75, size, fillStyle)
  ctx.fillStyle = 'rgba(255,255,255,0.2)'
  ctx.fillText(`Half Speed: ${speed.value * 0.5} px/frame`, 20, h * 0.75 - 20)
}

function drawMovingTarget(ctx, targetX, targetY, size, color) {
  ctx.fillStyle = color
  
  if (shape.value === 'box') {
    ctx.fillRect(targetX, targetY - size / 2, size, size)
  } else if (shape.value === 'circle') {
    ctx.beginPath()
    ctx.arc(targetX + size / 2, targetY, size / 2, 0, Math.PI * 2)
    ctx.fill()
  } else if (shape.value === 'ufo') {
    // Draw a cute little retro spaceship/UFO
    const cx = targetX + size / 2
    const cy = targetY
    
    // Glass dome
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ctx.beginPath()
    ctx.arc(cx, cy - 5, size * 0.25, Math.PI, 0)
    ctx.fill()
    
    // UFO Body
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.ellipse(cx, cy + 2, size * 0.45, size * 0.18, 0, 0, Math.PI * 2)
    ctx.fill()
    
    // UFO little lights
    ctx.fillStyle = '#ff3366'
    ctx.beginPath()
    ctx.arc(cx - size * 0.2, cy + 2, 3, 0, Math.PI * 2)
    ctx.arc(cx, cy + 3, 3, 0, Math.PI * 2)
    ctx.arc(cx + size * 0.2, cy + 2, 3, 0, Math.PI * 2)
    ctx.fill()
  }
}

// Watchers to adjust canvas sizes on window changes
onMounted(() => {
  window.addEventListener('resize', () => {
    if (isActive.value && canvasRef.value) {
      canvasRef.value.width = canvasRef.value.parentElement.clientWidth
      canvasRef.value.height = canvasRef.value.parentElement.clientHeight
    }
  })
})

onBeforeUnmount(() => {
  stopAnimation()
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
          <i class="bi bi-lightning-charge text-primary fs-3" style="color: #6C63FF !important;"></i>
        </div>
        <h2 class="font-outfit fw-bold text-white mb-2">{{ $t('test.response-time') }}</h2>
        <p class="text-secondary font-outfit px-3 mb-0" style="font-size: 1.05rem;">
          {{ $t('responsetime.instructions') }} Observe the moving targets. Look for ghosting (a shadow trailing behind), corona artifacts (a bright outline trailing), or blurring.
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
         class="fullscreen-test-container bg-black"
         :class="{ 'show-toolbar': showToolbar }"
         @mousemove="handleMouseMove"
         @touchmove="handleMouseMove">
      
      <!-- Custom Toolbar -->
      <div class="test-toolbar d-flex align-items-center gap-2" @click.stop>
        
        <!-- Shape Selector -->
        <select v-model="shape" class="form-select form-select-sm bg-dark text-white border-secondary fs-8" style="width: auto;">
          <option value="ufo">Spaceship Target</option>
          <option value="circle">Circle Target</option>
          <option value="box">Box Target</option>
        </select>

        <!-- Theme Selector -->
        <select v-model="theme" class="form-select form-select-sm bg-dark text-white border-secondary fs-8" style="width: auto;">
          <option value="bw">Black-to-White</option>
          <option value="gg">Gray-to-Gray</option>
          <option value="neon">Neon Accent</option>
        </select>

        <div class="vr bg-secondary opacity-30 my-1 mx-1"></div>

        <!-- Speed control slider -->
        <div class="d-flex align-items-center gap-2 px-2">
          <span class="text-white-50 fs-8 font-monospace">Speed:</span>
          <input type="range" v-model.number="speed" min="1" max="24" class="form-range" style="width: 80px;" />
          <span class="text-white fs-8 font-monospace" style="min-width: 15px;">{{ speed }}</span>
        </div>

        <div class="vr bg-secondary opacity-30 my-1 mx-1"></div>

        <!-- Exit and complete buttons -->
        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="emit('goBack')">
          <i class="bi bi-house-door me-1"></i>Home
        </button>
        <button class="btn btn-xs btn-glass px-2 py-1 fs-8" @click="emit('complete')">
          Complete <i class="bi bi-chevron-right ms-1"></i>
        </button>
        
        <button class="btn btn-xs btn-danger px-3 py-1 fs-8" @click="exitTest">
          Exit
        </button>
      </div>

      <!-- Canvas rendering element -->
      <div class="w-100 h-100 position-relative">
        <canvas ref="canvasRef" style="display: block;"></canvas>
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
</style>
