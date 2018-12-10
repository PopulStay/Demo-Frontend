<template>
   <div>
    <div class="becomeHost-header">
      <div class="title">Basics</div>
      <h3>Location</h3>
    </div>
    <div class="location">
      <ul>
        <li class="flex-wrap flex-align-center">
          <div class="title">Country / Region</div>
          <div>
            <el-select v-model="value">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="flex-wrap flex-align-center">
          <div class="title">State / Province / Region</div>
          <div>
            <el-input></el-input>
          </div>
        </li>
        <li class="flex-wrap flex-align-center">
          <div class="title">City</div>
          <div>
            <el-input></el-input>
          </div>
        </li>
        <li class="flex-wrap flex-align-center">
          <div class="title">Address</div>
          <div>
            <el-input placeholder="Street and number, P.O. box, c/o."></el-input>
          </div>
        </li>
        <li class="flex-wrap flex-align-center">
          <div class="title"></div>
          <div>
            <el-input placeholder="Apartment, suite, unit, building, floor, etc."></el-input>
          </div>
        </li>
        <li class="flex-wrap flex-align-center">
          <div class="title">Zip code</div>
          <div>
            <el-input></el-input>
          </div>
        </li>
      </ul>
    </div>
   </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '选项1',
        label: 'United States'
      }],
      value: 'United States',
      input: ''
    }
  }
}
</script>

<style scoped lang="scss">
.location {
  li {
    margin-bottom: 20px;
  }
  .title {
    width: 230px;
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
    letter-spacing: 0;
    line-height: 19px;
  }
}
</style>

<style>
.location .el-input__inner {
  width: 512px;
  height: 46px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
  letter-spacing: 0;
}
@media only screen and (max-width: 800px) {
  .location li {
    display: block;
  }
  .location li .title {
    margin-bottom: 3px;
  }
  .location .el-select, .location .el-input__inner{
      width: 100%;
  }
}
</style>
