<template>
  <div class="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-gradient" style="background: linear-gradient(135deg, #232526 0%, #414345 100%); font-family: 'Poppins', 'Segoe UI', Arial, sans-serif;">
    <div class="card shadow-lg border-0 p-4 animate__animated animate__fadeIn" style="min-width:340px;max-width:420px; border-radius:2rem;">
      <div class="text-center mb-3">
        <i class="bi bi-laptop-fill text-success mb-2" style="font-size:2.2rem;"></i>
        <h2 class="mb-1 fw-bold title-gradient" style="font-size:1.5rem; letter-spacing:0.5px;">Web Tests</h2>
        <p class="mb-2 text-secondary" style="font-size:1.08rem;">Select the tests you want to run:</p>
      </div>
      <div class="d-grid gap-2 mb-2">
        <button class="btn btn-gradient-success btn-lg rounded-pill d-flex align-items-center gap-2" @click="$emit('test', 'rgb')">
          <i class="bi bi-palette-fill"></i> RGB Color Test
        </button>
        <button class="btn btn-gradient-danger btn-lg rounded-pill d-flex align-items-center gap-2" @click="$emit('test', 'deadpixel')">
          <i class="bi bi-dot"></i> Dead Pixel Test
        </button>
        <button class="btn btn-gradient-warning btn-lg rounded-pill d-flex align-items-center gap-2" @click="$emit('test', 'uniformity')">
          <i class="bi bi-grid-3x3-gap-fill"></i> Uniformity
        </button>
        <button class="btn btn-gradient-info btn-lg rounded-pill d-flex align-items-center gap-2" @click="$emit('test', 'color-distance')">
          <i class="bi bi-droplet-half"></i> Color Distances
        </button>
        <button class="btn btn-gradient-secondary btn-lg rounded-pill d-flex align-items-center gap-2" @click="$emit('test', 'gradients')">
          <i class="bi bi-bar-chart-steps"></i> Gradients
        </button>
        <button class="btn btn-gradient-dark btn-lg rounded-pill d-flex align-items-center gap-2" @click="$emit('test', 'sharpness')">
          <i class="bi bi-aspect-ratio"></i> Sharpness
        </button>
        <button class="btn btn-gradient-light btn-lg rounded-pill d-flex align-items-center gap-2" @click="$emit('test', 'viewing-angle')">
          <i class="bi bi-arrows-angle-expand"></i> Viewing Angle
        </button>
        <button class="btn btn-gradient-secondary btn-lg rounded-pill d-flex align-items-center gap-2" @click="$emit('test', 'gamma')">
          <i class="bi bi-brightness-high"></i> Gamma
        </button>
        <button class="btn btn-gradient-primary btn-lg rounded-pill d-flex align-items-center gap-2" @click="$emit('test', 'response-time')">
          <i class="bi bi-lightning-charge-fill"></i> Response Time
        </button>
      </div>
      <button class="btn btn-secondary w-100 rounded-pill mt-1 d-flex align-items-center justify-content-center gap-2" @click="$emit('back')">
        <i class="bi bi-arrow-left"></i> Back
      </button>
    </div>
  </div>
</template>

<script setup>
// Emits 'test' event with test type, or 'back' event
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
.btn-gradient-success {
  background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
  color: #fff;
  border: none;
}
.btn-gradient-danger {
  background: linear-gradient(90deg, #ff512f 0%, #dd2476 100%);
  color: #fff;
  border: none;
}
.btn-gradient-warning {
  background: linear-gradient(90deg, #f7971e 0%, #ffd200 100%);
  color: #fff;
  border: none;
}
.btn-gradient-info {
  background: linear-gradient(90deg, #43cea2 0%, #185a9d 100%);
  color: #fff;
  border: none;
}
.btn-gradient-secondary {
  background: linear-gradient(90deg, #868f96 0%, #596164 100%);
  color: #fff;
  border: none;
}
.btn-gradient-dark {
  background: linear-gradient(90deg, #232526 0%, #414345 100%);
  color: #fff;
  border: none;
}
.btn-gradient-light {
  background: linear-gradient(90deg, #e0eafc 0%, #cfdef3 100%);
  color: #232526;
  border: none;
}
.card {
  border-radius: 2rem;
}
</style>
