<script setup >
import { ref, onMounted } from 'vue';
import ItemInfo from '@/components/ItemInfo.vue'
import { useUserStore } from '@/stores/userStore';
import { getFavoritesAPI } from '@/apis/ledger';
const userStore = useUserStore();
const { user_id } = userStore.userInfo
const favoritesList = ref([])
const getfavorites = async () => {
  const res = await getFavoritesAPI(user_id)
  console.log(res.data.data);
  favoritesList.value = res.data.data
  console.log(favoritesList.value);

}
console.log(favoritesList.value);
onMounted(() => {
  getfavorites()
  console.log(favoritesList.value);
})
// const 
</script>

<template>
  <div class="container">
    <el-skeleton :rows="5" animated v-if="favoritesList.length === 0" />
    <div class="collection" v-else>
      <!-- <el-text>收藏</el-text> -->
      <div class="item-list" v-for="item in favoritesList" :key="item">
        <!-- 向子组件传参 -->
        <ItemInfo :item="item"></ItemInfo>
      </div>
    </div>

    <UserInfo></UserInfo>
  </div>
</template>

<style lang='scss' scoped>
.container{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}

.collection {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 10px;
  width: 100%;
  border-radius: 20px;
  background: #fff;
}
</style>