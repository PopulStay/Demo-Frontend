<template>
<div class="verify-model-out">
  <el-dialog :visible.sync="$store.state.show_verify" :close-on-click-modal="true"  @close="close">
    <div class="login-frame-content">
      <p class="red-color XY-fz30 lineh36" style="margin-bottom:14px;">{{$t('message.Resetpassword')}}</p>
      <div class="input-text">
        <phoneInput v-model="number" ref="phoneInput"></phoneInput>
      </div>
      <div class="input-text">
        <input type="text" :placeholder="$t('message.Verificationcode')" class="psw" v-model="code" maxlength="6">
        <p @click="countDown" class="login-sendCode XY-cursorp red-color XY-fz16" :class="{disabled: !this.canClick}">{{content}}</p>
      </div>
      <div class="input-text">
        <input type="password" :placeholder="$t('message.Password')" class="psw" v-model="newpsw" @blur="blurPassword"/>
      </div>
      <p class="warning-password" v-show="passwordStrength">{{$t('message.Pleaseenteryourpasswordintheformat')}}</p>
      <button class="login-btn XY-fz16 XY-colf XY-cursorp" @click="toNewpsw">{{$t('message.Next')}}</button>
      <div class="flex-wrap flex-center verify-Next XY-cursorp" @click="toLogin">
        <i class="iconfont icon-54 red-color"></i>
        <span class="red-color XY-fz16">{{$t('message.BacktoLogin')}}</span>
      </div>
    </div>
  </el-dialog>
  <p v-if="$i18n.locale != language ? onloading() : null"></p>

</div>
</template>

<script>
import phoneInput from '../common/phoneInput'
import utils from '../../utils/utils.js'
const sha256 = require('js-sha256').sha256
export default {
  components: {
    'phoneInput': phoneInput
  },
  data () {
    return {
      language: this.$i18n.locale,
      psw: '',
      code: '',
      checked: false,
      isCode: false,
      content: this.$t('message.Send'),
      totalTime: 60,
      canClick: true,
      showThis: null,
      number: '',
      newpsw: '',
      passwordStrength: false,
      clock: ''
    }
  },
  methods: {
    onloading(){
      this.language = this.$i18n.locale;
      this.content = this.$t('message.Send')
    },
    countDown () {

      if(this.$store.state.warning == ""){
        let data = {}
        if (this.number.indexOf('@') === -1) {
          data = {phone_number: this.$refs.phoneInput.first + this.number, send_method: 'phone'}
        } else {
          data = {email_address: this.number, send_method: 'email'}
        }

        if (this.canClick && this.$store.state.warning==""){
          this.$post(this.userUrl + '/user', {
            action: 'sendUserUpdatePasswordVerificationCode',
            data: data
          }).then((res) => {
            if (res.msg.code === 200) {
              this.canClick = false
              this.content = this.totalTime + 's'
              console.log(this.content)
              this.clock = window.setInterval(() => {
                this.totalTime--
                this.content = this.totalTime + 's'
                if (this.totalTime < 0) {
                  window.clearInterval(this.clock)
                  this.content = this.$t('message.Send')
                  this.totalTime = 60
                  this.canClick = true
                }
              }, 1000)
            } else {
              this.$notify({
                title: this.$t('message.Warning'),
                message: this.$t('message.Operationfailedpleasetrylater'),
                type: 'warning'
              });
            }
          })
        }
      }


    },
    toLogin () {
      this.totalTime = 60
      this.$store.state.show_verify = false
      this.$store.state.show_login = true
    },
    toNewpsw () {
      if (this.newpsw === '' || this.code === '' || this.passwordStrength) return false

      if(this.number.indexOf('@') === -1){
        this.$post(this.userUrl + '/user', {
          action: 'updateUserPasswordWithCode',
          data: {
            phone_number: this.$refs.phoneInput.first + this.number,
            recover_password_code: this.code,
            new_encrypted_password: sha256(this.newpsw)
          }
        }).then((res) => {
          if (res.msg.code === 200) {
            this.$store.state.show_verify = false
            this.$store.state.show_resetcuss = true
          } else {

            this.$notify({
              title: this.$t('message.Warning'),
              message: this.$t('message.Operationfailedpleasetrylater'),
              type: 'warning'
            });
          }
        })
      }else{
        this.$post(this.userUrl + '/user', {
          action: 'updateUserPasswordWithCode',
          data: {
            email_address: this.number,
            recover_password_code: this.code,
            new_encrypted_password: sha256(this.newpsw)
          }
        }).then((res) => {
          if (res.msg.code === 200) {
            this.$store.state.show_verify = false
            this.$store.state.show_resetcuss = true
          } else if(res.msg.code === 952){
            this.$notify({
              title: this.$t('message.Warning'),
              message: this.$t('message.incorrectverificationcode'),
              type: 'warning'
            });
          } else {
            this.$notify({
              title: this.$t('message.Warning'),
              message: this.$t('message.Operationfailedpleasetrylater'),
              type: 'warning'
            });
          }
        })
      }

    },
    blurPassword () {
      utils.checkPassword(this.newpsw) ? this.passwordStrength = true : this.passwordStrength = false
    },
    close () {
      this.number = ''
      this.newpsw = ''
      this.code = ''
      this.$refs.phoneInput.number = ''
      this.content = this.$t('message.Send')
      this.totalTime = 60
      window.clearInterval(this.clock)
      this.canClick = true
    }
  },
  computed: {
    resetNumber () {
      return this.$store.state.resetNumber
    }
  },
  watch: {
    resetNumber (value, newval) {
      this.number = value
    }
  }
}
</script>

<style scoped lang="scss">
$red-color: #f4436c;
.verify-model-out {
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
.verify-model-out {
  .login-frame-content {
    padding: 20px 30px 25px;
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
    .verify-Next{
      margin-top: 25px;
      >span{
        margin-left: 4px;
      }
    }
    .icon-54{
      transform: rotate(90deg);
      font-size: 20px;
    }
  }
}
.warning-password {
  font-family: Roboto-Regular;
  color: #F4436C;
}
</style>
<style lang="scss">
.verify-model-out {
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
</style>
