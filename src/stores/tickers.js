import { defineStore } from "pinia";
import { ref } from "vue";
import data from "../data/ticker.json";
export const useTickerStore = defineStore(
  "ticker",
  () => {
    const asset = ref("USDT");
    const tickers = ref([]);
    async function getSymbols() {
      try {
        //const uri = "https://api.binance.com/api/v3/ticker/24hr";
        //const response = await fetch(uri);
        //const data = await response.json();
        const filterAsset = data.filter((item) =>
          item.symbol.endsWith(asset.value)
        );
        const filterZero = filterAsset.filter((item) => item.count != 0);
        const filterOut = filterZero.filter(
          (item) =>
            !item.symbol.includes("DOWN") &&
            !item.symbol.includes("UP") &&
            !item.symbol.includes("BEAR") &&
            !item.symbol.includes("BULL")
        );
        function sortArray(x, y) {
          return x.symbol.localeCompare(y.symbol);
        }
        let sortedAbc = filterOut.sort(sortArray);
        tickers.value = sortedAbc.map(({ symbol, lastPrice, quoteVolume }) => {
          const format = new Intl.NumberFormat("en", { notation: "compact" });
          quoteVolume = format.format(quoteVolume);
          return { symbol, lastPrice, quoteVolume };
        });
      } catch (err) {
        console.log("error occurred", err);
      }
    }
    getSymbols();
    return { tickers, getSymbols };
  },
  { persist: false }
);
