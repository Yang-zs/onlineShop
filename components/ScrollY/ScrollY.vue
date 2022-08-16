<template>
	<view>
		<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
			<view class="scroll-view-item_H" v-for="(item,index) in couponList" :key="index">
				<view class="item-price">
					<view style="font-size: 39rpx;">￥{{item.price}}</view>
					<view style="font-size: 19rpx;">适用{{item.type==="course" ? '课程' : '专栏'}}：{{item.value.title}}</view>
				</view>
				<view class="item-receive" style="font-size: 25rpx;">
					领取
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			couponList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				// 横向滚动
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		methods: {
			// 横向滚动
			upper: function(e) {
				// console.log(e)
			},
			lower: function(e) {
				// console.log(e)
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	/* 横向滚动 */
	.scroll-Y {
		height: 300rpx;
	}

	.scroll-view_H {
		padding: 25rpx 0;
		background-color: #ffffff;
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.scroll-view-item_H {
		width: 650rpx;
		display: inline-block;
		height: 100rpx;
		text-align: center;
		color: white;
		margin-right: 55rpx;


		.item-price {
			padding: 15rpx;
			width: 75%;
			padding-bottom: 35rpx;
			float: left;
			// padding: 35rpx 35rpx;
			background-color: #db950d;
			border-right: 3rpx dashed white;
		}

		.item-receive {
			display: inline-block;
			width: 25%;
			line-height: 100rpx;
			background-color: #fbb916;

		}
	}
</style>
