<template>
  <div class="pay-succ">
    <div class="flex-wrap flex-center pay-succ-wrap">
      <i class="iconfont icon-success iconfz"></i>
      <p class="pay-title">Payment successful</p>
      <p class="pay-content">A confirmation email will be sent to you shortly.</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'pay-success',
  components: {
    // 'e-header': header,
    // 'e-footer': footer
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.pay-succ{
  width: 100vw;
  height: 70vh;
  text-align: center;
  vertical-align: middle;
  .pay-succ-wrap{
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  .iconfz{
    font-size: 60px;
    display: block;
    color: #F4436C;
  }
  .pay-title{
    font-family: Roboto-Medium;
    font-size: 20px;
    color: #F4436C;
    text-align: center;
    margin-top: 35px;
  }
  .pay-content{
    margin-top: 15px;
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
    letter-spacing: 1px;
    text-align: center;
  }
}
</style>
