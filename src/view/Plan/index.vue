<script setup >

// import router from '@/router';
import { ref, computed ,} from 'vue'

// onMounted(() => {
//   router.
//   console.log('onMounted被调用');
// })



//-------------------------------------------------------------------------------------------------------------------------------
/**将时间戳格式的时间，转换成年月日的格式*/
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
// console.log(formatTimestamp(1731318200));
//转换时间戳
function convertToTimestamp(dateString) {
  const date = new Date(dateString);
  const timestamp = date.getTime();
  return timestamp;
}


const radio = ref('0')
const value = ref(new Date())

//任务数据
const tasks = ref([
  {
    id: 0,
    title: '3吃饭',
    description: '吃饭dgdgsgdfgdfgewrgdzsftgwergvdfsgewrggedfdger吃饭dgdgsgdfgdfgewrgdzsftgwergvdfsgewrggedfdge吃饭dgdgsgdfgdfgewrgdzsftgwergvdfsgewrggedfdge',
    isCompleted: 0,
    status: 0,
    date: 1643734000000,
  }, {
    id: 1,
    title: '1吃饭',
    description: '吃饭dgdgsgdfgdfgewrgdzsftgwergvdfsgewrggedfdger',
    isCompleted: 1,
    status: 0,
    date: 1641491200000,
  }, {
    id: 2,
    title: '2吃饭',
    description: '吃饭dgdgsgdfgdfgewrgdzsftgwergvdfsgewrggedfdger',
    isCompleted: 0,
    status: 0,
    date: 1731318200000,
  },
  {
    id: 3,
    title: '47睡觉',
    description: '睡觉',
    isCompleted: 1,
    status: 0,
    date: 1631577600000,
  }, {
    id: 4,
    title: '睡觉',
    description: '睡觉',
    isCompleted: 1,
    status: 0,
    date: 1631664000000,
  }, {
    id: 5,
    title: '睡觉',
    description: '睡觉',
    isCompleted: 1,
    status: 1,
    date: 1631750400000,
  }
]
)
console.log(tasks.value)




// // 被删除的任务数组
// const deleteTaskArray = computed(() => {
//   return tasks.value.filter(task => task.status === '1')
// })


/** 含有未被删除的任务数组 缓存作用*/
const taskArrays = computed(() => {
  return tasks.value.filter(task => task.status == 0)
})
console.log(taskArrays.value)

// 统计isCompleted为1的数量
const isCompletedCount = computed({
  get: () => { 
  return (tasks.value.filter(task => task.status === 0)).filter(task => task.isCompleted === 1).length;
  },
}) 
// 统计status为1的数量




//当前在任务未完成页面时，返回全部列表，当前在任务完成页面时，返回已完成任务组成的数组
/**根isCompleteTask状态返回已完成或未完成任务的数据，用来渲染task-item组件*/
const taskArray = computed({
  //如果是未完成任务，返回未完成任务数组
  get: () => {
    if (!isCompleteTask.value) {
      //过滤已完成任务，留下未完成任务数组
      return taskArrays.value.filter(task => task.isCompleted == 0)
    } else {
      return taskArrays.value.filter(task => task.isCompleted == 1)
    }
  },
  set: () => {
    //   this.value = value
    //   console.log(this, value);
  }
})


//切换任务状态视图
/**完成状态和未完成状态视图切换flag*/
const isCompleteTask = ref(0)
//切换逻辑
function isCompleteTasks(value) {
  //切换任务完成状态后，高亮重置
  selectedTaskIndex.value = -1;

  isCompleteTask.value = parseInt(value)
  // // 切换任务完成状态
  console.log(typeof isCompleteTask.value);
  console.log('isCompleteTasks被执行');
}

/**用来存储被选中要被修改的task-item组件*/
const taskDetail = ref(null)
/**用来存储被选中要被修改的task-item组件的ID*/
const selectTaskId = ref(null)
//任务被选中逻辑
//在任务项中注册一个selectTask事件，任务被点击，则将被点击的任务索引存储到selectedTaskIndex中
//通过selectedTaskIndex存储被选中的任务的索引
//判断当前任务是否被选中
//如果被选中，则高亮
//如果未被选中，则取消高亮
const selectedTaskIndex = ref(-1)

function selectTask(index, id) {
  console.log('selectTask被执行')
  //筛选出描述面板内容
  selectTaskId.value = id;
  taskDetail.value = tasks.value.find(task => task.id === selectTaskId.value)
  console.log(taskDetail.value)
  console.log(completestaus.value)
  //返回被选中任务的索引
  if (selectedTaskIndex.value === index) {
    selectedTaskIndex.value = -1; // 如果已经选中了任务，则取消选中
    // console.log('selectTask', selectedTaskIndex.value);
  } else {
    selectedTaskIndex.value = index; // 选择被点击的任务
    // console.log('selectTask', selectedTaskIndex.value);
  }
}



// //描述面板内容  通过Id筛选任务
// const taskDetail = computed(() => {
//   return tasks.value.find(task => task.id === selectTaskId.value)
// })


//-------------------------------------------------------------------------------------------------------------------------------
//const sortWay=ref('default')
/**按时间排序,直接修改taskArray这个计算属性不行，
要通过修改tasks这个taskArray计算属性的依赖，间接修改taskArray*/
function sortByDate(arr) {
  console.log('sortByDate被调用');
  const newArr = [...arr];
  newArr.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
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
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  return newArr;
}

//处理排序问题
function handleCommand() {
  const command = arguments[1].attrs.value
  console.log('handleCommand被调用');
  //使用变量sortArray接受排序后的数据，再将sortArray赋值给taskArray
  switch (command) {
    case 'default':
      taskArray.value = [...taskArray.value]
      console.log('default执行', tasks.value)
      break;
    case 'bytime':
      tasks.value = sortByDate([...tasks.value]);
      console.log(tasks.value, 'bytime执行')
      break;
    case 'byname':
      tasks.value = sortByTitle([...tasks.value]);
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
// 全选反全选功能
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
// }


//-------------------------------------------------------------------------------------------
//切换任务完成状态







//-------------------------------------------------------------------------------------------
//添加任务视图逻辑





//任务表单
const taskForm = ref({
  taskName: '',
  taskContent: '',
  estimatedTime: '',
})
//表单验证规则对象
const rules = {
  taskName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  taskContent: [{ required: true, message: '请输入任务内容', trigger: 'blur' }],
  estimatedTime: [{ required: true, message: '请选择预估时间', trigger: 'blur' }],
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
      // this.dialogVisible.value = false
    } else {
      return false;
    }
  });
}
//视图被关闭后，文本框的聚焦移除
const inputRef = ref(null)
function removeFocus() {
  console.log('removeFocus');
  inputRef.value.blur();
  console.log('removeFocus被调用');
}





//-----------------------------------------------------------------------------------------------------------------------------------
function addTask() {
  // 调用后端接口添加任务
}
// eslint-disable-next-line no-unused-vars
function editTask(task) {
  // 调用后端接口编辑任务
}





const dialogVisible = ref(false)
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
function completeTask() {
  console.log('isCompletedCount:',isCompletedCount);
  // 调用后端接口标记任务完成
  tasks.value[selectTaskId.value].isCompleted = '1'
  taskCompleteVisible.value = false
  console.log('completeTask被调用', selectTaskId.value)
  console.log(taskArrays.value)
  console.log('isCompletedCount:',isCompletedCount);
}


function openDeleteVisible(taskId) {
  taskDeleteVisible.value = true
  selectTaskId.value = taskId
  console.log('openDeleteVisible被调用', selectTaskId.value);
}
/**
 * 删除任务
 * @param taskId
 */
function deleteTask() {
  // 调用后端接口删除任务
  tasks.value[selectTaskId.value].status = '1'
  taskDeleteVisible.value = false
  console.log('deleteTask被调用', selectTaskId.value);

}

// eslint-disable-next-line no-unused-vars
function fetchTasks() {
  // 调用后端接口获取任务列表
}
//处理排序
// console.log(completestaus.value)

//---------------------------------------------------------------------------------------------------------------

const completestaus = computed({
  get: () => {
    if (!(taskDetail.value == null)) {
      //如果截止时间大于当前时间，且任务未完成，则显示红色
      if (taskDetail.value.date > convertToTimestamp(new Date()) && !taskDetail.value.isCompleted)
        return 'red'
      else {
        return taskDetail.value.isCompleted ? 'yellow' : 'green'
      }
    } else {
      return null
    }
  }
})



</script>

<template>
  <div class="container">

    <!-- 全部任务盒子 -->
    <div class="all-task">
      <h2>所有任务</h2>
      <div class="all-task_item">
        <ul>
          <li style="">
            <span>{{ taskArrays && taskArrays.length}}</span>
            <span>task</span>
          </li>
          <li style="background-color: #e1a14d;">
            <span>1</span>
            <span>今日截至</span>
          </li>
          <li>
            <span>1</span>
            <span>逾期</span>
          </li>
          <li>
            <span>{{ isCompletedCount}}</span>
            <span>已完成</span>
          </li>
        </ul>
      </div>
    </div>
    <el-calendar v-model="value" />

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
              <el-dropdown-item value="default" :icon="Select">默认排序</el-dropdown-item>
              <el-dropdown-item value="bytime" :icon="Select">按时间排序</el-dropdown-item>
              <el-dropdown-item value="byname" :icon="Select">按名称排序</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 切换完成状态 -->
        <el-radio-group v-model="radio" size="default" @change="isCompleteTasks">
          <el-radio style="border: none;" label="0">未完成</el-radio>
          <el-radio style="border: none;" label="1">已完成</el-radio>
        </el-radio-group>
      </div>

      <!-- 添加任务 -->
      <div class="add-task" v-show="!isCompleteTask">
        <el-input type="text" class="w-50 m-2" placeholder="添加你的任务吧" width="200px" @focus="dialogVisible = true"
          @keyup.enter="addTask" ref="inputRef" :value="taskForm.taskName" />
        <el-button @click="addTask">添加</el-button>
      </div>

      <!-- 添加任务弹出层-->
      <div class="add-task-dialog">
        <el-dialog :modal="false" :close-on-click-modal="false" v-model="dialogVisible" title="添加你的任务" width="30%" center
          @close="removeFocus" :append-to-body="true" :lock-scroll="false">
          <!-- 添加任务表单 -->
          <el-form hide-required-asterisk="true" :model="taskForm" :rules="rules" ref="taskFormRef" label-width="100px"
            style="max-width: 600px; margin: 0 auto;">
            <el-form-item label="任务名称" prop="taskName">
              <el-input v-model="taskForm.taskName" prefix-icon="el-icon-edit"></el-input>
            </el-form-item>

            <el-form-item label="预估时间" prop="estimatedTime">
              <el-date-picker v-model="taskForm.estimatedTime" type="datetimerange" start-placeholder="Start date"
                end-placeholder="End date" value-format="x" />
            </el-form-item>

            <el-form-item label="任务内容" prop="taskContent">
              <el-input type="textarea" :rows="6" v-model="taskForm.taskContent" prefix-icon="el-icon-edit"></el-input>
            </el-form-item>

          </el-form>

          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">返回</el-button>
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
        <div class="task-item " :class="{
          'completed-task': item.isCompleted,
          'task-item-selected': index === selectedTaskIndex,
          'over-time': (!item.isCompleted) && (item.date > convertToTimestamp(new Date()))
        }" v-for="(item, index) in taskArray" :key="index" @click="selectTask(index, item.id)"
          v-show="item.status == 0">
          <el-text class="task-title">{{ item.id }}</el-text>
          <el-text class="task-content" truncated="true">{{ item.description }}</el-text>
          <el-text class="task-time">{{ formatTimestamp(item.date) }}</el-text>

          <el-button type="primary" :icon="Check" size="small" circle @click="openCompleteVisible(item.id)"><el-icon>
              <check />
            </el-icon></el-button>

          <el-button type="danger" size="small" circle @click="openDeleteVisible(item.id)"><el-icon>
              <Delete />
            </el-icon></el-button>

        </div>
        <div class="task-item"> </div>
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
        <div class="task-item"></div>
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
              <el-button type="primary" @click="completeTask">
                确认
              </el-button>
            </div>
          </template>
        </el-dialog>

        <!-- 删除任务对话框 -->
        <el-dialog v-model="taskDeleteVisible" append-to-body width="15%" center :modal="false" :lock-scroll="false"
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

    <div class="bg-box" v-show="taskDetail">
      <el-icon :color="completestaus">
        <CollectionTag />
      </el-icon>
      <div class="task-detail">
        <h3>任务详情</h3>
        <div class="detail-item">
          <span>任务名称</span>
          <el-text> {{ taskDetail && taskDetail.title }}</el-text>
        </div>
        <div class="detail-item">
          <span>状态:</span>
          <el-text>
            {{ taskDetail && (taskDetail.isCompleted ? '已完成' : '待完成') }}
          </el-text>
        </div>
        <div class="detail-item">
          <span>任务内容:</span>
          <div class="task-content">
            <el-text truncated="true">{{ taskDetail && taskDetail.description }}</el-text>
          </div>
        </div>

        <div class="detail-item">
          <span>开始时间:</span>
          <el-text>{{ taskDetail && formatTimestamp(taskDetail.date) }}</el-text>
        </div>
        <div class="detail-item">
          <span>截止时间:</span>
          <el-text>{{ taskDetail && formatTimestamp(taskDetail.date) }}</el-text>

        </div>


      </div>
    </div>



  </div>
</template>

<style lang='scss' scoped>
.container {
  background-color: #f6f2eb;
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: flex-start;

  //日历样式
  .el-calendar {
    border-radius: 5px;
    margin-left: 15px;
    margin-right: 15px;
    width: 300px;
    position: absolute;
    left: 0;
    top: 160px;
    --el-calendar-cell-width: 35px;
  }


  .all-task {
    margin-left: 15px;
    height: 120px;
    display: flex;
    flex-direction: column;
    margin-right: 30px;

    .all-task_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      ul {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

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

        .el-button {
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
}
</style>
