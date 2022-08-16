<template>
	<view>
		<view class="flex align-center justify-between setup-list" v-for="(item,index) in setUpList" :key="index">
			<view>{{item.title}}</view>
			<view :class="item.class"> {{item.text}}</view>
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
</style>
