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

const contrastMode = ref('dark') // dark (white text on black), light (black text on white)

function handleMouseMove() {
  showToolbar.value = true
  clearTimeout(toolbarTimeout)
  toolbarTimeout = setTimeout(() => {
    showToolbar.value = false
  }, 2500)
}

function startTest() {
  isActive.value = true
  contrastMode.value = 'dark'
  emit('toggle-fullscreen')
}

function exitTest() {
  isActive.value = false
}

function toggleContrast() {
  contrastMode.value = contrastMode.value === 'dark' ? 'light' : 'dark'
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
          <i class="bi bi-aspect-ratio text-dark fs-3" style="color: #6C63FF !important;"></i>
        </div>
        <h2 class="font-outfit fw-bold text-white mb-2">{{ $t('test.sharpness') }}</h2>
        <p class="text-secondary font-outfit px-3 mb-0" style="font-size: 1.05rem;">
          {{ $t('sharpness.instructions') }} Inspect fine lines and small text. If they are blurry or have red/blue halos, your screen's scaling or convergence might be misconfigured.
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
         class="fullscreen-test-container overflow-auto"
         :style="{ 
           backgroundColor: contrastMode === 'dark' ? '#000000' : '#ffffff',
           color: contrastMode === 'dark' ? '#ffffff' : '#000000'
         }"
         :class="{ 'show-toolbar': showToolbar }"
         @mousemove="handleMouseMove"
         @touchmove="handleMouseMove">
      
      <!-- Subtle Exit & Navigation Toolbar -->
      <div class="test-toolbar d-flex align-items-center gap-3" @click.stop>
        <span class="text-white-50 fs-8 fw-semibold me-2">Sharpness Test</span>
        
        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="emit('goBack')">
          <i class="bi bi-house-door me-1"></i>Home
        </button>

        <button class="btn btn-xs px-3 py-1 fs-8" 
                :class="contrastMode === 'dark' ? 'btn-light text-dark' : 'btn-dark text-white'" 
                @click="toggleContrast">
          {{ contrastMode === 'dark' ? 'Light Contrast' : 'Dark Contrast' }}
        </button>
        
        <div class="vr bg-secondary opacity-30 my-1"></div>
        
        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="emit('toggle-fullscreen')">
          <i class="bi bi-arrows-fullscreen"></i>
        </button>

        <button class="btn btn-xs btn-glass px-3 py-1 fs-8" @click="emit('complete')">
          Next <i class="bi bi-chevron-right ms-1"></i>
        </button>
        
        <button class="btn btn-xs btn-danger px-3 py-1 fs-8" @click="exitTest">
          Exit
        </button>
      </div>

      <!-- Sharpness Diagnostic Card Layout -->
      <div class="container-fluid h-100 p-4 d-flex flex-column flex-md-row gap-4" style="min-height: 100vh; pointer-events: none;">
        
        <!-- Left: Pixel grid pattern area -->
        <div class="flex-fill d-flex flex-column gap-3 justify-content-center align-items-stretch" style="min-width: 280px;">
          <!-- 1px horizontal stripes -->
          <div class="pattern-box border flex-fill position-relative" style="height: 120px; min-height: 100px;" :style="{ borderColor: contrastMode === 'dark' ? '#444' : '#ccc' }">
            <div class="position-absolute top-0 start-0 w-100 h-100" 
                 :style="{ 
                   backgroundImage: `linear-gradient(${contrastMode === 'dark' ? '#fff' : '#000'} 1px, transparent 1px)`,
                   backgroundSize: '100% 2px'
                 }"></div>
            <div class="pattern-label bg-dark bg-opacity-75 text-white position-absolute bottom-0 start-0 px-2 py-0.5 fs-9">
              1px Horizontal Stripes
            </div>
          </div>
          
          <!-- 1px vertical stripes -->
          <div class="pattern-box border flex-fill position-relative" style="height: 120px; min-height: 100px;" :style="{ borderColor: contrastMode === 'dark' ? '#444' : '#ccc' }">
            <div class="position-absolute top-0 start-0 w-100 h-100" 
                 :style="{ 
                   backgroundImage: `linear-gradient(90deg, ${contrastMode === 'dark' ? '#fff' : '#000'} 1px, transparent 1px)`,
                   backgroundSize: '2px 100%'
                 }"></div>
            <div class="pattern-label bg-dark bg-opacity-75 text-white position-absolute bottom-0 start-0 px-2 py-0.5 fs-9">
              1px Vertical Stripes
            </div>
          </div>

          <!-- Checkerboard 1px grid -->
          <div class="pattern-box border flex-fill position-relative" style="height: 120px; min-height: 100px;" :style="{ borderColor: contrastMode === 'dark' ? '#444' : '#ccc' }">
            <div class="position-absolute top-0 start-0 w-100 h-100" 
                 :style="{ 
                   backgroundImage: `linear-gradient(${contrastMode === 'dark' ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${contrastMode === 'dark' ? '#fff' : '#000'} 1px, transparent 1px)`,
                   backgroundSize: '2px 2px'
                 }"></div>
            <div class="pattern-label bg-dark bg-opacity-75 text-white position-absolute bottom-0 start-0 px-2 py-0.5 fs-9">
              1px Checkerboard Grid
            </div>
          </div>
        </div>

        <!-- Right: Small Text Calibration and Snellen Font Charts -->
        <div class="flex-fill d-flex flex-column justify-content-center p-3 border rounded" 
             :style="{ 
               borderColor: contrastMode === 'dark' ? '#444' : '#ccc',
               backgroundColor: contrastMode === 'dark' ? '#0a0a0a' : '#fafafa'
             }"
             style="min-width: 300px; max-width: 600px;">
          
          <h4 class="fs-8 fw-bold mb-3 border-bottom pb-2" :class="contrastMode === 'dark' ? 'text-white-50' : 'text-black-50'">
            Text Legibility & Anti-Aliasing Chart
          </h4>
          
          <div class="d-flex flex-column gap-2 text-start font-monospace">
            <div style="font-size: 18px; line-height: 1.2;">Font 18px: ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz</div>
            <div style="font-size: 16px; line-height: 1.2;">Font 16px: ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz</div>
            <div style="font-size: 14px; line-height: 1.2;">Font 14px: ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz</div>
            <div style="font-size: 12px; line-height: 1.2;">Font 12px: ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz</div>
            <div style="font-size: 10px; line-height: 1.1;">Font 10px: ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz</div>
            <div style="font-size: 9px; line-height: 1.1;">Font 9px: ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz</div>
            <div style="font-size: 8px; line-height: 1.0;">Font 8px: ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz</div>
            <div style="font-size: 7px; line-height: 1.0;">Font 7px: ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz</div>
          </div>

          <div class="mt-4 pt-3 border-top text-start" style="font-family: sans-serif;">
            <p class="fs-9 text-secondary mb-0">
              * Note: Look closely at the small font sizes (7px - 10px). If you see excessive color fringes (red, green, blue color fringes around letters), check that your display's subpixel layout matches your system OS text anti-aliasing profile (e.g. RGB vs BGR layout in Windows ClearType).
            </p>
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
  background: rgba(33, 37, 41, 0.1);
  border: 1px solid rgba(33, 37, 41, 0.25);
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
  font-size: 0.72rem;
}

.fs-9.text-secondary {
  color: #888 !important;
}
</style>
