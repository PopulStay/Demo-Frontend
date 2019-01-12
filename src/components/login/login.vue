<template>
<div class="login-model-out">
  <el-dialog :visible.sync="$store.state.show_login" :close-on-click-modal="true" @close="close">
      <div class="login-frame-content" ref="login">
        <p class="red-color XY-fz30 lineh36" style="margin-bottom:14px;">Welcome back!</p>
        <!-- <div class="input-text login-select">
          <el-select v-model="type">
            <el-option key="0" label="Email address" value="email"></el-option>
            <el-option key="1" label="Mobile number" value="phone"></el-option>
          </el-select>
        </div> -->
        <div class="input-text">
          <phoneInput v-model="data.number" ref="phoneInput" @cut="cut"></phoneInput>
        </div>
        <div class="input-text" v-if="!isCode">
          <input :type="checked ? 'text' : 'password'" placeholder="Password" ref="dataPsw" v-model="data.encrypted_password">
          <div class="XY-right lineb eye" @click="checked=!checked">
            <i class="iconfont icon-view XY-fz24 red-color" v-show="checked"></i>
            <i class="iconfont icon-hide XY-fz24" v-show="!checked"></i>
          </div>
        </div>
        <div class="input-text" v-else>
          <input type="text" placeholder="Verification code" ref="dataPsw" class="psw" v-model="data.code" maxlength="6">
          <p @click="countDown" class="login-sendCode XY-cursorp red-color XY-fz16" :class="{disabled: !this.canClick}">{{content}}</p>
        </div>
        <div class="login-select-trip red-color XY-fz14">
          <span class="XY-cursorp" v-if="!isCode" @click="isCodes()">Verification code login</span>
          <span class="XY-cursorp" v-else @click="isCode=!isCode">Password login</span>
          <span class="XY-cursorp" @click="toReset">Forgot password?</span>
        </div>
        <button class="login-btn XY-fz16 XY-colf XY-cursorp" @click="login" v-if="!isCode">Log in</button>
        <button class="login-btn XY-fz16 XY-colf XY-cursorp" @click="codeLogin" v-else>Log in</button>
        <p class="XY-fz14 XY-center sign-up-trip">Not a member yet?</p>
        <p class="XY-fz16 XY-center red-color sign-up XY-cursorp" @click="toSignUp">Sign up</p>
      </div>
  </el-dialog>
</div>
</template>

<script>
import phoneInput from '../common/phoneInput'
const sha256 = require('js-sha256').sha256
export default {
  components: {
    'phoneInput': phoneInput
  },
  data () {
    return {
      checked: false,
      isCode: false,
      content: 'Send',
      totalTime: 60,
      canClick: true,
      showThis: null,
      clock: '',
      data: {
        number: '',
        code: '',
        encrypted_password: ''
      },
      verify: []
    }
  },
  methods: {
    countDown () {
      if (!this.canClick || this.data.number === '') return false
      let data = {}
      if (this.$refs.phoneInput.type === 'phone') {
        data = {phone_number: this.$refs.phoneInput.first + this.data.number, send_method: 'phone'}
      } else {
        data = {email_address: this.data.number, send_method: 'email'}
      }
      this.$post(this.userUrl + '/user', {
        action: 'sendUserLogInCode',
        data: data
      }).then((res) => {
        if (res.msg.code === 200) {
          this.canClick = false
          this.content = this.totalTime + 's'
          this.clock = window.setInterval(() => {
            this.totalTime--
            this.content = this.totalTime + 's'
            if (this.totalTime < 0) {
              window.clearInterval(this.clock)
              this.content = 'Send'
              this.totalTime = 60
              this.canClick = true
            }
          }, 1000)
        } else {
          this.$alert('Please confirm whether to register or not', 'Warning', {
            confirmButtonText: 'Confirm'
          })
        }
      })
    },
    toReset () {
      this.$store.state.show_login = false
      this.$store.state.show_verify = true
    },
    toSignUp () {
      this.$store.state.show_login = false
      this.$store.state.show_signup = true
    },
    login () {
      if (this.data.number === '' || this.data.encrypted_password === '') { return false }
      let phone = ''
      let email = ''
      if (this.data.number.indexOf('@') === -1) {
        phone = this.$refs.phoneInput.first + this.data.number
      } else {
        email = this.data.number
      }
      this.$post(this.userUrl + '/user', {
        action: 'userLogIn',
        data: {
          email_address: email,
          phone_number: phone,
          encrypted_password: sha256(this.data.encrypted_password)
        }
      }).then((res) => {
        if (res.msg.code === 200) {
          this.$store.commit('userUpdate', res.data)
          this.$store.state.show_login = false
        } else {
          this.$alert('Password or email input error', 'Warning', {
            confirmButtonText: 'Confirm'
          })
        }
      })
    },
    // 验证码登录
    codeLogin () {
      if (this.data.number === '' || this.data.code === '') { return false }
      let phone = ''
      let email = ''
      if (this.data.number.indexOf('@') === -1) {
        phone = this.$refs.phoneInput.first + this.data.number
      } else {
        email = this.data.number
      }
      this.$post(this.userUrl + '/user', {
        action: 'userLogInWithLoginCode',
        data: {
          email_address: email,
          phone_number: phone,
          temp_login_code: this.data.code
        }
      }).then((res) => {
        if (res.msg.code === 200) {
          this.$store.commit('userUpdate', res.data)
          this.$store.state.show_login = false
        } else {
          this.$alert('Password or email input error', 'Warning', {
            confirmButtonText: 'Confirm'
          })
        }
      })
    },
    isCodes () {
      this.isCode = !this.isCode
      this.data = {
        number: '',
        code: '',
        encrypted_password: ''
      }
      this.$refs.phoneInput.number = ''
    },
    cut () {
      window.clearInterval(this.clock)
      this.content = 'Send'
      this.canClick = true
      this.totalTime = 60
    },
    // 关闭数据重置
    close () {
      this.data = {
        number: '',
        encrypted_password: ''
      }
      this.content = 'Send'
      this.canClick = true
      this.totalTime = 60
      window.clearInterval(this.clock)
      this.$refs.phoneInput.number = ''
    }
  }
}
</script>

<style scoped lang="scss">
$red-color: #f4436c;
.login-model-out {
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
.login-model-out {
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
      margin-top: 50px;
      height: 50px;
      line-height: 50px;
      outline: none;
      border: none;
    }
    .sign-up-trip {
      margin-top: 60px;
      color: #b1b3b6;
      letter-spacing: 0;
    }
    .sign-up {
      margin-top: 8px;
      letter-spacing: 0;
    }
    .disabled{
      // background-color: #ddd;
      border-color: #ddd;
      cursor: not-allowed; // 鼠标变化
// }
    }
  }
}
.warning {
  color: red
}
@media only screen and (max-width: 700px) {
  .login-model-out {
    .login-frame-content {
      padding: 20px 15px;
    }
  }
}
</style>
<style lang="scss">
.login-model-out {
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog{
    width: 33%;
    margin-top: 0 !important;
    min-width: 300px;
    max-width: 440px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .el-dialog__headerbtn{
    font-size:30px;
  }
}
@media only screen and (max-width: 700px) {
  .login-model-out {
    .el-dialog {
      width: 90%;
    }
  }
}
</style>

<style>
.login-select .el-select{
  width: 100%;
  margin-bottom: 20px;
}
.login-select .el-input__inner {
  height: 46px;
  font-size: 16px;
  color: #585858
}
</style>
