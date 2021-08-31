<template>
<div class="app1">
    <div>
        <button @click="$refs.trade.setSymbol('UB/UCT', 1)">UB/UCT/1</button>
        <button @click="$refs.trade.setSymbol('ETH/UCT', 5)">ETH/UCT/5</button>
        <button @click="$refs.trade.setSymbol('BTC/USDT', 15)">BTC/USDT/15</button>
        <button @click="$refs.trade.setSymbol('BTC/UCT', 30)">BTC/USDT/30</button>
        <button @click="$refs.trade.setSymbol('ETH/USDT', 60)">BTC/USDT/H1</button>
        <button @click="$refs.trade.setSymbol('BTC/USDT', 'D')">BTC/USDT/D1</button>
        <button @click="$refs.trade.setSymbol('BTC/USDT', 'W')">BTC/USDT/W1</button>
    </div>
    <trade-view ref="trade"></trade-view>

</div>
</template>

<script>
import TradeView from "@/components/TradeView/index.vue";
export default {
    name: "App",
    components: {
        TradeView
    },
    mounted() {
        // 初始化
        this.$refs.trade.init("BTC/USDT", 15);
    }
};
</script>
