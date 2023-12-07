<script setup>
import { ref, watch, onMounted } from 'vue'
import { useScroll } from '@vueuse/core'
import { useLedgerStore } from '@/stores/ledgerStore'
import { useUserStore } from '@/stores/userStore'
// import { formatDates } from '@/utils/format'
import { imageSrc } from '@/utils/imageSrc'
import { pulishCommentAPI, pulishReplyAPI, pulishLikeAPI, } from '@/apis/ledger'
// import { storeToRefs } from 'pinia'
//导入富文本编辑器
// import VueQuillEditor from 'vue-quill-editor';
// import 'quill/dist/quill.core.css';
// import 'quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css';
const ledgerStore = useLedgerStore()
const { userInfo: { user_id } } = useUserStore()
const id = 19
// const post_id = 19
// const comment_post_id = 19

//文章信息
const PostInfo = ref({})
const postAvatarUrl = ref(null)
const commentsArray = ref([])

onMounted(() => {
    // console.log(1);
    //     console.log(commentsArray.value)
})
//发送获取文章信息请求
ledgerStore.getLedger({ id }).then(() => {
    /*commentsArray赋值要在ledgerStore.getLedger之后，
     因为ledgerStore.getLedger进行了异步操作，在外面赋值会导致commentsArray的值不是最准确的值*/
    commentsArray.value = ledgerStore.ledgerInfo.commentsInfo
    // console.log(commentsArray.value)
})
// const {ledgerInfo} = storeToRefs(ledgerStore)

//将文章图片url分割成数组
PostInfo.value = { ...ledgerStore.ledgerInfo.postInfo[0] }
PostInfo.value.userInfo = ledgerStore.ledgerInfo.userInfo[0]
// PostInfo.value.postInfo= ledgerStore.ledger.postInfo[0]
PostInfo.value.post_image_url = ledgerStore.ledgerInfo.postInfo[0].post_image_url.split('&').map(item => {
    return imageSrc(item)
})
postAvatarUrl.value = imageSrc(ledgerStore.ledgerInfo.userInfo[0].user_pic)


const inputRef = ref(null)
const contentBox = ref(null)
const { y } = useScroll(contentBox)
// watch(y, (val) => {
//     console.log(val)
//     console.log(ledgerStore.ledger.value)
//     console.log(commentsArray.value)
// })
//@功能样式
const atUserInfo = ref({})
const isFocued = ref(0)
const atUser = (obj) => {
    atUserInfo.value = obj
    isFocued.value = 1
    inputRef.value.focus()
}
const comment_value = ref('')
//评论
const commentSubmit = () => {
    // 发送评论
    if (atUserInfo.value != 0) {
        pulishReplyAPI({
            user_id,
            content: comment_value.value,
            comment_id: atUserInfo.value.reply_comment_id ? atUserInfo.value.reply_comment_id : atUserInfo.value.comment_id,
            reply_user_id: atUserInfo.value.reply_user_id
        })
        //发送回复
    } else {
        pulishCommentAPI(
            comment_value.value,
            id,
            user_id,
            atUserInfo.value
        )
    }
    // if (atUserInfo.value!==null) {
    // console.log(atUserInfo.value)
    // }
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
const toggleShow = ((id) => {
    return expended.value[id]
})

//获取回复
const getReply = async (items) => {
    // showMore.value =!showMore.value
    //是否显示评论数据，如果存在则赋值为false，否则true
    expended.value[items.comment_id] = expended.value[items.comment_id] ? false : true
    loading.value = true
        ledgerStore.getReply({ id: items.comment_id }).then(() => {
            loading.value = false
        })
} 

//点赞
// const likeSubmit = (obj) => {
//     console.log(obj)
//     pulishLikeAPI({
//         obj

//     })
// }

</script>

<template>
    <div class="card">
        <div class="left" ref="left">
            <div class="img-box">
                <el-carousel :interval="4000">
                    <el-carousel-item height="" v-for="item in PostInfo.post_image_url" :key="item">
                        <el-image ref="imageRef" :src="item" fit="scale-down" />
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>

        <div class="right">
            <div class="nav-box" :class="{ 'border': y > 70 }">
                <div class="user-info">
                    <el-avatar :size="50" :src="postAvatarUrl"></el-avatar>
                    <span style="margin-left: 10px; font-size: 16px;">{{ PostInfo.userInfo.nick_name }}</span>
                </div>
                <el-button type="primary">关注</el-button>
            </div>
            <div class="content-box">
                <div class="main-content">
                    <div class="title">{{ PostInfo.post_title }}</div>
                    <el-text>{{ PostInfo.post_content }}</el-text>
                    <!-- <el-text>target</el-text> -->
                    <div class="time">{{ PostInfo.post_time }}</div>
                </div>
                <el-divider />
                <div class="comment-box">
                    <div class="total">
                        <p>共<span>123</span>条评论</p>
                    </div>
                    <div class="comment-list" v-loading="loading" >
                        <!-- 评论组件 -->
                        <div class="comment" v-for="items in commentsArray" :key="items.comment_id">
                            <el-avatar :size="35" :src="items.user_pic"></el-avatar>
                            <div class="content" >
                                <div class="commment-auther">{{ items.nick_name }}</div>
                                <div class="comment-text">{{ items.comment_content }}</div>
                                <div class="time">{{ items.comment_time }}</div>
                                <div class="comment-reply">
                                    <el-button text @click="likeSubmit({ comment_id: items.comment_id })">
                                        <i style="color: red;" class="iconfont icon-like-true" />
                                        <span>{{ items.comment_likes_count }}</span>
                                    </el-button>
                                    <el-button text @click="atUser(items)"> <i class="iconfont icon-comment_light" />
                                        <span>{{ items.reply_count }}</span>
                                    </el-button>
                                </div>
                                <!-- 回复数据组件 -->
                                <div class="show-more"  v-show="!items.replies && !toggleShow(items.comment_id)">
                                    <!-- -->
                                    <el-button text @click="getReply(items)" >
                                        {{ (items.replies && toggleShow(items.comment_id)) ? '收起' : '加载更多' }}</el-button>
                                </div>
                                <div class="reply-comment"  v-show="items.replies && toggleShow(items.comment_id)">
                                    <div class="reply-list" v-for="item in items.replies" :key="item.reply_id">
                                        <el-avatar :size="25" :src="item.user_pic"></el-avatar>
                                        <div class="content">
                                            <div class="commment-auther">{{ item.nick_name }}</div>
                                            <div class="comment-text">
                                                <span v-show="item.replied_user_nick_name !== null">
                                                    回复 {{ item.replied_user_nick_name }}：
                                                </span> {{ item.reply_content }}
                                            </div>
                                            <div class="time">{{ item.reply_time }}</div>
                                            <div class="comment-reply">
                                                <el-button text @click="likeSubmit({ reply_id: item.reply_id })">
                                                    <i
                                                        class="iconfont icon-like-false" /><span>{{ item.reply_likes_count }}</span></el-button>
                                                <el-button @click="atUser(item)" text> <i
                                                        class="iconfont icon-comment_light" /></el-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="{ 'footer-blur': !isFocued, 'footer-focus': isFocued }">
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
                    <el-button text @click="likeSubmit({ post_id: PostInfo.post_id })"><i
                            class="iconfont icon-like-true"></i><span>13k</span></el-button>
                    <el-button text> <i class="iconfont icon-comment_light"></i><span>13k</span></el-button>
                    <el-button text> <i class="iconfont icon-shoucang-true"></i><span>13k</span></el-button>
                    <el-button text> <i class="iconfont icon-zhuanfa" /></el-button>
                </div>
                <div class="comment-btn">
                    <el-button type="primary" @click="commentSubmit"> 发送</el-button>
                    <el-button @click="isFocued = 0">返回</el-button>
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

                        .reply-comment {
                            margin: 10px 0;
                            flex: 2;
                            padding: 8px;
                        }
                    }
                }
            }

            .reply-list {
                display: flex;

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
