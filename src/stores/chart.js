import { defineStore } from "pinia";
import { ref } from "vue";
import data from "../data/klines.json";
export const useChartStore = defineStore(
  "chart",
  () => {
    //let data;
    const ohlc = ref([]);
    const volume = ref([]);
    const chartScale = ref({ start: null, end: null });
    /*
    const getData = async (symbol = "LTCUSDT", interval = "1d") => {
      const uri = `https://api.binance.com/api/v3/klines?interval=${interval}&symbol=${symbol}`; // for candlestick chart
      const response = await fetch(uri);
      data = await response.json();
    */
    const getData = () => {
      // Clear existing data
      //ohlc.value = [];
      //volume.value = [];

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
