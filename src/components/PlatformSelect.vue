<script setup>
const emit = defineEmits(['select', 'back'])
</script>

<template>
  <div class="glass-panel text-center animate__animated animate__fadeIn mx-auto" style="max-width: 700px; width: 90%;">
    
    <!-- Header -->
    <div class="mb-4 text-center">
      <i class="bi bi-display-fill text-accent-gradient fs-2 mb-2 d-inline-block"></i>
      <h2 class="font-outfit fw-bold mb-2">{{ $t('selectDevice') }}</h2>
      <p class="text-secondary font-outfit" style="font-size: 1.05rem;">
        Choose the testing environment tailored to your device form factor.
      </p>
    </div>

    <!-- Selection Grid -->
    <div class="row g-4 justify-content-center mb-5">
      <!-- Web Platform Card -->
      <div class="col-12 col-sm-6">
        <div class="glass-card h-100 d-flex flex-column align-items-center justify-content-center p-4" @click="emit('select', 'web')">
          <div class="icon-circle mb-3 bg-gradient-success-glow">
            <i class="bi bi-laptop text-success fs-2"></i>
          </div>
          <h3 class="h5 font-outfit fw-semibold mb-2 text-white">{{ $t('web') }}</h3>
          <p class="fs-7 text-secondary text-center mb-0 px-2">
            Optimized for full-screen laptop and desktop monitors. Calibration and pixel diagnostics.
          </p>
        </div>
      </div>

      <!-- Mobile Platform Card -->
      <div class="col-12 col-sm-6">
        <div class="glass-card h-100 d-flex flex-column align-items-center justify-content-center p-4" @click="emit('select', 'mobile')">
          <div class="icon-circle mb-3 bg-gradient-accent-glow">
            <i class="bi bi-phone text-primary fs-2"></i>
          </div>
          <h3 class="h5 font-outfit fw-semibold mb-2 text-white">{{ $t('mobile') }}</h3>
          <p class="fs-7 text-secondary text-center mb-0 px-2">
            Optimized for touchscreen devices. Includes touch response and resolution tests.
          </p>
        </div>
      </div>
    </div>

    <!-- Back Button -->
    <div class="d-flex justify-content-center mt-2">
      <button class="btn btn-glass px-4 py-2" @click="emit('back')">
        <i class="bi bi-arrow-left me-2"></i>{{ $t('goBack') }}
      </button>
    </div>

  </div>
</template>

<style scoped>
.icon-circle {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-gradient-success-glow {
  background: rgba(56, 239, 125, 0.1);
  border: 1px solid rgba(56, 239, 125, 0.25);
  box-shadow: 0 0 15px rgba(56, 239, 125, 0.05);
}

.bg-gradient-accent-glow {
  background: rgba(108, 99, 255, 0.1);
  border: 1px solid rgba(108, 99, 255, 0.25);
  box-shadow: 0 0 15px rgba(108, 99, 255, 0.05);
}

.font-outfit {
  font-family: 'Outfit', sans-serif;
}
</style>
