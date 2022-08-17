//页面白名单
const whiteList = [
	"/pages/login/login",
	"/pages/tabbar/mine/mine",
	"/pages/other/setup/setup",
]

function hasPermission(url) {
	const userInfo = uni.getStorageSync('userInfo')
	const token = userInfo.token
	//请求路径在白名单中直接跳转，或者带有token直接跳转，
	for (var i = 0; i < whiteList.length; i++) {
		if (url.indexOf(whiteList[i]) != -1 || token) {
			return true
		}
	}
	return false
}
uni.addInterceptor('navigateTo', {
	invoke(e) {
		console.log(e)
		if (!hasPermission(e.url)) {
			uni.navigateTo({
				url: "/pages/login/login",
			})
			return false
		}
		return true
	},
	success(e) {
		console.log(e)
	},
	fail(e) {
		console.log(e)
	}
})
