<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia';
import { imageSrc } from '@/utils/imageSrc'
import router from '@/router';
const imgUrl = ref(null)
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
imgUrl.value = imageSrc(userInfo.value.user_pic)
const props=defineProps({
    item: {
        type: Object,
        required: true
    }
})
console.log(props.item);
const image = imageSrc(props.item.post_image_url?.split('&')[0])
// document.querySelector('.background').style.backgroundImage = ` background-image: linear-gradient(rgba(255, 255, 255, 0.4) 0%,
//                     rgba(255, 255, 255, 0.7) 20%,
//                     rgba(255, 255, 255, 1) 60%,
//                     rgba(255, 255, 255, 1) 100%),
//                     url(${image})`;
const post_id = props.item.post_id
console.log(image);
console.log(post_id);
</script>

<template>
    <div class="content">
        <div class="card">
            <div class="show-wrapper">
                <div class="pic-wrapper">
                    <img :src="image" style="display: flex;width: 100%;height: 100%;">
                </div>
                <div class="show-info">
                    <h4 class="title">
                        chan
                    </h4>
                    <div class="show-info-item">
                        <div class="watch">
                            <i class="iconfont icon-view"></i>
                            <span>14k</span>
                        </div>
                        <div class="like">
                            <i class="iconfont icon-like"></i><span>13k</span>
                        </div>
                        <div class="remark">
                            <i class="iconfont icon-comment_light"></i>
                            <span>13k</span>
                        </div>

                    </div>
                    <div class="creator-info">
                        <div class="creator-name ">
                            <el-avatar :size="35" :src="imgUrl"></el-avatar>
                            <span style="margin-left: 10px; font-size: 16px;">chan</span>
                        </div>
                        <span class="creator-time">
                            6小时前
                        </span>
                    </div>
                </div>

            </div>
            <div class="hover-wrapper">
                <div class="desc">
                    <el-text :truncated="true" :max-rows="3" >lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Aperiam, asperiores atque delectus dolorum eaque enim error expedita fugit hic
                        impedit incidunt ipsam iure, iusto maxime natus nemo quae quasi quidem quo rem repellat sapiente
                        similique sunt tempora ullam ut voluptatem.</el-text>
                </div>
                <el-button @click="router.push(`/detail/${post_id}`)" class="btn">前往</el-button>
            </div>

            <div class="background" >
                <el-image :src="image" fit="cover" style="border-radius:  20px,20px 0 0;"/>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.content {

    position: absolute;

    .card {
        position: relative;

        .show-wrapper {
            z-index: 10;
            transition: 0.4s;

            .pic-wrapper {
                overflow: hidden;
                border-radius: 20px 20px 0 0;
                width: 270px;
                height: 300px;
                transition: 0.4s;

            }


            .show-info {

                display: flex;
                flex-direction: column;

                color: #cccccc;
                border-radius: 0 0 20px 20px;
                background-color: #fff;

                .show-info-item {
                    font-size: 16px;
                    display: flex;
                    line-height: 35px;
                    justify-content: space-around;

                    .watch {
                        margin-right: 10px;
                    }

                    .like {
                        margin-right: 10px;
                    }

                    .remark {
                        margin-right: 10px;
                    }
                }

                .title {
                    margin: 5px 0;
                    font-size: 16px;
                }

                .creator-info {
                    border-top: #cccccc 1px dotted;
                    padding: 5px 15px;
                    border-radius: 0 0 20px 20px;
                    height: 50px;
                    line-height: 39px;
                    display: flex;
                    justify-content: space-between;

                    .creator-name {
                        display: flex;
                    }
                }
            }


        }

        .hover-wrapper {
            display: none;
            position: relative;
            flex-direction: column;
            align-items: center;
            opacity: 1;
            transition: 0.5s;

            .btn {
                width: 90%;
                height: 40px;
                margin: 2vh 0;
                border-radius: 50px;
                background-color: rgb(67, 119, 216);
                border: 0;
                font-size: 2vw;
                cursor: pointer;
                color: #fff;
            }
        }

        .background {
            border-radius: 20px;
            background-color: #fff;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 20px;
            z-index: -1;
            transition: 0.5s;
            transform: scale(0.2, 0.9);
            opacity: 0;
            height: 80%;
            box-shadow: 0px 10px 32px 1px rgb(221, 219, 219);
            background-image: linear-gradient(rgba(255, 255, 255, 0.4) 0%,
                    rgba(255, 255, 255, 0.7) 20%,
                    rgba(255, 255, 255, 1) 60%,
                    rgba(255, 255, 255, 1) 100%);
            background-size: cover;
            background-repeat: no-repeat;
            background-position: top;
        }

        &:hover {
            .show-wrapper {
                transform: translateY(-25%);

                .pic-wrapper {
                    transform: scale(0.8);
                }

                .title {
                    animation: nameAmt 0.5s ease-in-out forwards;
                }

                .show-info {
                    opacity: 0;
                }
            }

            .hover-wrapper {
                animation: hoverWrapperAmt 0.5s ease-in-out forwards;
                display: flex;
                transform: translateY(-100%);

                .desc {
                    width: 200px;
                    margin: 5px 25px;
                    height: 40px;
                }
            }

            .background {
                opacity: 1;
                transform: scale(1.1);
            }
        }
    }
}

@keyframes nameAmt {
    0% {
        opacity: 0;
        text-align: center;
    }

    100% {
        opacity: 1;
        text-align: center;
        transform: translateY(-55%);
    }
}

@keyframes hoverWrapperAmt {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}</style>