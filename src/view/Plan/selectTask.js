import { editorForm, taskDetail, selectTaskId, selectedTaskIndex } from './index.vue';

export function selectTask(index, id) {
console.log('editorForm.value', editorForm);
console.log('taskForm.value', taskDetail());
//筛选出描述面板内容
selectTaskId.value = id;
console.log('selectTaskId', selectTaskId.value);
//返回被选中任务的索引
if (selectedTaskIndex.value === index) {
selectedTaskIndex.value = -1; // 如果已经选中了任务，则取消选中
} else {
selectedTaskIndex.value = index; // 选择被点击的任务
}
}
