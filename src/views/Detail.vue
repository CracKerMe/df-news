<template>
  <div class="detail">
    <button id="back" @click="backRouter">点我返回</button>
    <div class="news-con" v-html="detailRes"></div>
  </div>
</template>
<script>
/* eslint-disable no-undef */
export default {
  name: 'Detail',
  data () {
    return {
      oSrc: `http://mini.eastday.com/mobile/${this.$route.params.id}.html`,
      detailRes: ''
    }
  },
  mounted () {
    $.ajaxPrefilter(function (options) {
      if (options.crossDomain && jQuery.support.cors) {
        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:')
        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url
      }
    })
    $.get(this.oSrc, (res) => {
      console.log(res)
      let response = res.replace(/\r\n/g, '')
      var articleReg = /<article.*?>.*?<\/article>/g
      var linkReg = /(<link.*\s+href=(?:"[^"]*"|'[^']*')[^<]*>)/g
      let doms = ''
      response.match(linkReg, '').forEach(element => {
        doms += element
      })
      this.detailRes = (doms += response.match(articleReg, '')[0])
      // var scriptReg = /<script.*?>.*?<\/script>/g
      // this.detailRes = response.replace(scriptReg, '')
    })
  },
  methods: {
    backRouter () {}
  }
}
</script>
<style lang="scss" scoped>
.news-con {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  > iframe {
    display: block !important;
    width: 100%;
    height: 100vh;
    iframe {
      display: none !important;
    }
  }
}
</style>
