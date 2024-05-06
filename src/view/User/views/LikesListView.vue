<script setup >
import { ref, onMounted } from 'vue';
import ItemInfo from '@/components/ItemInfo.vue'
import { useUserStore } from '@/stores/userStore';
import { getLikesListAPI } from '@/apis/ledger';
const userStore = useUserStore();
const { user_id } = userStore.userInfo
const likesList = ref([])
const limit = 8, offset = 0
const getLikesList = async () => {
  const res = await getLikesListAPI(user_id, limit, offset)
  likesList.value = res.data.data
}
onMounted(() => {
  getLikesList()
  console.log(likesList.value);
});
// const 
</script>

<template>
      <!-- <el-text>收藏</el-text> -->
      <el-skeleton :rows="10" animated v-if="likesList.length === 0" />
          <div class="like-list" v-else>
              <!-- 向子组件传参 -->
              <ItemInfo :item="item" v-for="item in likesList" :key="item" style="margin:5px 7px;"></ItemInfo>
        </div>
</template>

<style lang='scss' scoped>
.container{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}

.likes {
 
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