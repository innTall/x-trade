import { defineStore } from "pinia";
import DOMPurify from "dompurify";
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useTickerStore } from "./tickers.js";
export const useSearchStore = defineStore(
  "search",
  () => {
    const { tickers } = storeToRefs(useTickerStore());
    const searchTicker = ref("");

    const searchTickers = computed(() => {
      if (searchTicker.value === "") return [];
      const searchPattern = new RegExp(`^${searchTicker.value}`, "i");
      let matches = 0;
      return tickers.value.filter((ticker) => {
        if (searchPattern.test(ticker.symbol) && matches < 25) {
          matches++;
          return ticker;
        }
      });
    });
    const highlightMatch = (tickerSymbol) => {
      const regex = new RegExp(`(^${searchTicker.value})`, "i");
      const highlighted = tickerSymbol.replace(
        regex,
        `<span id="highlight" class="text-red-600">$1</span>`
      );
      return DOMPurify.sanitize(highlighted);
    };
    return { searchTicker, searchTickers, highlightMatch };
  },
  { persist: false }
);
