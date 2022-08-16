<template>
	<view class="main">
		<view class="top-ound"></view>
		<!-- 表单 -->
		<view class="login-form">
			<view class="login-title" style="font-size: 44rpx;color: #35404b; ">{{selectRegister ? '注册	' : '登录'}}</view>
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<view class="uni-form-item uni-column inp-user">
					<input class="uni-input" v-model="formData.username" focus placeholder="请输入用户名"
						placeholder-style='center' />
					<text class="iconfont icon-yonghu txt-user"></text>
				</view>
				<view class="uni-form-item uni-column inp-user">
					<input class="uni-input" v-model="formData.password" type="password" placeholder="请输入密码" />
					<text class="iconfont icon-jiesuo txt-user"></text>
				</view>
				<view class="uni-form-item uni-column inp-user" v-if="selectRegister">
					<input class="uni-input" v-model="formData.repassword" type="password" placeholder="请输入确认密码" />
					<text class="iconfont icon-jiesuo txt-user"></text>
				</view>
			</uni-forms>
			<button @click="submit"
				style="background-color: #00cb86;margin-top: 70rpx ;color: white;letter-spacing: 15rpx; ">{{selectRegister ? '注册	' : '登录'}}</button>
		</view>
		<!-- bottom -->
		<view class="register">
			<text style="color: #39cb86;"
				@click="selectRegister=!selectRegister">{{selectRegister ? '去登录' : '注册账号'}}</text>
			<text style="color: #aaa5a9;">忘记密码？</text>
		</view>
		<view class="weixin-box">
			<view class="iconfont icon-weixin" style="font-size: 50rpx;color: #00cb86; "></view>
		</view>
		<view class="agreement">
			<checkbox style="width: 44rpx;height: 44rpx;margin-right: 15rpx; " value="cb" :checked="check"
				@click="changeCheck" />
			<text style="color: #a9a5a0;font-size: 30rpx; ">已阅读并同意用户隐私&隐私声明</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 注册输入框显示
				selectRegister: false,
				// 单选框 协议
				check: false,
				// 表单数据
				formData: {
					username: 'ceshi22',
					password: '123456',
					repassword: '',
				},
				rules: {
					// 对name字段进行必填验证
					username: {
						rules: [{
								errorMessage: '请输入姓名',
							},
							{
								minLength: 3,
								maxLength: 5,
								errorMessage: '用户名长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
					// 对email字段进行必填验证
					password: {
						rules: [{
							format: 'email',
							errorMessage: '密码',
						}]
					},
					repassword: {
						rules: [{
							format: 'email',
							errorMessage: '密码',
						}]
					}
				}
			}
		},
		created() {},

		methods: {
			changeCheck() {
				this.check = !this.check
			},
			submit() {
				this.$refs.form.validate().then(res => {
					if (!this.check) {
						uni.showToast({
							icon: 'none',
							title: '请先阅读并同意用户协议&隐私声明',
							duration: 2000,
							mask: true
						});
						return
					}
					if (this.selectRegister === false) {
						this.handleLogin()
					} else {
						if (this.formData.password === this.formData.repassword) {
							this.handleRegister()
						} else {
							uni.showToast({
								title: '密码与确认密码不一致',
								duration: 2000,
								icon: 'none'
							});
						}

					}
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			},
			async handleLogin() {
				const res = await this.$myRequest.request({
					url: '/login',
					data: {
						username: this.formData.username,
						password: this.formData.password,
					},
					method: 'POST'
				})
				console.log(res, '登录')
			},
			async handleRegister() {
				const {
					code,
					data,
					msg
				} = await this.$myRequest.request({
					url: '/reg',
					data: {
						username: this.formData.username,
						password: this.formData.password,
						repassword: this.formData.repassword
					},
					method: 'POST'
				})
				if (code === 20000) {
					uni.showToast({
						title: '注册成功',
						duration: 2000,
						icon: 'success',
						success() {
							location.reload()
						}
					})
				} else {
					uni.showToast({
						title: '注册失败',
						duration: 2000,
						icon: 'error'
					});
				}
			}
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
</style>
