const host = window.location.host
//* 如果想要在本地调试线上环境，手动取消下面这行代码的注释：
//const isProd = true;

//! 但一定要在推送代码/打包时改回到上面这行代码！


const baseUrl =  'http://localhost:8181' 

export default {
    baseUrl,
}