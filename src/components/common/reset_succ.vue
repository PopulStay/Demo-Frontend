<template>
<div class="reset-succ-model-out">
  <el-dialog :visible.sync="$store.state.show7" center>
    <div class="succ-div">
      <div class="XY-center">
        <i class="iconfont icon-success XY-fz60"></i>
        <p class="RobotoM center XY-fz20 red-color succ-p-set">Your password has been reset.</p>
      </div>
      <p class="XY-fz16 XY-center success-trip">You can log in to your account using
your new password. </p>
      <div class="sup-btn">
        <button>Start exploring</button>
        <!-- <button>Edit profile</button> -->
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
  }
}
</script>

<style scoped lang="scss">
$red-color: #f4436c;
.reset-succ-model-out {
  font-family: Roboto-Regular;
}
.red-color {
  color: $red-color;
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
.reset-succ-model-out {
  .succ-div{padding:20px 30px;text-align: center;}
  .el-dialog__body{
    padding:0;
  }
  .el-dialog{
    width: 33%;
    margin-top: 0 !important;
    min-width: 300px;
    max-width: 500px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .el-dialog__headerbtn{
    font-size:30px;
  }
  .XY-fz60{font-size:77px;color:$red-color;}
  .success-trip{color: #4A4A4A;letter-spacing: 1px;margin-top:8px;margin-bottom:10px;}
  .succ-p-set{margin-top:25px;}
  .sup-btn{
    display:flex;
    justify-content:space-around;
    align-items:center;
    button{
      width: 40%;
      border: none;
      border-radius: 3px;
      color: #fff;
      background: $red-color;
      height: 50px;
    }
  }
}
</style>
