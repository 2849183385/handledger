

//导出头像 将base64转为blob再转为URL
export const avatarSrc = (user_pic) => {
    //筛选出userInfo 中 user_id=user_id 的数据
    const base64Data = user_pic
    const byteCharacters = atob(base64Data.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    // 创建URL并将Blob转换为URL
    return URL.createObjectURL(blob);
    // 现在imageUrl包含了原始图片的URL，您可以将其赋值给img标签的src属性来显示图片
}