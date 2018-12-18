<template>
  <div>
      <header class="flex-wrap flex-align-center" id="header" :class="searchBarFixed ? 'fixed' : ''">
      <div class="flex-wrap flex-align-center flex-1">
        <router-link to="/"><img src="../../assets/images/populstay-logo-full-colour.svg" alt="" v-show="!searchBarFixed"></router-link>
        <router-link to="/"><img src="../../assets/images/populstay-logomark.svg" alt="" v-show="searchBarFixed"></router-link>
        <el-popover placement="bottom" width="520" trigger="manual"  v-model="searchListShow" popper-class="inpput_keyList">
          <ul>
            <li class="flex-wrap flex-align-center"  v-for="(item, index) in searchList" :key="index" @click="selectSeach(item)">
              <i class="icon iconfont icon-location3dingwei3"></i>
              <span>{{item.fullAddress}}</span>
            </li>
            <li v-show="!searchList.length"><span>There is no data</span></li>
            <!-- <li class="flex-wrap flex-align-center"><i class="icon iconfont icon-185038homehousestreamline"></i><span>Homes in Tokyo, Japan</span></li>
            <li class="flex-wrap flex-align-center"><i class="icon iconfont icon-location3dingwei3"></i><span>Tokyo Station, Tokyo</span></li>
            <li class="flex-wrap flex-align-center"><i class="icon iconfont icon-location3dingwei3"></i><span>TokyoShinjuku-ku</span></li> -->
          </ul>
          <div class="input-wrap flex-wrap flex-align-center" v-show="searchBarFixed" slot="reference" offset="20">
            <i class="icon iconfont icon-search"></i>
            <input type="text" placeholder="Enter a destination or keyword" @input="input" v-model="searchValue">
          </div>
        </el-popover>
      </div>
      <!-- 未登录导航 -->
      <ul class="flex-wrap flex-align-center flex-1 flex-content-end" v-if="userData == null" :class="{ 'block' : show }" >
        <li class="nav-item"><router-link to="/becomeHost/propertyTypes">Become a host</router-link></li>
        <li class="nav-item"><router-link to="/trips/tripsList">Trips</router-link></li>
        <li class="nav-item"><router-link to="/trips/messages">Messages</router-link></li>
        <li class="nav-item"><router-link to="/trips/walletHome">Wallet</router-link></li>
        <li class="red"><a href="javascript:void(0)" @click="$store.state.show_signup = true">Sign up</a></li>
        <li class="red"><a href="javascript:void(0)" @click="$store.state.show_login = true">Log in</a></li>
      </ul>
      <!-- 登录后导航 -->
      <ul class="flex-wrap flex-align-center flex-1 flex-content-end" v-else :class="{ 'block' : show }" >
        <li class="nav-item"><router-link to="/becomeHost/propertyTypes">Start hosting</router-link></li>
        <li class="nav-item"><router-link to="/trips/tripsList">Trips</router-link></li>
        <li class="nav-item"><router-link to="/trips/messages">Messages</router-link></li>
        <li class="nav-item"><router-link to="/trips/walletHome">Wallet</router-link></li>
        <li class="photo">
          <el-popover placement="bottom-end" width="150" trigger="click" popper-class="photo_popper" :offset="20">
            <ul class="photo_popper_item">
              <li class="active"><router-link to='/trips/editProfile'>Edit profile</router-link></li>
              <li><router-link to='/trips/security'>Security</router-link></li>
              <li @click="logout">Log out</li>
            </ul>
            <div class="img-wrap" slot="reference">
              <span class="img" :style="{backgroundImage:'url(' + userData.image_url + ')'}" ></span>
            </div>
          </el-popover>
        </li>
      </ul>

      <i class="icon iconfont icon-daohang" @click="navShow"></i>
    </header>
    <!-- 响应式全屏导航-->
    <div class="fixed phoneNav" v-if="show">
      <div class="close">
        <i class="icon iconfont icon-aui-icon-close" @click="show = false"></i>
      </div>
      <!-- 未登录导航 -->
      <ul v-if="userData == null">
        <li @click="show = false"><router-link to="/becomeHost/propertyTypes">Become a host</router-link></li>
        <li @click="show = false"><router-link to="/trips/tripsList">Trips</router-link></li>
        <li @click="show = false"><router-link to="/trips/messages">Messages</router-link></li>
        <li @click="show = false"><router-link to="/trips/create">Wallet</router-link></li>
        <li @click="show = false" class="red"><a href="javascript:void(0)" @click="$store.state.show_signup = true">Sign up</a></li>
        <li @click="show = false" class="red"><a href="javascript:void(0)" @click="$store.state.show_login = true">Log in</a></li>
      </ul>
      <ul class="phoneNav_nav" v-else>
        <li @click="show = false">
          <span class="img" :style="{backgroundImage:'url(' + userData.image_url + ')'}" ></span>
        </li>
        <li @click="show = false"><router-link to="/becomeHost/propertyTypes">Start hosting</router-link></li>
        <li @click="show = false"><router-link to="/trips/tripsList">Trips</router-link></li>
        <li @click="show = false"><router-link to="/trips/messages">Messages</router-link></li>
        <li @click="show = false"><router-link to="/trips/create">Wallet</router-link></li>
      </ul>
      <ul v-if="userData !== null">
        <li class="active" @click="show = false"><router-link to='/trips/editProfile'>Edit profile</router-link></li>
        <li @click="show = false">Security</li>
        <li @click="logout">Log out</li>
      </ul>
    </div>
    <!-- 响应式全屏导航-->
    <e-login @login="login"></e-login>
    <e-sign-up @login="login"></e-sign-up>
    <e-sign-up-succ></e-sign-up-succ>
    <e-terms></e-terms>
    <e-verify></e-verify>
    <e-newpsw></e-newpsw>
    <e-reset></e-reset>
    <e-resetPassword></e-resetPassword>
  </div>
</template>

<script>
import login from '../login/login'
import signUp from '../login/sign_up'
import signUpSucc from '../login/sign_up_succ'
import terms from '../login/terms'
import verify from '../login/verify'
import newpsw from '../login/newpsw'
import reset from '../login/reset_succ'
import resetPassword from '../login/resetPassword'
export default {
  name: 'naver',
  props: {
    searchShow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'e-login': login,
    'e-sign-up': signUp,
    'e-sign-up-succ': signUpSucc,
    'e-terms': terms,
    'e-verify': verify,
    'e-newpsw': newpsw,
    'e-reset': reset,
    'e-resetPassword': resetPassword
  },
  data () {
    return {
      show: false,
      searchListShow: false,
      searchBarFixed: false,
      searchValue: '',
      userData: null,
      searchList: []
    }
  },
  mounted () {
    this.userData = this.$store.state.userInfo
    window.addEventListener('scroll', this.handleScroll) // 滚动监听
  },
  methods: {
    navShow () {
      this.show = !this.show
    },
    // 滚动监听
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var offsetTop = document.querySelector('#header').offsetTop
      if (scrollTop > offsetTop) {
        this.searchBarFixed = true
        this.searchList = false
      } else {
        this.searchBarFixed = false
      }
      // var Before_scollH = 0
      // var differH = scrollTop - Before_scollH;
      //   if (differH == 0) {
      //       return false;
      //   }
      //   var scollType = differH > 0 ? 'down' : 'up';
      //   Before_scollH = After_scollH;
      //   if(scollType == 'down')
    },
    // 输入框输入事件
    input (val) {
      this.searchValue === '' ? this.searchListShow = false : this.searchListShow = true
      this.$get(this.cityUrl + '/cities?filterKey=text&pageSize=5&filterValue=' + this.searchValue).then(res => {
        if (res.code === 200) {
          this.searchList = res.data.dataList
        }
      })
    },
    // 点击搜索出来的列表
    selectSeach (val) {
      this.searchValue = val.fullAddress
      this.searchListShow = false
    },
    // 登录
    login () {
      this.userData = this.$store.state.userInfo
    },
    // 退出
    logout () {
      this.show = false
      this.$confirm('Are you sure to exit?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      }).then(() => {
        this.$store.commit('userUpdate', null)
        this.userData = null
        this.$router.push('/')
      })
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  watch: {
    userInfo (value, newval) {
      this.userData = value
    }
  }
}
</script>

<style scoped lang="scss">
$red-color: #F4436C;
input::-webkit-input-placeholder {
  font-family: Roboto-Regular;
  color: #B1B3B6;
}
header {
  padding: 0 100px;
  height: 100px;
  font-family: Roboto-Regular!important;
  border-bottom: 1px solid #eee;
  width: 100%;
  z-index: 1000;
  background: #fff;
  box-sizing: border-box;
  li {
    padding: 0 10px;
    font-size: 16px;
  }
  .nav-item {
    height: 52px;
    line-height: 52px;
    &:hover {
      color: $red-color;
      border-bottom: 1px solid $red-color;
    }
  }
  .nav-active {
    color: $red-color;
    border-bottom: 1px solid $red-color;
  }
  .red {
    color: $red-color;
  }
  .input-wrap {
    width: 480px;
    height: 46px;
    padding: 0 20px;
    background: #FFFFFF;
    border: 1px solid #E6E7E8;
    border-radius: 5px;
    margin-left: 30px;
    position: relative;
    .icon-search {
       font-size: 26px;
       margin-right: 10px;
       cursor: pointer;
       margin-bottom: 3px;
    }
    input {
      border: none;
      font-size: 16px;
      width: 90%;
    }
    .keyList {
      position: absolute;
      background: #f5f7fa;
      border: 1px solid #ebeef5;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      border-radius: 3px;
      top: 52px;
      left: 20px;
      width: 90%;
      padding: 10px 0;
      box-sizing: border-box;
      .icon-sanjiaoxing {
        color: #f5f7fa;
        position: absolute;
        top: -8px;
        left: 25px;
      }
      li {
        font-family: Roboto-Regular;
        font-size: 16px;
        padding: 0 20px;
        color: #B1B3B6;
        cursor: pointer;
        height: 34px;
        line-height: 34px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:hover {
          background-color: #fff;
        }
      }
    }
  }
  .icon-daohang {
    font-size: 30px;
    display: none;
    cursor: pointer;
  }
  .icon-touxiang1 {
    font-size: 50px;
    color: #b1b3b6;
    cursor: pointer;
    margin-left: 10px;
  }
}
.block {
  display: block!important;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
}
.photo_popper_item {
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #000;
  line-height: 24px;
  li {
    margin-bottom: 15px;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0
    }
  }
  .active {
    color: #F4436C;
  }
}
.img-wrap {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff!important;
  .img {
    display: inline-block;
    width: 100%;
    height: 100%;;
    border-radius: 50%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
  }
}
.phoneNav {
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 10000;
  padding: 30px 10px;
  box-sizing: border-box;
  .close {
    text-align: right;
    padding-right: 10px;
  }
  .icon-aui-icon-close {
    color: #585858;
    font-size: 30px;
    cursor: pointer;
  }
  ul {
    padding: 20px 0;
    li {
      margin-bottom: 20px;
      font-family: Roboto-Regular;
      font-size: 18px;
      color: #585858;
      letter-spacing: 0;
      &:last-child {
        margin-bottom: 0;
      }
      &:hover {
        color: $red-color;
      }
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .red {
      color: $red-color;
    }
  }
  .phoneNav_nav {
    border-bottom: 1px solid #E6E7E8;
    li {
      .img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: inline-block;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      &:first-child {
        text-align: center;
      }
    }
  }
}
@media only screen and (min-width:800px) and (max-width: 1200px) {
  header {
    padding: 0 10px;
    .input-wrap {
      width: 300px
    }
    li {
      padding: 0 8px;
    }
  }
}
@media only screen  and (max-width: 800px) {
  .inpput_keyList {
    width: 300px
  }
  header {
    padding: 0 10px;
    position: relative;
    .input-wrap {
      width: 300px
    }
    ul {
      display: none;
      position: absolute;
      top: 70px;
      right: 10px;
      z-index: 1000;
      border-radius: 3px;
      border: 1px solid #eee;
      li {
        background: #fff;
        padding: 10px;
        border-bottom: 1px solid #eee
      }
    }
    .icon-daohang {
      display: block;
    }
  }
}
@media only screen  and (max-width: 500px) {
  header {
    .input-wrap {
      margin-left: 5px;
      margin-right: 5px;
      width: 250px;
      padding: 0 5px;
      .icon-search {
        margin-right: 2px;
      }
    }
  }
}
</style>

<style lang="scss">
.photo_popper {
  box-sizing: border-box;
  width: 150px;
  padding: 20px;
}
.photo_popper.el-popper[x-placement^=bottom] {
  margin-top: 20px;
}
.inpput_keyList {
  padding: 30px 20px;
  box-sizing: border-box;
  li {
    margin-bottom: 15px;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
    }
    i {
      font-size: 20px;
      color: #4A4A4A;
      margin-right: 20px;
    }
    span {
      font-family: Roboto-Regular;
      font-size: 16px;
      color: #4A4A4A;
    }
  }
}
@media only screen and (max-width: 1200px) {
  .inpput_keyList {
    width: 340px!important;
  }
}
</style>
