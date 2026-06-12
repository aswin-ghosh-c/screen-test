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

// Gradient state
const isSmooth = ref(true)
const gradientType = ref('gray') // gray, red, green, blue, spectrum
const direction = ref('horizontal') // horizontal, vertical, radial

const canvasRef = ref(null)

function handleMouseMove() {
  showToolbar.value = true
  clearTimeout(toolbarTimeout)
  toolbarTimeout = setTimeout(() => {
    showToolbar.value = false
  }, 2500)
}

function startTest() {
  isActive.value = true
  isSmooth.value = true
  gradientType.value = 'gray'
  direction.value = 'horizontal'
  emit('toggle-fullscreen')
  
  setTimeout(() => {
    renderGradient()
  }, 100)
}

function exitTest() {
  isActive.value = false
}

// Draw the gradient to the canvas
function renderGradient() {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const parent = canvas.parentElement
  canvas.width = parent.clientWidth
  canvas.height = parent.clientHeight
  
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height
  
  ctx.clearRect(0, 0, w, h)
  
  // Setup colors based on selection
  let colorStopFn
  if (gradientType.value === 'gray') {
    colorStopFn = (t) => {
      const v = Math.floor(t * 255)
      return `rgb(${v},${v},${v})`
    }
  } else if (gradientType.value === 'red') {
    colorStopFn = (t) => {
      const v = Math.floor(t * 255)
      return `rgb(${v},0,0)`
    }
  } else if (gradientType.value === 'green') {
    colorStopFn = (t) => {
      const v = Math.floor(t * 255)
      return `rgb(0,${v},0)`
    }
  } else if (gradientType.value === 'blue') {
    colorStopFn = (t) => {
      const v = Math.floor(t * 255)
      return `rgb(0,0,${v})`
    }
  } else if (gradientType.value === 'spectrum') {
    colorStopFn = (t) => `hsl(${t * 360}, 100%, 50%)`
  }
  
  // Draw gradient depending on mode (smooth vs steps)
  if (isSmooth.value) {
    // Smooth rendering using canvas gradient
    let grad
    if (direction.value === 'horizontal') {
      grad = ctx.createLinearGradient(0, 0, w, 0)
    } else if (direction.value === 'vertical') {
      grad = ctx.createLinearGradient(0, 0, 0, h)
    } else {
      grad = ctx.createRadialGradient(w/2, h/2, 10, w/2, h/2, Math.max(w, h)/2)
    }
    
    // Add 20 color stops for smooth interpolation
    for (let i = 0; i <= 20; i++) {
      const t = i / 20
      grad.addColorStop(t, colorStopFn(t))
    }
    
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
  } else {
    // Discrete stepped rendering (simulate banding, e.g. 32 steps)
    const steps = 32
    if (direction.value === 'horizontal') {
      const stepW = w / steps
      for (let i = 0; i < steps; i++) {
        const t = i / (steps - 1)
        ctx.fillStyle = colorStopFn(t)
        ctx.fillRect(Math.floor(i * stepW), 0, Math.ceil(stepW), h)
      }
    } else if (direction.value === 'vertical') {
      const stepH = h / steps
      for (let i = 0; i < steps; i++) {
        const t = i / (steps - 1)
        ctx.fillStyle = colorStopFn(t)
        ctx.fillRect(0, Math.floor(i * stepH), w, Math.ceil(stepH))
      }
    } else {
      // Stepped Radial Gradient
      const maxR = Math.max(w, h) / 1.5
      const stepR = maxR / steps
      const cx = w / 2
      const cy = h / 2
      
      // Draw background color (final stop)
      ctx.fillStyle = colorStopFn(1)
      ctx.fillRect(0, 0, w, h)
      
      // Draw circles inside-out
      for (let i = steps - 1; i >= 0; i--) {
        const t = i / (steps - 1)
        ctx.fillStyle = colorStopFn(t)
        ctx.beginPath()
        ctx.arc(cx, cy, i * stepR, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }
}

// Watchers to re-render canvas when values change
watch([isSmooth, gradientType, direction], () => {
  renderGradient()
})

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
          <i class="bi bi-bar-chart-steps text-secondary fs-3"></i>
        </div>
        <h2 class="font-outfit fw-bold text-white mb-2">{{ $t('test.gradients') }}</h2>
        <p class="text-secondary font-outfit px-3 mb-0" style="font-size: 1.05rem;">
          {{ $t('gradients.instructions') }} Test for color banding, gray level tracking, and dither compression artifacts.
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
        
        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="emit('goBack')">
          <i class="bi bi-house-door me-1"></i>Home
        </button>

        <!-- Gradient Type Selector -->
        <select v-model="gradientType" class="form-select form-select-sm bg-dark text-white border-secondary fs-8" style="width: auto;">
          <option value="gray">Grayscale</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="spectrum">Rainbow</option>
        </select>

        <!-- Direction Selector -->
        <select v-model="direction" class="form-select form-select-sm bg-dark text-white border-secondary fs-8" style="width: auto;">
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
          <option value="radial">Radial</option>
        </select>

        <div class="vr bg-secondary opacity-30 my-1 mx-1"></div>

        <!-- Bit depth toggle -->
        <button class="btn btn-xs px-3 py-1 fs-8" 
                :class="isSmooth ? 'btn-success' : 'btn-primary'" 
                @click="isSmooth = !isSmooth">
          {{ isSmooth ? '10-Bit (Smooth)' : '8-Bit (Stepped)' }}
        </button>

        <div class="vr bg-secondary opacity-30 my-1 mx-1"></div>

        <!-- Exit and next buttons -->
        <button class="btn btn-xs btn-glass px-2 py-1 fs-8" @click="emit('complete')">
          Next <i class="bi bi-chevron-right ms-1"></i>
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
  background: rgba(108, 117, 125, 0.1);
  border: 1px solid rgba(108, 117, 125, 0.25);
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
