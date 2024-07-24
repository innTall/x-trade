<script setup>
import HeaderBar from './components/HeaderBar.vue';
import FooterBar from './components/FooterBar.vue';
</script>
<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <HeaderBar />
    <div class="pt-14 pb-10">
      <RouterView />
    </div>
    <FooterBar />
  </div>
</template>

<style scoped></style>
