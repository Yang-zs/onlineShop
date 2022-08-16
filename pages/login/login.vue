<template>
	<view>
		<uni-section type="line" padding title="登录">
			<!-- 账号 -->
			<uni-easyinput class="uni-mt-5" trim="all" v-model="username" placeholder="账号" @input="input">
			</uni-easyinput>
			<!-- 密码 -->
			<uni-easyinput class="uni-mt-5" trim="all" v-model="password" placeholder="密码" @input="input">
			</uni-easyinput>
		</uni-section>
		<button @click="handleLogin">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "ceshi22",
				password: "123456"
			}
		},
		created() {
			console.log(this.$myRequest, 'this')
		},

		methods: {
			async handleLogin() {
				const res = await this.$myRequest.request({
					url: '/login',
					data: {
						username: this.username,
						password: this.password,
					},
					method: 'POST'
				})
				// console.log(res, 'res')
			}
		}
	}
</script>

<style>

</style>
