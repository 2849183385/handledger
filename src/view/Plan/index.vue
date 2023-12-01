<script setup >
import { ref, computed, toRefs, onMounted } from 'vue'
import { formatTimestamp, convertToTimestamp } from '@/utils/format'
import { useUserStore } from '@/stores/userStore'
import { useTaskStore } from '@/stores/taskStore';
import { addNewTaskAPI, deleteTaskAPI, updateTaskAPI } from '@/apis/task'
import { ElMessage } from 'element-plus';
import TaskDetail from './components/TaskDetail.vue';
import LeftView from './components/LeftView.vue'
import { Operation, Check, Delete } from '@element-plus/icons-vue';
const loader = ref(true)
const { userInfo: { user_id } } = useUserStore()
// console.log(user_id)
const taskStore = useTaskStore()
// console.log(user_id)
const taskSInfoExist = () => {
  if (taskInfo.value.length > 0 && taskInfo.value[0].creator_id == user_id) {
    return
  } else {
    taskStore.getTasksById(user_id).then(() => {
      loader.value=false
    })
  }
}
onMounted(() => {
  taskSInfoExist()
})

const { taskInfo } = toRefs(taskStore)

//-------------------------------------------------------------------------------------------------------------------------------
const radio = ref(0)


// 被删除的任务数组
// const deleteTaskArray = computed(() => {
//   return tasks.value.filter(task => task.is_delete === '1')
// })

//---------------------------------------s任务数据--------------------------------------------------------
// 任务数据
let tasks = ref(taskInfo)
console.log(tasks.value)
/** 含有未被删除的任务数组 缓存作用*/
const taskArrays = computed(() => {
  return tasks.value.filter(task => task.is_delete == 0)
})
/** 存储当前任务状态，default:0  value(0,1)*/
var isCompleteTask = ref(0)
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
})
//--------------------------------------分页功能逻辑--------------------------------------------------------------
/**当前页码*/
const currentPage = ref(1)
/**每页显示的任务数量*/
const pageSize = ref(17)
const handlePageChange = (page) => {
  currentPage.value = page // 更新当前页码
  const startIndex = (page - 1) * pageSize.value // 计算当前页的起始索引
  const endIndex = startIndex + pageSize.value// 计算当前页的结束索引
  currentPageTasks.value = taskArray.value.slice(startIndex, endIndex) // 获取当前页的任务列表
}
const currentPageTasks = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value // 计算当前页的起始索引
  const endIndex = startIndex + pageSize.value // 计算当前页的结束索引
  return taskArray.value.slice(startIndex, endIndex) // 获取当前页的任务列表
})
/**
切换完成未完成视图逻辑
*/
function triggerCompleteView(value) {
  // 切换任务完成状态后，高亮重置
  currentPage.value = 1
  selectedTaskIndex.value = -1;
  isCompleteTask.value = value
  console.log('triggerCompleteView');
}
/**用来存储被选中要被修改的task-item组件的ID*/
const selectTaskId = ref(-1)
//任务被选中逻辑
//在任务项中注册一个selectTask事件，任务被点击，则将被点击的任务索引存储到selectedTaskIndex中
//通过selectedTaskIndex存储被选中的任务的索引
//判断当前任务是否被选中
//如果被选中，则高亮
//如果未被选中，则取消高亮
const selectedTaskIndex = ref(-1)

function selectTask(index, id) {
  //筛选出描述面板内容
  selectTaskId.value = id;
  console.log('selectTaskId', selectTaskId.value)
  //返回被选中任务的索引
  if (selectedTaskIndex.value === index) {
    selectedTaskIndex.value = -1; // 如果已经选中了任务，则取消选中
  } else {
    selectedTaskIndex.value = index; // 选择被点击的任务
  }
}

//-------------------------------------排序逻辑-----------------------------------------------------------------------------------------
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
//按优先级排序
function sortByPriority(arr) {
  console.log('sortByPriority被调用');
  const newArr = [...arr];
  newArr.sort((a, b) => {
    if (a.priority > b.priority) {
      return -1;
    }
    if (a.priority < b.priority) {
      return 1;
    }
    return 0;
  });
  return newArr;
}
// //按名称排序
function sortByTitle(arr) {
  console.log('sortByTitle被调用');
  const newArr = [...arr];
  newArr.sort((a, b) => {
    if (a.task_title > b.task_title) {
      return -1;
    }
    if (a.task_title < b.task_title) {
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
      console.log(tasks.value)
      tasks.value = sortByDate([...tasks.value]);
      console.log(tasks, 'bytime执行')
      break;
    case 'bypriority':
      tasks.value = sortByPriority([...tasks.value]);
      console.log('bypriority执行', taskArray.value)
      break;
    case 'byname':
      tasks.value = sortByTitle([...tasks.value]);
      console.log('byname执行', taskArray.value)
      break;
    default:
      break;
  }
}
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



//-----------------------------------------------添加任务逻辑--------------------------------------------
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
  }).then(()=> {
    taskStore.getTasksById(user_id)
    taskForm.value = {
      task_title: '',
      task_description: '',
      estimatedTime: '',
      priority: ''
    }
    ElMessage.success('添加成功');
  })
  
}
const editorFormRef = ref(null)
const taskDetail = (obj) => {
  editorForm.value = obj
  editorForm.value.estimatedTime = [obj.start_date, obj.end_date]
  console.log('taskDetail被调用', editorForm.value);
}

const editorForm = ref({})
function editTask() {
  console.log('editTask被调用');
  editorFormRef.value.validate(async (valid) => {
    if (valid) {
      // 表单验证通过，执行提交逻辑
      // await this.handleSubmit();
      handleEditTask()
      editTaskVisible.value = false
    }
  });
}

//---------------------------------------弹窗视图逻辑--------------------------------------------------------------------------------------------
var addDialogVisible = ref(false)
var taskCompleteVisible = ref(false)
var taskDeleteVisible = ref(false)
var editTaskVisible = ref(false)
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
  await taskStore.updateTaskStatus(user_id, selectTaskId.value, 'Completed')
  taskStore.getTasksById(user_id)
  taskCompleteVisible.value = false
}
/**
 * 打开任务删除的弹窗
 * @param taskId
 */
function openDeleteVisible(taskId) {
  taskDeleteVisible.value = true
  selectTaskId.value = taskId
  console.log('openDeleteVisible被调用', selectTaskId.value);
}
/**
 * 删除任务
 */
const handleDeleteTask = async () => {
  // 调用后端接口删除任务
  await deleteTaskAPI(user_id, selectTaskId.value)
  await taskStore.getTasksById(user_id)
  ElMessage.success('删除成功');
  taskDeleteVisible.value = false
  console.log('deleteTask被调用', selectTaskId.value);
}
function openEditVisible(taskId) {
  editTaskVisible.value = true
  console.log('openEditVisible被调用', selectTaskId.value);
  selectTaskId.value = taskId
}
const handleEditTask = async () => {
  // 调用后端接口编辑任务
  await updateTaskAPI({
    task_description: editorForm.value.task_description,
    task_title: editorForm.value.task_title,
    priority: editorForm.value.priority,
    start_date: editorForm.value.estimatedTime[0],
    end_date: editorForm.value.estimatedTime[1],
    task_id: editorForm.value.task_id,
    creator_id: user_id,
  }).then(() => {
    taskStore.getTasksById(user_id)
  editTaskVisible.value = false
  ElMessage.success('修改成功');
  }).catch((error) => {
    console.error('Error:', error); // 如果异步函数执行失败，输出错误信息
  });
  
}
</script> 

<template>
  <div class="loader" v-if="loader.value"></div>
  <div class="container" v-else>

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
              <el-dropdown-item value="byname">按名称排序</el-dropdown-item>
              <el-dropdown-item value="bypriority">按优先级排序</el-dropdown-item>
              <el-dropdown-item value="bytime">按截止时间排序</el-dropdown-item>

            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 切换完成状态 -->
        <el-radio-group v-model="radio" size="default" @change="triggerCompleteView">
          <el-radio style="border: none;" :label=0>未完成</el-radio>
          <el-radio style="border: none;" :label=1>已完成</el-radio>
        </el-radio-group>
      </div>

      <!-- 添加任务 -->
      <div class="add-task">
        <el-input v-show="!isCompleteTask" type="text" class="w-50 m-2" placeholder="添加你的任务吧" width="200px"
          @click="addDialogVisible = true" @keyup.enter="addTask" ref="inputRef" :value="taskForm.task_title" />
        <el-button v-show="!isCompleteTask" @click="addTask" :disabled="taskForm.task_title.trim() === ''">添加</el-button>
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
        <div class="task-item" v-for="(item, index) in currentPageTasks" :class="{
          'completed-task': item.status == 'Completed',
          'task-item-selected': index === selectedTaskIndex,
          'over-time': (item.status !== 'Completed') && (item.end_date < convertToTimestamp(new Date()))
        }" :key="index" @click="selectTask(index, item.task_id)">
          <el-text class="task-title" :truncated="true">{{ item.task_title }}</el-text>
          <el-text class="task-content" :truncated="true">{{ item.task_description }}</el-text>
          <el-text class="task-time">{{ formatTimestamp(item.end_date) }}</el-text>
          <el-button type="primary" size="small" circle @click="openCompleteVisible(item.task_id)"
            :disabled="isCompleteTask ? true : false" :icon="Check">
          </el-button>
          <el-button type="danger" size="small" circle @click="openDeleteVisible(item.task_id)" :icon="Delete"
            :disabled="isCompleteTask ? true : false">
          </el-button>
          <div class="priority-icon">
            <el-icon v-for="index in item.priority" :key="index">
              <StarFilled />
            </el-icon>
          </div>
          <el-button text circle @click="openEditVisible(item.task_id)" v-show="selectTaskId == item.task_id"
            :icon="Operation">
          </el-button>
        </div>
        <div class="task-item" v-for="item in pageSize - currentPageTasks.length" :key="item"> </div>
        <div class="task-item" style="height: 50px;">
          <el-pagination layout="prev, pager, next" :current-page="currentPage" :default-page-size="pageSize"
            :total="taskArray.length" :hide-on-single-page="true" @current-change="handlePageChange" />
        </div>
      </div>

      <div class="alter-task-staus">

        <!-- 添加任务弹出层-->
        <div class="add-task-dialog">
          <el-dialog :modal="false" :close-on-click-modal="false" v-model="addDialogVisible" title="添加你的任务" width="500px"
            center :append-to-body="true" :lock-scroll="false" style="border-radius: 5px;">
            <!-- 添加任务表单 -->
            <el-form :hide-required-asterisk="true" :model="taskForm" :rules="rules" ref="taskFormRef" label-width="80px"
              style="max-width: 450px; margin: 0 auto;">
              <el-form-item label="任务名称" prop="task_title">
                <el-input v-model="taskForm.task_title" prefix-icon="el-icon-edit"></el-input>
              </el-form-item>

              <el-form-item label="预估时间" prop="estimatedTime">
                <el-date-picker v-model="taskForm.estimatedTime" type="datetimerange" start-placeholder="开始时间"
                  end-placeholder="结束时间" value-format="x" />
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

        <!-- 完成任务确认对话框 -->
        <el-dialog class="comfirm-dialog" v-model="taskCompleteVisible" width="250px" center :modal="false"
          :lock-scroll="false" :append-to-bod="true" style="border-radius: 5px;">
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

        <!-- 编辑任务对话框 -->
        <div class="add-task-dialog">
          <el-dialog :modal="false" :close-on-click-modal="false" v-model="editTaskVisible" title="编辑你的任务" width="500px"
            center :append-to-body="true" :lock-scroll="false" style="border-radius: 5px;">
            <!-- 添加任务表单 -->
            <el-form :hide-required-asterisk="true" :model="editorForm" :rules="rules" ref="editorFormRef"
              label-width="80px" style="max-width: 450px; margin: 0 auto;">
              <el-form-item label="任务名称" prop="task_title">
                <el-input v-model="editorForm.task_title" prefix-icon="el-icon-edit"></el-input>
              </el-form-item>

              <el-form-item label="预估时间" prop="estimatedTime">
                <el-date-picker v-model="editorForm.estimatedTime" type="datetimerange" start-placeholder="Start date"
                  end-placeholder="End date" value-format="x" />
              </el-form-item>
              <el-form-item prop="priority">
                <el-radio-group v-model="editorForm.priority" label="请选择优先级">
                  <el-radio :label="1"></el-radio>
                  <el-radio :label="2"></el-radio>
                  <el-radio :label="3"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="任务内容" prop="task_description">
                <el-input type="textarea" :rows="6" v-model="editorForm.task_description"
                  prefix-icon="el-icon-edit"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="editTaskVisible = false">返回</el-button>
                <el-button type="primary" @click="editTask()">提交</el-button>
              </span>
            </template>
          </el-dialog>
        </div>

        <!-- 删除任务对话框 -->
        <el-dialog class="delete-dialog" v-model="taskDeleteVisible" width="200px" center :modal="false"
          :lock-scroll="false" :append-to-bod="true" style="border-radius: 5px;">
          <template #default>
            <p style="text-align: center;">删除任务？</p>
          </template>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="taskDeleteVisible = false">返回</el-button>
              <el-button type="primary" @click="handleDeleteTask">
                确认
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
    </div>
    <!-- 向taskDetail组件传递被选中的任务id,接受taskDetail组件的任务详情 -->
    <TaskDetail :selectTaskId="selectTaskId" @task-detail="taskDetail"></TaskDetail>

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
    position: relative;

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
      height: 50px;
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
          margin-right: 15px;
        }

        .el-text {
          flex: 1;
          margin: 0 5px;
        }

        .task-title {
          margin-left: 10px;
          text-align: center;
          flex: 2;
        }

        .task-content {
          flex: 7;
          margin-right: 50px;
          margin-left: 50px;
        }

        .task-time {
          flex: 2;
        }

        .priority-icon {
          margin-right: 10px;
          flex: 1;
        }
      }

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

      //任务超时样式
      .over-time {
        background-color: #ea520031;
      }

      //任务被选中高亮样式
      .task-item-selected {
        background-color: rgba(173, 216, 230, 0.178);
        /* 根据您的需求更改背景颜色 */
      }

    }

    .alter-task-staus {}
  }

  .el-pagination {
    bottom: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>
