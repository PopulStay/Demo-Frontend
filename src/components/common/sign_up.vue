<template>
<div class="sign-up-model-out">
  <el-dialog :visible.sync="$store.state.show2">
      <div class="login-frame-content">
        <p class="red-color XY-fz30 lineh36" style="margin-bottom:14px;">Sign up</p>
        <div class="input-text">
          <input type="text" placeholder="First name"/>
        </div>
        <div class="input-text">
          <input type="text" placeholder="Last name"/>
        </div>
        <div class="input-text">
          <input type="text" placeholder="Email address / Mobile number" />
        </div>
        <div class="input-text">
          <input type="text" placeholder="Password" class="psw" v-model="psw" v-if="checked">
          <input type="password" placeholder="Password"  v-model="psw" v-else>
          <div class="XY-center lineb eye" @click="checked=!checked">
            <i class="iconfont icon-view XY-fz30 red-color" v-show="checked"></i>
            <i class="iconfont icon-hide XY-fz30" v-show="!checked"></i>
          </div>
        </div>
        <div class="input-text">
          <input type="text" placeholder="Confirm password" class="psw" v-model="pswC" v-if="checkedC">
          <input type="password" placeholder="Confirm password"  v-model="pswC" v-else>
          <div class="XY-center lineb eye" @click="checkedC=!checkedC">
            <i class="iconfont icon-view XY-fz30 red-color" v-show="checkedC"></i>
            <i class="iconfont icon-hide XY-fz30" v-show="!checkedC"></i>
          </div>
        </div>
        <div class="sign-up-trip">
          <span class="XY-fz14 XY-center sign-up-span-gray">By signing up, I agree to PopulStay's </span>
          <span class="XY-fz14 XY-center red-color sign-up-span-red XY-cursorp">Terms of Service<br />,Privacy Policy, Guest Refund Policy</span>
          <span class="XY-fz14 XY-center sign-up-span-gray">,<br />and </span>
          <span class="XY-fz14 XY-center red-color sign-up-span-red XY-cursorp">Host Guarantee Terms</span>
          <span class="XY-fz14 XY-center sign-up-span-gray">.</span>
        </div>
        <button class="login-btn fz16 XY-colf XY-cursorp" @click="SignUp">Sign up</button>
        <div class="sign-up-trip">
          <span class="XY-fz14 XY-center sign-up-span-b136">Already have an account? </span>
          <span class="XY-fz14 XY-center red-color sign-up-span-red XY-cursorp">Log in</span>
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
      psw: '',
      pswC: '',
      code: '',
      checked: false,
      checkedC: false,
      isCode: false,
      content: 'Send',
      totalTime: 60,
      canClick: true,
      showThis: null
    }
  },
  methods: {
    countDown () {
      if (!this.canClick) return
      this.canClick = false
      this.content = this.totalTime + 's'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = 'Send'
          this.totalTime = 60
          this.canClick = true
        }
      }, 1000)
    },
    SignUp () {
      // this.$store.state.show2 = false
      // this.$store.state.show3 = true
    }
  },
  created () {
    this.axios({
      methods: 'post',
      url: 'user'
    })
  }
}
</script>

<style scoped lang="scss">
$red-color: #f4436c;
.sign-up-model-out {
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
.sign-up-model-out {
  .login-frame-content {
    padding: 20px 30px;
    .input-text {
      width: 100%;
      border-bottom: 1px solid #e6e7e8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .login-sendCode{
        text-align: right;
      }
    }
    input {
      border: none;
      // border-bottom: 1px solid #E6E7E8;
      width: 70%;
      height: 60px;
      font-size: 16px;
      color: #4a4a4a;
    }
    input::placeholder {
      color: #b1b3b6;
    }
    .eye {
      width: 28%;
    }
    .login-select-trip {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
    .login-btn {
      background: $red-color;
      width: 100%;
      border-radius: 3px;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      outline: none;
      border: none;
    }
    .sign-up-trip {
      text-align: center;
      margin-top: 25px;
      color: #585858;
      letter-spacing: 0;
    }
    .sign-up-span-b136{
      color: #B1B3B6;
    }
    .sign-up {
      margin-top: 8px;
      letter-spacing: 0;
    }
  }
}
</style>
<style lang="scss">
.sign-up-model-out {
  .el-dialog__body{
    padding:0;
  }
  .el-dialog{
    width: 33%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .el-dialog__headerbtn{
    font-size:30px;
  }
}
</style>
