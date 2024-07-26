import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useSearchStore } from "./searches.js";
const MAX_TICKERS = 3;

export const useSelectStore = defineStore(
  "select",
  () => {
    const { searchTickers } = storeToRefs(useSearchStore());
    const selectedTickers = ref([]);
		const errorMessage = ref("");
		
    const selectTicker = (tickerSymbol) => {
      const ticker = searchTickers.value.find(
        (ticker) => ticker.symbol === tickerSymbol
      );
			errorMessage.value = "";
      if (selectedTickers.value.includes(ticker)) {
        errorMessage.value = "This ticker is already selected.";
        return;
      }
      if (selectedTickers.value.length >= MAX_TICKERS) {
        errorMessage.value = `You can only select up to ${MAX_TICKERS} tickers.`;
        return;
      }
      
      if (
        ticker &&
        !selectedTickers.value.find((t) => t.symbol === tickerSymbol)
      ) {
        selectedTickers.value.push(ticker);
      }
    };
    const deselectTicker = (tickerSymbol) => {
      selectedTickers.value = selectedTickers.value.filter(
        (ticker) => ticker.symbol !== tickerSymbol
      );
    };
    // Clear error message when searchItem changes
    watch(searchTickers, () => {
      errorMessage.value = "";
    });
    return { selectedTickers, errorMessage, selectTicker, deselectTicker };
  },
  { persist: false }
);
