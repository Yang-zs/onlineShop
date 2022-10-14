<template>
	<view class="uniui-home">
		<index-skeleton v-if="!loadingStatus"></index-skeleton>
		<!-- 搜索 -->
		<SearchItem></SearchItem>
		<!-- 轮播图 -->
		<SwipeItem :swiperList="swiperList"></SwipeItem>
		<!-- 宫格布局 -->
		<GongGe :gongGeList="gongGeList"></GongGe>
		<!-- 横向滚动 -->
		<ScrollY :couponList="couponList"></ScrollY>
		<!-- 横向滚动-拼团 -->
		<view class="dough">
			<view class="title">
				拼团
			</view>
			<scroll-view lower-threshold="150" @scrolltolower="handlerChangeCurrent" class="scroll-wrap"
				scroll-x="true">
				<view class="item" v-for="(item,index) in doughList" :key="index">
					<text class="tip">{{item.type==='column' ? '专栏' : '图文'}}</text>
					<image :src="item.cover"></image>
					<view class="content">
						<text class="title">{{item.title}}</text>
						<text class="price">
							￥{{item.t_price}}
							<text>￥{{item.t_price}}</text>
						</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 最新列表 -->
		<view class="new-list">
			<view class="list-title">
				<h3>最新列表</h3>
				<view>
					查看更多
				</view>
			</view>
			<view class="new-list-item" v-for="(item,index) in latestList" :key="index">
				<view class="list-item-img">
					<image :src="item.cover" alt="">
				</view>
				<view class="list-item-text">
					<view class="item-text-title">
						{{item.title}}
					</view>
					<view class="item-text-price">
						<text style="font-size: 40rpx;color: red;">￥{{item.price}}</text>
						<text style="font-size: 20rpx;color: gray;"><s>￥{{item.t_price}}</s></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 热门推荐 -->
		<!-- 		<view class="hot">
			<view class="hot-top">
				<view class="hot-title">
					热门推荐
				</view>
				<view>查看全部</view>
			</view>
			<view class="shos-list">
				<view class="hot-shop">
					<image src="../../../static/demo/banner/banner1.png" mode=""></image>
				</view>
				<view class="hot-shop">
					<image src="../../../static/demo/banner/banner1.png" mode=""></image>
				</view>

			</view>
		</view> -->
		<view class="bottom-img">
			<image src="../../../static/demo/cover/1.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import indexSkeleton from "@/pages/tabbar/index/index-skeleton.vue"
	export default {
		components: {
			indexSkeleton
		},
		data() {
			return {
				loadingStatus: false,
				// 轮播图
				swiperList: [],
				// 分类
				gongGeList: [],
				// 优惠券
				couponList: [],
				// 拼团
				doughList: [],
				page: 1,
				num: 0,
				// 最新列表
				latestList: [],
				firstLoading: false
			}
		},
		created() {
			// this.getSwiper()
			// this.getCouponList()
			// this.getDoughList()
			// this.loadRequest()
		},

		methods: {
			async loadRequest() {
				try {
					await this.getSwiper()
					await this.getCouponList()
					await this.getDoughList()
					this.loadingStatus = true
					uni.stopPullDownRefresh()
				} catch (err) {
					uni.stopPullDownRefresh()
				}
			},
			// 获取首页数据
			async getSwiper() {
				const {
					data
				} = await this.$myRequest.request({
					url: '/index',
					method: 'GET'
				})
				// 轮播图
				this.swiperList = data.find(item => item.type === 'swiper').data
				// 宫格数据
				this.gongGeList = data.find(item => item.type === 'icons').data
				// 最新列表
				this.latestList = data.find(item => item.type === 'list').data
				// console.log(data, 'data')

			},
			// 优惠券
			async getCouponList() {
				const {
					data
				} = await this.$myRequest.request({
					url: '/coupon',
					method: 'GET'
				})
				// console.log(data, '优惠券')
				this.couponList = data
			},
			// 拼团
			async getDoughList() {
				if (this.firstLoading) {
					uni.showLoading({
						title: '加载中'
					})
				}
				this.firstLoading = true
				const {
					data: {
						count,
						rows
					}
				} = await this.$myRequest.request({
					url: '/group',
					data: {
						page: this.page,
					},
					method: 'GET'
				})
				this.num = count
				this.doughList = [...this.doughList, ...rows]
				uni.hideLoading()
				// console.log(rows, count, 'group')
			},
			handlerChangeCurrent() {
				const Num = this.page * 10
				if (Num >= this.num) return
				this.page++
				this.getDoughList()
			}
		},
		onPullDownRefresh() {
			this.loadRequest()
		},
		onLoad() {
			this.loadRequest()
		},
	}
</script>

<style lang="scss" scoped>
	.uniui-home {
		padding-bottom: 100rpx;
	}

	.uniui-home {
		background-color: #f7f7f7;
	}

	.new-list {
		background-color: #ffffff;
		margin-top: 30rpx;
	}

	.new-list .new-list-item {
		display: flex;
		height: 170rpx;
		margin-top: 35rpx;
	}

	.list-item-text {
		padding-left: 35rpx;

		.item-text-title {
			width: 90%;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}

	.list-item-img {
		width: 300rpx;
		margin-right: 35rpx;
	}

	.list-item-img image {
		width: 300rpx;
		height: 180rpx;
		margin-left: 35rpx;
	}

	.list-title {
		display: flex;
		justify-content: space-between;
		padding: 35rpx 15rpx;
	}

	.dough {
		background-color: white;

		>.title {
			font-weight: bold;
			font-size: 40rpx;
			padding: 20rpx 0 20rpx 0;
		}

		.scroll-wrap {
			height: 340rpx;
			width: 100%;
			white-space: nowrap;

			.item {
				display: inline-block;
				position: relative;

				.tip {
					position: absolute;
					z-index: 100;
					background: rgba(0, 0, 0, 0.2);
					color: #fff;
					font-size: 20rpx;
					top: 130rpx;
					right: 20rpx;
					padding: 5rpx;
				}

				image {
					width: 400rpx;
					height: 200rpx;
				}

				.content {
					display: flex;
					flex-direction: column;
					height: 50rpx;

					.title {
						margin: 10rpx 0;
					}

					.price {
						color: #f00;

						text {
							color: #bdbab6;
							font-size: 10rpx;
						}
					}
				}
			}
		}
	}

	.hot {
		padding-top: 35rpx;
		background-color: #ffffff;

		.hot-top {
			margin-top: 35rpx;
			padding: 0 35rpx;

			display: flex;
			justify-content: space-between;
		}

		.shos-list {
			display: flex;
			flex-wrap: wrap;
			padding-top: 35rpx;

			.hot-shop {
				width: 45%;
				margin-left: 35rpx;
			}

			image {
				width: 100%;
				height: 150rpx;
			}
		}
	}

	.bottom-img {
		width: 100%;
		margin-top: 35rpx;

		image {
			width: 100%;
		}
	}
</style>
