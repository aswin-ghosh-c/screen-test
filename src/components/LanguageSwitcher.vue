<template>
  <div class="language-switcher position-relative">
    <button class="dropdown-toggle lang-dropdown-btn d-flex align-items-center justify-content-center" @click="toggleDropdown" :aria-expanded="dropdownOpen" aria-label="Select language">
      <i class="bi bi-globe2 me-2" style="font-size:1.5rem;"></i>
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
  en: 'English', es: 'Español', fr: 'Français', de: 'Deutsch', zh: '中文', ru: 'Русский', ja: '日本語', hi: 'हिन्दी', id: 'Bahasa', km: 'ខ្មែរ'
}
function getFlag(code) {
  return {
    en: '🇬🇧', es: '🇪🇸', fr: '🇫🇷', de: '🇩🇪', zh: '🇨🇳', ru: '🇷🇺', ja: '🇯🇵', hi: '🇮🇳', id: '🇮🇩', km: '🇰🇭'
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
.language-switcher {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 3000;
}
.lang-dropdown-btn {
  background: rgba(30,30,30,0.95);
  color: #fff;
  border: 1.5px solid #fff;
  border-radius: 2rem;
  padding: 0.3rem 1.1rem 0.3rem 0.8rem;
  font-size: 1.1rem;
  min-width: 120px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s, color 0.2s;
}
.lang-dropdown-btn:focus, .lang-dropdown-btn:hover {
  background: #fff;
  color: #232526;
  border-color: #232526;
}
.lang-label {
  color: #fff;
  font-size: 1.1rem;
  margin-left: 0.2rem;
  text-shadow: 0 1px 2px #232526;
}
.dropdown-menu {
  position: absolute;
  top: 110%;
  right: 0;
  background: #232526;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  border: 1.5px solid #fff;
  min-width: 160px;
  z-index: 4000;
}
.dropdown-item {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.08rem;
  padding: 0.5rem 1.2rem;
  border-radius: 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  transition: background 0.18s, color 0.18s;
}
.dropdown-item.active, .dropdown-item:hover {
  background: #fff;
  color: #232526;
}
</style>
