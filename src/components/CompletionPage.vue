<script setup>
const emit = defineEmits(['restart'])

// Completed test metrics
const completedTestsList = [
  { name: 'RGB Color Test', status: 'Passed', icon: 'bi-palette-fill', color: 'text-success' },
  { name: 'Dead Pixel Test', status: 'Passed', icon: 'bi-dot', color: 'text-danger' },
  { name: 'Uniformity Test', status: 'Passed', icon: 'bi-grid-3x3-gap-fill', color: 'text-warning' },
  { name: 'Color Distances Test', status: 'Passed', icon: 'bi-droplet-half', color: 'text-info' },
  { name: 'Gradients Test', status: 'Passed', icon: 'bi-bar-chart-steps', color: 'text-secondary' },
  { name: 'Response Time Test', status: 'Passed', icon: 'bi-lightning-charge-fill', color: 'text-primary' }
]
</script>

<template>
  <div class="glass-panel text-center animate__animated animate__fadeIn mx-auto max-width-card">
    
    <!-- Success Icon -->
    <div class="success-icon-wrapper mb-3 mx-auto">
      <div class="success-ring">
        <i class="bi bi-patch-check-fill text-success fs-1"></i>
      </div>
    </div>

    <!-- Title and message -->
    <h2 class="font-outfit fw-bold text-white mb-2">{{ $t('complete') }}</h2>
    <p class="text-secondary font-outfit px-3 mb-4" style="font-size: 1.05rem;">
      {{ $t('completionMessage') }}
    </p>

    <!-- Diagnostics Report Card -->
    <div class="report-box p-3 mb-4 text-start rounded-3" style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05);">
      <h3 class="fs-8 fw-semibold text-white-50 mb-3 border-bottom pb-2 font-outfit uppercase">
        Diagnostic Summary
      </h3>
      
      <div class="d-flex flex-column gap-2">
        <div v-for="t in completedTestsList" :key="t.name" class="d-flex align-items-center justify-content-between fs-8">
          <div class="d-flex align-items-center gap-2">
            <i class="bi" :class="[t.icon, t.color]" style="width: 16px;"></i>
            <span class="text-white-50">{{ t.name }}</span>
          </div>
          <span class="badge bg-success-glow text-success-light fw-bold fs-9">
            <i class="bi bi-check2 me-1"></i>{{ t.status }}
          </span>
        </div>
      </div>
    </div>

    <!-- Promo space / Developer link formatted beautifully -->
    <div class="promo-banner p-3 mb-4 text-start rounded-3 d-flex align-items-center gap-3">
      <div class="promo-icon bg-gradient-success-glow d-flex align-items-center justify-content-center">
        <i class="bi bi-shield-check text-success fs-4"></i>
      </div>
      <div>
        <h4 class="fs-8 fw-bold text-white mb-1">Calibration Tips</h4>
        <p class="fs-9 text-secondary mb-0">
          Ensure you set your display contrast to 50% and disable software color filters (Night Shift/f.lux) for optimal results.
        </p>
      </div>
    </div>

    <!-- Restart Action Button -->
    <button class="btn btn-premium px-5 py-2.5 fs-6" @click="emit('restart')">
      <i class="bi bi-arrow-repeat me-2 animate-spin"></i>
      {{ $t('restart') }}
    </button>

  </div>
</template>

<style scoped>
.max-width-card {
  max-width: 580px;
  width: 90%;
}

.success-icon-wrapper {
  width: 80px;
  height: 80px;
  position: relative;
}

.success-ring {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(40, 167, 69, 0.08);
  border: 1px solid rgba(40, 167, 69, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(40, 167, 69, 0.1);
}

.bg-success-glow {
  background: rgba(40, 167, 69, 0.15);
  border: 1px solid rgba(40, 167, 69, 0.3);
}

.text-success-light {
  color: #38ef7d;
}

.bg-gradient-success-glow {
  background: rgba(56, 239, 125, 0.1);
  border: 1px solid rgba(56, 239, 125, 0.2);
}

.promo-banner {
  background: rgba(108, 99, 255, 0.03);
  border: 1px solid rgba(108, 99, 255, 0.08);
}

.promo-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
}

.fs-8 {
  font-size: 0.82rem;
}

.fs-9 {
  font-size: 0.75rem;
}

.uppercase {
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
