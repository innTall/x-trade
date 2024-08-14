<script setup>
import HeaderBar from './components/HeaderBar.vue';
import FooterBar from './components/FooterBar.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <HeaderBar />
    <div class="pt-24 pb-10">
      <RouterView v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </div>
    <FooterBar />
  </div>
</template>

<style scoped></style>
