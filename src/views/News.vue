<template>
  <div>
    <scroll :data="allContent" class="container" ref="wrapper">
      <div>
        <div class="main">
          <div class="banner">
            <slider v-if="banners.length>0">
              <div v-for="item in banners" :key="item.id" class="slide-item">
                <img @load="refreshSlider" :src="item.img" alt="">
                <p>{{item.topic}}</p>
              </div>
            </slider>
          </div>
            <div v-for="item in allContent" :key="item.rowkey" class="single-item">
              <div @click="gotoNews(item.url.split('?qid')[0])">
                <div class="img"><img :src="item.miniimg[0].src" alt=""></div>
                <div class="item-right">
                  <h2>{{item.topic}}</h2>
                  <div>我这里是其他信息</div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import jsonp from 'base/api/jsonp'
import {commonParams} from 'base/api/config'
import scroll from 'base/scroll/scroll'
import slider from 'base/slide/slide'
export default {
  name: 'News',
  components: {
    scroll,
    slider
  },
  data () {
    return {
      banners: [],
      allContent: [],
      type: 'toutiao',
      startkey: '',
      newkey: '',
      pgnum: 1,
      needRefresh: true,
      showNavs: false
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    initPage () {
      jsonp('http://mini.eastday.com/json/index/indexMergeNews.json', {}, {
        param: 'callback',
        name: 'indexMergeNews'
      }).then((data, err) => {
        if (!err) {
          // let random_3 = Math.floor(Math.random()*3)
          let lunboObj = data.lunbo[0].lunbo.filter((item) => item.img.indexOf('480x232') !== -1)
          this.banners = lunboObj
        } else {
          console.log(err)
        }
      })
      const InitParam = {
        type: this.type,
        startkey: this.startkey,
        newkey: this.newkey,
        pgnum: this.pgnum
      }
      this.fetchMainData(InitParam, {}).then((res, err) => {
        if (!err) {
          InitParam.startkey = res.endkey
          InitParam.newkey = res.newkey
          InitParam.pgnum++
          this.allContent = res.data
          this.fetchMainData(InitParam, {}).then((res2, err) => {
            // this.startkey = res2.endkey
            // this.pgnum = InitParam.pgnum++
            this.allContent = this.allContent.concat(res2.data)
            this.$refs.wrapper.refresh()
          })
        } else {}
      })
    },
    fetchMainData (data, option) {
      const newData = Object.assign({}, commonParams, {
        type: data['type'],
        startkey: data['startkey'],
        newkey: data['newkey'],
        pgnum: data['pgnum']
      })
      return jsonp('http://pcflow.dftoutiao.com/toutiaopc_jrtt/newspool', newData, option)
    },
    gotoNews (url) {
      console.log(url)
      let reg3 = /[0-9]/g
      let newsId = url.split('?qid')[0].match(reg3).join('')
      this.$router.push({ path: `/detail/${newsId}` })
    },
    refreshSlider () {
      if (this.needRefresh) {
        this.$refs.wrapper.refresh()
        this.needRefresh = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding-bottom: 20px;
}
.banner {
  width: 100%;
  overflow: hidden;
  position: relative;
  .slide-item {
    width: 100%;
    position: relative;
    img {
      display: block;
      width: 100%;
    }
    p {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 10px;
      color: #fff;
      background: rgba(0, 0, 0, 0.2);
      line-height: 36px;
    }
  }
}
.single-item {
  width: 100%;
  box-sizing: border-box;
  padding: 0 6px;
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    flex-direction: row;
    .img {
      flex: 1;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .item-right {
    flex: 2;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    justify-content: center;
    > div {
      margin-top: 12px;
    }
  }
}
</style>
