<template>
<div class="terms-model-out">
  <el-dialog :visible.sync="$store.state.show_term" :close-on-click-modal="true">
    <div class="back-tap flex-wrap flex-align-center XY-fz16 XY-cursorp" @click="toSignup">
      <i class="iconfont icon-54 back-i XY-fz20 red-color"></i>
      <p class="red-color">{{$t('message.BacktoSignup')}}</p>
    </div>
    <div class="succ-div">
      <p class="fz16 red-color terms-p">{{$t('message.TermsofServiceA')}}</p>
      <div style="height:500px;">
        <el-scrollbar :native="false" wrapStyle="" wrapClass="" viewClass="" viewStyle="" noresize="false" tag="section" style="height:100%;">
          <p class="scroll-p">{{$t('message.Terms1')}}</p>
          <p class="scroll-p">{{$t('message.Terms2')}}</p>
          <p class="scroll-p">{{$t('message.Terms3')}}</p>
        </el-scrollbar>
      </div>
    </div>
    <!-- </div> -->
  </el-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    testTap (e) {
      console.log(e)
    },
    toSignup () {
      this.$store.state.show_term = false
      this.$store.state.show_signup = true
    }
  },
  mounted () {
    // document.getElementsByClassName('.el-dialog__title').click = function () {
    //   console.log('catch')
    //   this.$store.state.show_term = false
    // }
  }
}
</script>

<style scoped lang="scss">
$red-color: #f4436c;
.terms-model-out {
  font-family: Roboto-Regular;
}
.red-color {
  color: $red-color !important;
}
.lineh36 {
  line-height: 36px;
}
.lineb {
  display: inline-block;
}
</style>
<style lang="scss">
$red-color: #f4436c;
.terms-model-out {
  .back-tap {
    position: absolute;
    left: 30px;
    top: 22px;
    .back-i {
      color: $red-color;
      font-size:30px;
      display: inline-block;
      transform: rotate(90deg);
      margin-right: 5px;
    }
  }
  .succ-div{padding:35px 30px 20px 30px;
    .terms-p{
      color: $red-color;
      margin: 15px 0 20px 0;
    }
    .scroll-p {
      line-height: 1.9;
      color: #4A4A4A;
      text-align: justify;
      margin-right: 15px;
      margin-bottom: 20px;
    }
    .el-dialog__body{
      position: relative;
      max-width: 640px;
    }
  }
  .el-dialog__body{
    padding:0;
  }
  .el-dialog{
    min-width: 300px;
    max-width: 440px;
    margin-top: 0 !important;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .el-dialog__headerbtn{
    font-size:30px;
  }
  .fz60{font-size:90px;color:$red-color;}
  .success-trip{color: #4A4A4A;letter-spacing: 1px;margin-top:8px;margin-bottom:10px;}
  .succ-p-set{margin-top:25px;}
  .el-scrollbar__thumb{
    background-color: #F4436C;
    border-radius: 2.5px;
    width: 4px !important;
  }
  .el-scrollbar__wrap{
    margin-right: 0;
    overflow-x: hidden !important;
  }
  .el-scrollbar__bar.is-horizontal{
    display: none;
  }
}
</style>
