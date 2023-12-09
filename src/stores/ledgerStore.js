import { defineStore } from "pinia";
import { ref } from 'vue'
import { getLedgerAPI, getLedgerListAPI, getCommentAPI, getReplyAPI } from '@/apis/ledger'
export const useLedgerStore = defineStore("ledger", () => {
    const ledgerInfo = ref([])
    const ledgerList = ref([])
    /**
     * 获取单条记录
     * @param {*} id 获取的文章id
     */
    const getLedger = async ({ id }) => {
        //获取文章详情
        await getLedgerAPI({ id }).then(async (res) => {
            // 不要
            await setLedger(res.data.data)
            await getComments(id)
            //    console.log(res1)
        })
        //获取评论详情
       
        // console.log(commentList)
        //获取回复详情
    }
    const getComments = async (id) => {
            const res = await getCommentAPI( {id} )
        ledgerInfo.value.commentsInfo = res.data.data
        }
    const getLedgerList = async () => {
        ledgerList.value = await getLedgerListAPI()
    }

    const getReply = async (id, limit) => {
        //找出评论id，
        for (let i = 0; i < ledgerInfo.value.commentsInfo.length; i++) {
            //找到评论id
            if (ledgerInfo.value.commentsInfo[i].comment_id === id) {
                //判断是否存在回复内容,和回复内容的长度
                //如果不存在或者长度为零，则请求5段数据
                if (!ledgerInfo.value.commentsInfo[i].replies) {
                     try {
                        console.log(id,limit)
                         const res = await getReplyAPI(id, limit)
                         ledgerInfo.value.commentsInfo[i].replies = res.data.data
                         //评论数量也进行更新(评论数量在这里返回)
                         console.log(res.data.data[0].reply_count)
                         ledgerInfo.value.commentsInfo[i].reply_count = res.data.data[0].reply_count
                    }catch (error) {
                        console.log(error)
                        }
                    } else {
                    //否则请求回复内容长度 + 5段数据
                    limit =ledgerInfo.value.commentsInfo[i].replies.length + 5;
                    console.log(id, limit)
                        try {
                            const res = await getReplyAPI(id, limit)
                            ledgerInfo.value.commentsInfo[i].replies = res.data.data
                            //评论数量也进行更新
                            console.log(res.data.data[0].reply_count)
                            ledgerInfo.value.commentsInfo[i].reply_count = res.data.data[0].reply_count
                        }catch (error) {
                            console.log(error)
                }
                }
                   
                break
            }
        }
    }
    const setLedger = (data) => {
        ledgerInfo.value = data
    }
    return {
        ledgerInfo,
        ledgerList,
        getLedger,
        getComments,
        getLedgerList,
        getReply,
        setLedger
    }
}, {
    persist: true
})