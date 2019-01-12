<template>
<div class="sign-up-model-out">
  <el-dialog :visible.sync="$store.state.show_signup" :close-on-click-modal="true" v-loading="loading" @close="close">
      <div class="login-frame-content">
        <p class="red-color XY-fz30 lineh36" style="margin-bottom:14px;">Sign up</p>
        <div class="input-text">
          <input type="text" placeholder="First name"
            v-model="data.first_name" @blur="bindingVerify('fname', data.first_name)"/>
        </div>
        <p class="warning" v-show="verify.indexOf('fname') !== -1">Please enter the correct name,The name length is between 3 and 20 bits</p>
        <!-- <p class="warning" v-show="verify.indexOf('fname') !== -1 && streng === 'length'">The password length is between 3 and 20 bits</p> -->
        <div class="input-text">
          <input type="text" placeholder="Last name" v-model="data.last_name"
          @blur="bindingVerify('lname', data.last_name)">
        </div>
        <p class="warning" v-show="verify.indexOf('lname') !== -1">Please enter the correct name,The name length is between 3 and 20 bits</p>
        <div class="input-text">
          <phoneInput v-model="data.email_address" @blur="bindingVerify('email', data.email_address)" ref="phoneInput"></phoneInput>
          <!-- <input type="text" placeholder="Email address / Mobile number" v-model="data.email_address" @blur="bindingVerify('email', data.email_address)"/> -->
        </div>
        <div class="input-text">
          <input :type="checked ? 'text' : 'password'" placeholder="Password" v-model="data.encrypted_password" @blur="bindingVerify('password', data.encrypted_password)">
          <div class="XY-right lineb eye" @click="checked=!checked">
            <i class="iconfont icon-view XY-fz24 red-color" v-show="checked"></i>
            <i class="iconfont icon-hide XY-fz24" v-show="!checked"></i>
          </div>
        </div>
        <p class="warning"  v-show="verify.indexOf('password') !== -1 || streng === 'length'">Please enter your password in the format 6-20 letters, numbers, special symbols</p>
        <p class="warning" v-show="streng === 'weak'">cryptographic strength: weak</p>
        <p class="warning" v-show="streng === 'middle'">cryptographic strength: middle</p>

        <div class="input-text">
          <input :type="checkedC ? 'text' : 'password'" placeholder="Confirm password" v-model="data.confirm_password" @blur="confirm">
          <div class="XY-right lineb eye" @click="checkedC=!checkedC">
            <i class="iconfont icon-view XY-fz24 red-color" v-show="checkedC"></i>
            <i class="iconfont icon-hide XY-fz24" v-show="!checkedC"></i>
          </div>
        </div>
        <p class="warning" v-show="confirm_password">Please enter the correct password</p>
        <div class="birthday">
          <h6>Birth date</h6>
          <p  class="warning"  v-show="birthdate18old">To sign up, you must be 18 or older. Other people won’tsee your birthday.</p>
          <div class="editProfile-select">
            <el-select v-model="date.month" placeholder="Month">
              <el-option v-for="item in list.month" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <el-select v-model="date.day" placeholder="Day">
              <el-option v-for="item in list.day" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <el-select v-model="date.year" placeholder="Year">
              <el-option v-for="item in list.year" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
        </div>
        <div class="sign-up-trip">
          <span class="XY-fz14 XY-center sign-up-span-gray">By signing up, I agree to PopulStay's </span>
          <span class="XY-fz14 XY-center red-color sign-up-span-red XY-cursorp" @click="toTerms">Terms of Service<br />,Privacy Policy, Guest Refund Policy</span>
          <span class="XY-fz14 XY-center sign-up-span-gray">,<br />and </span>
          <span class="XY-fz14 XY-center red-color sign-up-span-red XY-cursorp" @click="toTerms">Host Guarantee Terms</span>
          <span class="XY-fz14 XY-center sign-up-span-gray">.</span>
        </div>
        <button class="login-btn fz16 XY-colf XY-cursorp" @click="toSignUpS">Sign up</button>
        <div class="sign-up-trip">
          <span class="XY-fz14 XY-center sign-up-span-b136">Already have an account? </span>
          <span class="XY-fz14 XY-center red-color sign-up-span-red XY-cursorp" @click="toLogin">Log in</span>
        </div>
      </div>
    <!-- </div> -->
  </el-dialog>
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
      psw: '',
      pswC: '',
      code: '',
      checked: false,
      checkedC: false,
      isCode: false,
      canClick: true,
      showThis: null,
      confirm_password: false,
      date: {
        month: '',
        day: '',
        year: ''
      },
      data: {
        first_name: '',
        last_name: '',
        email_address: '',
        encrypted_password: '',
        confirm_password: '',
        birthdate: '',
        phone_number: '',
        invited_by: ''
      },
      list: {
        month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        day: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        year: []
      },
      loading: false,
      verify: [],
      streng: '',
      birthdate18old:false
    }
  },
  created () {
    // 生日可选年份
    let year = String(new Date()).split(' ')[3]
    for (let i = 1960; i >= 1960; i++) {
      if (i <= year) {
        this.list.year.unshift(i)
      } else {
        return
      }
    }
  },
  methods: {
    toSignUpS () {
      let date = this.date
      let data = this.data
      let birthdate = date.year + '-' + date.month + '-' + date.day

      this.verify = []

      if(utils.checkPassword(data.encrypted_password)){
        this.verify.push('password')
      }

      if(utils.checkName(data.last_name)){
        this.verify.push('lname')
      }

      if(utils.checkName(data.first_name)){
        this.verify.push('fname')
      }

      if(data.email_address == ""){
        this.$store.state.warning = 'email'
      }else{
        if (data.email_address.indexOf('@') === -1) {
          data.phone_number = data.email_address
        } else {
          var email = data.email_address
        }
      }

      if (!utils.checkAdult(birthdate)) {
        this.birthdate18old = true;
      }else{
        this.birthdate18old = false;
      }


      if(data.confirm_password != data.encrypted_password){
        this.confirm_password = true
      }else{
        this.confirm_password = false
      }

      if(this.verify.length === 0 && this.birthdate18old == false && this.confirm_password == false && this.$store.state.warning == ""){

        this.$post(this.userUrl + '/user', {
          action: 'userSignUp',
          data: {
            email_address: email,
            phone_number: this.$refs.phoneInput.first + data.phone_number,
            first_name: data.first_name,
            last_name: data.last_name,
            encrypted_password: sha256(data.encrypted_password),
            birthdate: birthdate,
            invited_by: data.invited_by
          }
        }).then((res) => {
          console.log(res)

          if (res.msg.code === 200) {
            this.$store.state.show_signup = false
            this.$store.state.show_succ = true
            this.$store.commit('userUpdate', res.data)
            this.$emit('login')
          }else if(res.msg.code === 953){

            if (data.email_address.indexOf('@') === -1) {

              this.$alert("The phone number has been registered", 'Warning', {
                confirmButtonText: 'Confirm'
              })

            } else {

              this.$alert("The email address is already registered", 'Warning', {
                confirmButtonText: 'Confirm'
              })

            }



          }else {
            this.$alert(res.msg.message, 'Warning', {
              confirmButtonText: 'Confirm'
            })
          }

        })

      }

    },
    toLogin () {
      this.$store.state.show_signup = false
      this.$store.state.show_login = true
    },
    toTerms () {
      this.$store.state.show_signup = false
      this.$store.state.show_term = true
    },
    confirm () {
      if (this.data.encrypted_password !== this.data.confirm_password) {
        this.confirm_password = true
      } else {
        this.confirm_password = false
      }
    },
    // 失焦验证
    bindingVerify (type, val) {
      let verify = this.verify

      if (type === 'fname') {
        utils.checkName(val) ? verify.push(type) : verify.splice(verify.indexOf(type), 1)
      }

      if (type === 'lname') {
        utils.checkName(val) ? verify.push(type) : verify.splice(verify.indexOf(type), 1)
      }

      if(type === 'Password'){
        utils.checkPassword(val) ? verify.push(type) : verify.splice(verify.indexOf(type), 1)
      }

      this.verify = [...new Set(this.verify)]
    },
    // 关闭数据重置
    close () {
      this.data = {
        first_name: '',
        last_name: '',
        email_address: '',
        encrypted_password: '',
        confirm_password: '',
        birthdate: '',
        phone_number: '',
        invited_by: ''
      }
      this.date = {
        month: '',
        day: '',
        year: ''
      }
      this.$refs.phoneInput.number = ''
    }
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
.warningText {
  font-weight: bold;
  color: #f4436c!important;
}
.birthday {
  margin: 20px 0;
  h6 {
    margin: 0 0 10px;
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
    letter-spacing: 0;
    line-height: 19px;
    font-weight: 100;
  }
  p {
    font-family: Roboto-Regular;
    font-size: 14px;
    color: #585858;
    letter-spacing: 0.35px;
    margin: 5px 0 15px 0;
  }
}
.warning {
  font-family: Roboto-Regular;
  color: $red-color!important;
}
@media only screen and (max-width: 700px) {
  .sign-up-model-out {
    .login-frame-content {
      padding: 20px 15px;
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
.editProfile-select .el-input__inner{
  flex: 1
  // width: 60px;
}
.editProfile-select {
  display: flex;
}
.editProfile-select ::-webkit-input-placeholder {
  color:#4a4a4a;
}
.editProfile-select .el-select {
  margin-right: 15px;
  margin-bottom: 5px;
}
.editProfile-select .el-select:last-child {
  margin-right: 0
}
@media only screen and (max-width: 500px){
  .sign-up-model-out .el-dialog__header{
    padding: 0;
    color: #585858;
  }
  .sign-up-model-out .el-dialog__body>.login-frame-conten{
    padding: 10px 0;
  }
}
@media only screen and (max-width: 700px) {
  .sign-up-model-out {
    .el-dialog {
      width: 90%;
    }
  }
}
</style>
