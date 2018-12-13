<template>
  <div class="home">
    <div class="title-nav">
      <p>
        <span v-for="item in navs" :key="item.value" class="title-nav_item">{{item.title}}</span>
        <span class="title-nav_item" @click="toggleNav">更多</span>
      </p>
      <div v-show="showNavs">
        <span v-for="item in restNavs" :key="item.value" class="title-nav_item">{{item.title}}</span>
      </div>
    </div>
    <scroll :data="allContent" class="container" ref="wrapper">
      <div>
        <div class="main">
          <div class="banner">
            <slider :click='openClick' v-if="banners.length>0">
              <div v-for="item in banners" :key="item.id" class="slide-item" @click="gotoNews(item.url.split('?qid')[0])">
                <img @load="refreshSlider" :src="item.img" alt="">
                <p>{{item.topic}}</p>
              </div>
            </slider>
          </div>
          <!-- <div v-if="allContent.length>0"> -->
            <div v-for="item in allContent" :key="item.rowkey" class="single-item">
              <div @click="gotoNews(item.url.split('?qid')[0])">
                <div class="img"><img :src="item.miniimg[0].src" alt=""></div>
                <div class="item-right">
                  <h2>{{item.topic}}</h2>
                  <div>我这里是其他信息</div>
                </div>
              </div>
            </div>
            <!-- <div v-else-if="allContent['miniimg_size'] === 3">
            </div>
            <div v-else-if="allContent['miniimg_size'] === 4">
            </div> -->
          <!-- </div> -->
        </div>
      </div>
    </scroll>
    <Navigator></Navigator>
  </div>
</template>

<script>
import jsonp from 'base/api/jsonp'
import {commonParams} from 'base/api/config'
import slider from 'base/slide/slide'
import scroll from 'base/scroll/scroll'
import Navigator from 'components/Navigator'
export default {
  name: 'Home',
  data () {
    return {
      navs: [
        { title: '推荐', value: 'toutiao' },
        { title: '视频', value: 'shipin' },
        { title: '社会', value: 'shehui' },
        { title: '娱乐', value: 'yule' },
        { title: '科技', value: 'keji' }
      ],
      restNavs: [
        { title: '军事', value: 'junshi' },
        { title: '体育', value: 'tiyu' },
        { title: '汽车', value: 'qiche' },
        { title: '财经', value: 'caijing' },
        { title: '时尚', value: 'shishang' },
        { title: '历史', value: 'lishi' },
        { title: '游戏', value: 'youxi' },
        { title: '情感', value: 'qinggan' },
        { title: '家居', value: 'jiaju' },
        { title: '星座', value: 'xingzuo' }
      ],
      banners: [],
      allContent: [],
      type: 'toutiao',
      startkey: '',
      newkey: '',
      pgnum: 1,
      needRefresh: true,
      showNavs: false,
      openClick: true
    }
  },
  components: {
    slider,
    scroll,
    Navigator
  },
  created () {
    this.initPage()
  },
  methods: {
    initPage () {
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
      // if (!window.localStorage.getItem('data')) {
      //   jsonp('http://videoback.dftoutiao.com/clicktest/get30online', {}, {
      //     param: 'jsonpcallback'
      //   }).then((data, err) => {
      //     if (!err) {
      //       window.localStorage.setItem('data', JSON.stringify(data))
      //       console.log(data)
      //     } else {
      //       console.log(err)
      //     }
      //   })
      // } else {
      //   console.log(JSON.parse(window.localStorage.getItem('data')))
      // }
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
      let reg3 = /[0-9]/g
      let newsId = url.split('?qid')[0].match(reg3).join('')
      console.log(newsId)
      this.$router.push({ path: `/detail/${newsId}` })
    },
    refreshSlider () {
      if (this.needRefresh) {
        this.$refs.wrapper.refresh()
        this.needRefresh = false
      }
    },
    toggleNav () {
      this.showNavs = !this.showNavs
    }
    // 视频站首页100条信息流
    // this.$axios.get('/news/json/index_all_100.json').then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
    // 视频站前端30条
    // jsonp('http://videoback.dftoutiao.com/clicktest/get30online', {
    //   param: 'jsonpcallback'
    // }, (err, data) => {
    //   if (!err) {
    //     console.log(data)
    //   } else {
    //     console.log(err)
    //   }
    // })
    // mini页首页
    // jsonp('http://mini.eastday.com/json/index/indexMergeNews.json', {
    //   param: 'callback',
    //   name: 'indexMergeNews'
    // }, (err, data) => {
    //   if (!err) {
    //     console.log(data)
    //   } else {
    //     console.log(err)
    //   }
    // })
    // mini页信息流
    // http://pcflow.dftoutiao.com/toutiaopc_jrtt/newspool
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  overflow: hidden;
}
.title-nav {
  width: 100%;
  height: 40px;
  position: fixed;
  background: #eeeeee;
  left: 0;
  top: 0;
  z-index: 2;
  p {
    height: 40px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title-nav_item {
    display: block;
    height: 40px;
    flex: 1;
    line-height: 40px;
  }
  .title-nav_item.active {
    background: orangered;
    color: #fff;
  }
  div {
    width: 100%;
    position: absolute;
    top: 40px;
    right: 0;
    text-align: center;
    background: #ffffff;
    .title-nav_item {
      width: 20%;
      float: left;
    }
  }
}
.main {
  padding-top: 40px;
  padding-bottom: 50px;
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
