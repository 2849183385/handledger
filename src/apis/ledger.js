import request from '@/utils/request'

//获取文章列表
export function getLedgerListAPI() {
  return request({
    url: '/ledger/list',
    method: 'get',

  })
}

//获取文章详情
export function getLedgerAPI(id) {
  return request({
    url: '/ledger/getLedger',
    method: 'get',
    params: {
      id
    }
  })
}
//发布文章
export function pulishLedgerAPI(obj, user_id) {
  return request({
    url: '/ledger/publishLedger',
    method: 'post',
    data: {
      title: obj.title,
      content: obj.content,
      image_url: obj.image_url,
      user_id,
    }
  })
}

//发表评论
export function pulishCommentAPI(content, post_id, user_id) {
  return request({
    url: '/ledger/publishComment',
    method: 'post',
    data: {
      content,
      post_id,
      user_id,
    }
  })
}
//获取评论列表
export function getCommentAPI(id,limit,offset) {
  return request({
    url: '/ledger/getComments',
    method: 'get',
    params: {
      id,limit,offset
    }
  })
}
export function getLatestCommentAPI(post_id) {
  return request({
    url: '/ledger/getLatestComment',
    method: 'get',
    params: {
      post_id
    }
  })
}

//发表回复
export function pulishReplyAPI({ user_id, content,post_id, comment_id, reply_user_id }) {
  return request({
    url: '/ledger/publishReply',
    method: 'post',
    data: {
      user_id,
      content,
      post_id,
      comment_id,
      reply_user_id
    }
  })
}
//获取回复
export function getReplyAPI(id, limit, offset) {
  return request({
    url: '/ledger/getReply',
    method: 'get',
    params: {
      id,
      limit,
      offset
    }
  })
}
export function getLatestReplyAPI(comment_id) {
  return request({
    url: '/ledger/getLatestReply',
    method: 'get',
    params: {
      comment_id
    }
  })
}


//点赞
export function pulishLikeAPI(user_id, id, method) {
  return request({
    url: '/ledger/publishLike',
    method: 'post',
    data: {
      user_id, id, method
    }
  })
}
//取消点赞
export function cancelLikeAPI(user_id, id, method) {
  return request({
    url: '/ledger/cancelLikes',
    method: 'post',
    data: {
      user_id, id, method
    }
  })
}

//获取点赞 
export function getLikeAPI(id, method) {
  return request({
    url: '/ledger/getLike',
    method: 'get',
    params: {
      id,
     method
    }
  })
}

//删除评论
export function deleteCommentAPI(comment_id,method,reply_id) {
  return request({
    url: '/ledger/deleteComment',
    method: 'post',
    data: {
     comment_id, method, reply_id
    }
  })
}

//收藏
export function publishFavoriteAPI(user_id, post_id) {
  return request({
    url: '/ledger/publishFavorite',
    method: 'post',
    data: {
      user_id, post_id, 
    }
  })
}

//取消收藏
export function cancelFavoriteAPI(user_id, post_id) {
  return request({
    url: '/ledger/cancelFavorite',
    method: 'post',
    data: {
      user_id, post_id, 
    }
  })
}

//获取收藏
// export function getFavoriteAPI(post_id) {
//   return request({
//     url: '/ledger/getFavorite',
//     method: 'get',
//     params: {
//       post_id
//     }
//   })
// }