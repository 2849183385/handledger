<script setup>
import { ref,onMounted } from 'vue';
import BannerCarousel from './components/BannerCarousel.vue';
import CardBox from '@/components/CardBox.vue';
import { getLedgerListAPI } from '@/apis/ledger'
const ledgerList = ref([])
const limit = 10
const offset = 0
onMounted(() => {
    getLedgerListAPI(limit,offset).then(res => {
      ledgerList.value = res.data.data
        console.log(ledgerList.value);
    })
})
</script>

<template>
  <div class="main">
    <div class="banner">
      <div class="container">
        <BannerCarousel></BannerCarousel>
      </div>
    </div>

    <div class="content-box">
      <div class="container">
        <div class="item" v-for="item in ledgerList" :key="item.index">
          <CardBox :item="item"></CardBox>
        </div>
      </div>
    </div>
  </div>
  <!-- background-color: #eac0ce; -->
</template>

<style lang="scss" scoped>
.main {
  .content-box {
    margin-top: 35px;
    .container {
      
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .item {
      flex-grow: 1;
      height: 450px;
      width: 270px;
      margin: 20px 16.2px 20px 20px;

    }

    .item:nth-child(5n+1) {
      margin-left: 0;
    }

    .item:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
