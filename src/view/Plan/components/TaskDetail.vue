<script setup >
import { formatTimestamp, convertToTimestamp } from '@/utils/format'
import { computed,watch,ref, toRefs } from 'vue'
import { useTaskStore } from '@/stores/taskStore';
const taskStore = useTaskStore()
const { taskInfo } = toRefs(taskStore)
const props = defineProps({
  selectTaskId: {
    type: Number,
    required: true
  }
})
console.log(taskInfo)
const taskDetail = ref(null)
watch([()=> taskInfo,() => props.selectTaskId], () => {
  taskDetail.value = taskInfo.value.find(task => task.task_id === props.selectTaskId)
 console.log('taskDetail被渲染',taskDetail)
})
console.log(taskDetail)
const completestaus = computed({
  get: () => {
    if (!(taskDetail.value == null)) {
      //如果截止时间小于当前时间，且任务未完成，则显示红色
      if (taskDetail.value.end_date < convertToTimestamp(new Date()) && taskDetail.value.status != 'Completed')
        return 'red'
      else {
        return taskDetail.value.status == 'pending' ? 'green' : 'yellow'
      }
    } else {
      return null
    }
  }
})
console.log('taskDetail被渲染')
</script>

<template>
  <div class="bg-box" v-show="taskDetail">
    <el-icon :color="completestaus">
      <CollectionTag />
    </el-icon>
    <el-icon color="green">
      <Aim />
    </el-icon>
    <div class="task-detail">
      <h3>任务详情</h3>
      <div class="detail-item">
        <span>任务名称</span>
        <el-text> {{ taskDetail && taskDetail.task_title }}</el-text>
      </div>
      <div class="detail-item">
        <span>状态:</span>
        <el-text>
          {{ taskDetail && (taskDetail.status == 'Completed' ? '已完成' : '待完成') }}
        </el-text>
      </div>
      <div class="detail-item">
        <span>任务内容:</span>
        <div class="task-content">
          <el-text :truncated="true">{{ taskDetail && taskDetail.task_description }}</el-text>
        </div>
      </div>
      <div class="detail-item">
        <span>开始时间:</span>
        <el-text>{{ taskDetail && formatTimestamp(taskDetail.start_date) }}</el-text>
      </div>
      <div class="detail-item">
        <span>截止时间:</span>
        <el-text>{{ taskDetail && formatTimestamp(taskDetail.end_date) }}</el-text>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
//任务细节样式
.bg-box {
  height: 400px;
  max-width: 300px;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  padding: 50px 15px 15px;
  margin: 50px 30px 30px 30px;
  position: relative;
  flex: 1;
  box-shadow: 14px 14px 20px #cbced1;

  &::before {
    transform: rotate(1.5deg);
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(255, 255, 255);
  }

  &::after {
    transform: rotate(0.5deg);
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(255, 255, 255);
  }

  .el-icon {
    z-index: 2;
    position: absolute;
    background-color: #ffffff00;
    top: -5px;
    right: 15px;
    font-size: 50px;
  }

  .task-detail {
    background-color: #fff;
    position: relative;
    z-index: 1;

    .detail-item {
      margin: 10px 5px;
    }

    .task-content {
      margin: 5px;
      border-radius: 5px;
      border: 1px gray solid;
      height: 150px;
      padding: 12px 5px;
    }

    .el-text {
      margin-left: 10px;
    }

  }
}
</style>