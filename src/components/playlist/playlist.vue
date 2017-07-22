<template>
	<div class="wrap">
		<div class="play_list">
			<song-item v-for="(item,index) in playList" :listDes="item.playCount | toW" :listName="item.name" :key="index" :listId="item.id">
				<img v-lazy="item.coverImgUrl" slot="listBg">
			</song-item>
		</div>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
import SongItem from "components/common/songItem"

export default {
	components: {
		SongItem
	},
	data() {
		return {
			// 存储歌单数据
			playList: []
		}
	},
	methods: {
		getPlayList(startNum, limit = 2) {
			// 获取推荐歌单
			this.$http.get('http://musicapi.duapp.com/api.php?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=' + startNum + '&limit=' + limit)
				.then(res => {
					this.playList = res.data.playlists
				})
				.catch(err => {
					document.querySelector('.reco_list').innerHTML = '出错了，请刷新'
				})
		}
	},
	mounted() {
		setTimeout(() => {
			// 初始化歌单页面
			this.getPlayList(13, 10)
		}, 500)

	},
	filters: {
		toW(val) {
			// 处理播放次数,大于 5位数显示为多少万,否则正常显示
			let len = (val + '').split('')
			val = len.length > 5 ? len.splice(0, len.length - 4).join('') + '万' : val + ''
			return val
		}
	}
}
</script>

<style lang="less" scoped>
.play_list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.song_item {
	width: 49%;
}
</style>
