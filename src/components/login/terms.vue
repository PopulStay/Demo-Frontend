<template>
<div class="terms-model-out">
  <el-dialog :visible.sync="$store.state.show_term" :close-on-click-modal="true">
    <div class="back-tap flex-wrap flex-align-center XY-fz16 XY-cursorp" @click="toSignup">
      <i class="iconfont icon-54 back-i XY-fz20 red-color"></i>
      <p class="red-color">Back to Sign up </p>
    </div>
    <div class="succ-div">
      <p class="fz16 red-color terms-p">Terms of Service</p>
      <div style="height:500px;">
        <el-scrollbar :native="false" wrapStyle="" wrapClass="" viewClass="" viewStyle="" noresize="false" tag="section" style="height:100%;">
            <p class="scroll-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et felis pulvinar, gravida lorem eget, consectetur lacus. Mauris mollis feugiat interdum. Vestibulum lobortis pharetra semper. Cras vel bibendum est. Phasellus ullamcorper iaculis urna ac tristique. Nunc vitae faucibus mauris. Sed quis fermentum mauris.<br /><br />
Aliquam fringilla, sapien vitae consectetur consectetur, ex mauris facilisis sem, id feugiat orci sapien a tellus. Etiam congue nec nunc ut rutrum. Nunc pretium commodo elit eget scelerisque. Morbi consequat convallis gravida. Fusce vehicula nunc a felis consectetur fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum maximus eget libero sed bibendum. Proin imperdiet mollis felis eu feugiat. Duis eget malesuada risus, in molestie massa. Pellentesque placerat ligula tellus, nec molestie metus condimentum eu. Nam et nisi lorem. Quisque pretium neque sit amet velit molestie, eget bibendum justo luctus. Etiam quis ante vitae eros iaculis posuere. Vestibulum ipsum est, semper ut dui eget, volutpat cursus lectus. Pellentesque vitae sapien convallis, tristique quam porttitor, suscipit felis.<br /><br />
Vestibulum neque libero, dictum gravida tincidunt quis, dapibus at felis. Donec lacinia dui risus. Etiam ultricies facilisis imperdiet. Curabitur ac sem ullamcorper, posuere neque ut, lacinia velit. Phasellus dignissim pretium cursus. Integer et aliquam risus. Vestibulum et pellentesque mauris, eu pretium quam. In urna lacus, scelerisque id condimentum et, vulputate sed lectus. Suspendisse eget enim a magna faucibus porttitor eget non velit. Duis interdum, nisi quis porta malesuada, dolor enim vehicula est, at ullamcorper mauris tellus lacinia justo.<br /><br />
Donec congue sodales nisl, sit amet varius quam fermentum mollis. Integer rhoncus massa at vulputate tristique. Quisque tortor metus, tincidunt sed metus sit amet, dictum efficitur ex. Donec porta massa semper viverra porttitor. Integer egestas et odio at rutrum. Nullam ac dui eget ipsum lacinia ornare. Aenean varius pretium elit vitae sollicitudin. Curabitur pellentesque ac est ut varius. Duis rhoncus ac ligula in commodo. Proin in pharetra ipsum, ac viverra felis. Pellentesque ullamcorper lacinia ipsum ut suscipit. Nam eu ex sed nisl consectetur egestas eget lacinia velit. Ut quis purus lacus. Aenean metus sapien, pellentesque at mattis quis, auctor non quam. Sed ornare turpis eu leo aliquet hendrerit. Duis purus lacus, ultrices ut augue quis, lobortis pellentesque ligula.<br /><br />
Praesent at gravida diam, quis elementum quam. Morbi vitae volutpat lectus. Donec ut vulputate felis. Proin vestibulum leo mi, in vulputate ante egestas ut. Aenean et diam libero. Morbi rhoncus tortor in mi viverra, quis mollis nisi egestas. Suspendisse convallis, est non bibendum faucibus, nisi nibh vestibulum eros, gravida sollicitudin nibh felis eget est. Aenean convallis ipsum enim, ac fringilla metus ultrices tristique.<br /><br />
Phasellus scelerisque ligula ligula, sed hendrerit risus tristique ut. Sed ultrices, nunc sit amet semper porttitor, magna mi rhoncus tortor, sit amet posuere orci sapien in nulla. Vivamus mattis nulla sed interdum vehicula. Donec sagittis tellus in euismod gravida. Suspendisse malesuada vestibulum maximus. Nulla ut orci aliquet, tincidunt sem at, laoreet mauris. Praesent metus odio, aliquam quis condimentum id, rutrum vitae tortor. Nam sed velit lobortis nulla pharetra efficitur.<br /><br />
Mauris maximus posuere purus, sed pretium mauris vulputate eu. Vivamus id lacinia magna. Duis eu urna quis
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et felis pulvinar, gravida lorem eget, consectetur lacus. Mauris mollis feugiat interdum. Vestibulum lobortis pharetra semper. Cras vel bibendum est. Phasellus ullamcorper iaculis urna ac tristique. Nunc vitae faucibus mauris. Sed quis fermentum mauris.
            </p>
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
    .scroll-p{
      line-height: 19px;
      color: #4A4A4A;
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
    // width: 33%;
    max-width: 640px;
    min-width: 400px;
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
    // height:200px !important;
    width: 4px !important;
  }
  .el-scrollbar__wrap{
    margin-right: 0;
    padding-right: 38px;
    overflow-x: hidden !important;
  }
  // .el-scrollbar__bar.is-vertical>div{
  //   height: 46.4651% !important;
  // }
  .terms-model-out .el-scrollbar__wrap{
    padding-right: 38px !important;
  }
  .el-scrollbar__bar.is-horizontal{
    display: none;
  }
}
</style>
