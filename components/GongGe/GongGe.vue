<template>
	<view class="uni-grid">
		<uni-section title="" type="line" padding>
			<uni-grid :column="4" :showBorder='false' :highlight="true">
				<uni-grid-item v-for="(item, index) in gongGeList" :index="index" :key="index">
					<view class="grid-item-box" style="background-color: #fff;" @click="goPath(index)">
						<image :src="item.src" mode=""></image>
						<text class="text">{{item.name}}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</uni-section>
	</view>
</template>

<script>
	export default {
		props: {
			gongGeList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				pathList: [{
						path: '/pages/tabbar/index/test-list',

					},
					{
						path: '/pages/tabbar/index/test-list/test-list',

					},
				]
			}
		},
		methods: {
			goPath(dex) {
				this.pathList.forEach((item, index) => {
					if (index === dex) {
						// console.log(item, '2');
						uni.navigateTo({
							url: item.path
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	/* 宫格 */
	.image {
		width: 50rpx;
		height: 50rpx;
	}

	.text {
		font-size: 28rpx;
		margin-top: 10rpx;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		// display: block;
		/* #endif */
	}

	.grid-dynamic-box {
		margin-bottom: 30rpx;
	}

	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 30rpx 0;
	}

	.grid-item-box-row {
		flex: 1;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 30rpx 0;
	}

	.grid-dot {
		position: absolute;
		top: 10rpx;
		right: 30rpx;
	}


	.grid-item-box image {
		width: 60rpx;
		height: 60rpx;
	}
</style>
