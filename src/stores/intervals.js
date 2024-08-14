import { defineStore } from "pinia";
import { ref } from "vue";

export const useIntervalStore = defineStore(
  "interval",
  () => {
    const intervals = ref(["15m", "1h", "4h", "1d", "1w", "1M"]);
    const selectedInterval = ref("1d");
    function updateInterval(newInterval) {
      if (intervals.value.includes(newInterval)) {
        selectedInterval.value = newInterval;
      }
    }
    return { intervals, selectedInterval, updateInterval };
  },
  { persist: true }
);
