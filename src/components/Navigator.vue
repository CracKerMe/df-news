<template>
  <div class="navigator">
    <router-link tag="a" to="/">新闻</router-link>
    <router-link tag="a" to="/video">视频</router-link>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.navigator {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  z-index: 2;
  a {
    flex: 1;
    text-align: center;
    display: block;
    height: 100%;
    line-height: 40px;
  }
}
</style>
