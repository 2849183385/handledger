
// // Intersection Observer 自定义指令
// export default  {
//    onMounted(el, binding) {
        
//         const { option,callback }=binding.value
//         // const options = {
//         //     root: root || null, // 根元素，默认为 viewport
//         //     rootMargin: rootMargin || '0px', // 根元素的边距
//         //     threshold: threshold || 1 // 交叉比例
//         // };
//         console.log(option)
//         console.log(callback)
//         const observer = new IntersectionObserver((entries) => {
//             console.log(entries)
//             entries.forEach((entry) => {
//                 if (entry.isIntersectionRation===1) {
//                     callback(); // 执行绑定的回调函数，即获取数据的操作
//                 }
//                 observer.unobserve(el)
//             });
//         }, option);

//         observer.observe(el); // 观察指定的元素

//         // 在组件卸载时断开观察
//         el._intersectionObserver = observer;
//     },
//     onBeforeUnmount(el) {
//         if (el._intersectionObserver) {
//             el._intersectionObserver.disconnect(); // 断开观察
//         }
//     }
// };
