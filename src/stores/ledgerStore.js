import { defineStore } from "pinia";
import { ref } from 'vue'
import { imageSrc } from '@/utils/imageSrc'
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
            const res1 = await getCommentAPI({ id })
            //    console.log(res)
            setLedger(res.data.data)
            //    console.log(res1)
            //注意map不要添加async，会导致返回结果为promise
            ledgerInfo.value.commentsInfo = res1.data.data.map((item) => {
                item.user_pic = imageSrc(item.user_pic)
                //    console.log(item.user_pic)
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

    const getReply = async ({ id }) => {
        //找出评论id，并判断这个评论是否有回复内容，如果有，则清零，没有则发送请求获取
        for (let i = 0; i < ledgerInfo.value.commentsInfo.length; i++) {
            //找到评论id
            if (ledgerInfo.value.commentsInfo[i].comment_id === id) {
                //判断是否存在回复内容
                if (ledgerInfo.value.commentsInfo[i].replies) {
                    break
                } else {
                    try {
                        const res = await getReplyAPI({ id })
                       
                        if (res.data.data.length > 0) {
                            //将获取的回复数据的头像格式转换
                            res.data.data = res.data.data.map((item) => {
                                item.user_pic = imageSrc(item.user_pic)
                                return item
                            })
                            //将对应的回复数据插入到对应的评论中
                            ledgerInfo.value.commentsInfo[i].replies = res.data.data
                        } else {
                            ledgerInfo.value.commentsInfo[i].replies = ''
                        }
                    }
                    catch (error) {
                        console.log(error)
                        // }
                    }
                    break
                }
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
        getLedgerList,
        getReply,
        setLedger
    }
}, {
    persist: true
})