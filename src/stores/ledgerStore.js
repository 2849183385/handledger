import { defineStore } from "pinia";
import { ref } from 'vue'
import { getLedgerAPI, getLedgerListAPI, getCommentAPI, getReplyAPI, getLikeAPI, getLatestCommentAPI, getLatestReplyAPI } from '@/apis/ledger'
export const useLedgerStore = defineStore("ledger", () => {
    const ledgerInfo = ref([])
    const ledgerList = ref([])
    /**
     * 获取单条记录
     * @param {*} id 获取的文章id
     * 请求到数据后，保存到本地ledgerInfo中,同时发送请求获取评论请求getComments(id)
     */
    const getLedger = async (id) => {
        //获取文章详情
        await getLedgerAPI(id).then((res) => {
            setLedger(res.data.data)
        })
        //获取评论详情

        // console.log(commentList)
        //获取回复详情
    }
    /**
     * 获取评论
     * @param {*} id 文章id
     * 请求到数据后，保存到本地ledgerInfo.value.commentsInfo中
     */
    const getComments = async (id, limit) => {
        let offset = null
        console.log(offset)
        try {
            console.log(id, limit, offset)
            console.log(ledgerInfo.value.commentsInfo)
            offset = ledgerInfo.value.commentsInfo ? ledgerInfo.value.commentsInfo.length : 0
            console.log(id, limit, offset)
            const res = await getCommentAPI(id, limit, offset)
            //评论数据存储到本地
            ledgerInfo.value.commentsInfo = ledgerInfo.value.commentsInfo ? (ledgerInfo.value.commentsInfo.concat(res.data.data)) : res.data.data
        } catch (error) {
            console.log(error);
        }
    }
    /*获取最新评论，并显示到顶部
     * @param {*} post_id 文章id
     */
    const getLatestComment = async (post_id) => {
        try {
            const res = await getLatestCommentAPI(post_id)
            console.log(res.data.data)
            //将获取的最新评论数据插入到本地评论数据顶部
           
            ledgerInfo.value.commentsInfo.unshift(...res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    const getLedgerList = async () => {
        ledgerList.value = await getLedgerListAPI()
    }
    /**
     * 获取回复
     * @param {*} id 评论id
     * @param {*} limit 回复数量
     * for循环找出评论id，并以该ID发送请求，获取回复内容，获取结果后插入该评论，回复数量也进行更新
     */
    const getReply = async (id, limit) => {
        let offset = null
        //找出评论id，
        for (let i = 0; i < ledgerInfo.value.commentsInfo.length; i++) {
            if (ledgerInfo.value.commentsInfo[i].comment_id === id) {
                offset = ledgerInfo.value.commentsInfo[i].replies ? ledgerInfo.value.commentsInfo[i].replies.length : 0
                console.log(offset)
                //找到评论id
                const res = await getReplyAPI(id, limit, offset)
                console.log(res.data.data)
                if (res.data.data === '') {
                    console.log('没有更多数据')
                    return
                }
                //将返回结果添加到该评论的回复中
                //判断是否存在回复内容,如果存在则原数据和返回数据两数组合并,否则直接赋值
                ledgerInfo.value.commentsInfo[i].replies = ledgerInfo.value.commentsInfo[i].replies ? (ledgerInfo.value.commentsInfo[i].replies.concat(res.data.data)) : res.data.data
                console.log(res.data.data[0].reply_count)
                //回复数量也进行更新
                // ledgerInfo.value.commentsInfo[i].reply_count = res.data.data[0].reply_count
                break
            }

        }
    }
    /*获取最新评论，并显示到顶部
     * @param {*} post_id 文章id
     */
    const getLatestReply = async (comment_id) => {
        try {
            const res = await getLatestReplyAPI(comment_id)
           
            for (let i = 0; i < ledgerInfo.value.commentsInfo.length; i++) {
            //找到被回复的评论
                if (ledgerInfo.value.commentsInfo[i].comment_id === comment_id) {
                    //赋值
                    console.log(res.data.data);
                    console.log(ledgerInfo.value.commentsInfo[i].replies)
                    if (ledgerInfo.value.commentsInfo[i].replies) {
                       ledgerInfo.value.commentsInfo[i].replies.unshift(...res.data.data) 
                    } else {
                        ledgerInfo.value.commentsInfo[i].replies = res.data.data
                    }
                     
                    console.log(ledgerInfo.value.commentsInfo[i].replies)

                    //回复数量也进行更新
                    ledgerInfo.value.commentsInfo[i].reply_count = res.data.data[0].reply_count
                    break
                }
            }
            //将获取的最新评论数据插入到本地评论数据顶部
        } catch (error) {

            console.log(error);
        }
    }
    const getLike = async (id, method,comment_id) => {
        const res = await getLikeAPI(id, method)
        switch (method) {
            case 'post':
                console.log('post',res.data.data)
                ledgerInfo.value.article.post_likes_count=res.data.data.post_likes_count
                break;
            case 'comment':
                console.log('comment', res.data.data)
                console.log(ledgerInfo.value.commentsInfo)
                for (let i = 0; i < ledgerInfo.value.commentsInfo.length; i++) {
                    if (ledgerInfo.value.commentsInfo[i].comment_id === id) {
                        // console.log(ledgerInfo.value.commentsInfo[i])
                        ledgerInfo.value.commentsInfo[i].comment_likes_count = res.data.data.comment_likes_count
                        // console.log(ledgerInfo.value.commentsInfo[i])
                        // console.log(ledgerInfo.value.commentsInfo[i].comment_likes_count)
                        // console.log(res.data.data.comment_likes_count)
                        return
                    }
                }
                break;
            case 'reply':
                console.log('reply',res.data.data)
                for (let i = 0; i < ledgerInfo.value.commentsInfo.length; i++) {
                   
                    if (ledgerInfo.value.commentsInfo[i].comment_id === comment_id) {
                        console.log(ledgerInfo.value.commentsInfo[i])
                        for (let j = 0; j < ledgerInfo.value.commentsInfo[i].replies.length; j++){

                            if (ledgerInfo.value.commentsInfo[i].replies[j].reply_id === id) {
                                console.log(ledgerInfo.value.commentsInfo[i].replies[j])
                                console.log(ledgerInfo.value.commentsInfo[i].replies[j].reply_likes_count)
                                ledgerInfo.value.commentsInfo[i].replies[j].reply_likes_count = res.data.data.reply_likes_count
                                console.log(ledgerInfo.value.commentsInfo[i].replies[j].reply_likes_count)
                                console.log(res.data.data.reply_likes_count)
                               return
                           }
                       }
                    }
                }
                break;
            default:
                break;
        }
        console.log(res.data.data)
    }
    const setLedger = (data) => {
        ledgerInfo.value = data
    }
    const cleanLedger = () => {
        ledgerInfo.value = {}
    }
    return {
        ledgerInfo,
        ledgerList,
        getLedger,
        getComments,
        getLatestComment,
        getLedgerList,
        getReply,
        getLatestReply,
        getLike,
        setLedger,
        cleanLedger
    }
}, {
    persist: true
})