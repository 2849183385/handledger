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
           ledger.value.commentsInfo = res1.data.data.map( (item) => {
                const id =item.comment_id
               console.log(item)
               getReplyAPI({ id }).then(async (res) => {
                if (res.data.data.length > 0) {
                    
                    // item =item.map imageSrc(item.user_pic)
                    item.replies = res.data.data
                    console.log(item)
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