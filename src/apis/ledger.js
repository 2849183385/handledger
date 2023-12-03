import request from '@/utils/request'

export function getLedgerList(params) {
  return request({
    url: '/ledger/list',
    method: 'get',
    params
  })
}

export function getLedgerDetail(params) {
  return request({
    url: '/ledger/detail',
    method: 'get',
    params
  })
}

export function pulishLedger(obj,user_id) {
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