<template>
  <div class="w-100 h-100 min-vh-100 d-flex flex-column align-items-center justify-content-center bg-gradient" style="background: linear-gradient(135deg, #232526 0%, #414345 100%); font-family: 'Poppins', 'Segoe UI', Arial, sans-serif;">
    <div class="text-center mb-4">
      <img src="https://img.icons8.com/color/96/monitor--v1.png" alt="Screen Tester" class="mb-2" style="width:56px;"/>
      <h1 class="mb-1 fw-bold title-gradient" style="font-size:2.1rem; letter-spacing:0.5px;">Screen Tester</h1>
      <p class="mb-2 text-secondary" style="font-size:1.08rem;">Test your device's display in style!</p>
    </div>
    <div class="d-flex gap-3 justify-content-center mb-1 w-100" style="max-width:500px;">
      <button class="btn btn-lg btn-gradient-secondary rounded-pill fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2 flex-fill" disabled>
        <i class="bi bi-phone-fill" style="font-size:1.2rem;"></i> <span>{{ $t('mobile') }} ({{ $t('comingSoon', 'Coming Soon') }})</span>
      </button>
      <button class="btn btn-lg btn-gradient-success rounded-pill fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2 flex-fill" @click="$emit('select', 'web')">
        <i class="bi bi-laptop-fill" style="font-size:1.2rem;"></i> <span>{{ $t('web') }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
// Emits 'select' event with 'mobile' or 'web'
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
  transition: box-shadow 0.2s, transform 0.2s;
}
.btn-gradient-primary:hover {
  box-shadow: 0 4px 24px 0 #6a11cb44;
  transform: translateY(-2px) scale(1.04);
  color: #fff;
}
.btn-gradient-success {
  background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
  color: #fff;
  border: none;
  transition: box-shadow 0.2s, transform 0.2s;
}
.btn-gradient-success:hover {
  box-shadow: 0 4px 24px 0 #43e97b44;
  transform: translateY(-2px) scale(1.04);
  color: #fff;
}
</style>
