import { post } from '@/libs/axios'
import { token } from '@/libs/utils'
// 检测用户是否存在
export const checkUser = (params = {}) => post('/Login/checkUser', params)
// 发布留言
export const comment = (params = {}) => post('/Comment/comment', params, { common: { Authorization: token.get() } })
// 查询留言
export const loadComment = (params = {}) => post('/Comment/loadComment', params)
// 删除留言
export const delComment = (params = {}) => post('/Comment/delComment', params)
