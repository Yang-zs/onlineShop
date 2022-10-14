<template>
	<view>
		<view class="login-header">
			<!-- 头像 -->
			<view class="head-portrait">
				<view class="portrait-left">
					头像
					<!-- <image src="" mode=""></image> -->
				</view>
				<view v-if="!userInfo.token" class="portrait-right" @click="goLogin">
					<view>立即登录</view>
					<view style="font-size: 24rpx;margin-top: 15rpx; ">登录解锁多功能</view>
				</view>
				<view v-else class="portrait-right">
					<view>{{userInfo.username}}</view>
					<view style="font-size: 24rpx;margin-top: 15rpx; ">暂无描述</view>
				</view>
			</view>
			<!-- 导航 -->
			<view class="login-card flex bg-white shadow rounded">
				<view class="flex-1 flex flex-column align-center justify-center py-3" v-for="(item,index) in navList"
					:key="index">
					<text style="color: #ffc434;font-size: 45rpx;margin-bottom: 10rpx; " :class="item.icon"></text>
					<view style="color: #6c757d;font-size: 24rpx; ">{{item.text}}</view>
				</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="login-bottom">
			<view class="coupon" v-for="(item,index) in couponList" :key="index" @click="goPath(item.path)">
				<view class="couponIcon">
					<view :class="item.icon"></view>
					<view>{{item.text}}</view>
				</view>
				<text>{{item.arrow}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: null,
				userInfo: {},
				// 导航
				navList: [{
						icon: 'iconfont icon-quanbudingdan',
						text: '订单'
					},
					{
						icon: 'iconfont icon-xiaoxi',
						text: '消息'
					},
					{
						icon: 'iconfont icon-shoucang1',
						text: '收藏'
					},
					{
						icon: 'iconfont icon-diannao1',
						text: '在学'
					},
				],
				// 列表
				couponList: [{
						icon: 'iconfont icon-wodeyouhuiquan icons',
						text: '我的优惠券',
						arrow: '＞',
						path: '/pages/other/coupon/coupon'
					},
					{
						icon: 'iconfont icon-kongxinwenhao icons',
						text: '常见问题',
						arrow: '＞',
						path: '/pages/other/problem/problem'
					},
					{
						icon: 'iconfont icon-wodeyingyong icons',
						text: '设置',
						arrow: '＞',
						path: '/pages/other/setup/setup'
					},
				]
			}
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo')
			console.log(this.userInfo);
			this.token = uni.getStorageSync('token')
		},
		computed: {

		},
		methods: {
			// 登录成功后获取用户信息
			// 点击跳转到登录
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			// 点击列表跳转到相应路径
			goPath(path) {
				console.log(path, '路径');
				if (this.userInfo.token) {
					uni.navigateTo({
						url: path
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/mobile/mobile'
					})
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.couponIcon {
		display: flex;
		align-items: center;
		justify-content: center;

		.icons {
			font-size: 40rpx;
			color: #149cec;
			margin-right: 25rpx;
		}
	}

	.icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}

	.login-header {
		height: 360rpx;
		background-color: #00cb86;
		border-bottom-left-radius: 100rpx;
		border-bottom-right-radius: 100rpx;
		color: white;
		position: relative;

		.head-portrait {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 182rpx;
			margin: 0 35rpx;

			.portrait-left {
				background-color: #f8f9fa;
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				text-align: center;
				line-height: 100rpx;
			}

			.portrait-right {
				padding-left: 50rpx;
			}
		}

		.login-card {
			color: #8f989e;
			display: flex;
			margin-top: 12rpx;
			width: 630rpx;
			position: absolute;
			bottom: 0;
			left: 50%;
			margin-left: -315rpx;

		}
	}

	.login-bottom {
		display: flex;
		background-color: #fff;
		position: relative;
		flex-direction: column;
		padding-left: 30rpx;
		padding-right: 30rpx;
		margin-top: 35rpx;

		.coupon {
			display: flex;
			font-size: 32rpx;
			position: relative;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			flex-direction: row;
			cursor: pointer;
			position: relative;
			display: flex;
			flex-direction: row;
			padding: 25rpx 30rpx;
			padding-left: 30rpx;
			flex: 1;
			overflow: hidden;
			border-bottom: 1px solid #f2f2f2;
		}
	}
</style>
