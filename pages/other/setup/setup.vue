<template>
	<view>
		<view class="flex align-center justify-between setup-list" v-for="(item,index) in setUpList" :key="index">
			<view>{{item.title}}</view>
			<view :class="item.class"> {{item.text}}</view>
		</view>
		<view class="btn-box">
			<button @click="submit" class="logout-btn">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setUpList: [{
						title: '账户安全',
						text: '＞',
						class: 'text-color'
					},
					{
						title: '清楚缓存',
						text: '0 KB'
					},
					{
						title: '检查更新',
						text: '＞',
						class: 'text-color'
					},
					{
						title: '当前版本',
						text: '1.0.0'
					},

				]
			};
		},
		methods: {
			async submit() {
				uni.showModal({
					content: '是否要退出登录',
					success: (res) => {
						if (res.confirm) {
							this.logOut()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async logOut() {
				const {
					code
				} = await this.$myRequest.request({
					url: '/logout',
					method: 'POST'
				})
				console.log(code, '退出登录状态');
				if (code === 20000) {
					uni.clearStorage();
					uni.showToast({
						title: "退出成功",
						icon: 'none'
					})
				}

			}

		}
	}
</script>

<style lang="scss" scoped>
	.setup-list {
		padding: 35rpx 35rpx;
	}

	.text-color {
		color: #bfbbbb;
	}

	.btn-box {
		padding: 35rpx;

		.logout-btn {
			background-color: #00cb86;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			border-radius: 5px;
		}

	}
</style>
