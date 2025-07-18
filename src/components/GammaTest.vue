<template>
  <div class="d-flex flex-column align-items-center justify-content-center w-100 h-100" style="width:80vw;min-height:100vh;">
    <div class="text-center mb-3">
      <i class="bi bi-brightness-high text-secondary mb-2" style="font-size:2.2rem;"></i>
      <h2 class="mb-1 fw-bold title-gradient" style="font-size:1.5rem; letter-spacing:0.5px;">{{ $t('test.gamma') }}</h2>
      <p class="mb-2 text-secondary" style="font-size:1.08rem;">{{ $t('gamma.instructions') }}</p>
    </div>
    <div class="w-100 mb-3 d-flex flex-column align-items-center">
      <div v-for="i in 10" :key="i" :style="{width:'100%',height:'16px',background:`hsl(0,0%,${i*10}%)`,borderRadius:'4px',margin:'2px 0'}"></div>
    </div>
    <div class="d-flex flex-row justify-content-center align-items-center gap-3 w-100 mt-2">
      <button class="btn btn-gradient-primary rounded-pill px-4" @click="$emit('back')">
        <i class="bi bi-chevron-left"></i> {{ $t('previous') }}
      </button>
      <button class="btn btn-gradient-primary rounded-pill px-4" @click="$emit('complete')">
        {{ $t('next') }} <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
// Gamma test placeholder
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap');
@import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

.title-gradient {
  background: linear-gradient(90deg, #868f96 0%, #596164 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.card {
  border-radius: 2rem;
}
</style>
