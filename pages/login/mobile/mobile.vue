<template>
	<view class="main">
		<view class="top-ound"></view>
		<!-- 表单 -->
		<view class="login-form">
			<view class="login-title" style="font-size: 44rpx;color: #35404b; ">绑定手机号</view>
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<view class="uni-form-item uni-column inp-user">
					<input class="uni-input" v-model="formData.phone" focus placeholder="请输入手机号"
						placeholder-style='center' />
					<text class="iconfont icon-yonghu txt-user"></text>
				</view>
				<view class="uni-form-item uni-column inp-user ipt-code" style="position: relative;">
					<input class="uni-input" v-model="formData.code" type="password" placeholder="验证码" />
					<text class="iconfont icon-jiesuo txt-user"></text>
					<button class="flex align-center justify-center code-btn" @click="sendCode">{{sendText}}</button>
				</view>
			</uni-forms>
			<button @click="submit"
				style="background-color: #00cb86;margin-top: 70rpx ;color: white;letter-spacing: 15rpx;">绑定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				countDown: 60,
				sendText: '发送',
				canClick: true, // 节流
				codeshortMessage: null,
				// 表单数据
				formData: {
					phone: '15343644512',
					code: '',
				},
				rules: {
					// 对name字段进行必填验证
					phone: {
						rules: [{
							errorMessage: '请输入正确的手机号',
						}, ]
					},
				}
			}
		},
		created() {

		},

		methods: {
			// code倒计时
			handleCountDown() {
				if (!this.canClick) return
				this.canClick = false
				let timerId = setInterval(() => {
					this.countDown--;
					this.sendText = this.countDown + "秒后重试";
					if (this.countDown <= 0) {
						clearInterval(timerId);
						this.sendText = "发送验证码";
						this.countDown = 60;
						this.canClick = true
					}
				}, 1000);
			},
			// 手机号码表达式检验
			async regular() {
				let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
				if (!this.formData.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				} else if (!reg.test(this.formData.phone)) { //判断手机号格式时候正确
					uni.showToast({
						title: '手机号码不正确',
						icon: 'none'
					})
					return
				}
			},
			// 点击发送验证码
			async sendCode() {
				// 节流一下
				if (!this.canClick) return
				await this.regular()
				const {
					code,
					data
				} = await this.$myRequest.request({
					url: '/get_captcha',
					data: {
						phone: this.formData.phone
					},
					method: 'POST'
				})

				this.codeshortMessage = data
				console.log(data, '验证码');
				if (code === 20000) {
					this.handleCountDown()
					uni.showToast({
						title: '验证码是：' + data,
						icon: 'none'
					})
				} else {
					uni.showToast({
						title: '操作太快，稍后重试',
						icon: 'none'
					})
				}
				// code倒计时


			},
			// 点击绑定
			async submit() {
				if (this.codeshortMessage) {
					const res = await this.$myRequest.request({
						url: '/bind_mobile',
						data: {
							phone: this.formData.phone,
							code: this.codeshortMessage
						},
						method: 'POST'
					})
					console.log(res, '11');
					console.log(res.data, '	res.data');
					if (res.code === 20000) {
						uni.showToast({
							title: '绑定成功',
							icon: 'none'
						})
						uni.switchTab({
							url: '/pages/tabbar/mine/mine'
						})
						// this.handleLogin()
					} else {
						uni.showToast({
							title: res.data,
							icon: 'none'
						})
					}


				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 100%;
		height: 100%;

		.top-ound {
			background: linear-gradient(to right, #00f9b5, #1ed6ed);
			height: 300rpx;
			width: 100%;

		}

		.login-form {
			background-color: #ffffff;
			padding: 68rpx 50rpx;
			border-top-left-radius: 35rpx;
			border-top-right-radius: 35rpx;
			margin-top: -60rpx;

			.login-title {
				margin-bottom: 50rpx;
				letter-spacing: 10rpx;
			}
		}

		.register {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 42rpx;
		}

		.weixin-box {
			margin-top: 50rpx;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			.icon-weixin {
				width: 100rpx;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border: 1px solid #00c37b;
				border-radius: 50%;
			}
		}

		.agreement {
			margin-top: 35rpx;
			text-align: center;
		}

	}

	.uni-column {
		background-color: #f5f5f5;
		// height: 100rpx;
		margin: 15rpx 0;
		padding: 35rpx 65rpx;
	}

	.inp-user {
		position: relative;
	}

	.txt-user {
		position: absolute;
		top: 40rpx;
		left: 15rpx;
	}

	.code-btn {
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		width: 250rpx;
		background-color: #00cb86;
		color: white;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
</style>
