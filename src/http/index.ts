//引入axios 之前需要在main.ts中引入
import axios from "axios"
import {ref} from 'vue'

const httpApi = ref("http://101.43.25.210:9031/api")

//查询所有书签C

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