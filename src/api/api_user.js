/**
 * http://usejsdoc.org/
 */
import * as API from './'

export default {
	login: params => {
		return API.POST('/api/login', params)
	},
	loginOut() {
		return API.GET('/api/login-out')
	}
}