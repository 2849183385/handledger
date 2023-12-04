import { ref } from 'vue';
import { imageSrc } from '@/utils/imageSrc';
import { getReplyAPI } from '@/apis/ledger';
import { ledgerStore, PostInfo, postImgUrl, postAvatarUrl, commentsArray } from './index.vue';

//发送获取文章信息请求
ledgerStore.getLedger({ id }).then(async () => {
const imgArray = ref([]);
PostInfo.value = ledgerStore.ledger;
//将文章图片url分割成数组
imgArray.value = PostInfo.value.ledgerInfo[0].post_image_url.split('&');
console.log(imgArray.value);
//转换文章图片数据格式为图片地址
postImgUrl.value = imgArray.value.map(item => {
return imageSrc(item);
});
console.log(postImgUrl.value);
postAvatarUrl.value = imageSrc(PostInfo.value.userInfo[0].user_pic);
//将请求到的评论数据里面的user_pic转换成图片格式
commentsArray.value = ledgerStore.ledger.commentsInfo.map(async (item) => {
const id = item.comment_id;
const res = await getReplyAPI({ id });
//如果有回复数据，则将数据中的头像转换为图片地址
if (res.data.data.length > 0) {
// console.log(res.data.data)
item.replyInfo = res.data.data.map(item => {
item.user_pic = imageSrc(item.user_pic);
return item;
});
} else {
item.replyInfo = res.data.data;
}
item.user_pic = imageSrc(item.user_pic);
return item;
});
});
