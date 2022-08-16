// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import request from './utils/request'

Vue.config.productionTip = false
Vue.prototype.$myRequest = request
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
import {
	log
} from 'console'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
