<script setup >
import { convertToTimestamp } from '@/utils/format';
import { computed , toRefs } from "vue";
import { useTaskStore } from "@/stores/taskStore";
const taskStore = useTaskStore();
const { taskInfo } = toRefs(taskStore);

function isDeadline(time) {
    const date = new Date(time);
    return date.toDateString() === new Date().toDateString();
}
const allTasks= computed({
    get: () => {
        return (taskInfo.value.filter(task => task.is_delete == 0));
    },
})
const completedCount = computed({
    get: () => {
        return allTasks.value.filter(task => task.status=== 'Completed').length;
    },
})
const slippageCount = computed({
    get: () => {
        // 超时的任务
        return allTasks.value.filter(task => task.status !== 'Completed' && (task.end_date < convertToTimestamp(new Date()))).length;
    },
})
//今天截止任务
const deadlineCount = computed({
    get: () => {
        // 截止时间小于当前时间的任务
        return allTasks.value.filter(task => task.status!== 'Completed' && isDeadline(task.end_date )).length;
    },
})
</script>

<template>
   <!-- 全部任务盒子 -->
        <div class="all-task">
          <h2>所有任务</h2>
          <div class="all-task_item">
            <ul>
              <li style="">
                <!-- <span>{{ taskArrays && taskArrays.length}}</span> -->
                <span>{{ allTasks.length }}</span>
                <span>总任务</span>
              </li>
              <li style="background-color: #e1a14d;">
                <span>{{ deadlineCount }}</span>
                <span>今日截至</span>
              </li>
              <li>
                <span style="color: #ea5200;">{{ slippageCount }}</span>
                <span >逾期</span>
              </li>
              <li>
                <span>{{ completedCount }}</span>
                <span>已完成</span>
              </li>
            </ul>
          </div>
        </div>
        
</template>

<style lang='scss' scoped>
 //日历样式

  .all-task {
    flex: 2;
    margin-left: 15px;
    height: 120px;
    width: 325px;
    display: flex;
    flex-direction: column;

    .all-task_item {
      display: flex;
      flex-direction: column;
     

      ul {
        display: flex;
        flex-direction: row;
      

        li {
          overflow: hidden;
          background-color: #dbe8f6;
          display: flex;
          padding: 9px 13px;
          margin-right: 5px;
          line-height: 100%;
          border-radius: 5px;
          height: 60px;
          flex-direction: column;


          span {
            padding-top: 5px;
            flex: 1;
          }
        }
      }
    }
  }
</style>