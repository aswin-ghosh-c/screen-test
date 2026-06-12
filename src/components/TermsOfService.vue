<script setup>
const emit = defineEmits(['back'])
</script>

<template>
  <div class="glass-panel text-start animate__animated animate__fadeIn mx-auto max-width-card">
    
    <!-- Header -->
    <div class="mb-4 text-center border-bottom pb-3">
      <i class="bi bi-file-earmark-ruled text-accent-gradient fs-2 mb-2 d-inline-block"></i>
      <h2 class="font-outfit fw-bold text-white mb-1">Terms of Service</h2>
      <p class="text-secondary-custom fs-9 mb-0">Last updated: June 12, 2026</p>
    </div>

    <!-- Content -->
    <div class="terms-content fs-8 text-secondary-custom overflow-auto pr-2" style="max-height: 350px;">
      <p class="text-white fw-semibold mb-2">1. Terms Acceptance</p>
      <p class="mb-3">
        By accessing and initiating the screen diagnostics on Screen Tester, you agree to comply with and be bound by these terms. If you do not accept these terms, you are advised to exit.
      </p>

      <p class="text-white fw-semibold mb-2">2. Warranty Exclusions</p>
      <p class="mb-3">
        Screen Tester is provided "as is" and "as available". We make no warranties regarding diagnosis accuracy, or compatibility. You assume all responsibility. In no event shall we be liable for display panel malfunctions, hardware degradation, or burn-in artifacts that may occur during solid field, high brightness, or high frame-rate response tests.
      </p>

      <p class="text-white fw-semibold mb-2">3. License</p>
      <p class="mb-3">
        This open-source code is released under the MIT License. You are permitted to modify, distribute, and integrate components according to licensing rules.
      </p>

      <p class="text-white fw-semibold mb-2">4. Prohibited Uses</p>
      <p class="mb-0">
        You agree not to automate web diagnostic requests to disrupt local host routing, inject malicious vectors, or claim direct ownership of assets.
      </p>
    </div>

    <!-- Back Button -->
    <div class="d-flex justify-content-center mt-4 border-top pt-3">
      <button class="btn btn-glass px-4 py-2" @click="emit('back')">
        <i class="bi bi-house-door me-2"></i>Return to Home
      </button>
    </div>

  </div>
</template>

<style scoped>
.max-width-card {
  max-width: 650px;
  width: 90%;
}

.fs-8 {
  font-size: 0.9rem;
  line-height: 1.6;
}

.fs-9 {
  font-size: 0.78rem;
}

.pr-2 {
  padding-right: 0.5rem;
}
</style>
