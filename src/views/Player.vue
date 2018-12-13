<template>
  <div>
    我是播放器
    <div id="player" v-html="videos"></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: 'Player',
  data () {
    return {
      querys: this.$route.query,
      source: '',
      videos: ''
    }
  },
  mounted () {
    $.ajaxPrefilter(function (options) {
      if (options.crossDomain && jQuery.support.cors) {
        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:')
        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url
      }
    })
    $.get(`http://mini.eastday.com/video/${this.querys.type}/${this.querys.date}/${this.querys.id}.html#J_video`, (response) => {
      var videoTag = /<video.*?>.*?<\/video>/g
      var ourlLink = response.match(videoTag, '')
      // this.source = ourlLink[0].split('src="')[1].split('" ')[0]
      this.videos = ourlLink[0]
      // $('#player').append(ourlLink[0])
    })
  }
}
</script>

<style scoped>
#player {
  height: auto !important;
}
</style>
