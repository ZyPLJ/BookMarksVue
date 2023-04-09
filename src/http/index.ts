//引入axios 之前需要在main.ts中引入
import axios from "axios"
import {ref} from 'vue'

const httpApi = ref("https://localhost:44362/api")

//查询所有书签
export const GetAllBook = (parms:{})=>{
    axios.defaults.headers['Content-Type'] = 'application/json'
    return axios({
        url:httpApi.value + "/GetBookmarks/GetPageList",
        method:'get',
        params:parms
    })
}

//初始化书签栏
export const GetBookmarks = (parms:{})=>{
    axios.defaults.headers['Content-Type'] = 'application/json'
    return axios.post(httpApi.value + "/GetBookmarks/BookMarks",parms);
}

//查询置顶书签 默认只能置顶12个书签 刚好一页
export const GetTopBookmarks = () =>{
    return axios({
        url:httpApi.value + "/TopBookmarks/GetAllTop",
        method:'get',
    })
}

//设置置顶
export const SetTopBookMark = (parms:{})=>{
    return axios({
        url:httpApi.value + "/TopBookmarks/SetTopBookMark/"+parms,
        method:'get',
    })
}

//取消置顶
export const CancelTopBookMark = (parms:{})=>{
    return axios({
        url:httpApi.value + "/TopBookmarks/CancelTopBookMark/"+parms,
        method:'delete',
    })
}

//获取书签分级
export const Getclassification = () =>{
    return axios({
        url:httpApi.value + '/GetClass/GetAllClass',
        method:'get'
    })
}

//获取书签总数
export const GetCount = ()=>{
    return axios({
        url:httpApi.value + "/GetBookmarks/GetCount/Count",
        method:'get'
    })
}

//添加菜单栏
export const addMenus = (parms:{}) =>{
    axios.defaults.headers['Content-Type'] = 'application/json'
    return axios.post(httpApi.value + '/GetMenu/addMenu',parms);
}

//查询菜单
export const GetMenus = () =>{
    return axios.get(httpApi.value + '/GetMenu/GetMenus')
}

//添加新的网站链接
export const AddNewBook = (parms:{})=>{
    axios.defaults.headers['Content-Type'] = 'application/json'
    return axios.post(httpApi.value + '/NewBookMark/AddNewBook',parms);
}

//查看新添加的网站链接
export const GetAllNewBook = (parms:{}) =>{
    return axios({
        url:httpApi.value + "/NewBookMark/GetNewBook/"+parms,
        method:'get',
    })
}

//删除新的网站链接
export const DelNewBook = (parms:{})=>{
    return axios({
        url:httpApi.value + "/NewBookMark/DelNewBook/"+parms,
        method:'delete',
    })
}

//删除菜单
export const DeleteMenus = (parms:{})=>{
    return axios({
        url:httpApi.value + "/GetMenu/DelMenu/"+parms,
        method:'delete',
    })
}
