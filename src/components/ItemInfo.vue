<script setup >
import router from '@/router';
import { formatDate } from '@/utils/format';
import { imageSrc } from '@/utils/imageSrc'
const props = defineProps({
    item: {
        type: Object,
        retuired: true
    }
})
// console.log(props.item);
const image = imageSrc(props.item.post_image_url?.split('&')[0])
// console.log(props.item.post_image_url?.split('&'));
// console.log(image);
const post_id = props.item.post_id
// console.log(image);
</script>

<template>
    <div class="item">
        <div class="header" @click="router.push(`/detail/${post_id}`)">
            
            <div class="image" >
                <el-image :src="image" fit="cover" v-show="props.item.post_image_url"/>
            </div>
            <div class="decription">
                <el-text style="margin: 0 10px;" truncated>{{ item.post_title }}</el-text>
            </div>
        </div>
        <div class="footer">
            <el-text>
                {{ formatDate(item.post_created_time) }}
            </el-text>
            <el-dropdown trigger="click" size="small">
                <span>
                    <el-icon>
                        <MoreFilled />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>删除作品</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <el-icon class="zoom-in"  @click="router.push(`/detail/${post_id}`)"><zoom-in /></el-icon>
    </div>
</template>

<style lang='scss' scoped>
.item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 207px;
    width: 180px;
    border: #eee 1px solid;
    border-radius: 10px;
    margin: 20px;
    background: #fff;
    box-shadow: 0 0 10px #ccc;
    transition: 0.5s;
    .header{
        height: 90%;
    }
    .image {
        height: 80%;

        .el-image {
            border-radius: 10px 10px 0 0;
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
    }

    .footer {
        margin: 0 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .zoom-in {
        display: none;
    }

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 10px #00000075;
        position: relative;

        .zoom-in {
            display: inline-block;
            font-size: 50px;
            position: absolute;
            top: 50%;
            left: 50%;
            color: #cccccc49;
            transform: translate(-50%, -50%);

        }

    }
}</style>