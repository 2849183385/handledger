<script setup >
import { ref, computed, watch } from 'vue'
import { formatTimestamp, convertToTimestamp } from '@/utils/format'
import { useUserStore } from '@/stores/userStore'
import { useTaskStore } from '@/stores/taskStore';
import { addNewTaskAPI } from '@/apis/task'
import { ElMessage } from 'element-plus';
import TaskDetail from './components/TaskDetail.vue';
import LeftView from './components/LeftView.vue'
const { userInfo: { user_id } } = useUserStore()
// console.log(user_id)
const taskStore = useTaskStore()
// console.log(user_id)
taskStore.getTasksById(user_id)
const { taskInfo } = taskStore

//-------------------------------------------------------------------------------------------------------------------------------
const radio = ref(0)
// 任务数据
let tasks = ref(taskInfo)
console.log(tasks)
// console.log(tasks[0].task_title)
// console.log(taskStore)
// console.log(taskInfo)
// console.log(tasks.filter(task => task.task_title == 1221))
// console.log(taskInfo)
/*[{
//   id: 1,
//   title: '1吃饭',
//   description: '吃饭dgdgsgdfgdfgewrgdzsftgwergvdfsgewrggedfdger',
//   completedCount: 1,
//   status: 0,
//   date: 1641491200000,
// }, {
//   id: 2,
//   title: '2吃饭',
//   description: '吃饭dgdgsgdfgdfgewrgdzsftgwergvdfsgewrggedfdger',
//   completedCount: 0,
//   status: 0,
//   date: 1731318200000,
// },
// {
//   id: 3,
//   title: '47睡觉',
//   description: '睡觉',
//   completedCount: 1,
//   status: 0,
//   date: 1631577600000,
// }, {
//   id: 4,
//   title: '睡觉',
//   description: '睡觉',
//   completedCount: 1,
//   status: 0,
//   date: 1631664000000,
// }, {
//   id: 5,
//   title: '睡觉',
//   description: '睡觉',
//   completedCount: 1,
//   status: 1,
//   date: 1631750400000,
]}*/

// 被删除的任务数组
// const deleteTaskArray = computed(() => {
//   return tasks.value.filter(task => task.is_delete === '1')
// })


/** 含有未被删除的任务数组 缓存作用*/
const taskArrays = computed(() => {
  return tasks.value.filter(task => task.is_delete == 0)
})
// console.log('taskArrays', taskArrays.value.filter(task => task.status == 'Pending'))
// console.log('taskArrays', taskArrays.value.filter(task => task.status == 'Completed'))

// 统计completedCount为1的数量

// 统计status为1的数量



const isCompleteTask = ref(0)
//当前在任务未完成页面时，返回全部列表，当前在任务完成页面时，返回已完成任务组成的数组
/**根isCompleteTask状态返回已完成或未完成任务的数据，用来渲染task-item组件*/
const taskArray = computed({
  //如果是未完成任务，返回未完成任务数组
  get: () => {
    if (!isCompleteTask.value) {
      //过滤已完成任务，留下未完成任务数组
      return taskArrays.value.filter(task => task.status == 'Pending' || task.status == 'In Progress')
    } else {
      return taskArrays.value.filter(task => task.status == 'Completed')
    }
  },
  set: () => {
    //   this.value = value
    //   console.log(this, value);
  }
})
// console.log('taskArray', taskArray.value)
// console.log(typeof taskArray.value[0].end_date)
// console.log(formatTimestamp(1703001600000))
// console.log(formatTimestamp(taskArray.value[0].end_date))
//切换任务状态视图
// 完成状态和未完成状态视图切换flag

/**
切换完成未完成视图逻辑
*/
function changeCompleteView(value) {
  // 切换任务完成状态后，高亮重置
  selectedTaskIndex.value = -1;
  isCompleteTask.value = parseInt(value)
  // 切换任务完成状态
  console.log(typeof isCompleteTask.value);
  console.log('isCompleteTasks被执行');
}


/**用来存储被选中要被修改的task-item组件的ID*/
const selectTaskId = ref(-1)
watch(selectTaskId, () => {

})
//任务被选中逻辑
//在任务项中注册一个selectTask事件，任务被点击，则将被点击的任务索引存储到selectedTaskIndex中
//通过selectedTaskIndex存储被选中的任务的索引
//判断当前任务是否被选中
//如果被选中，则高亮
//如果未被选中，则取消高亮
const selectedTaskIndex = ref(21)

function selectTask(index, id) {
  console.log('selectTask被执行')
  //筛选出描述面板内容
  selectTaskId.value = id;
  console.log(selectTaskId.value)
  //返回被选中任务的索引
  if (selectedTaskIndex.value === index) {
    selectedTaskIndex.value = -1; // 如果已经选中了任务，则取消选中
    // console.log('selectTask', selectedTaskIndex.value);
  } else {
    selectedTaskIndex.value = index; // 选择被点击的任务
    // console.log('selectTask', selectedTaskIndex.value);
  }
}




//-------------------------------------------------------------------------------------------------------------------------------
//const sortWay=ref('default')
/**按时间排序,直接修改taskArray这个计算属性不行，
要通过修改tasks这个taskArray计算属性的依赖，间接修改taskArray*/
function sortByDate(arr) {
  console.log('sortByDate被调用');
  const newArr = [...arr];
  newArr.sort((a, b) => {
    if (a.end_date < b.end_date) {
      return -1;
    }
    if (a.end_date > b.end_date) {
      return 1;
    }
    return 0;
  });
  // console.log(newArr)
  return newArr;
}
//按id排序
// function sortById(arr) {
//   const newArr = [...arr];
//   newArr.sort((a, b) => {
//     if (a.id < b.id) {
//       return -1;
//     }
//     if (a.id > b.id) {
//       return 1;
//     }
//     return 0;
//   });
//   // console.log(newArr)
// }
// //按名称排序
function sortByTitle(arr) {
  console.log('sortByTitle被调用');
  const newArr = [...arr];
  newArr.sort((a, b) => {
    if (a.task_title < b.task_title) {
      return -1;
    }
    if (a.task_title > b.task_title) {
      return 1;
    }
    return 0;
  });
  return newArr;
}
//处理排序问题
function handleCommand() {
  const command = arguments[1].attrs.value
  console.log('handleCommand被调用', arguments[1].attrs.value);
  //使用变量sortArray接受排序后的数据，再将sortArray赋值给taskArray
  switch (command) {
    case 'default':
      taskArray.value = [...taskArray.value]
      console.log('default执行', tasks)
      break;
    case 'bytime':
      tasks.value = sortByDate([...tasks]);
      console.log(tasks, 'bytime执行')
      break;
    case 'byname':
      tasks.value = sortByTitle([...tasks]);
      console.log('byname执行', taskArray.value)
      break;
    default:
      break;
  }
}
// const sortDate = computed(() => {
//   return taskArray.value.sort((a, b) => {
//     return new Date(a.date).getTime() - new Date(b.date).getTime()
//   })
// })

// const sortTitle = computed(() => {
//   return taskArray.value.sort((a, b) => {
//     return a.title.localeCompare(b.title)
//   })
// })

//-------------------------------------------------------------------------------------------
/* 全选反全选功能
// const selectedTasks = ref([])
// //总选择框
// const selectAll = computed({
//   get() {
//     return selectedTasks.value.length === tasks.value.length
//   },
//   set(value) {
//     selectedTasks.value = value ? tasks.value.slice() : []
//   }
// })
// //切换全选
// const toggleAllTasks = () => {
//    selectAll.value = !selectAll.value
//   selectedTasks.value = selectAll.value ? tasks.value.slice() : []

// }

// watchEffect(selectedTasks, (newVal) => {
//   selectAll.value = newVal.length === tasks.value.length
// })
// const tasks = ref(['Task 1', 'Task 2', 'Task 3', 'Task 4'])
// const toggleAllTasks = () => {
//   if (selectAll.value) {
//     selectedTasks.value = tasks.value.slice()
//   } else {
//     selectedTasks.value = []
//   }
}*/


//-------------------------------------------------------------------------------------------
//切换任务完成状态


//-------------------------------------------------------------------------------------------
//添加任务视图逻辑


//任务表单
const taskForm = ref({
  task_title: '',
  task_description: '',
  estimatedTime: '',
  priority: ''
})
//表单验证规则对象
const rules = {
  task_title: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  task_description: [{ required: true, message: '请输入任务内容', trigger: 'blur' }],
  estimatedTime: [{ required: true, message: '请选择预估时间', trigger: 'blur' }],
  priority: [
    { required: true, message: '请选择优先级', trigger: 'blur' },
  ]
}
//提交表单前验证
const taskFormRef = ref(null)
const submitForm = () => {
  // 处理任务表单
  console.log(taskForm.value);
  console.log('submitForm被调用');
  // checkEndTime( taskForm.value.startTime ,taskForm.value.endTime)
  taskFormRef.value.validate(async (valid) => {
    if (valid) {
      // 表单验证通过，执行提交逻辑
      // await this.handleSubmit();
      addDialogVisible.value = false
    }
  });
}
function addTask() {
  addNewTaskAPI({
    task_description: taskForm.value.task_description,
    task_title: taskForm.value.task_title,
    priority: taskForm.value.priority,
    start_date: taskForm.value.estimatedTime[0],
    end_date: taskForm.value.estimatedTime[1],
    creator_id: user_id,
  })
  taskStore.getTasksById(user_id)
  taskForm.value = {
    task_title: '',
    task_description: '',
    estimatedTime: '',
    priority: ''
  }
  ElMessage.success('添加成功');
}



//-----------------------------------------------------------------------------------------------------------------------------------
// function addTask() {
//   // 调用后端接口添加任务
// }
// eslint-disable-next-line no-unused-vars
function editTask(task) {
  // 调用后端接口编辑任务
}

const addDialogVisible = ref(false)
const taskCompleteVisible = ref(false)
const taskDeleteVisible = ref(false)

/**
 * 打开任务完成的弹窗
 * @param taskId
 */
function openCompleteVisible(taskId) {
  taskCompleteVisible.value = true
  selectTaskId.value = taskId
  console.log('openCompleteVisible被调用', selectTaskId.value);
}

/**
 * 完成任务
 */
const handleCompleteTask = async () => {
  // 调用后端接口标记任务完成
  await taskStore.updateTaskStatus(user_id, selectTaskId.value, 'completed')
  taskCompleteVisible.value = false

}


// function openDeleteVisible(taskId) {
//   taskDeleteVisible.value = true
//   selectTaskId.value = taskId
//   console.log('openDeleteVisible被调用', selectTaskId.value);
// }
/**
 * 删除任务
 * @param taskId
 */
// function deleteTask() {
//   // 调用后端接口删除任务
//   tasks.value[selectTaskId.value].status = '1'
//   taskDeleteVisible.value = false
//   console.log('deleteTask被调用', selectTaskId.value);

// }

// eslint-disable-next-line no-unused-vars
function fetchTasks() {
  // 调用后端接口获取任务列表
}
//处理排序

//---------------------------------------------------------------------------------------------------------------


</script> 

<template>
  <div class="container">

   <LeftView></LeftView>

    <!-- 任务内容盒子 -->
    <div class="content">
      <div class="setting">
        <!-- <input type="checkbox" v-model="selectAll" @change="toggleAllTasks" /> -->
        <!-- 设置按钮 -->
        <el-dropdown @command="handleCommand">
          <el-button>
            <el-icon>
              <Tools />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item value="default">默认排序</el-dropdown-item>
              <el-dropdown-item value="bytime">按时间排序</el-dropdown-item>
              <el-dropdown-item value="byname">按名称排序</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 切换完成状态 -->
        <el-radio-group v-model="radio" size="default" @change="changeCompleteView">
          <el-radio style="border: none;" :label=0>未完成</el-radio>
          <el-radio style="border: none;" :label=1>已完成</el-radio>
        </el-radio-group>
      </div>

      <!-- 添加任务 -->
      <div class="add-task" v-show="!isCompleteTask">
        <el-input type="text" class="w-50 m-2" placeholder="添加你的任务吧" width="200px" @click="addDialogVisible = true"
          @keyup.enter="addTask" ref="inputRef" :value="taskForm.task_title" />
        <el-button @click="addTask">添加</el-button>
      </div>

      <!-- 添加任务弹出层-->
      <div class="add-task-dialog">
        <el-dialog :modal="false" :close-on-click-modal="false" v-model="addDialogVisible" title="添加你的任务" width="500px"
          center :append-to-body="true" :lock-scroll="false">
          <!-- 添加任务表单 -->
          <el-form :hide-required-asterisk="true" :model="taskForm" :rules="rules" ref="taskFormRef" label-width="80px"
            style="max-width: 450px; margin: 0 auto;">
            <el-form-item label="任务名称" prop="task_title">
              <el-input v-model="taskForm.task_title" prefix-icon="el-icon-edit"></el-input>
            </el-form-item>

            <el-form-item label="预估时间" prop="estimatedTime">
              <el-date-picker v-model="taskForm.estimatedTime" type="datetimerange" start-placeholder="Start date"
                end-placeholder="End date" value-format="x" />
            </el-form-item>
            <el-form-item prop="priority">
              <el-radio-group v-model="taskForm.priority" label="请选择优先级">
                <el-radio :label="1"></el-radio>
                <el-radio :label="2"></el-radio>
                <el-radio :label="3"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="任务内容" prop="task_description">
              <el-input type="textarea" :rows="6" v-model="taskForm.task_description"
                prefix-icon="el-icon-edit"></el-input>
            </el-form-item>

          </el-form>

          <template #footer>
            <span class="dialog-footer">
              <el-button @click="addDialogVisible = false">返回</el-button>
              <el-button type="primary" @click="submitForm()">提交</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <!-- <ul>
        <li v-for="task in tasks" :key="task.id">
          {{ task.name }}
          <button @click="editTask(task)">Edit</button>
          <button @click="deleteTask(task.id)">Delete</button>
          <button @click="completeTask(task.id)">Complete</button>
        </li>
      </ul> -->
      <!-- <input type="checkbox" v-model="selectAll" @change="toggleAllTasks" /> 全选/反选 -->


      <!-- 任务列表项 -->
      <div class="task-list">
        <div class="task-item " v-for="(item, index) in taskArray" :class="{
          'completed-task': item.status == 'Completed',
          'task-item-selected': index === selectedTaskIndex,
          'over-time': (item.status !== 'completed') && (item.end_date < convertToTimestamp(new Date()))
        }" :key="index" @click="selectTask(index, item.task_id)">

          <el-text class="task-title">{{ item.task_title }}</el-text>
          <el-text class="task-content" :truncated="true">{{ item.task_description }}</el-text>
          <el-text class="task-time">{{ formatTimestamp(item.end_date) }}</el-text>
          <el-button type="primary" size="small" circle @click="openCompleteVisible(item.task_id)" :disabled="isCompleteTask?true:false">
            <el-icon>
              <check />
            </el-icon>
          </el-button>
          <el-button type="danger" size="small" circle @click="openDeleteVisible(item.task_id)"><el-icon>
              <Delete />
            </el-icon>
          </el-button>
        </div>
        <!-- <div class="task-item"> </div>
        <div class="task-item"></div>
        <div class="task-item"></div>
        <div class="task-item"></div>
        <div class="task-item"></div>
        <div class="task-item"></div>
        <div class="task-item"></div>
        <div class="task-item"></div>
        <div class="task-item"></div>
        <div class="task-item"></div>
        <div class="task-item"></div>
        <div class="task-item"></div>
        <div class="task-item"></div>
        <div class="task-item"></div>
        <div class="task-item"></div>
        <div class="task-item"></div> -->
      </div>

      <div class="alter-task-staus">
        <!-- 完成任务确认对话框 -->
        <el-dialog v-model="taskCompleteVisible" y width="15%" center :modal="false" :lock-scroll="false"
          :append-to-bod="true">
          <template #default>
            <p style="text-align: center;">已完成任务？</p>
          </template>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="taskCompleteVisible = false">返回</el-button>
              <el-button type="primary" @click="handleCompleteTask">
                确认
              </el-button>
            </div>
          </template>
        </el-dialog>

        <!-- 删除任务对话框 -->
        <el-dialog v-model="taskDeleteVisible" width="15%" center :modal="false" :lock-scroll="false"
          :append-to-bod="true">
          <template #default>
            <p style="text-align: center;">删除任务？</p>
          </template>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="taskDeleteVisible = false">返回</el-button>
              <el-button type="primary" @click="deleteTask">
                确认
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
    </div>
    <TaskDetail :selectTaskId="selectTaskId"></TaskDetail>

  </div>
</template>

<style lang='scss' scoped>
.container {
  background-color: #f6f2eb;
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: flex-start;

 
 

  .el-dialog {
    .time-input {
      display: inline-block;
      width: 150px;
      vertical-align: middle;
    }

    .el-form-item__label {
      display: none;
    }

  }

  .content {
    margin: 10px 15px;
    display: flex;
    flex-direction: column;

    //设置样式
    .setting {
      margin: 5px 15px;
      width: 750px;
      height: 30px;
      position: relative;

      .el-dropdown {
        right: 0;
        position: absolute;

        .el-button {
          background-color: #ffffff00;
          border: none;
        }
      }

      .el-radio-group {
        border: none;
        position: absolute;
        right: 50px;
        border-radius: none;

        .el-radio {
          margin-right: 15px;
        }
      }


    }

    //添加任务样式
    .add-task {
      margin: 0 15px;
      width: 750px;
      background-color: #fff;
      border-bottom: 1px dotted #e5e5e5;
      border-top: 1px solid #fff;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 7px 20px;

      .el-popover {
        .el-input {}

      }

      .el-button {
        position: absolute;
        right: 20px;
        background-color: pink;

      }
    }

    .add-task-dialog {
      .el-dialog {
        width: 400px;
        height: 300px;

        .el-form {
          margin: 20px;
        }
      }
    }

    //任务列表样式
    .task-list {
      margin: 0 15px;

      //任务已完成样式
      .completed-task {
        overflow: hidden;
        height: 35px;
        border-bottom: 1px dotted #e5e5e5;
        border-top: 1px solid #fff;
        padding: 2px 0;
        width: 750px;
        background-color: #fff;

        .el-button-completed {
          display: none;
        }

        span {
          text-decoration: line-through;
          font-style: italic;
          color: #999;
          /* 或者其他灰色 */
        }
      }

      //任务未完成样式
      .task-item {
        overflow: hidden;
        height: 35px;
        border-bottom: 1px dotted #e5e5e5;
        border-top: 1px solid #fff;
        padding: 2px 0;
        width: 750px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;

        &:active {
          background-color: rgba(173, 216, 230, 0.178);
        }

        .el-button {
          margin-left: 0;
          margin-right: 40px;
        }

        .el-text {
          flex: 1;
        }

        .task-title {
          text-align: center;
          flex: 1;

        }

        .task-content {
          flex: 7;
          margin-right: 50px;
        }

        .task-time {
          flex: 2;
        }
      }

      //任务超时样式
      .over-time {
        background-color: #c4463d7e;
      }

      //任务被选中高亮样式
      .task-item-selected {
        background-color: rgba(173, 216, 230, 0.178);
        /* 根据您的需求更改背景颜色 */
      }

    }

    .alter-task-staus {

      .el-dialog__body {
        text-align: center;
      }

    }
  }


}
</style>
