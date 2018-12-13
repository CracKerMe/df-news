<template>
  <div>
    <div>
      <div class="video-item" v-for="(item, key) in allVideos" :key="key" @click="goDetail(item)">
        <img :src="item.img" alt="">
        <p class="item-title">{{item.title}}</p>
        <p>
          <span>{{item.long}}</span>
          <span>{{item.type}}</span>
        </p>
      </div>
      <Navigator></Navigator>
    </div>
  </div>
</template>

<script>
import Navigator from 'components/Navigator'
export default {
  name: 'Video',
  data () {
    return {
      allVideos: []
    }
  },
  components: {
    Navigator
  },
  created () {
    this.init100()
  },
  methods: {
    init100 () {
      this.$axios.get('videosite/json/index_all_100.json').then(res => {
        this.allVideos = res.data.data
        console.log(this.allVideos)
      }).catch(err => {
        console.log(err)
      })
    },
    goDetail (item) {
      let type = (item.type_url.indexOf('home') > -1) ? 'v' + item.type_url.slice(5, -5) : item.type_url.slice(0, -5)
      let date = item.img.split('/')[5]
      let id = item.url.split('/a/')[1].slice(0, -5)
      // let main_info = `http://mini.eastday.com/video/${type}/${date}/${id}.html#J_video`
      this.$router.push({path: 'player', query: {type: type, date: date, id: id}})
    }
  }
}
</script>

<style lang="scss" scoped>
.video-item {
  width: 47%;
  display: block;
  margin-bottom: 20px;
  padding-bottom: 30px;
  margin-left: 2%;
  float: left;
  position: relative;
  .item-title {
    font-size: 12px;
    color: #333;
    line-height: 14px;
    height: 28px;
    overflow: hidden;
    margin-top: 10px;
  }
  img {
    width: 100%;
    display: block;
  }
  p:last-child {
    font-size: 12px;
    line-height: 16px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    span:first-child {
      color: #ccc;
      float: left;
      background: rgba(0, 0, 0, 0.3);
      padding: 0 3px;
      transform: translateY(500%);
    }
    span:last-child {
      float: right;
      color: #fff;
      background: blueviolet;
      padding: 0 2px;
      border-radius: 2px;
    }
  }
}
</style>
