import config from './config'

exports.BTFetch = (url,method,params)=>{
    url = config.base_url + config.version + url
    method.toUpperCase(); // 统一转换成大写
    let reqParams = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if(method=='GET'){
        let str = getFetchUrl(params);
        url += str;
    }else{
        reqParams.body = JSON.stringify(params);
    }
    return fetch(url, reqParams)
    .then(response => response.json())
    .catch(error=> console.error(error));
}

/**
 * 返回get请求的请求地址
 * @param params
 * @returns {string}
 */
const getFetchUrl = (params)=>{
    let str = '';
    if (typeof params === 'object' && params) {
        str += '?';
        for (let key in params) {
            str += key + '=' + params[key] + '&';
        }
    }
    return str;
}