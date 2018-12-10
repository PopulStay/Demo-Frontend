<template>
<div class="terms-model-out">
  <el-dialog :visible.sync="$store.state.show4" title="＜ Back to Sign up">
    <div class="succ-div">
      <p class="fz16 red-color terms-p">Terms of Service</p>
      <el-scrollbar :native="false" wrapStyle="" wrapClass="" viewClass="" viewStyle="" noresize="false" tag="section" style="height:560px;">
          <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et felis pulvinar, gravida lorem eget, consectetur lacus. Mauris mollis feugiat interdum. Vestibulum lobortis pharetra semper. Cras vel bibendum est. Phasellus ullamcorper iaculis urna ac tristique. Nunc vitae faucibus mauris. Sed quis fermentum mauris.<br /><br /></p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et felis pulvinar, gravida lorem eget, consectetur lacus. Mauris mollis feugiat interdum. Vestibulum lobortis pharetra semper. Cras vel bibendum est. Phasellus ullamcorper iaculis urna ac tristique. Nunc vitae faucibus mauris. Sed quis fermentum mauris.<br /><br /></p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et felis pulvinar, gravida lorem eget, consectetur lacus. Mauris mollis feugiat interdum. Vestibulum lobortis pharetra semper. Cras vel bibendum est. Phasellus ullamcorper iaculis urna ac tristique. Nunc vitae faucibus mauris. Sed quis fermentum mauris.<br /><br /></p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et felis pulvinar, gravida lorem eget, consectetur lacus. Mauris mollis feugiat interdum. Vestibulum lobortis pharetra semper. Cras vel bibendum est. Phasellus ullamcorper iaculis urna ac tristique. Nunc vitae faucibus mauris. Sed quis fermentum mauris.<br /><br /></p>
          </div>
      </el-scrollbar>
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
  },
  mounted () {
    // document.getElementsByClassName('.el-dialog__title').click = function () {
    //   console.log('catch')
    //   this.$store.state.show4 = false
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
.terms-model-out {
  .el-dialog__title{
    cursor: pointer;
  }
  .el-dialog__title{
    font-size:16px;
    color:$red-color;

  }
  .succ-div{padding:20px 30px;
    .terms-p{
      margin: 0 0 20px 0;
    }
  }
  .el-dialog__body{
    padding:0;
  }
  .el-dialog{
    width: 33%;
    margin-top: 0 !important;
    min-width: 300px;
    max-width: 840px;
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
  .el-scrollbar__bar.is-vertical>div{
    height: 46.4651% !important;
  }
  .terms-model-out .el-scrollbar__wrap{
    padding-right: 38px !important;
  }
  .el-scrollbar__bar.is-horizontal{
    display: none;
  }
}
</style>
