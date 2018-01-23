/**
 * http://usejsdoc.org/
 */
import * as API from './'

export default {
	chemList: params => {
		console.log('request product list');
		return API.GET('/product/product/list', params)
	},
	add:params=>{
		console.log('post product add');
		return API.POST('/product/product/add', params);
	}
}