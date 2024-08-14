import { defineStore } from "pinia";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useIntervalStore } from "./intervals.js";
//import data from "../data/sparkline.json";
export const useSparklineStore = defineStore(
  "sparkline",
  () => {
    const { selectedInterval } = storeToRefs(useIntervalStore());
    let data;
    const prices = ref([]);

    const symbol = "BTCUSDT";
    const interval = selectedInterval.value;
    const uri = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=100`;
    const fetchData = async () => {
      try {
        const response = await fetch(uri);
        data = await response.json();
        prices.value = data.map((kline) => parseFloat(kline[4]));
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    //const fetchData = () => {
    //	prices.value = data.map((kline) => parseFloat(kline[4]));
    //};
    fetchData();
    return { data, prices };
  },
  {
    persist: false,
  }
);
