import { defineStore } from "pinia";
import { ref } from "vue";

export const useAssetStore = defineStore(
  "asset",
  () => {
    const assets = ref(["BTC", "BNB", "ETH", "USDT"]);
    const selectedAsset = ref("USDT");
    function updateAsset(newAsset) {
      if (assets.value.includes(newAsset)) {
        selectedAsset.value = newAsset;
      }
    }
    return { assets, selectedAsset, updateAsset };
  },
  { persist: true }
);
