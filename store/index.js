import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user: uni.getStorageSync('userInfo') || {}
	},
	getters: {

	},
	mutations: {
		setUser(state, user) {
			state.user = user
			uni.setStorage({
				key: 'userInfo',
				data: user
			})
		},
	},
	actions: {
		setUser({
			commit
		}, payload) {
			commit("setUser", payload)
		},

	},
	modules: {

	}
})

export default store
