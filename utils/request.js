import config from "./config.js"
import message from "@/utils/message.js"
const request = (options) => {
	// 请求拦截

	return new Promise((resolve, reject) => {
		let Token = uni.getStorageSync('token')
		// 在登录的时候需要储存 token uni.setStorageSync("authorization","这里是登录获取的token值")
		uni.request({
			url: config.baseUrl + options.url,
			data: options.data || {},
			method: options.method || 'POST',
			header: options.header || {
				// 根据实际接口设计 key 取 token 或者 authorization
				appId: "bd9d01ecc75dbbaaefce",
				token: Token
			},
			success: (res) => {
				resolve(res.data)
				// console.log(res.data); // 控制台显示数据信息
			},
			fail: (err) => {
				// 页面中弹框显示失败
				uni.showToast({
					title: '请求接口失败'
				})
				// 返回错误消息
				console.log(err, 'err')
				reject(err)

			},
			complete() {
				// uni.hideLoading()
			},
			catch: (e) => {
				console.log(e);
			}
		})
	})
}
// 将对象导出外部引入使用
export default {
	request
}
