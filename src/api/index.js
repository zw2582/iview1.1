/**
 * http://usejsdoc.org/
 */
import axios from 'axios'
import router from '../router'

let base='http://dev.backend.weiec.com';

axios.defaults.withCredentials = true;

//请求拦截器
axios.interceptors.request.use(
	config=>{
		if(config.method === 'post') {
/*		    config.data = JSON.stringify(config.data);
		    config.headers = {
					'Content-Type':'application/x-www-form-urlencode'
			}*/
		}
		return config;
	}
);

//添加相应拦截器
axios.interceptors.response.use(function(response){
	console.log(response);
	if (response.data.status == 2) {
		router.push('/login')
	}
	return response;
}, function(error){
	console.log("error:"+error);
	return Promise.reject(error.response.data);
})

export const POST = (url, params) => {
	return axios.post(base+url, params).then(res=>res.data)
}

export const GET=(url,params)=>{
	console.log('request url:'+base+url);
	return axios.get(base+url, {params:params}).then(res=>res.data)
}