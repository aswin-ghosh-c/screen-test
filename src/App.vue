<script setup>
import { ref, computed } from 'vue'
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

const { t, locale } = useI18n()

const step = ref(0)
const platform = ref('')
const testIndex = ref(0)

const testOrder = computed(() => platform.value === 'mobile'
  ? ['touch','rgb','color-distance','gradients','sharpness','viewing-angle','gamma','response-time']
  : ['rgb','color-distance','gradients','sharpness','viewing-angle','gamma','response-time'])

function start() { step.value = 1 }
function selectDevice(p) { platform.value = p; step.value = 2; testIndex.value = 0 }
function nextTest() { if (testIndex.value < testOrder.value.length - 1) testIndex.value++; else step.value = 3 }
function prevTest() { if (testIndex.value > 0) testIndex.value-- }
function goBack() { step.value = 1; platform.value = ''; testIndex.value = 0 }
function restart() { step.value = 0; platform.value = ''; testIndex.value = 0 }

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
function getTestIcon(key) {
  return {
    touch: 'bi bi-hand-index-thumb-fill',
    rgb: 'bi bi-palette-fill',
    deadpixel: 'bi bi-dot',
    uniformity: 'bi bi-grid-3x3-gap-fill',
    'color-distance': 'bi bi-droplet-half',
    gradients: 'bi bi-bar-chart-steps',
    sharpness: 'bi bi-aspect-ratio',
    'viewing-angle': 'bi bi-arrows-angle-expand',
    gamma: 'bi bi-brightness-high',
    'response-time': 'bi bi-lightning-charge-fill'
  }[key]
}
</script>

<template>
  <div class="w-100 h-100 min-vh-100 position-relative bg-gradient d-flex flex-column" style="background: linear-gradient(135deg, #232526 0%, #414345 100%); font-family: 'Poppins', 'Segoe UI', Arial, sans-serif;">
    <div class="d-flex justify-content-end align-items-center p-3 position-fixed top-0 end-0" style="z-index:2000;">
      <LanguageSwitcher :model-value="locale" @update:model-value="locale = $event" always-visible dropdown />
    </div>
    <div class="flex-fill d-flex flex-column w-100 h-100 justify-content-center align-items-center" style="min-height:100vh;">
      <div class="w-100 d-flex justify-content-center align-items-center flex-grow-1" style="min-height:100vh;">
        <div class="main-content-80 d-flex flex-column align-items-center justify-content-center w-100">
          <WelcomePage v-if="step === 0" @start="start" />
          <PlatformSelect v-else-if="step === 1" @select="selectDevice" />
          <template v-else-if="step === 2">
            <div class="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
              <component
                :is="getTestComponent(testOrder[testIndex])"
                :key="testOrder[testIndex]"
                class="w-100 h-100 flex-grow-1"
                @complete="nextTest"
                @back="prevTest"
                @goBack="goBack"
              />
            </div>
          </template>
          <CompletionPage v-else-if="step === 3" @restart="restart" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-gradient { min-height: 100vh; }
.main-content-80 {
  width: 80vw;
  max-width: 1200px;
  min-width: 320px;
}
.navigation-row {
  width: 80vw;
  max-width: 1200px;
  min-width: 320px;
}
</style>
