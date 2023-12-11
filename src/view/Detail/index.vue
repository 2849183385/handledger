<script setup>
import { ref,  onMounted, toRefs } from 'vue'
import { useScroll } from '@vueuse/core'
import { useLedgerStore } from '@/stores/ledgerStore'
import { useUserStore } from '@/stores/userStore'
// import { formatDates } from '@/utils/format'
import { imageSrc } from '@/utils/imageSrc'
import { likeStatus } from '@/utils/likeStatus'
import { pulishCommentAPI, pulishReplyAPI, pulishLikeAPI, cancelLikeAPI } from '@/apis/ledger'
const ledgerStore = useLedgerStore()
const userStore = useUserStore()
const { userInfo } = userStore
const { likes } = toRefs(userInfo)
const user_id = userInfo.user_id
// console.log(likes.value.commentid)
const limit = 5
const id = 19
const post_id = 19
// const comment_post_id = 19

//文章信息

//发送获取文章信息请求
ledgerStore.getLedger(id).then(() => {
    // locationData()
    // ledgerStore.getComments(id, limit)
})
// ledgerStore.ledgerInfo.article.post_image_url = ledgerStore.ledgerInfo.article.post_image_url.split('&').map(item => {
//     return imageSrc(item)
// })
// const locationData = () => {
    //将文章图片url分割成数组
   
    // PostInfo.value.postInfo= ledgerStore.ledger.postInfo[0]
    // articleInfo.value.postInfo.post_image_url = ledgerStore.ledgerInfo.postInfo.post_image_url.split('&').map(item => {
    //     return imageSrc(item)
    // })
    // postAvatarUrl.value = ledgerStore.ledgerInfo.userInfo.user_pic
// }
const inputRef = ref(null)
const contentBox = ref(null)
const { y } = useScroll(contentBox)
//@功能样式存储当前被@对象信息
const atUserInfo = ref({})
const isFocued = ref(0)
const atUser = (obj) => {
    atUserInfo.value = obj
    isFocued.value = 1
    inputRef.value.focus()
}
//评论框内容
const comment_value = ref('')
//评论
const commentSubmit = async () => {
    // 发送回复
    if (atUserInfo.value != 0) {
        //提取·需要发送的评论ID
        const id = atUserInfo.value.reply_comment_id ? atUserInfo.value.reply_comment_id : atUserInfo.value.comment_id
        await pulishReplyAPI({
            user_id,
            content: comment_value.value,
            //判断是否有回复评论id，还是回复其他回复的评论id
            comment_id: id,
            reply_user_id: atUserInfo.value.reply_user_id
        })
        //发表评论后，获取新数据
        /*commentsArray赋值要在ledgerStore.getLedger之后，
         因为ledgerStore.getLedger进行了异步操作，在外面赋值会导致commentsArray的值不是最准确的值*/
        //获取回复
        //    await ledgerStore.getComments(19)
        await ledgerStore.getReply(id, limit)

    } else {//发送评论
        await pulishCommentAPI(
            comment_value.value,
            id,
            user_id,
            atUserInfo.value
        )
        //发表评论后，获取新数据
        await ledgerStore.getLedger(id)
        //获取ledger信息时，顺便获取评论信息
        /*commentsArray赋值要在ledgerStore.getLedger之后，
         因为ledgerStore.getLedger进行了异步操作，在外面赋值会导致commentsArray的值不是最准确的值*/
        // commentsArray.value = ledgerStore.ledgerInfo.commentsInfo
    }
    //评论被发送后，输出框清零，样式清零
    isFocued.value = 0
    atUserInfo.value = {}
    comment_value.value = null

}
const cancel = () => {
    isFocued.value = 0
    atUserInfo.value = {}
}
/**
 * 显示评论逻辑
 * 定义一个对象expended{}，用于存储是否显示评论的数据，key为评论id，value为是否显示评论数据
 * 用户点击加载更多按钮，将评论id赋值给对象，如果对象中存在该id，则将该id对应的value赋值为false，否则赋值为true
 * 再定义一个函数，该函数接收一个参数，参数为评论id，查找expended{}中key值为id的value，并返回该值，组件中再使用该值为判断是否显示该评论的回复数据的判断依据之一(另一依据为评论数据是否存在replies属性)
 */
// const showMore=ref(false)
const loading = ref(false)
const expended = ref({})
//是否显示评论
// const Show = ((id) => {
//     return expended.value[id]
// })
// const triggerShow = (id) => {
//     expended.value[id] = !expended.value[id]
// }
//获取回复
const getReply = async (id) => {
    console.log(id)
    expended.value[id] = true,
        loading.value = true
    await ledgerStore.getReply(id, limit).then(() => {
        console.log(1);
    })
    loading.value = false
}
/**
 * 点赞流程
 * 1.发送点赞请求
 * 2.更新用户点赞表数据
 * 3.获取文章新数据
 */
const publishLike = async (user_id, id, method) => {
    await pulishLikeAPI(user_id, id, method)
    await userStore.getLikes(user_id)
    // await ledgerStore.getLedger(19)
}
/**
 * 取消点赞
 * 1.发送取消点赞请求
 * 2.更新用户点赞表数据
 */
const cancelLike = async (user_id, id, method) => {
    await cancelLikeAPI(user_id, id, method)
    await userStore.getLikes(user_id)
    // await ledgerStore.getComments(post_id,limit)
    // await ledgerStore.getLedger(post_id)
}
//点赞
const likeSubmit = async ({ id, method,comment_id }) => {
    //判断用户是否给这个点过赞，点过则发送取消请求，
    if (likeStatus(id, method, likes.value)) {
        console.log('取消点赞')
        await cancelLike(user_id, id, method)
        ledgerStore.getLike(id,method,comment_id)
    } else {
        console.log('点赞')
        //点赞
        await publishLike(user_id, id, method)
        //点赞后更新用户点赞表数据
        ledgerStore.getLike(id, method, comment_id)

    }
}
// console.log(likes.value)
// console.log(likeStatus(19, 'post', likes.value))
//要获取一个dom，首先需要声明一个容器 ref(null) 然后在模板中绑定
const card = ref(null)
const loadMore = ref(null)
const option = {
        delay:500,
        root: card.value,
        rootMargin: '0px 0px 600px 0px',
        threshold: 1,
    }
onMounted(() => {

    //用户划到评论底部时，触发加载更多数据网络请求逻辑
    //在评论组件最底部，添加一个加载更多动画，如果加载更多动画进入可视区，触发回调函数
    // 监听评论列表是否进入可见区域参数
    const observer = new IntersectionObserver((entries) => {
        // if(ledgerStore.ledgerInfo.commentsInfo.length)
        console.log('entries',entries,'option',option)
        entries.forEach((entry) => {
            if (entry.intersectionRatio === 1) {
                console.log('进入可见区域')
            // if()
                ledgerStore.getComments(post_id,limit)
            }
        })
        
    }, option)
observer.observe(loadMore.value,option)
})
// onBeforeUnmount(()=>{
//     observer.disconnect()
// })
</script>

<template>
    <div class="card" ref="card">
        <div class="left" ref="left">
            <div class="img-box">
                <el-carousel :interval="4000">
                    <el-carousel-item height="" :key="item" v-for="item in ledgerStore.ledgerInfo.article.post_image_url.split('&')" >
                        <el-image ref="imageRef" :src="imageSrc(item)" fit="scale-down" />
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>

        <div class="right">
            <div class="nav-box" :class="{ 'border': y > 70 }">
                <div class="user-info">
                    <el-avatar :size="50" :src="imageSrc(ledgerStore.ledgerInfo.article.user_pic)"></el-avatar>
                    <span style="margin-left: 10px; font-size: 16px;"></span>
                </div>
                <el-button type="primary">关注</el-button>
            </div>
            <div class="content-box" >
                <div class="main-content">
                    <div class="title">{{ ledgerStore.ledgerInfo.article.post_title }}</div>
                    <el-text>{{ ledgerStore.ledgerInfo.article.post_content }}</el-text>
                    <div class="time">{{ ledgerStore.ledgerInfo.article.post_time }}</div>
                </div>
                <el-divider />
                <div class="comment-box">
                    <div class="total">
                        <p>共<span>123</span>条评论</p>
                    </div> 
                    <!-- v-intersection-observer="loadMoreData()" -->
                    <div class="comment-list" >
                        <!-- 评论组件 -->
                        <div class="comment" v-for="items in ledgerStore.ledgerInfo.commentsInfo" :key="items.comment_id">
                            <el-avatar :size="35" :src="imageSrc(items.user_pic)"></el-avatar>
                            <div class="content">
                                <div class="commment-auther">{{ items.nick_name }}</div>
                                <div class="comment-text">{{ items.comment_content }}</div>
                                <div class="time">{{ items.comment_time }}</div>
                                <div class="comment-reply" >
                                    <el-button text @click="likeSubmit({ id: items.comment_id, method: 'comment' })">
                                        <i class="iconfont icon-like-true"
                                            :class="{ 'red': likeStatus(items.comment_id, 'comment', likes) }" />
                                        <span>{{ items.comment_likes_count }}</span>
                                    </el-button>
                                    <el-button text @click="atUser(items)"> <i class="iconfont icon-comment_light" />
                                        <span>{{ items.reply_count }}</span>
                                    </el-button>
                                </div>
                                <!-- 回复数据组件 -->
                                <!-- <div class="show-more">
                                    <el-button text v-show="items.replies"
                                        @click="triggerShow(items.comment_id)">{{ Show(items.comment_id) ? '收起' : '展开' }}</el-button>
                                </div> -->
                                <!-- v-show="items.replies && toggleShow(items.comment_id)" -->
                                <!-- v-show="Show(items.comment_id)" -->
                                <div class="reply-list" >
                                    <div class="reply-item" v-for="item in items.replies" :key="item.reply_id">
                                        <el-avatar :size="25" :src="imageSrc(item.user_pic)"></el-avatar>
                                        <div class="content">
                                            <div class="commment-auther">{{ item.nick_name }}</div>
                                            <div class="comment-text">
                                                <span v-show="item.replied_user_nick_name !== null" style="color:#fec887;">
                                                    回复 {{ item.replied_user_nick_name }}：
                                                </span> {{ item.reply_content }}
                                            </div>
                                            <div class="time">{{ item.reply_time }}</div>
                                            <div class="comment-reply">
                                                <el-button text @click="likeSubmit({ id: item.reply_id, method: 'reply' ,comment_id: items.comment_id })">
                                                    <i class="iconfont icon-like-false"
                                                        :class="{ 'red': likeStatus(item.reply_id, 'reply', likes) }" /><span>{{ item.reply_likes_count }}</span></el-button>
                                                <el-button @click="atUser(item)" text> <i
                                                        class="iconfont icon-comment_light" /></el-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="show-more">
                                    <el-button text @click="getReply(items.comment_id)" v-show="items.reply_count !== items.replies?.length"
                                        style="color:#fec887;">加载更多</el-button>
                                </div>
                            </div>
                        </div>
                        <div class="load-item" ref="loadMore" >
                           <el-text> 加载中</el-text>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="{ 'footer-blur': !isFocued, 'footer-focus': isFocued }" ref="footer" >
                <div class="footer-top" v-show="atUserInfo !== 0 && isFocued">
                    <p>
                        <span>回复</span><span style="margin-left:5px">{{ atUserInfo.nick_name }}:</span>
                    </p>
                    <el-text :truncated="true"
                        style="color: gray;width:90%;">{{ atUserInfo.comment_content || atUserInfo.reply_content }}</el-text>
                </div>
                <input class="comment-input" v-model="comment_value" @click="atUser(isFocued ? atUserInfo : 0)"
                    type="textarea" ref="inputRef" placeholder="说点啥吧" />
                <div class="other">
                    <el-button text @click="likeSubmit({ id: id, method: 'post'})"><i
                            class="iconfont icon-like-true"
                            :class="{ 'red': likeStatus(post_id, 'post', likes) }"></i><span>{{ ledgerStore.ledgerInfo.article.post_likes_count }}</span></el-button>
                    <el-button text> <i class="iconfont icon-comment_light"></i><span>{{ ledgerStore.ledgerInfo.article.post_comments_count }}</span></el-button>
                    <el-button text> <i class="iconfont icon-shoucang-true"></i><span>13k</span></el-button>
                    <el-button text> <i class="iconfont icon-zhuanfa" /></el-button>
                </div>
                <div class="comment-btn">
                    <el-button type="primary" @click="commentSubmit"> 发送</el-button>
                    <el-button @click="cancel">返回</el-button>
                </div>
            </div>
        </div>
    </div>
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
    border-bottom: #96a1ac 1px solid;
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


                    .content {
                        padding-left: 10px;
                        flex-direction: column;
                        flex: 1;
                        display: flex;

                        .commment-auther {
                            color: #999;
                            //    margin: 0 0 5px 0;
                        }

                        .comment-text {
                            flex: 1;
                            margin: 5px 0 10px 0;
                        }



                        .comment-reply {
                            display: flex;
                            align-items: center;
                            font-size: 12px;
                            color: #999;

                        }

                        .reply-list {
                            flex: 2;
                            
                        }
                    }
                }
            }
            .reply-item {
                box-sizing: border-box;
                display: flex;
                padding-top: 5px;
                border-top: #99999904 1px solid;

                .content {
                    margin: 5px 0;
                }

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
