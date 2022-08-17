import request from "./request.js"
export default {
	// 获取可用拼团列表
	getGroupList(params) {
		return request("/group", "GET", params)
	}
}
