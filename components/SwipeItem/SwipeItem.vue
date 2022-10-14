<template>
	<view class="uni-swipe">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<view class="swiper-item uni-bg-red">
						<image :src="item.src" @click="goDetail(item)"></image>
					</view>
				</swiper-item>

			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			swiperList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				// 轮播图
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
			}
		},
		created() {},
		methods: {
			goDetail(item) {
				// console.log(item, '点击轮播图')
				uni.navigateTo({
					url: `/pages/productDetails/productDetails?data=${item.src}&id=${item.course_id}&title=${item.course_title}&type=${item.type}`,
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.uni-swipe {
		padding: 0 18rpx;
	}

	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}

	.swiper {
		height: 300rpx;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;

	}

	.swiper-item image {
		width: 100%;
		height: 100%;
		border-radius: 18rpx;
	}

	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}

	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}

	.info {
		position: absolute;
		right: 20rpx;
	}

	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}
</style>
