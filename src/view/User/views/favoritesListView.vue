<script setup >
import { ref, onMounted } from 'vue';
import ItemInfo from '@/components/ItemInfo.vue'
import { useUserStore } from '@/stores/userStore';
import { getFavoritesListAPI } from '@/apis/ledger';
const userStore = useUserStore();
const { user_id } = userStore.userInfo
const favoritesList = ref([])
const getfavoritesList = async () => {
    const res = await getFavoritesListAPI(user_id)
    console.log(res.data.data);
    favoritesList.value = res.data.data
    console.log(favoritesList.value);

}
console.log(favoritesList.value);
onMounted(() => {
    getfavoritesList()
    console.log(favoritesList.value);
})
</script>

<template>
 <el-skeleton :rows="5" animated v-if="favoritesList.length === 0" />
        <div class="collection" v-else>
          <!-- <el-text>收藏</el-text> -->
          <div class="item-list" >
            <!-- 向子组件传参 -->
            <ItemInfo :item="item" v-for="item in favoritesList" :key="item"></ItemInfo>
          </div>
        </div>
</template>

<style lang='scss' scoped>
.collection {
  margin: 10px;
  width: 100%;
  border-radius: 20px;
  background: #fff;
  padding: 15px 20px;
  .item-list{
     display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  }
}
</style>