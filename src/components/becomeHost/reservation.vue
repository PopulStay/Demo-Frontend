<template>
  <div>
     <div class="becomeHost-header">
      <div class="title">Get ready</div>
      <h3>Long-term reservation</h3>
    </div>
    <div class="reservation">
      <ul>
        <li>
          <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Suspendisse sodales enim ac justo vehicula faucibus. </p>
          <p class="label">Weekly pricing</p>
          <el-input></el-input>
        </li>
        <li>
          <p class="label">Monthly pricing</p>
          <el-input></el-input>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>

<style scoped lang='scss'>
.reservation {
  ul {
    li {
      margin-bottom: 30px;
      .text {
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #000000;
        line-height: 19px;
        margin: 10px 0 20px 0;
      }
      .label {
        font-family: Roboto-Medium;
        font-size: 16px;
        color: #4A4A4A;
        margin-bottom: 10px;
      }
    }
  }
}
</style>

<style>
.reservation .el-input__inner{
  width: 394px;
  height: 46px;
}
@media only screen and (max-width: 800px) {
  .reservation .el-input__inner {
    width: 100%
  }
}
</style>
