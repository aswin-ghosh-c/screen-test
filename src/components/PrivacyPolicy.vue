<script setup>
const emit = defineEmits(['back'])
</script>

<template>
  <div class="glass-panel text-start animate__animated animate__fadeIn mx-auto max-width-card">
    
    <!-- Header -->
    <div class="mb-4 text-center border-bottom pb-3">
      <i class="bi bi-shield-lock text-accent-gradient fs-2 mb-2 d-inline-block"></i>
      <h2 class="font-outfit fw-bold text-white mb-1">Privacy Policy</h2>
      <p class="text-secondary-custom fs-9 mb-0">Last updated: June 12, 2026</p>
    </div>

    <!-- Content -->
    <div class="policy-content fs-8 text-secondary-custom overflow-auto pr-2" style="max-height: 350px;">
      <p class="text-white fw-semibold mb-2">1. Data Collection</p>
      <p class="mb-3">
        Screen Tester is a local diagnostic tool. We **do not collect, store, or transmit any personal data**, screen results, digitizer tracking logs, or system parameters. All calculations and calibrations are executed entirely client-side inside your browser.
      </p>

      <p class="text-white fw-semibold mb-2">2. Cookies and Storage</p>
      <p class="mb-3">
        We use local storage only to remember your diagnostic theme preferences (light/dark mode) and language selections. No tracking cookies are used.
      </p>

      <p class="text-white fw-semibold mb-2">3. Third-party Links</p>
      <p class="mb-3">
        Our codebase is open source and links to GitHub. Clicking these external links will redirect you to third-party web domains where their own respective privacy policies govern.
      </p>

      <p class="text-white fw-semibold mb-2">4. Policy Updates</p>
      <p class="mb-0">
        Any future modifications to this policy will be updated on this page. By continuing to use our diagnostic tools, you accept these terms.
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
