import { post } from '@/libs/axios'
// 分页查询
export const loadArticleData = (params = {}) => post('/Article/queryPage', params)
// 根据id查询文章
export const loadArticleById = (params = {}) => post('/Article/loadArticleById', params)
