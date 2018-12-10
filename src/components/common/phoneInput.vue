<template>
  <div style="width: 100%">
    <div class="flex-wrap flex-center wrap">
      <el-popover placement="bottom-start" width="300" trigger="manual" v-model="show" popper-class="state-popover" v-if="type !== 'email'">
        <div slot="reference" class="num flex-wrap flex-center-between" @click="show = !show">
          <p>{{first}}</p>
          <i class="icon iconfont" :class="show ? 'icon-arrow-up' : 'icon-54'"></i>
        </div>
        <div class="popover">
          <ul>
            <li v-for="(item, index) in nation" :key="index" @click="first = item.code; show = false">
              {{item.name}}
              <i>{{'(' + item.code + ')'}}</i>
            </li>
          </ul>
        </div>
      </el-popover>
      <div class="input_warp">
        <i class="icon iconfont"
          :class="type === 'email' ? 'icon-shouji' : 'icon-youxiang'"
          @blur="blur"
          @click="type === 'email' ? type = 'phone' : type = 'email'; number = ''; $emit('cut')">
        </i>
        <input type="text" ref="input" v-model="number"
          @input="$emit('input', $event.target.value)"
          @blur="blur"
          :placeholder="type === 'email' ? 'Email address' : 'Phone Number'">
      </div>
    </div>
    <p class="warning" v-show="warning === 'email'">Please enter the correct email</p>
    <p class="warning" v-show="warning === 'phone'">Please enter the correct phone number</p>
  </div>
</template>

<script>
import utils from '../../utils/utils.js'
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false,
      first: '+86',
      nation: this.$store.state.nation,
      type: 'email',
      number: '',
      warning: ''
    }
  },
  methods: {
    blur () {
      this.$emit('blur')
      if (this.type === 'email') {
        utils.checkEmail(this.number) ? this.warning = 'email' : this.warning = ''
      } else {
        utils.checkTel(this.number) ? this.warning = 'phone' : this.warning = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
}
span {
  display: block;
  min-height: 40px;
  flex: 1;
  margin-right: 10px;
}
.num {
  border-right: 1px solid #e6e7e8;
  min-height: 40px;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0 15px 0 10px;
  font-size: 16px;
}
.input_warp {
  flex: 4;
  position: relative;
  .iconfont {
    color: #F4436C;
    position: absolute;
    right: 3px;
    top: 50%;
    font-size: 22px;
    cursor: pointer;
    transform: translateY(-50%);
  }
}
input {
  width: 100%;
  border: none;
  height: 60px;
  font-size: 16px;
  color: #4a4a4a;
  box-sizing: border-box;
  padding: 0 25px 0 0;
}
.popover {
  li {
    letter-spacing: .83px;
    padding: 5px 0;
    cursor: pointer;
    &:hover {
      color: #F4436C
    }
    i {
      font-style: normal;
      margin-left: 5px;
      color: #999;
    }
  }
}
.warning {
  font-family: Roboto-Regular;
  color: #F4436C !important;
}
</style>

<style>
.state-popover {
  padding: 10px 20px;
}
</style>
