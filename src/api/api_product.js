/**
 * http://usejsdoc.org/
 */
import * as API from './'

export default {
	chemList: params => {
		return API.GET('/test/chem-list', params)
	}
}