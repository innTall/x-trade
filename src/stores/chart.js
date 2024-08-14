import { defineStore } from "pinia";
import { ref } from "vue";
//import data from "../data/klines.json";
import { storeToRefs } from "pinia";
import { useIntervalStore } from "./intervals.js";
import { useRouter, useRoute } from "vue-router";
//const router = useRouter();
//const route = useRoute();
export const useChartStore = defineStore(
  "chart",
  () => {
    const router = useRouter();
    const route = useRoute();
    const { selectedInterval } = storeToRefs(useIntervalStore());
    let data;
    const ohlc = ref([]);
    const volume = ref([]);
    const interval = selectedInterval.value;
    //const symbol = route.params.symbol;
    const chartScale = ref({ start: null, end: null });
    
    const getData = async () => {
      const uri = `https://api.binance.com/api/v3/klines?interval=${interval}&symbol=${route.params.symbol}`; // for candlestick chart
      const response = await fetch(uri);
      data = await response.json();

      //const getData = () => {
      // Clear existing data
      ohlc.value = [];
      volume.value = [];

      data.forEach((candle) => {
        ohlc.value.push([
          +candle[0], // date
          +candle[1], // open
          +candle[2], // high
          +candle[3], // low
          +candle[4], // close
        ]);
        volume.value.push({
          x: +candle[0],
          y: +candle[5], // volume
        });
      });
    };
    getData(data);
    return {
      data,
      ohlc,
      volume,
      chartScale,
      getData,
    };
  },
  {
    persist: true,
  }
);
