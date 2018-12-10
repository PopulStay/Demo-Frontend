<template>
  <div>
    <div class="becomeHost-header">
      <div class="title">Basics</div>
      <h3>Property types</h3>
    </div>
    <div class="propertyTypes">
       <el-select v-model="$store.state.host.category" placeholder="Please choose your  property type">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span class="icon-CHECKMARK-wrap"><i class="icon iconfont icon-CHECKMARK" v-if="$store.state.hostcategory == item.value"></i></span>
          <span class="icon-CHECKMARK-text">{{item.label}}</span>
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: 'Entire place',
        label: 'Entire place'
      },
      {
        value: 'Private room',
        label: 'Private room'
      },
      {
        value: 'Shared room',
        label: 'Shared room'
      }],
      value: ''
    }
  }
}
</script>

<style lang="scss">
.icon-CHECKMARK-wrap {
  display: inline-block;
  width: 20px;
}
.icon-CHECKMARK {
  font-size: 20px;
}
.propertyTypes .el-input__inner {
  width: 400px;
  height: 46px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
  line-height: 24px;
}
.icon-CHECKMARK-text {
  font-family: Roboto-Regular;
  font-size: 16px;
  line-height: 24px;
}
@media only screen and (max-width: 800px) {
  .propertyTypes .el-select, .propertyTypes .el-input__inner{
      width: 100%;
  }
}
</style>
