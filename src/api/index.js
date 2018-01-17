/**
 * http://usejsdoc.org/
 */
import axios from 'axios'

let base='http://dev.shop.integle.com';

axios.defaults.withCredentials = false;

//添加相应拦截器
axios.interceptors.response.use(function(response){
	if(!response.status) {
		console.log(response);
		return false;
	}
	if (response.status == 0) {
		console.log(response);
		return false;
	}
	return response;
}, function(error){
	console.log("error"+error);
	return false;
})

export const POST=(url,params)=>{
	return axios.post(base+url, params).then(res=>res.data)
}

export const GET=(url,params)=>{
	return axios.get(base+url, {params:params}).then(res=>res.data)
}