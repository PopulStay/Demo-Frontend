<template>
  <div style="width: 100%">
    <div class="flex-wrap flex-center wrap">
      <!--<el-popover placement="bottom-start" width="300" trigger="manual" v-model="show" popper-class="state-popover" v-if="$store.state.inputType !== 'email'">-->
        <!--<div slot="reference" class="num flex-wrap flex-center-between" @click="show = !show">-->
          <!--<p>{{first}}</p>-->
          <!--<i class="icon iconfont" :class="show ? 'icon-arrow-up' : 'icon-54'"></i>-->
        <!--</div>-->
        <!--<div class="popover">-->
          <!--<ul>-->
            <!--<li v-for="(item, index) in nation" :key="index" @click="firstbtn(index)">-->
              <!--{{item.name}}-->
              <!--<i>{{item}}</i>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
      <!--</el-popover>-->

      <div class="numbox" v-if="$store.state.inputType !== 'email'" >
        <div class="num" @click="show = !show">
          <p>{{first}}</p>
          <i class="icon iconfont" :class="show ? 'icon-arrow-up' : 'icon-54'"></i>
        </div>
        <ul class="select" v-if="show">
          <li v-for="(item, index) in nation" :key="index" @click="firstbtn(index)">
            {{item.name}}
            <i>{{item}}</i>
          </li>
        </ul>
      </div>

      <div class="input_warp">
        <i class="icon iconfont"
          :class="$store.state.inputType === 'email' ? 'icon-shouji' : 'icon-youxiang'"
          @blur="blur"
          @click="$store.state.inputType === 'email' ? $store.state.inputType = 'phone' : $store.state.inputType = 'email'; number = ''; $emit('cut'); $store.state.warning = '' ; show = false">
        </i>
        <input type="text" ref="input" v-model="number"
          @input="$emit('input', $event.target.value)"
          @blur="blur"
          :placeholder="$store.state.inputType === 'email' ? $t('message.Emailaddress') : $t('message.Phonenumber')">
      </div>
    </div>
    <p class="warning" v-show="$store.state.warning === 'email'">{{$t('message.Pleaseenterthecorrectemail')}}</p>
    <p class="warning" v-show="$store.state.warning === 'phone'">{{$t('message.Pleaseenterthecorrectphonenumber')}}</p>

    <p v-if="show_signup != $store.state.show_signup ? onloading() : null"></p>

  </div>
</template>

<script>
  import utils from '../../utils/utils.js'
  import areanoList from '../../utils/areanoList.js'
export default {
  props:['showHide'],
  data () {
    return {
      show_signup:this.$store.state.show_signup,
      show: false,
      first: '+86',
      nation: areanoList._areanoList,
      number: '',
      warning: ''
    }
  },
  methods: {
    onloading(){
      this.show = false
    },
    firstbtn(idx){
      this.first = areanoList.areanoList[idx];
      this.show = false;
      this.$store.state.warning = ''
    },
    blur () {
      this.$emit('blur')
      if (this.$store.state.inputType === 'email') {
        utils.checkEmail(this.number) ? this.$store.state.warning = 'email' : this.$store.state.warning = ''
      } else {
        if (this.first == '+86') {
          utils.checkTel(this.number) ? this.$store.state.warning = 'phone' : this.$store.state.warning = ''
        } else {
          this.$store.state.warning = ''
        }
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
.numbox{
  position: relative;

}
.num {
  border-right: 1px solid #e6e7e8;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0 15px 0 10px;
  font-size: 16px;
  margin-right: 10px;
  p{
    display: inline-block;
  }
  i{
    margin-left: 10px;
  }
}
.select{
  min-width: 330px;
  max-width: 440px;
  padding:20px 10px;
  position: absolute;
  left: 0px;
  height: 230px;
  overflow: auto;
  background: white;
  z-index: 999;
  border: 1px solid #8c939d;
  li{
    height: 30px;
  }
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
  .el-popover{
    height: 200px;
    overflow: auto;
  }
.state-popover {
  padding: 10px 20px;
}
</style>
