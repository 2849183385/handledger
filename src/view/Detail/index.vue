<script setup>
import { ref, onMounted, toRefs } from 'vue'
import { useScroll } from '@vueuse/core'
import { useLedgerStore } from '@/stores/ledgerStore'
import { useUserStore } from '@/stores/userStore'
// import { formatDates } from '@/utils/format'
import { imageSrc } from '@/utils/imageSrc'
import { likeStatus, favoriteStatus } from '@/utils/status'
import { formatDate } from '@/utils/format'
import { pulishCommentAPI, pulishReplyAPI, pulishLikeAPI, deleteCommentAPI, cancelLikeAPI, getReplyAPI, publishFavoriteAPI, cancelFavoriteAPI, getLikeAPI, getCommentAPI, getLatestCommentAPI, getLatestReplyAPI } from '@/apis/ledger'
import { Delete } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus';
const routes = useRoute();
const ledgerStore = useLedgerStore()
const userStore = useUserStore()
const { userInfo } = userStore
const { likesId, favoritesId } = toRefs(userInfo)
const user_id = userInfo.user_id
// console.log(likes.value.commentid)
const limit = 5
// const id = 19
const post_id = routes.params.post_id
// const comment_post_id = 19
const imageArray = ref([])
//文章信息
const commentsInfo = ref([])
//发送获取文章信息请求
const article = ref({})
const isFocued = ref(false)
const inputRef = ref(null)
const contentBox = ref(null)
const { y } = useScroll(contentBox)
//@功能样式存储当前被@对象信息
const atUserInfo = ref({})
const atUser = (item) => {
    atUserInfo.value = item ? item : {}
    inputRef.value.focus()
}
//评论框内容
const comment_value = ref('')
const theEnd = ref(false)
//评论

const cancel = () => {
    inputRef.value.blur()
    isFocued.value = false
    comment_value.value = ''
    atUserInfo.value = {}
}
/**
 * 显示评论逻辑
 * 定义一个对象expended{}，用于存储是否显示评论的数据，key为评论id，value为是否显示评论数据
 * 用户点击加载更多按钮，将评论id赋值给对象，如果对象中存在该id，则将该id对应的value赋值为false，否则赋值为true
 * 再定义一个函数，该函数接收一个参数，参数为评论id，查找expended{}中key值为id的value，并返回该值，组件中再使用该值为判断是否显示该评论的回复数据的判断依据之一(另一依据为评论数据是否存在replies属性)
 */
// const showMore=ref(false)
const loadingReply = ref(false)

const commentSubmit = async () => {
    // 发送回复
    if (Object.keys(atUserInfo.value).length > 0) {
        //提取·需要发送的评论ID
        const comment_id = atUserInfo.value.comment_id ? atUserInfo.value.comment_id : atUserInfo.value.reply_comment_id
        // const id = atUserInfo.value.reply_comment_id ? atUserInfo.value.reply_comment_id : atUserInfo.value.comment_id
        await pulishReplyAPI({
            user_id,
            content: comment_value.value.trim(),
            post_id,
            //判断是否有回复评论id，还是回复其他回复的评论id
            comment_id,
            reply_user_id: atUserInfo.value.reply_user_id
        })
        //发表评论后，获取新数据
        /*commentsArray赋值要在ledgerStore.getLedger之后，
         因为ledgerStore.getLedger进行了异步操作，在外面赋值会导致commentsArray的值不是最准确的值*/
        //获取回复
        //    await ledgerStore.getComments(19)
        // await ledgerStore.getReply(id, limit)
        await getLatestReply(comment_id)
        //评论数量加一
        article.value.post_comment_count = article.value.post_comment_count + 1
    } else {//发送评论
        await pulishCommentAPI(
            comment_value.value,
            post_id,
            user_id
        )
        //发表评论后，获取新数据
        await getLatestComment(post_id)
        //发送评论后，本地数据评论数加一
        article.value.post_comment_count = article.value.post_comment_count + 1

        //获取ledger信息时，顺便获取评论信息
        /*commentsArray赋值要在ledgerStore.getLedger之后，
         因为ledgerStore.getLedger进行了异步操作，在外面赋值会导致commentsArray的值不是最准确的值*/

    }
    //评论被发送后，输出框清零，样式清零
    inputRef.value = null
    isFocued.value = false
    // inputRef.value.blur()
    atUserInfo.value = {}
    comment_value.value = ''
    // console.log(comment_value.value);
}

/**
     * 获取评论
     * @param {*} id 文章id
     * 请求到数据后，保存到本地ledgerInfo.value.commentsInfo中
     */
const getComments = async (id) => {
    let offset = null
    // console.log(offset)
    try {
        offset = commentsInfo.value ? commentsInfo.value.length : 0
        // console.log(id, limit, offset)
        const res = await getCommentAPI(id, limit, offset)
        //评论数据存储到本地
        console.log(res.data.data);
        commentsInfo.value = commentsInfo.value ? (commentsInfo.value.concat(res.data.data)) : res.data.data
        if (res.data.data.length === 0) {
            loadingReply.value = false
            theEnd.value = true
        }
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
        // console.log(res.data.data)
        //将获取的最新评论数据插入到本地评论数据顶部

        commentsInfo.value.unshift(...res.data.data)
    } catch (error) {
        console.log(error);
    }
}
//获取回复
const getReply = async (comment_id) => {
    loadingReply.value = true
    let offset = null
    console.log(loadingReply);
    //找出评论id，
    for (let i = 0; i < commentsInfo.value.length; i++) {
        console.log(commentsInfo.value[i]);
        if (commentsInfo.value[i].comment_id === comment_id) {
            offset = commentsInfo.value[i].replies ? commentsInfo.value[i].replies.length : 0
            console.log(offset)
            //找到评论id
            const res = await getReplyAPI(comment_id, limit, offset)

            loadingReply.value = false
            console.log(res.data.data)
            if (res.data.data === '') {
                console.log('没有更多数据')
                return
            }
            //将返回结果添加到该评论的回复中
            //判断是否存在回复内容,如果存在则原数据和返回数据两数组合并,否则直接赋值
            commentsInfo.value[i].replies = commentsInfo.value[i].replies ? (commentsInfo.value[i].replies.concat(res.data.data)) : res.data.data
            // console.log(res.data.data[0].reply_count)
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

        for (let i = 0; i < commentsInfo.value.length; i++) {
            //找到被回复的评论
            if (commentsInfo.value[i].comment_id === comment_id) {
                //赋值
                // console.log(res.data.data);
                // console.log(ledgerInfo.value.commentsInfo[i].replies)
                if (commentsInfo.value[i].replies) {
                    commentsInfo.value[i].replies.unshift(...res.data.data)
                } else {
                    commentsInfo.value[i].replies = res.data.data
                }

                // console.logcommentsInfo.value[i].replies)

                //回复数量也进行更新
                commentsInfo.value[i].reply_count = res.data.data[0].reply_count
                break
            }
        }
        //将获取的最新评论数据插入到本地评论数据顶部
    } catch (error) {

        console.log(error);
    }
}
// const getReply = async (id) => {
//     loadingReply.value = true
//     await ledgerStore.getReply(id, limit)
//     loadingReply.value = false
// }
const getLike = async (id, method, comment_id) => {
    const res = await getLikeAPI(id, method)
    switch (method) {
        case 'post':
            // console.log('post',res.data.data)
            article.value.post_likes_count = res.data.data.post_likes_count
            break;
        case 'comment':
            // console.log('comment', res.data.data)
            for (let i = 0; i < commentsInfo.value.length; i++) {
                if (commentsInfo.value[i].comment_id === id) {
                    // console.logcommentsInfo[i])
                    commentsInfo.value[i].comment_likes_count = res.data.data.comment_likes_count
                    // console.logcommentsInfo[i])
                    // console.logcommentsInfo[i].comment_likes_count)
                    // console.log(res.data.data.comment_likes_count)
                    return
                }
            }
            break;
        case 'reply':
            console.log('reply', res.data.data)
            for (let i = 0; i < commentsInfo.value.length; i++) {

                if (commentsInfo.value[i].comment_id === comment_id) {
                    // console.log(commentsInfo.value[i])
                    for (let j = 0; j < commentsInfo.value[i].replies.length; j++) {

                        if (commentsInfo.value[i].replies[j].reply_id === id) {
                            // console.log(commentsInfo.value[i].replies[j])
                            // console.log(commentsInfo.value[i].replies[j].reply_likes_count)
                            commentsInfo.value[i].replies[j].reply_likes_count = res.data.data.reply_likes_count
                            // console.log(ledgerInfo.value.commentsInfo.value[i].replies[j].reply_likes_count)
                            // console.log(res.data.data.reply_likes_count)
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


/**
 * 点赞流程
 * 1.发送点赞请求
 * 2.更新用户点赞表数据
 * 3.获取文章新数据
 */
const publishLike = async (user_id, post_id, method) => {
    await pulishLikeAPI(user_id, post_id, method)
    await userStore.getLikesId(user_id)
    // await ledgerStore.getLedger(19)
}
/**
 * 取消点赞
 * 1.发送取消点赞请求
 * 2.更新用户点赞表数据
 */
const cancelLike = async (user_id, id, method) => {
    await cancelLikeAPI(user_id, id, method)
    await userStore.getLikesId(user_id)
}



//点赞
const likeSubmit = async ({ id, method, comment_id }) => {
    //判断用户是否给这个点过赞，点过则发送取消请求，
    if (likeStatus(id, method, likesId.value)) {
        console.log('取消点赞')
        await cancelLike(user_id, id, method)
        await getLike(id, method, comment_id)
    } else {
        console.log('点赞')
        //点赞
        await publishLike(user_id, id, method)
        //点赞后更新用户点赞表数据
        await getLike(id, method, comment_id)
    }
}

//删除
const deleteDialogVisible = ref(false)
const deleteInfo = ref({})
const deleteConfirm = (comment_id, method, reply_id) => {
    deleteDialogVisible.value = true
    deleteInfo.value = { user_id, comment_id, method, reply_id }
    //    deleteComment(user_id, comment_id, method, reply_id)
}

const deleteComment = async () => {
    const { comment_id, method, reply_id } = deleteInfo.value
    switch (method) {
        case 'comment':
            //找到要被删除的评论
            for (let i = 0; i < commentsInfo.value.length; i++) {
                if (commentsInfo.value[i].comment_id === comment_id) {
                    // console.log(comment_id);
                    // console.log(commentsInfo.value);
                    commentsInfo.value.splice(i, 1)
                    // console.log(commentsInfo.value);
                    const res = await deleteCommentAPI(comment_id, method)
                    //删除后。评论总数减一
                    article.value.post_comment_count = article.value.post_comment_count - 1
                    // console.log(res);
                    ElMessage({
                        type: 'success',
                        message: res.data.message
                    })
                    deleteDialogVisible.value = false
                    return
                }
            }
            break;
        case 'reply':
            // console.log(method)
            //找到要被删除的回复
            for (let i = 0; i < commentsInfo.value.length; i++) {
                if (commentsInfo.value[i].comment_id === comment_id) {
                    for (let j = 0; j < commentsInfo.value[i].replies.length; j++) {
                        if (commentsInfo.value[i].replies[j].reply_id === reply_id) {
                            commentsInfo.value[i].replies.splice(j, 1)
                            await deleteCommentAPI(comment_id, method, reply_id)
                            //删除后。评论总数减一
                            // const res = article.value.post_comment_count = article.value.post_comment_count - 1
                            ElMessage({
                                type: 'success',
                                message: '删除成功'
                            })
                            deleteDialogVisible.value = false
                            // console.log(res);
                            return
                        }
                    }
                }
            }
            break;
        default:
            break;
    }
}

const favoriteSubmit = async () => {
    //如果是收藏状态则
    // console.log(typeof routes.params.post_id);
    // console.log(post_id,  favoritesId.value.indexOf(19), favoriteStatus(parseInt(post_id),arr));
    // console.log(favoriteStatus(parseInt(post_id), favoritesId.value));
    if (!favoriteStatus(post_id, favoritesId.value)) {
        const res = await publishFavoriteAPI(user_id, post_id)
        // console.log(res.data.data);
        userStore.getFavoritesId(user_id)
        article.value.post_favorite_count = res.data.data.favorites_count
    } else {
        const res = await cancelFavoriteAPI(user_id, post_id)
        userStore.getFavoritesId(user_id)
        // console.log(res.data);
        article.value.post_favorite_count = res.data.data.favorites_count
    }
}

// console.log(likes.value)
// console.log(likeStatus(19, 'post', likes.value))
//要获取一个dom，首先需要声明一个容器 ref(null) 然后在模板中绑定
const card = ref(null)
const loadMore = ref(null)
const option = {
    delay: 500,
    root: card.value,
    rootMargin: '0px 0px 600px 0px',
    threshold: 1,
}
const loadingComment = ref(false)
onMounted(async () => {
    await ledgerStore.getLedger(post_id)
    await getLike(post_id, 'post')
    article.value = ledgerStore.ledgerInfo.article
    console.log(article);
    // await getComments(post_id, limit)
    //用户划到评论底部时，触发加载更多数据网络请求逻辑
    //在评论组件最底部，添加一个加载更多动画，如果加载更多动画进入可视区，触发回调函数
    // 监听评论列表是否进入可见区域参数
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(async (entry) => {
            if (entry.intersectionRatio === 1) {
                console.log('进入可见区域')
                // if()
                const res = await getComments(post_id, limit)
                console.log(res);
                // console.log( ledgerStore.ledgerInfo.article.comment_count);
                // console.log(ledgerStore.ledgerInfo.commentsInfo?.length);
                // console.log(ledgerStore.ledgerInfo.article.comment_count==ledgerStore.ledgerInfo.commentsInfo?.length);

                loadingComment.value = true
            } else {
                console.log('离开可见区域')
                loadingComment.value = false
            }
        })
    }, option)
    // 尝试注册监听器
    try {
        observer.observe(loadMore.value, option);
    } catch (error) {
        // 目标节点不存在时取消注册监听器
        observer.disconnect();
        console.log('目标节点不存在，取消注册监听器');
    }
    imageArray.value = article.value?.post_image_url.split('&').map(item => {
        console.log(1);
        return imageSrc(item)
    })
})
// onBeforeUnmount(()=>{
//     observer.disconnect()
// })

// console.log(imageArray)
</script>

<template>
    <div class="card" ref="card">
        <div class="left" ref="left">
            <div class="img-box">
                <el-carousel :interval="4000">
                    <el-carousel-item height="" v-for="item in imageArray" :key="item">
                        <el-image ref="imageRef" :src="item" fit="cover"
                            style="display: flex; justify-content: center; width: 100%; height: 100%;" />
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>

        <div class="right">
            <div class="nav-box" :class="{ 'border': y > 70 }">
                <div class="user-info">
                    <el-avatar :size="50" :src="imageSrc(article?.user_pic)"></el-avatar>
                    <span style="margin-left: 10px; font-size: 16px;"></span>
                </div>
                <el-button type="primary">关注</el-button>
            </div>

            <div class="content-box" ref="contentBox" v-loading="loadingReply">
                <div class="main-content">
                    <div class="title">{{ article?.post_title }}</div>
                    <el-text>{{ article?.post_content }}</el-text>
                    <div class="time">{{ formatDate(article?.post_created_time) }}</div>
                </div>
                <el-divider />
                <el-empty class="comment-box" description="空空如也" v-if="article.post_comment_count == 0" />
                <div class="comment-box" v-else>
                    <div class="total">
                        <p>共<span>123</span>条评论</p>
                    </div>
                    <!-- v-intersection-observer="loadMoreData()" -->
                    <div class="comment-list">
                        <!-- 评论组件 -->
                        <div class="comment" v-for="items in commentsInfo" :key="items.comment_id">
                            <el-avatar :size="40" :src="imageSrc(items.user_pic)"></el-avatar>
                            <div class="content">
                                <div class="commment-auther">{{ items.nick_name }}</div>
                                <div class="comment-text">{{ items.comment_content }}</div>
                                <div class="time">{{ formatDate(items.comment_created_time) }}</div>
                                <div class="comment-reply">
                                    <el-button text @click="likeSubmit({ id: items.comment_id, method: 'comment' })">
                                        <i class="iconfont icon-like-true"
                                            :class="{ 'red': likeStatus(items.comment_id, 'comment', likesId) }" />
                                        <span>{{ items.comment_likes_count }}</span>
                                    </el-button>
                                    <el-button text @click="atUser(items)"> <i class="iconfont icon-comment_light" />
                                        <span>{{ items.reply_count }}</span>
                                    </el-button>
                                    <el-button text :icon="Delete" @click="deleteConfirm(items.comment_id, 'comment')"
                                        v-show="items.comment_user_id == user_id || article.post_user_id == user_id"></el-button>
                                </div>
                                <div class="reply-list">
                                    <div class="reply-item" v-for="item in items.replies" :key="item.reply_id">
                                        <el-avatar :size="25" :src="imageSrc(item.user_pic)"></el-avatar>
                                        <div class="content">
                                            <div class="commment-auther">{{ item.nick_name }}</div>
                                            <div class="comment-text">
                                                <span v-show="item.replied_user_nick_name !== null"
                                                    style="color:#fec887;">
                                                    回复 {{ item.replied_user_nick_name }}：
                                                </span> {{ item.reply_content }}
                                            </div>
                                            <div class="time">{{ formatDate(item.reply_created_time) }}</div>
                                            <div class="comment-reply">
                                                <el-button text
                                                    @click="likeSubmit({ id: item.reply_id, method: 'reply', comment_id: items.comment_id })">
                                                    <i class="iconfont icon-like-false"
                                                        :class="{ 'red': likeStatus(item.reply_id, 'reply', likesId) }" /><span>{{ item.reply_likes_count }}</span></el-button>
                                                <el-button @click="atUser(item)" text> <i
                                                        class="iconfont icon-comment_light" /></el-button>
                                                <el-button class="delete-btn" text :icon="Delete"
                                                    v-show="item.reply_user_id == user_id || article.post_user_id == user_id"
                                                    @click="deleteConfirm(items.comment_id, 'reply', item.reply_id)"></el-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="show-more" @click="getReply(items.comment_id)"
                                    v-show="items.reply_count !== 0 && items.reply_count !== items.replies?.length">
                                    <el-text>加载更多</el-text>
                                </div>
                            </div>
                        </div>
                        <div class="load-item" ref="loadMore" v-loading="loadingComment" element-loading-text="加载中..."
                            v-show="!theEnd">
                            <div class="load-item" v-show="theEnd"> <el-text>---没有更多了喔---</el-text></div>

                        </div>

                    </div>
                </div>
            </div>
            <div :class="{ 'footer-blur': !isFocued, 'footer-focus': isFocued }" ref="footer">
                <div class="footer-top" v-show="(Object.keys(atUserInfo).length > 0) && isFocued">
                    <p>
                        <span>回复</span><span style="margin-left:5px">{{ atUserInfo?.nick_name }}:</span>
                    </p>
                    <el-text :truncated="true"
                        style="color: gray;width:90%;">{{ atUserInfo?.comment_content || atUserInfo?.reply_content }}</el-text>
                </div>
                <input class="comment-input" v-model="comment_value" @focus="isFocued = true" type="textarea"
                    ref="inputRef" placeholder="说点啥吧" @keydown.enter="commentSubmit" />
                <div class="other">
                    <el-button text @click="likeSubmit({ id:post_id, method: 'post' })"><i
                            class="iconfont icon-like-true"
                            :class="{ 'red': likeStatus(post_id, 'post', likesId) }"></i><span>{{ article?.post_likes_count }}</span></el-button>
                    <el-button text @click="atUser()"> <i
                            class="iconfont icon-comment_light"></i><span>{{ article.post_comment_count }}</span></el-button>
                    <el-button text @click="favoriteSubmit()"
                        :style="{ 'color': favoriteStatus(post_id, favoritesId) ? '#fec887' : '' }"> <i
                            class="iconfont icon-shoucang-true"></i><span>{{ article.post_favorite_count }}</span></el-button>
                    <el-button text> <i class="iconfont icon-zhuanfa" /></el-button>
                </div>
                <div class="comment-btn">
                    <el-button type="primary" @click="commentSubmit"
                        :disabled="comment_value?.trim() == ''">发送</el-button>
                    <el-button @click="cancel">返回</el-button>
                </div>
            </div>
        </div>
        <!-- 删除对话框 -->

    </div>
    <el-dialog v-model="deleteDialogVisible" width="230px" :align-center="true" :center="true" :modal="false" :draggable="true"
        style=" border-radius: 20px;">
        <span>你想要删除这条评论吗？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="deleteDialogVisible = false">返回</el-button>
                <el-button type="primary" @click="deleteComment">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>
.red {
    color: red;
}

.time {
    margin: 5px 0;
    font-size: 12px;
    color: #999;
}

.border {
    border-bottom: #96a1ac36 1px solid;
}

.el-divider {
    margin: 0 auto;
    width: 95%;
}

.card {
    max-width: 1000px;
    overflow: hidden;
    min-width: 760px;
    min-height: 500px;
    aspect-ratio: 8 / 9;
    height: 90vh;
    width: 80vw;
    /* 使用aspect-ratio属性设置宽高比 */
    border-radius: 20px;
    border: #99a2aa 1px solid;
    display: flex;
    margin: 20px auto;
}

.left {
    width: 50%;
    /* 或者使用 fit-content */
    /* 左侧占50%的宽度 */
    height: 100%;
    /* 高度和父元素相同 */
    position: relative;

    .img-box {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

.right {
    width: 50%;
    background-color: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;

    .nav-box {
        background-color: #fff;
        border-radius: 0 10px 0 0;
        display: flex;
        justify-content: space-between;
        padding: 16px;

        .user-info {
            display: flex;
            align-items: center;
            color: #333;

            .el-avatar {
                margin-right: 10px;
            }
        }

        .el-button {
            border-radius: 10px;
        }
    }

    .content-box {
        overflow-y: auto;
        flex: 1;
        margin: 0 16px;
        display: flex;
        flex-direction: column;

        .main-content {
            flex: 2;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 0 10px;

            .title {
                margin-bottom: 8px;
                font-weight: 600;
                font-size: 18px;
                line-height: 140%;
            }

            .el-text {
                margin-bottom: 8px;
                font-weight: 400;
                font-size: 16px;
                line-height: 150%;
            }
        }

        .comment-box {
            flex: 8;
            padding: 0 6px;

            .total {
                display: flex;
                align-items: center;
                margin-top: 5px;

                span {
                    color: #333;
                    margin: 10px;
                }
            }

            .comment-list {
                padding: 10px;

                .comment {
                    display: flex;
                    padding: 8px;

                    .content {
                        margin-left: 10px;
                        flex-direction: column;
                        flex: 1;
                        display: flex;

                        .commment-auther {
                            color: #999;
                            //    margin: 0 0 5px 0;
                        }

                        .comment-text {
                            flex: 1;
                            margin: 8px 0;
                        }



                        .comment-reply {
                            display: flex;
                            align-items: center;
                            font-size: 12px;
                            color: #999;

                            .el-button {
                                padding: 0;
                            }

                            .delete-btn {
                                &:hover {
                                    color: red;
                                }
                            }
                        }

                        .reply-list {
                            flex: 2;
                        }

                        .show-more {
                            span {
                                font-size: 13px;
                                color: gray;

                                &:hover {
                                    color: #fec887;
                                }

                                cursor: pointer;
                            }
                        }
                    }
                }

                .load-item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 80px;
                    margin: 10px 0;
                    border-radius: 10px;

                }
            }

            .reply-item {
                box-sizing: border-box;
                display: flex;
                padding-top: 5px;
                border-top: #99999904 1px solid;

                .content {}

            }
        }
    }

    .footer-blur {
        width: 100%;
        border-top: #96a1ac 1px solid;
        padding: 16px;
        display: flex;

        .comment-input {
            width: 40%;
            padding: 5px 10px;
            font-size: 16px;
            height: 40px;
            border-radius: 20px;
            background-color: #ecf0f34b;
            box-shadow: inset 15px 15px 15px #cbced111;
            caret-color: #1da1f2;
            border: none;

            &::placeholder {
                color: #999;
            }

            &:focus {
                outline: #fec887 1px solid;
            }

        }

        .other {
            width: 60%;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .el-button {
                margin-left: 0;
                padding: 5px;

                span {
                    margin: 5px 5px;
                    font-size: 1em;
                }
            }


        }

        .comment-btn {
            display: none;
        }
    }

    .footer-focus {
        @extend.footer-blur;
        flex-direction: column;
        align-items: flex-start;

        .comment-input {
            @extend .comment-input;
            padding: 9px 16px;
            width: 100%;

            &::placeholder {
                color: #999;
            }

            &:focus {
                outline: #fec887 1px solid;
            }

        }

        .other {
            display: none;
        }

        .comment-btn {
            flex: 5;
            display: flex;

            //justify-content: space-around;
            .el-button {
                border-radius: 10px;
                margin: 10px 15px;
            }
        }
    }

    .footer-top {
        width: 100%;
        overflow: hidden;
        border-radius: 10px;
        margin: 5px 0;
    }
}

.right::-webkit-scrollbar {
    width: 10px;
}</style>
@/utils/status