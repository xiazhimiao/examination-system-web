import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token.js'



//试卷分类列表查询
export const textCategoryListService = ()=>{
    //const tokenStore = useTokenStore();
    //在pinia中定义的响应式数据,都不需要.value
    //return request.get('/category',{headers:{'Authorization':tokenStore.token}})
    return request.get('/text/category')
}


//试卷列表查询
export const textListService = (category)=>{
    //const tokenStore = useTokenStore();
    //在pinia中定义的响应式数据,都不需要.value
    //return request.get('/category',{headers:{'Authorization':tokenStore.token}})
    return request.post('/text',category, {
        headers: {
            'Content-Type': 'application/json'}
        });
}


//试卷查询
export const textService = (name)=>{
    return request.post('/text/name',{name:name}, {
        headers: {
            'Content-Type': 'application/json'}
        });
}

//上传用户考试答案
export const textUploadService = (rsp)=>{
    return request.post('/text/Upload',rsp, {
        headers: {
            'Content-Type': 'application/json'}
        });
}


//查询用户考试成绩
export const textGradeListService = (id)=>{
    return request.get('/text/Grade/'+id)
}



//文章分类添加
export const articleCategoryAddService = (categoryData)=>{
    return request.post('/category',categoryData)
}

//文章分类修改
export const articleCategoryUpdateService = (categoryData)=>{
   return  request.put('/category',categoryData)
}

//文章分类删除
export const articleCategoryDeleteService = (id)=>{
    return request.delete('/category?id='+id)
}

//文章列表查询
export const articleListService = (params)=>{
   return  request.get('/article',{params:params})
}

//文章添加
export const articleAddService = (articleData)=>{
    return request.post('/article',articleData);

}