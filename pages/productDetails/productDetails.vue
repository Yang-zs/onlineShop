<template>
	<view class="main">
		<!-- 图片 -->
		<view class="top-image">
			<image :src="detailList.data"></image>
		</view>
		<!-- 详情 -->
		<view class="details">
			<view style="font-size: 38rpx;">{{detailList.title}}</view>
			<view class="flex align-center justify-between zhong">
				<view style="color: #a9a5a0;font-size: 22rpx; ">0人学过</view>
				<text class="iconfont icon-shoucang" style="font-size: 50rpx;"></text>
			</view>
			<view>
				<text style="color: #dc3545;font-size: 40rpx;">￥10.00</text>
				<text style="color: #a9a5a0;font-size: 22rpx;margin-left: 15rpx; "><s>￥20.00</s></text>
			</view>
		</view>
		<!-- 简介 -->
		<view class="briefIntroduction">
			<view style="border-bottom: 1px solid #f5f5f5;">课程简介</view>
			<view>{{detailList.title}}</view>
		</view>
		<!-- 立即订购 -->
		<button class="btn-order">立即订购</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailList: {}
			}
		},
		onLoad(options) {
			// console.log(JSON.parse(options.data), '参数');
			// console.log(options, 'options');
			// console.log(this.detailList.title, 'title');
			this.detailList = options
			console.log(this.detailList);
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.main {
		height: 100%;
		width: 100%;
		background-color: #f5f5f3;
	}

	.top-image {
		width: 100%;
		margin-right: 6.13%;
		position: relative;
		height: 420rpx;

		image {
			height: 100%;
			width: 100%;
		}
	}

	.top-image image {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
	}

	.details {
		background-color: #ffffff;
		padding: 35rpx;

		.zhong {
			margin: 35rpx 0;
		}
	}

	.briefIntroduction {
		margin-top: 35rpx;
		height: 500rpx;
		background-color: #ffffff;

		view {
			padding: 30rpx;
		}

	}

	.btn-order {
		background-color: #00cb86;
		color: white;
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
