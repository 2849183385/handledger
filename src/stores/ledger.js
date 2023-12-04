import { defineStore } from "pinia";
import { ref } from 'vue'
import { imageSrc } from '@/utils/imageSrc'
import { getLedgerAPI, getLedgerListAPI, getCommentAPI, getReplyAPI } from '@/apis/ledger'
export const useLedgerStore = defineStore("ledger", () => {
    const ledger = ref([])
    const ledgerList = ref([])
    /**
     * 获取单条记录
     * @param {*} id 获取的文章id
     */
    const getLedger = async ({ id }) => {
        //获取文章详情
       await getLedgerAPI({ id }).then(async(res) => {
            const res1 = await getCommentAPI({ id })
           console.log(res)
           setLedger(res.data.data)
           console.log(res1)
           //注意map不要添加async，会导致返回结果为promise
           ledger.value.commentsInfo = res1.data.data.map( (item) => {
                const id =item.comment_id
               console.log(item)
               getReplyAPI({ id }).then(async (res) => {
                if (res.data.data.length > 0) {
                    //将获取的回复数据的头像格式转换
                    res.data.data = res.data.data.map((item) => {
                        item.user_pic = imageSrc(item.user_pic)
                        return item
                    }) 
                    //将对应的回复数据插入到对应的评论中
                    item.replies = res.data.data
              }
               })
               item.user_pic = imageSrc(item.user_pic)
              
               return item
           })
        })
        //获取评论详情
       
        // console.log(commentList)
        //获取回复详情
    }
    const getLedgerList = async () => {
        ledgerList.value = await getLedgerListAPI()
    }
    const setLedger = (data) => {
        ledger.value = data
    }
    return {
        ledger,
        ledgerList,
        getLedger,
        getLedgerList,
        setLedger
    }
}, {
    persist: true
})