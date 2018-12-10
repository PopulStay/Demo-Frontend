<template>
  <div>
     <div class="becomeHost-header">
      <div class="title">Get ready</div>
      <h3>Set a price</h3>
    </div>
    <div class="getReady">
      <ul>
        <li>
          <!-- <el-radio v-model="radio" label="1" >Floating price</el-radio>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Suspendisse sodales enim ac justo vehicula faucibus.</p>
          <el-radio v-model="radio" label="2">Fixed price</el-radio>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Suspendisse sodales enim ac justo vehicula faucibus.</p> -->
          <el-checkbox :checked='checked'>Floating price</el-checkbox>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Suspendisse sodales enim ac justo vehicula faucibus.</p>
        </li>
        <li>
          <!-- <el-radio v-model="radio" label="2">Fixed price</el-radio>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Suspendisse sodales enim ac justo vehicula faucibus.</p> -->
          <el-checkbox :checked='!checked'>Fixed price</el-checkbox>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Suspendisse sodales enim ac justo vehicula faucibus.</p>
          </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      radio: '1',
      checked: true
    }
  }
}
</script>
<style scoped lang='scss'>
.getReady {
  ul {
    li {
      margin-bottom: 40px;
      p {
        padding-left: 35px;
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #000000;
        line-height: 19px;
      }
    }
  }
}
</style>

<style>
.getReady .el-checkbox__label {
  font-family: Roboto-Medium;
  font-size: 16px;
  color: #4A4A4A;
}
</style>
