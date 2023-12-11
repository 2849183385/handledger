export const loadMoreData = {
    install(app) {
        app.directive('loadMore', {
            beforeMount(el, binding) {
                const { option, callback } = binding.value
                console.log(option)
                console.log(callback);
                const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersectingRatio) {
                        callback()
                    }
                })
                }, option)
                observer.observe(el)
                // 卸载
            el._intersectionObserver = observer

            },
            beforeUnmount(el) {
                if (el._intersectionObserver) {
                    el._intersectionObserver.disconnect(); // 断开观察
                }
            }
            
        })
    }
}