<template>
  <div class="language-switcher position-relative">
    <button class="dropdown-toggle btn btn-glass px-3 py-1.5 fs-6 d-flex align-items-center justify-content-center" @click="toggleDropdown" :aria-expanded="dropdownOpen" aria-label="Select language">
      <i class="bi bi-globe2 me-2"></i>
      <span class="fw-bold lang-label">{{ languages[modelValue] }}</span>
    </button>
    <div v-if="dropdownOpen" class="dropdown-menu show p-1" style="min-width:160px;">
      <button v-for="(lang, code) in languages" :key="code" @click="selectLang(code)"
        :class="['dropdown-item d-flex align-items-center gap-2', {active: modelValue === code}]">
        <span v-html="getFlag(code)"></span>
        <span>{{ lang }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  zh: '中文',
  ru: 'Русский',
  ja: '日本語',
  hi: 'हिन्दी',
  id: 'Bahasa',
  km: 'ខ្មែរ',
  ml: 'മലയാളം',
  ta: 'தமிழ்'
}
function getFlag(code) {
  return {
    en: '🇬🇧', es: '🇪🇸', fr: '🇫🇷', de: '🇩🇪', zh: '🇨🇳', ru: '🇷🇺', ja: '🇯🇵', hi: '🇮🇳', id: '🇮🇩', km: '🇰🇭', ml: '🇮🇳', ta: '🇮🇳'
  }[code] || code
}
const dropdownOpen = ref(false)
function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}
function selectLang(code) {
  emit('update:modelValue', code)
  dropdownOpen.value = false
}
function handleClickOutside(e) {
  if (!e.target.closest('.language-switcher')) dropdownOpen.value = false
}
onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<style scoped>
/* Premium Glass UI for Language Switcher */
.language-switcher {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 3000;
}
.lang-label {
  color: inherit;
  font-size: 0.95rem;
  margin-left: 0.3rem;
}
.dropdown-menu {
  position: absolute;
  top: 115%;
  right: 0;
  background: var(--dropdown-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  border: 1px solid var(--dropdown-border);
  min-width: 170px;
  z-index: 4000;
  max-height: 300px;
  overflow-y: auto;
}
.dropdown-item {
  background: none;
  border: none;
  color: var(--dropdown-text);
  font-size: 0.95rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  transition: all 0.2s ease;
}
.dropdown-item:hover {
  background: var(--dropdown-hover-bg);
  color: var(--dropdown-hover-text);
}
.dropdown-item.active {
  background: rgba(108, 99, 255, 0.2);
  color: #6C63FF;
  font-weight: 600;
  border: 1px solid rgba(108, 99, 255, 0.3);
}
</style>
