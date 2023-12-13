/**
 * 判断是否被点赞
 * @param {number} id 被判断对象id
 * @param {string} kind 背叛的类型 default: post, comment, reply
 * @param {object} obj 点赞对象集合
 * @returns {boolean}
 */
export const likeStatus = (id, kind, obj) => {
    switch (kind) {
        case 'post':
            return obj.postid.includes(id);
        case 'comment':
            return obj.commentid.includes(id);
        case 'reply':
            return obj.replyid.includes(id);
        default:
            return false;
    }
}

export const favoriteStatus = (post_id, obj) => {
    return obj.includes(post_id);
}