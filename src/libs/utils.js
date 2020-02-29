/**
 * 创建菜单
 * @returns {[{path: string, code: number, name: string, text: string}, {path: string, code: number, name: string, text: string}]}
 */
import { ls } from '@/libs/tools'

export const createMenuList = () => [{
  code: 10001,
  name: 'resume',
  path: '/resume',
  text: '简历'
}, {
  code: 10002,
  name: 'drip',
  path: '/drip',
  text: '点滴'
}, {
  code: 10003,
  name: 'messageBoard',
  path: '/messageBoard',
  text: '留言板'
}]
/**
 * 创建评论列表
 * @param list
 * @returns {[]}
 */
export const createCommentList = (list = []) => {
  const newCommentList = []
  const waitPushComment = {}
  const commentChildrenObj = {}
  let comment = {}

  list.forEach(insideComment => {
    comment = {
      id: insideComment.id,
      user: insideComment.user,
      userName: insideComment.userName,
      userEmail: insideComment.userEmail,
      createdOn: insideComment.createdOn,
      count: insideComment.count,
      content: insideComment.content,
      pid: insideComment.pid,
      children: []
    }

    if (waitPushComment[insideComment.id]) {
      comment.children.push(...waitPushComment[insideComment.id].map(waitComment => {
        return {
          ...waitComment,
          parent: waitComment
        }
      }))

      delete waitPushComment[insideComment.id]
    }
    if (!commentChildrenObj[insideComment.id]) {
      if (!insideComment.pid) {
        newCommentList.push(comment)
      } else if (commentChildrenObj[insideComment.pid]) {
        comment.parent = commentChildrenObj[insideComment.pid]
        commentChildrenObj[insideComment.pid].push(comment)
      } else {
        if (waitPushComment[insideComment.pid]) {
          waitPushComment[insideComment.pid].push(comment)
        } else {
          waitPushComment[insideComment.pid] = [comment]
        }
      }

      commentChildrenObj[insideComment.id] = comment.children
    }
  })

  return {
    commentList: newCommentList,
    commentChildrenObj
  }
}
/**
 * 获取天数
 * @param time
 * @returns {number}
 */
export const getDays = (time) => {
  const date = new Date()

  if (new Date(time).format('yyyy-MM-dd') === date.format('yyyy-MM-dd')) {
    return '小于1天'
  } else {
    return Math.ceil((date.getTime() - time) / 24 / 60 / 60 / 1000) + '天前'
  }
}
/**
 * token操作
 * @type {{set(*=): void, get(*): void}}
 */
export const token = {
  set (token) {
    ls.set('token', `Bearer ${token}`, 'string')
  },
  get () {
    return ls.get('token', 'string') || ''
  },
  clear () {
    ls.clear('token')
  }
}
