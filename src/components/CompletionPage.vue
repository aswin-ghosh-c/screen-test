<template>
  <div class="d-flex flex-column align-items-center justify-content-center w-100 h-100" style="width:80vw;min-height:100vh;">
    <div class="text-center mb-4">
      <i class="bi bi-check-circle-fill text-success mb-2" style="font-size:2.5rem;"></i>
      <h2 class="mb-2 fw-bold title-gradient" style="font-size:1.7rem; letter-spacing:0.5px;">{{ $t('complete') }}</h2>
      <p class="mb-3 text-secondary" style="font-size:1.1rem;">{{ $t('completionMessage') }}</p>
    </div>
    <div class="mb-4" style="min-height:90px;display:flex;align-items:center;justify-content:center;background:#f8f9fa;border-radius:1rem;">
      <span class="text-muted">{{ $t('adSpace') }}</span>
    </div>
    <button class="btn btn-gradient-primary btn-lg rounded-pill fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2 px-5 py-2" @click="$emit('restart')">
      <i class="bi bi-arrow-repeat"></i> {{ $t('restart') }}
    </button>
  </div>
</template>

<script setup>
// Emits 'restart' event
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
