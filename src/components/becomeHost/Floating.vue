<template>
  <div>
     <div class="becomeHost-header">
      <div class="title">Get ready</div>
      <h3>Floating price</h3>
    </div>
    <div class="floating">
      <ul>
        <li>
          <h5>Lowest price</h5>
          <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Suspendisse sodales enim ac justo vehicula faucibus. </p>
          <p class="label">PPS</p>
          <el-input></el-input>
        </li>
        <li>
          <h5>Highest price</h5>
          <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Suspendisse sodales enim ac justo vehicula faucibus. </p>
          <p class="label">PPS</p>
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
.floating {
  ul {
    li {
      margin-bottom: 60px;
      h5 {
        font-family: Roboto-Medium;
        font-size: 16px;
        color: #4A4A4A;
        font-weight: 100;
        margin: 0;
      }
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
.floating .el-input__inner {
  width: 394px;
  height: 46px;
}
@media only screen and (max-width: 800px) {
  .floating .el-input__inner {
    width: 100%
  }
}
</style>
