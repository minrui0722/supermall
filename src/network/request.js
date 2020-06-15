import axios from 'axios'

export function request(config) {
  //1.创建axios实例
  const instance=axios.create({
    baseURL:'http://123.207.32.32:8000/api/m3',
    timeout:5000
  })
  //2.拦截器
  /*2.1.请求拦截器*/
  instance.interceptors.request.use(config=>{

    return config;
  },err=>{
    console.log(err);
  })
  /*2.2.响应拦截器*/
  instance.interceptors.response.use(res=>{
    return res.data;
  },err => {
    console.log(err);
  })
  //3.发送真正的网络请求
  return instance(config);//直接返回的就是一个Promise对象


}