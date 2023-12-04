<script setup>
import { ref, watch} from 'vue'
import { useScroll } from '@vueuse/core'
import { useLedgerStore } from '@/stores/ledger'
import { useUserStore } from '@/stores/userStore'
// import { formatDates } from '@/utils/format'
import { imageSrc } from '@/utils/imageSrc'
import { pulishCommentAPI,} from '@/apis/ledger'
// import { storeToRefs } from 'pinia';
const ledgerStore = useLedgerStore()
const userStore = useUserStore()
const { userInfo: { user_id } } = userStore
const id = 19
// const post_id = 19
// const comment_post_id = 19

//文章信息
// const PostInfo = ref({})
const postImgUrl = ref([])
const postAvatarUrl = ref(null)
const commentsArray = ref([])

 //发送获取文章信息请求
ledgerStore.getLedger({ id })

// PostInfo.value = ledgerStore.ledger
//将文章图片url分割成数组
postImgUrl.value = ledgerStore.ledger.ledgerInfo[0].post_image_url.split('&').map(item => {
    return imageSrc(item)
})

 postAvatarUrl.value = imageSrc(ledgerStore.ledger.userInfo[0].user_pic)

const isCommentting = ref(false)
const inputRef = ref(null)
const contentBox = ref(null)
const { y } = useScroll(contentBox)
watch(y, (val) => {
    console.log(val)
    console.log(ledgerStore.ledger.value)
    console.log(commentsArray.value)
})

// const isFocued=ref(false)
// const isFocus = (value) => {
//     isFocued.value = value
//     inputRef.value.focus()
// }
// const isFocus = (value) => {
//     isCommentting.value = true
//     inputRef.value.focus()
//     console.log(value)
// }
// const likes = ref(1)

const comment_value = ref('')
//评论
const commentSubmit = () => {
    pulishCommentAPI(
        comment_value.value,
        id,
        user_id,
    )
}
// //获取评论
// const getComment = () => {
//     ledgerStore.getComment({ post_id })
// }

</script>

<template>
    <div class="card">
        <div class="left" ref="left">
            <div class="img-box">
                <el-carousel :interval="4000">
                    <el-carousel-item height="" v-for="item in postImgUrl" :key="item">
                        <el-image ref="imageRef" :src="item" fit="scale-down" />
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>

        <div class="right">
            <div class="nav-box" :class="{ 'border': y > 70 }">
                <div class="user-info">
                    <el-avatar :size="35" :src="postAvatarUrl"></el-avatar>
                    <span style="margin-left: 10px; font-size: 16px;">{{ ledgerStore.ledger.userInfo[0].nick_name }}</span>
                </div>
                <el-button>关注</el-button>
            </div>
            <div class="content-box" ref="contentBox">
                <div class="main-content">
                    <h4>{{ ledgerStore.ledger.ledgerInfo[0].post_title }}</h4>
                    <el-text>{{ ledgerStore.ledger.ledgerInfo[0].post_content }}</el-text>
                    <el-text>target</el-text>
                    <el-text>{{ ledgerStore.ledger.ledgerInfo[0].post_time }}</el-text>
                </div>
                <el-divider />
                <div class="comment">
                    <div class="total">
                        <el-text>共<span>123</span>条评论</el-text>
                    </div>
                    <div class="comment-list">
                       <!-- <div class="comment" v-for="items in commentsArray" :key="items.comment_id">
                            <el-avatar :src=items.user_pic></el-avatar>
                            <div class="content">
                                <div class="commment-auther">{{ item.nick_name }}</div>
                                <div class="comment-text">{{ item.comment_content }}</div>
                                <div class="comment-time">2{{ item.comment_time }} 广东</div>
                                <div class="comment-reply">
                                    <el-button text><i style="color: red;"
                                            class="iconfont icon-like-true"></i><span>13k</span></el-button>
                                    <el-button text @click="isFocus"> <i
                                            class="iconfont icon-comment_light"></i><span>13k</span></el-button>
                                </div>

                            </div>
                            <div class="reply-comment">
                                <div class="comment" v-for="item in items" :key="item.reply_id">
                                    <el-avatar :size="30"
                                        src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"></el-avatar>
                                    <div class="content">
                                        <div class="commment-auther">王小虎</div>
                                        <div class="comment-text">这是一条评论的内容。这是一条评论的内容。这是一条评论的内容。这是一条评论的内容。这是一条评论的内容。
                                        </div>
                                        <div class="comment-time">2021-01-01 12:12 广东</div>
                                        <div class="comment-reply">
                                            <el-button text><i
                                                    class="iconfont icon-like-false"></i><span>13k</span></el-button>
                                            <el-button text @click="isFocus"> <i
                                                    class="iconfont icon-comment_light"></i><span>13k</span></el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div> 
                </div>
            </div>
            <div class="footer" v-if="!isCommentting">
                <el-input ref="inputRef" placeholder="说点啥吧"></el-input>
                <div class="other">
                    <el-button text><i class="iconfont icon-like-true"></i><span>13k</span></el-button>
                    <el-button text> <i class="iconfont icon-comment_light"></i><span>13k</span></el-button>
                    <el-button text> <i class="iconfont icon-shoucang-true"></i><span>13k</span></el-button>
                    <el-button text> <i class="iconfont icon-zhuanfa" /></el-button>
                </div>
            </div>
            <div class="footer-fcous" v-else>
                <el-input :rows="1" resize='none' v-model="comment_value" type="textarea" @blur="isCommentting = fasle"
                    ref="inputRef" placeholder="说点啥吧"></el-input>
                <div class="other">
                    <el-button type="primary" @click="commentSubmit"> 发送</el-button>
                    <el-button @click="isCommentting = fasle">返回</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.red {
    color: red;
}

.border {
    border-bottom: #96a1ac49 1px solid;
}

.el-divider {
    margin: 0 auto;
    width: 92%;
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

        .el-button {
            border-radius: 10px;
        }
    }

    .content-box {
        overflow-y: auto;
        flex: 1;
        padding: 0 16px 16px;
        display: flex;
        flex-direction: column;

        .main-content {
            flex: 2;
            display: flex;
            flex-direction: column;

        }

        .comment {
            flex: 8;
            padding: 0 16px;

            .total {
                display: flex;
                align-items: center;
                padding: 0 16px;

                span {
                    margin-left: 10px;
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
                            font-size: 15px;
                            color: #999;
                            margin: 0 0 5px 0;
                        }

                        .comment-text {
                            flex: 1;
                        }

                        .comment-time {
                            margin: 5px 0;
                            font-size: 12px;
                            color: #999;
                        }

                        .comment-reply {
                            display: flex;
                            align-items: center;
                            font-size: 12px;
                            color: #999;

                            .el-button {
                                margin: 0px;

                                span {
                                    font-size: 15px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }



    .footer {
        border-top: #96a1ac49 1px solid;
        border-radius: 0 0 10px 10px;
        padding: 16px;
        display: flex;
        width: 100%;
        background-color: #fff;
        height: 70px;
        align-items: center;

        .el-input {
            flex: 6;
        }

        .other {
            flex: 2;
            display: flex;
            justify-content: space-around;
        }

        .el-button {
            margin: 0 5px;
            font-size: 1em;
            flex: 1;
            padding: 15px 5px;
        }
    }

    .footer-fcous {
        border-top: #96a1ac49 1px solid;
        border-radius: 0 0 20px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px 16px 0;

        .el-input {

            overflow: hidden;
            border-radius: 20px;
            background-color: #444343;
            flex: 3;
            width: 90%;
            margin: 5px 15px;
        }

        .el-button {
            margin: 5px 15px;

        }

        .other {
            flex: 5;
            display: flex;
            justify-content: space-around;
        }
    }
}

.right::-webkit-scrollbar {
    width: 10px;
}
</style>
