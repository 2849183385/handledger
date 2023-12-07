import request from '@/utils/request'

//获取文章列表
export function getLedgerListAPI() {
  return request({
    url: '/ledger/list',
    method: 'get',
    
  })
}

//获取文章详情
export function getLedgerAPI({id}) {
  return request({
    url: '/ledger/getLedger',
    method: 'get',
    params: {
      id,
    }
  })
}
//发布文章
export function pulishLedgerAPI(obj,user_id) {
    return request({
      url: '/ledger/publishLedger',
        method: 'post',
      data: {
          title:obj.title,
          content:obj.content,
          image_url:obj.image_url,
          user_id,
      }
  })
}

//发表评论
export function pulishCommentAPI(content,post_id,user_id) {
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
//获取评论
export function getCommentAPI({id}) {
    return request({
      url: '/ledger/getComments',
      method: 'get',
      params: {
       id,
      }
  })
}

//获取回复
export function getReplyAPI({id}) {
    return request({
      url: '/ledger/getReply',
      method: 'get',
      params: {
       id
      }
  })
}

//发表回复
export function pulishReplyAPI({ user_id, content, comment_id, reply_user_id}) {
    return request({
      url: '/ledger/publishReply',
      method: 'post',
      data: {
        user_id,
        content,
        comment_id,
        reply_user_id
      }
  })
}

//点赞
export function pulishLikeAPI(obj) {
    return request({
      url: '/ledger/publishLike',
      method: 'post',
      data: {
       obj
      }
  })
}