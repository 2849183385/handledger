import ImageCompressor from 'image-compressor.js'


//导出头像 将base64转为blob再转为URL
export const imageSrc =(user_pic) => {
    //如果传入的数据类型不是base64型则返回false
    try {
        //假设 user_pic 是一个包含图片数据的 base64 字符串。
        const base64Data = user_pic
        // 使用 atob 函数将 base64 字符串解码为原始的二进制数据。
        const byteCharacters = atob(base64Data.split(',')[1]);
        // 创建一个与解码后的二进制数据长度相同的数组。
        const byteNumbers = new Array(byteCharacters.length);
        //  遍历解码后的二进制数据，将每个字符的 Unicode 编码值存储到数组中，得到一组表示二进制数据的数字。
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        // 将存储了二进制数据的数组转换为一个 Uint8Array 类型的数组，用于表示二进制数据。
        const uint8Array = new Uint8Array(byteNumbers);
        // 使用 Blob 构造函数将 Uint8Array 类型的数组转换为 Blob 对象，并指定 MIME 类型为 image/jpeg。
        const blob = new Blob([uint8Array], { type: 'image/jpeg' });
        // 使用 URL.createObjectURL 方法将 Blob 对象转换为一个 URL，该 URL 可以用于在页面上展示图片或者上传图片。
        return URL.createObjectURL(blob);
        // 现在imageUrl包含了原始图片的URL，您可以将其赋值给img标签的src属性来显示图片
    } catch (error) {
        return false; // 解码失败，返回false
    }
}

/**
 * 压缩图片，并转为data url
 * @param {Object} img 图片对象
 * return {String} data url
 */
export const imgZip = async (img) => {
  const dataUrl = await new ImageCompressor(img.raw, {
        quality: 0.2, // 压缩质量，0-1之间
        maxWidth: 200, // 图片最大宽度
        maxHeight: 200, // 图片最大高度
       success(result) { 
            const reader = new FileReader()
            reader.readAsDataURL(result);
            reader.onload =async () => {
               return  reader.result
            }
        }
  })
    return dataUrl
}