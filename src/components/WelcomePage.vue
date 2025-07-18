<template>
  <div class="d-flex flex-column align-items-center justify-content-center w-100 h-100" style="width:80vw;min-height:100vh;">
    <div class="text-center mb-4">
      <img src="https://img.icons8.com/color/96/monitor--v1.png" alt="Screen Tester" class="mb-2" style="width:64px;"/>
      <h1 class="mb-2 fw-bold title-gradient" style="font-size:2.2rem; letter-spacing:1px;">{{ $t('appName') }}</h1>
      <p class="mb-3 text-secondary" style="font-size:1.1rem;">{{ $t('welcomeMessage', 'Easily test your device\'s display quality in a few simple steps.') }}</p>
    </div>
    <button class="btn btn-gradient-primary btn-lg rounded-pill fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2 px-5 py-2" @click="$emit('start')">
      <i class="bi bi-play-fill"></i> {{ $t('startTest') }}
    </button>
  </div>
</template>

<script setup>
// Emits 'start' event
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
.btn-gradient-primary {
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
  color: #fff;
  border: none;
}
.card {
  border-radius: 2rem;
}
</style>
