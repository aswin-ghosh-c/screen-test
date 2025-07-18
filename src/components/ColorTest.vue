<template>
  <div class="d-flex flex-column align-items-center justify-content-center w-100 h-100" style="width:80vw;min-height:100vh;">
    <div class="text-center mb-3">
      <i class="bi bi-palette-fill text-success mb-2" style="font-size:2.2rem;"></i>
      <h2 class="mb-1 fw-bold title-gradient" style="font-size:1.5rem; letter-spacing:0.5px;">{{ $t('test.rgb') }}</h2>
      <p class="mb-2 text-secondary" style="font-size:1.08rem;">{{ $t('color.instructions') }}</p>
    </div>
    <div class="d-flex justify-content-center gap-3 mb-3">
      <button v-for="color in colors" :key="color" class="rounded-circle border border-2 shadow-sm" :style="{background: color, width: '48px', height: '48px', borderColor: selected === color ? '#000' : '#888'}" @click="selected = color"></button>
    </div>
    <div v-if="!selected" class="d-flex flex-row justify-content-center align-items-center gap-3 w-100 mt-2">
      <button class="btn btn-gradient-primary rounded-pill px-4" @click="$emit('back')">
        <i class="bi bi-chevron-left"></i> {{ $t('previous') }}
      </button>
      <button class="btn btn-gradient-primary rounded-pill px-4" @click="$emit('complete')">
        {{ $t('next') }} <i class="bi bi-chevron-right"></i>
      </button>
    </div>
    <div v-if="selected" class="position-fixed top-0 start-0 w-100 h-100 animate__animated animate__fadeIn" :style="{background: selected, zIndex: 1050}" @click="selected = ''"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffffff', '#000000']
const selected = ref('')
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap');
@import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

.title-gradient {
  background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.card {
  border-radius: 2rem;
}
</style>
