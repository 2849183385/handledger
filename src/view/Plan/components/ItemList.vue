<script setup >
import { ref, computed, } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useTaskStore } from '@/stores/taskStore';
const { userInfo: { user_id } } = useUserStore()

const taskStore = useTaskStore()
const { taskInfo } = taskStore
let tasks = ref(taskInfo)


/** 含有未被删除的任务数组 缓存作用 is_delete != 0*/
const taskArrays = computed(() => {
    return tasks.value.filter(task => task.is_delete == 0)
})

//当前在任务未完成页面时，返回未完成列表，当前在任务完成页面时，返回已完成任务组成的数组
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
//切换任务状态视图
// 完成状态和未完成状态视图切换flag
const isCompleteTask = ref(0)
//切换逻辑
function isCompleteTasks(value) {
    // 切换任务完成状态后，高亮重置
    selectedTaskIndex.value = -1;

    isCompleteTask.value = parseInt(value)
    // 切换任务完成状态
    console.log(typeof isCompleteTask.value);
    console.log('isCompleteTasks被执行');
}
/**用来存储被选中要被修改的task-item组件*/
//描述面板内容  通过Id筛选任务
const taskDetail = computed(() => {
    return tasks.value.find(task => task.task_id === selectTaskId.value)
})
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
    //返回被选中任务的索引
    if (selectedTaskIndex.value === index) {
        selectedTaskIndex.value = -1; // 如果已经选中了任务，则取消选中
        // console.log('selectTask', selectedTaskIndex.value);
    } else {
        selectedTaskIndex.value = index; // 选择被点击的任务
        // console.log('selectTask', selectedTaskIndex.value);
    }
}
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
            console.log(tasks.value, 'bytime执行')
            break;
        case 'byname':
            tasks.value = sortByTitle([...tasks]);
            console.log('byname执行', tasks.value)
            break;
        default:
            break;
    }
}
const dialogVisible = ref(false)
const taskCompleteVisible = ref(false)
const taskDeleteVisible = ref(false)
/**
 * 打开任务完成的弹窗,把被打开的任务的task_id存储到selectTaskId
 * @param taskId
 */
function openCompleteVisible(taskId) {
    taskCompleteVisible.value = true
    selectTaskId.value = taskId
    console.log('openCompleteVisible被调用', selectTaskId.value);
}

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
// const taskFormRef = ref(null)
// const submitForm = () => {
//     // 处理任务表单
//     console.log(taskForm.value);
//     console.log('submitForm被调用');
//     // checkEndTime( taskForm.value.startTime ,taskForm.value.endTime)
//     taskFormRef.value.validate(async (valid) => {
//         if (valid) {
//             // 表单验证通过，执行提交逻辑
//             // await this.handleSubmit();
//             // this.dialogVisible.value = false
//         } else {
//             return false;
//         }
//     });
// }
//视图被关闭后，文本框的聚焦移除
const inputRef = ref(null)
// function removeFocus() {
//     console.log('removeFocus');
//     inputRef.value.blur();
//     console.log('removeFocus被调用');
// }




/**
 * 完成任务
 */
const handleCompleteTask = async () => {
    // console.log('completedCount:', completedCount);
    // 调用后端接口标记任务完成
    await taskStore.updateTaskStatus(user_id, selectTaskId.value, 'completed')
    // tasks[selectTaskId.value].status = 'completed'
    taskCompleteVisible.value = false
    // console.log('completeTask被调用', selectTaskId.value)
    // console.log(taskArrays.value)
    // console.log('completedCount:', completedCount);
}

</script>

<template>
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

    <div class="task-list">
        <div class="task-item " v-for="(item, index) in taskArray" :class="{
            'completed-task': item.status == 'Completed',
            'task-item-selected': index === selectedTaskIndex,
            'over-time': (item.status !== 'completed') && (item.end_date < convertToTimestamp(new Date()))
        }" :key="index" @click="selectTask(index, item.task_id)">
            <el-text class="task-title">{{ item.task_title }}</el-text>
            <el-text class="task-content" truncated="true">{{ item.task_description }}</el-text>
            <el-text class="task-time">{{ formatTimestamp(item.end_date) }}</el-text>
            <el-button type="primary" :icon="Check" size="small" circle @click="openCompleteVisible(item.task_id)"><el-icon>
                    <check />
                </el-icon></el-button>

            <el-button type="danger" size="small" circle @click="openDeleteVisible(item.task_id)"><el-icon>
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
                    <el-button type="primary" @click="handleCompleteTask">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>

        <!-- 删除任务对话框 -->
        <el-dialog v-model="taskDeleteVisible" width="15%" center :modal="false" :lock-scroll="false" :append-to-bod="true">
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
</template>

<style lang='scss' scoped>
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
</style>