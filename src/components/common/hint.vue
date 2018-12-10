<template>
  <div class="warning" v-if="$store.state.hintShow">
    <p>{{ $store.state.hintText }} <i class="icon iconfont icon-aui-icon-close" @click="$store.state.hintShow = false"></i></p>
  </div>
</template>
<script>
export default {
  computed: {
    hintShow () {
      return this.$store.state.hintShow
    }
  },
  watch: {
    hintShow (value, newval) {
      if (value) {
        let i = 1
        let s = setInterval(() => {
          if (i === 5) {
            this.$store.state.hintShow = false
            clearInterval(s)
          }
          i++
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.warning {
  width: 100%;
  height: 70px;
  line-height: 70px;
  text-align: center;
  background: rgba(244,67,108,0.15);
  position: fixed;
  top: 100px;
  left: 0;
  p {
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #000000;
    letter-spacing: 0;
    position: relative;
    i {
      position: absolute;
      font-size: 30px;
      cursor: pointer;
      right: 30px;
    }
  }
}
</style>
