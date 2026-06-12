<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import WelcomePage from './components/WelcomePage.vue'
import PlatformSelect from './components/PlatformSelect.vue'
import TouchTest from './components/TouchTest.vue'
import ColorTest from './components/ColorTest.vue'
import DeadPixelTest from './components/DeadPixelTest.vue'
import UniformityTest from './components/UniformityTest.vue'
import ColorDistanceTest from './components/ColorDistanceTest.vue'
import GradientsTest from './components/GradientsTest.vue'
import SharpnessTest from './components/SharpnessTest.vue'
import ViewingAngleTest from './components/ViewingAngleTest.vue'
import GammaTest from './components/GammaTest.vue'
import ResponseTimeTest from './components/ResponseTimeTest.vue'
import CompletionPage from './components/CompletionPage.vue'
import PrivacyPolicy from './components/PrivacyPolicy.vue'
import TermsOfService from './components/TermsOfService.vue'

const { t, locale } = useI18n()

const step = ref(0)
const platform = ref('')
const testIndex = ref(0)
const isFullscreen = ref(false)
const theme = ref('dark')

// Define full test suite order for both Mobile & Web platforms
const testOrder = computed(() => {
  if (platform.value === 'mobile') {
    return ['touch', 'rgb', 'deadpixel', 'uniformity', 'color-distance', 'gradients', 'sharpness', 'viewing-angle', 'gamma', 'response-time']
  } else {
    return ['rgb', 'deadpixel', 'uniformity', 'color-distance', 'gradients', 'sharpness', 'viewing-angle', 'gamma', 'response-time']
  }
})

// Navigation methods
function start() { 
  step.value = 1 
}

function selectDevice(p) { 
  platform.value = p
  step.value = 2
  testIndex.value = 0 
}

function nextTest() { 
  if (testIndex.value < testOrder.value.length - 1) {
    testIndex.value++
  } else {
    step.value = 3
    exitFullscreen()
  }
}

function prevTest() { 
  if (testIndex.value > 0) {
    testIndex.value--
  } else {
    goBack()
  }
}

function goBack() { 
  step.value = 1
  platform.value = ''
  testIndex.value = 0
  exitFullscreen()
}

function restart() { 
  step.value = 0
  platform.value = ''
  testIndex.value = 0
  exitFullscreen()
}

// Fullscreen API Helper
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      isFullscreen.value = true
    }).catch(err => {
      console.warn(`Error enabling fullscreen: ${err.message}`)
    })
  } else {
    document.exitFullscreen()
  }
}

function exitFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  }
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme.value)
  }
  if (typeof document !== 'undefined') {
    if (theme.value === 'light') {
      document.body.classList.add('light-theme')
    } else {
      document.body.classList.remove('light-theme')
    }
  }
}

onMounted(() => {
  document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement
  })
  
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    theme.value = savedTheme
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme')
    } else {
      document.body.classList.remove('light-theme')
    }
  }
})

function getTestComponent(key) {
  return {
    touch: TouchTest,
    rgb: ColorTest,
    deadpixel: DeadPixelTest,
    uniformity: UniformityTest,
    'color-distance': ColorDistanceTest,
    gradients: GradientsTest,
    sharpness: SharpnessTest,
    'viewing-angle': ViewingAngleTest,
    gamma: GammaTest,
    'response-time': ResponseTimeTest
  }[key]
}

const currentTestTitle = computed(() => {
  if (step.value !== 2) return ''
  const key = testOrder.value[testIndex.value]
  return t(`test.${key}`)
})
</script>

<template>
  <div class="min-vh-100 d-flex flex-column justify-content-between position-relative">
    
    <!-- Application Header (hidden in actual active test step to prevent display overlaps) -->
    <header v-if="step !== 2" class="container py-3 d-flex justify-content-between align-items-center" style="z-index: 10;">
      <div class="d-flex align-items-center gap-2 cursor-pointer" @click="restart">
        <div class="brand-logo d-flex align-items-center justify-content-center">
          <i class="bi bi-display text-accent-gradient" style="font-size: 1.8rem; filter: drop-shadow(0 0 10px rgba(108, 99, 255, 0.5));"></i>
        </div>
        <span class="fs-4 fw-extrabold tracking-tight text-glow-gradient font-outfit">Screen<span class="text-accent-gradient">Tester</span></span>
      </div>
      
      <div class="d-flex align-items-center gap-3">
        <!-- Theme Toggle Button -->
        <button class="btn btn-glass px-3 py-1.5 fs-6 d-flex align-items-center gap-2" @click="toggleTheme" aria-label="Toggle Theme">
          <i class="bi" :class="theme === 'dark' ? 'bi-sun-fill text-warning' : 'bi-moon-fill text-primary'"></i>
          <span class="d-none d-sm-inline">{{ theme === 'dark' ? 'Light' : 'Dark' }}</span>
        </button>

        <!-- GitHub Link -->
        <a href="https://github.com/aswin-ghosh-c/screen-test" target="_blank" class="btn btn-glass px-3 py-1.5 fs-6 d-flex align-items-center gap-2" aria-label="GitHub Repository">
          <i class="bi bi-github"></i>
          <span class="d-none d-sm-inline">GitHub</span>
        </a>
        <LanguageSwitcher :model-value="locale" @update:model-value="locale = $event" />
      </div>
    </header>

    <!-- Progress Indicator for active test phase -->
    <div v-if="step === 2" class="w-100 position-fixed top-0 start-0" style="z-index: 10000; height: 4px; background: rgba(255, 255, 255, 0.05);">
      <div class="h-100 bg-gradient-success" :style="{ width: `${((testIndex + 1) / testOrder.length) * 100}%`, background: 'linear-gradient(90deg, #6C63FF 0%, #38ef7d 100%)', transition: 'width 0.3s ease' }"></div>
    </div>

    <!-- Active view container -->
    <main class="flex-grow-1 d-flex flex-column align-items-center justify-content-center py-4 w-100">
      <div :class="[step === 2 ? 'w-100 h-100' : 'container d-flex justify-content-center']">
        <transition name="fade" mode="out-in">
          <WelcomePage v-if="step === 0" @start="start" />
          <PlatformSelect v-else-if="step === 1" @select="selectDevice" @back="step = 0" />
          <div v-else-if="step === 2" class="w-100 h-100">
            <component
              :is="getTestComponent(testOrder[testIndex])"
              :key="testOrder[testIndex]"
              class="w-100 h-100"
              :is-simulated="platform === 'mobile'"
              :current-index="testIndex"
              :total-tests="testOrder.length"
              @complete="nextTest"
              @back="prevTest"
              @goBack="goBack"
              @toggle-fullscreen="toggleFullscreen"
            />
          </div>
          <CompletionPage v-else-if="step === 3" @restart="restart" />
          <PrivacyPolicy v-else-if="step === 'privacy'" @back="restart" />
          <TermsOfService v-else-if="step === 'terms'" @back="restart" />
        </transition>
      </div>
    </main>

    <!-- Application Footer (hidden in active tests) -->
    <footer v-if="step !== 2" class="container py-4 border-top border-secondary border-opacity-10 text-center text-secondary-custom fs-7" style="z-index: 10;">
      <p class="mb-1">
        &copy; 2026 ScreenTester. Released under the MIT License.
      </p>
      <div class="d-flex justify-content-center gap-3 mt-2">
        <a href="https://github.com/aswin-ghosh-c/screen-test" target="_blank" class="text-secondary-custom text-decoration-none hover-white">
          <i class="bi bi-github me-1"></i>GitHub
        </a>
        <span class="text-muted">|</span>
        <a href="#" @click.prevent="step = 'privacy'" class="text-secondary-custom text-decoration-none hover-white">Privacy Policy</a>
        <span class="text-muted">|</span>
        <a href="#" @click.prevent="step = 'terms'" class="text-secondary-custom text-decoration-none hover-white">Terms of Service</a>
      </div>
    </footer>

  </div>
</template>

<style>
/* Global Custom Styles for Out-in views transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.font-outfit {
  font-family: 'Outfit', sans-serif;
}
.fw-extrabold {
  font-weight: 800;
}
.fs-7 {
  font-size: 0.85rem;
}
.hover-white:hover {
  color: var(--text-color) !important;
}
</style>
