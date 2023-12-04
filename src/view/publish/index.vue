<script setup >
import ImageCompressor from 'image-compressor.js'
import ElMessage from 'element-plus'
import { ref, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { pulishLedgerAPI } from '@/apis/ledger'
import { useUserStore } from '@/stores/userStore'
// import { imgZip } from '@/utils/imageSrc'
const userStore = useUserStore()
const { userInfo: { user_id } } = userStore
const fileList = ref([])
// const imgUrl = ref('')
watch(fileList, async () => {
    console.log('fileList', fileList.value)
    console.log('fileList', fileList.value[0])
    // 把添加的图片压缩，转换成base64格式，然后赋值给form表单
    fileList.value.forEach(async (item) => {
        await new ImageCompressor(item.raw, {
            quality: 0.6, // 压缩质量，0-1之间
            maxWidth: 400, // 图片最大宽度
            maxHeight: 400, // 图片最大高度
            success(result) {
                const reader = new FileReader()
                reader.readAsDataURL(result);
                reader.onload = async () => {
                    form.value.image_url.push(reader.result)
                }
            }
        })
    })
})
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
//放大图片
const handlePictureCardPreview = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}
const handleRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const form = ref({
    title: '',
    content: '',
    image_url: [],
    permission: 0
})
const onSubmit = () => {
    console.log(form.value)
    //将数组转化为字符串，发送给后端
    form.value.image_url=form.value.image_url.join('&')
    pulishLedgerAPI(form.value, user_id).then(() => {
       ElMessage.success('发布成功')
    })
}
</script>

<template>
    <div class="container">

        <div class="card">
            <h3>发布图文</h3>
            <div class="card-image">
                <!-- file-list / v-model:file-lists是默认上传文件列表 -->
                <el-upload v-model:file-list="fileList" :multiple="true" accept="image/*" list-type="picture-card"
                    :auto-upload="false" :before-upload="beforeUpload" :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </div>
            <el-form v-model="form" ref="formRef">
                <el-form-item>
                    <el-input type="textarea" resize="none" rows="1" placeholder="填写标题" :show-word-limit="true"
                        v-model="form.title" :maxlength="20"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="textarea" v-model="form.content" resize="none" rows="4" :maxlength="200"
                        placeholder="填写更全面的描述信息，让更多的人看到你吧！" :show-word-limit="true"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: 20px;" label="权限设置">
                    <el-radio-group v-model="form.permission">
                        <el-radio :label='0'>公开</el-radio>
                        <el-radio :label='1'>私密</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">发布</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang='scss' scoped>
h3 {
    margin: 20px 0;
}

.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    padding: 20px;
    margin: 50px 0;
    width: 800px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px #ccc;

    .card-image {
        padding: 20px;
        border-radius: 10px;
        border: 1px dotted #ccc;
        margin: 20px 20px;
    }

    .el-form {
        padding: 10px 20px 10px;

        .el-input {
            border-radius: 10px;
            box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
            caret-color: #1da1f2;
        }

        .el-button {
            border-radius: 10px;
            width: 110px;
            height: 40px;
            font-size: 16px;
        }
    }
}
</style>