<template>
  <div>
    <div class="wrap security-wrap">
      <div class="wrap-header">Reset password</div>
      <div class="content password">
        <div class="item-input">
           <el-input placeholder="Old password" type="password" v-model="password.old"></el-input>
        </div>
        <div class="item-input">
          <el-input  type="password" placeholder="New password" v-model="password.new" @blur="blurPassword"></el-input>
          <p class="warning-password" v-show="passwordStrength === 'length'">The password length is between 6 and 20 bits</p>
          <p class="warning-password" v-show="passwordStrength === 'weak'">cryptographic strength: weak</p>
          <p class="warning-password" v-show="passwordStrength === 'middle'">cryptographic strength: middle</p>
        </div>
        <div class="flex-wrap flex-center-between flex-wrap-wrap">
          <div>
            <el-input type="password" placeholder="Confirm new password" v-model="password.confirmNew" @blur="confirm"></el-input>
            <p class="warning-password" v-show="confirm_password">Please enter the correct password</p>
          </div>
          <div class="r-button button" @click="changePassword">Save</div>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div class="wrap-header">Phone number</div>
      <div class="content">
        <!-- <div class="content-wrap phone" v-if="phoneStep === 'addphone'">
          <h5>Add a phone number</h5>
          <p>We’ll send notifications to this phone number.</p>
          <el-select placeholder="United States" v-model="select" @change="phone.first = select">
            <el-option v-for="item in nation" :key="item.value" :label="item.name" :value="item.code"></el-option>
          </el-select>
          <div class="phoneNumber flex-wrap">
            <div class="first">{{phone.first}}</div>
            <div class="input-wrap flex-1">
              <input type="text" v-model="phone.phoneNum">
            </div>
          </div>
          <div class="flex-wrap button-wrap flex-center-between">
            <div class="r-button" @click="sms">Verify via SMS</div>
            <div class="r-button" @click="phoneStep = 'phone'">Verify via phone</div>
          </div>
        </div>
        <div class="content-wrap phone sms" v-if="phoneStep === 'sms'">
          <h5>Enter your security code</h5>
          <p>We texted your code to +1 212***5268.<br>It may take a minute to arrive.</p>
          <div class="sms">
            <el-input></el-input>
          </div>
          <p class="reset">Didn’t get it? <span class="red">Try again</span></p>
          <div class="flex-wrap button-wrap flex-center-between code">
            <div class="r-button" @click="phoneStep = 'list'">Verify</div>
            <div class="red" @click="phoneStep = 'phone'">Verify via phone</div>
          </div>
        </div>
        <div class="content-wrap phone"  v-if="phoneStep === 'phone'">
          <h5>Enter your security code</h5>
          <p>We’ll call you with your code at +1 212***5268.</p>
          <div class="sms">
            <el-input></el-input>
          </div>
          <p class="reset">Didn’t get it? <span class="red">Try again</span></p>
          <div class="flex-wrap button-wrap flex-center-between code">
            <div class="r-button"  @click="phoneStep = 'list'">Verify</div>
            <div class="red">Text me instead</div>
          </div>
        </div> -->
        <p class="text" v-if="user.phone_number == '' || user.phone_number == null ">No phone number entered<br>We’ll send you booking requests, reminders, and other notifications.</p>
        <p class="text red" v-if="user.phone_number == '' || user.phone_number == null"><router-link :to="{path:'ChangePhone', query: {type: 'Add'}}">Add a phone number</router-link></p>
        <ul class="phone-list phone" v-else>
          <li class="flex-wrap flex-center-between">
            <div class="info flex-wrap flex-align-center">
              <span class="number flex-2">{{ user.phone_number.substr(0,6) + "****" + user.phone_number.substr(user.phone_number.length-4) }}</span>
              <span class="red flex-1" @click="Remove = true; RemoveType = 1">Remove</span>
              <span class="red flex-1"><router-link :to="{path:'ChangePhone', query: {type: 'Change'}}">Change</router-link></span>
            </div>
            <div class="r-button button" :class="user.user_identity_confirmation.phone_verified === 'true' ? 'verfied' : ''">
              <div v-show="user.user_identity_confirmation.phone_verified === 'true'">Verified</div>
              <div v-show="user.user_identity_confirmation.phone_verified != 'true'" @click="showVerify = true">verification</div>
              <!-- <router-link :to="{path:'ChangePhone'}" v-else>Change</router-link> -->
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="wrap">
      <div class="wrap-header">Email address</div>
      <div class="content password">
        <p class="text" v-if="user.email_address == '' || user.email_address == null ">No Email address entered<br>We’ll send you booking requests, reminders, and other notifications.</p>
        <p class="text red" v-if="user.email_address == '' || user.email_address == null"><router-link  :to="{path:'VerifyEmail', query: {type: 'add'}}">Add a Email address</router-link></p>
        <div class="flex-wrap flex-center-between flex-wrap-wrap" v-else>
          <div class="email-wrap flex-wrap flex-align-center">
           <p class="text flex-2">{{user.email_address}}</p>
            <span class="red flex-1" @click="Remove = true; RemoveType = 2">Remove</span>
            <!--<span class="red flex-1"><router-link :to="{path:'ChangePhone'}">Change</router-link></span>-->
             <span class="red flex-1"><router-link :to="{path:'VerifyEmail', query: {type: 'email'}}">Change</router-link></span>
          </div>
          <div class="r-button button" :class="user.user_identity_confirmation.email_verified === 'true' ? 'verfied' : ''">
            <div v-show="user.user_identity_confirmation.email_verified === 'true'">Verified</div>
            <div v-show="user.user_identity_confirmation.email_verified != 'true'" @click="showVerify = true">verification</div>
            <!-- <router-link :to="{path:'ChangePhone'}">Change</router-link> -->
          </div>
        </div>
      </div>
    </div>

    <!--验证手机/邮箱-->
    <el-dialog :visible.sync="showVerify" width="25%" class="checkoutWrap" :close-on-click-modal="true">
      <div class="verify-code">
        Please enter verification code
      </div>
      <div class="input-wrap">
        <input type="text" placeholder="Verifiction Code">
      </div>
      <div class="flex-wrap flex-center-between">
        <div class="button" @click="showVerify = false">Cancel</div>
        <div class="button" @click="showVerify = false">Confirm</div>
      </div>
    </el-dialog>

    <!--删除手机/邮箱-->
    <el-dialog :visible.sync="Remove" width="25%" class="checkoutWrap" :close-on-click-modal="true">
      <div class="verify-code">
        Please enter your password
      </div>
      <div class="input-wrap">
        <input type="password" placeholder="Password" v-model="UserPassword">
      </div>
      <div class="flex-wrap flex-center-between">
        <div class="button" @click="Remove = false">Cancel</div>
        <div class="button" @click="RemoveInfo">Confirm</div>
      </div>
    </el-dialog>

    <div class="wrap">
      <div class="wrap-header">Identity Card / Passport / Driver’s license</div>
      <div class="content password">
        <div class="flex-wrap flex-center-between flex-wrap-wrap" v-if="this.$store.state.userInfo.user_identity_confirmation.document_verified === 'true'">
          <p class="text">Your ID has been verified.</p>
          <div class="r-button button verfied">verified</div>
        </div>
        <div class="flex-wrap flex-center-between flex-wrap-wrap" v-if="this.$store.state.userInfo.user_identity_confirmation.document_verified === 'pendding'">
          <p class="text">We're still reviewing your ID.</p>
          <div class="r-button button" style="cursor: initial;">Waiting</div>
        </div>
        <div class="flex-wrap flex-center-between flex-wrap-wrap" v-if="this.$store.state.userInfo.user_identity_confirmation.document_verified === 'false'">
           <p class="text">You’ll need to provide identification before you book.</p>
           <div class="r-button button"><router-link to="VerifyIdentity">Verify</router-link></div>
        </div>
      </div>
    </div>

    <div class="warning" v-if="warningShow">
      <p>Your password has been reset. <i class="icon iconfont icon-aui-icon-close" @click="warningShow = false"></i></p>
    </div>
  </div>
</template>

<script>
import utils from '../../../utils/utils.js'
const sha256 = require('js-sha256').sha256
export default {
  data () {
    return {
      warningShow: false,
      Remove:false,
      RemoveType:0,
      select: '+1',
      phoneStep: '',
      password: {
        old: '',
        new: '',
        confirmNew: ''
      },
      passwordStrength: '',
      confirm_password: false,
      nation: this.$store.state.nation,
      phone: {
        first: '+1',
        phoneNum: ''
      },
      showVerify: false,
      user: '',
      UserPassword:''
    }
  },
  created () {
    this.user = this.$store.state.userInfo
  },
  methods: {
    // 密码修改确认按钮
    changePassword () {
      let password = this.password
      if (this.passwordStrength === 'length' || password.old === '' || password.new === '' || password.confirmNew === '') return false
      this.$post(this.userUrl + '/user', {
        action: 'updateUserPassword',
        data: {
          user_id: this.$store.state.userInfo.user_id,
          need_old_encrypted_password: 'true',
          old_encrypted_password: sha256(password.old),
          new_encrypted_password: sha256(password.new)
        }
      }).then((res) => {
        if (res.msg.code === 200) {
          this.password = {
            old: '',
            new: '',
            confirmNew: ''
          }
          this.$message({
            message: 'Operation is successful',
            type: 'success'
          })
        } else {
          this.$alert('Operation failed, please try later', 'Warning', {
            confirmButtonText: 'Confirm'
          })
        }
      })
    },
    // 密码失焦判断
    blurPassword () {
      let passwordStrength = utils.checkPasswordStrength(this.password.new)
      passwordStrength ? this.passwordStrength = passwordStrength : this.passwordStrength = ''
    },
    confirm () {
      if (this.password.confirmNew !== this.password.new) {
        this.confirm_password = true
      } else {
        this.confirm_password = false
      }
    },
    RemoveInfo(){

      var user_data = {};

      if(this.RemoveType == 1){
        user_data={
          phone_number:''
        }
      }else{
        user_data={
          email_address:''
        }
      }

      this.$post(this.userUrl + '/user', {
        action: 'updateUserPrivateInfo',
        data: {
          user_id: this.$store.state.userInfo.user_id,
          encrypted_password: sha256(this.UserPassword),
          user_data : user_data
        }
      }).then((res) => {
        if (res.msg.code === 200) {

          this.UserPassword = '';
          this.Remove = false;
          let user = this.$store.state.userInfo

          if(this.RemoveType == 1){
            user.phone_number = null;
          }else{
            user.email_address = null;
          }

          this.$store.commit('userUpdate', user)
          this.$message({
            message: 'Operation is successful',
            type: 'success'
          })

        } else if(res.msg.code === 952) {
          this.$alert('Your password is entered incorrectly', 'Warning', {
            confirmButtonText: 'Confirm'
          })
        }
      })

    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  watch: {
    userInfo (value, newval) {
      this.user = value
    }
  }
}
</script>

<style scoped lang="scss">
$red-color: #F4436C;
.wrap {
  min-width: 300px;
  border: 1px solid #E6E7E8;
  margin-bottom: 50px;
  .wrap-header {
    height: 46px;
    line-height: 46px;
    padding: 0 30px;
    background: #f9f9f9;
    border-bottom:  1px solid #E6E7E8;
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
    letter-spacing: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .content {
    padding: 20px 30px;
    .r-button{
      margin-top: 15px;
    }
    .verfied{
      opacity: .5;
      cursor: default;
    }
    .item-input {
      margin-bottom: 20px;
    }
    .button {
      width: 130px;
      height: 50px;
      line-height: 52px;
      font-family: Roboto-Medium;
      font-size: 16px;
      letter-spacing: 1px;
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .text {
      font-family: Roboto-Regular;
      font-size: 16px;
      color: #4A4A4A;
      letter-spacing: 1px;
    }
    .red {
      color: $red-color;
      margin-top: 10px;
      cursor: pointer;
    }
  }
  .phone {
    .info {
      font-family: Roboto-Regular;
      font-size: 16px;
      color: #4A4A4A;
      letter-spacing: 1px;
      width: 70%;
      .number {
        font-family: Roboto-Medium;
      }
      .red {
        margin: 0
      }
    }
    .add {
      font-family: Roboto-Regular;
      font-size: 16px;
      letter-spacing: 1px;
    }
  }
  .password{
    font-family: Roboto-Medium;
    .text{
      font-family: Roboto-Medium;
    }
  }
}
.checkoutWrap {
  .input-wrap {
    border-bottom: 1px solid #E6E7E8;
    height: 60px;
    line-height: 60px;
    input {
      border: none;
      font-size: 16px;
      font-family: Roboto-Regular;
      color: #B1B3B6;
      letter-spacing: 0;
      width: 100%;
      padding: 0 15px;
      color: #B1B3B6;
      box-sizing: border-box;
    }
  }
  .verify-code{
    font-size: 20px;
  }
  .button {
    width: 40%;
    height: 50px;
    display: inline-block;
    background: $red-color;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 3px;
    cursor: pointer;
    margin-top: 30px;
    border-radius: 4px;
  }
}
.content-wrap {
  width: 380px;
  border: 1px solid #E6E7E8;
  margin-top: 20px;
  padding: 20px;
  box-sizing: border-box;
  h5 {
    font-family: Roboto-Medium;
    font-size: 16px;
    color: #4A4A4A;
    letter-spacing: 1px;
    margin: 0;
    font-weight: 100;
  }
  p {
    font-family: Roboto-Regular;
    font-size: 14px;
    color: #4a4a4a;
    letter-spacing: 1px;
    line-height: 19px;
    margin: 5px 0 15px 0;
  }
  .phoneNumber {
    border: 1px solid #E6E7E8;
    width: 336px;
    height: 46px;
    border-radius: 3px;
    margin: 15px 0;
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #585858;
    letter-spacing: 0;
    .first {
      width: 46px;
      height: 46px;
      line-height: 46px;
      text-align: center;
      border-right: 1px solid #E6E7E8;
    }
    .input-wrap {
      input {
        width: 100%;
        height: 44px;
        border: 0;
        padding: 0 20px;
        box-sizing: border-box;
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #585858;
        letter-spacing: 0;
      }
    }
  }
  .button-wrap {
    div {
      height: 50px;
      line-height: 50px;
      &:first-child {
        width: 150px;
      }
      &:last-child {
        width: 170px;
      }
    }
  }
  .reset {
    font-size: 16px;
    letter-spacing: 0;
    margin: 15px 0 20px 0;
  }
  .code {
    &:first-child {
      width: 126px;
    }
    .red {
      margin: 0
    }
  }
}
.warning {
  width: 100%;
  height: 70px;
  line-height: 70px;
  text-align: center;
  background: rgba(244,67,108,0.15);
  position: fixed;
  top: 100px;
  left: 0;
  p {
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #000000;
    letter-spacing: 0;
    position: relative;
    i {
      position: absolute;
      font-size: 30px;
      cursor: pointer;
      right: 30px;
    }
  }
}
.email-wrap{
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
  letter-spacing: 1px;
  width: 70%;
}
@media only screen and (max-width: 500px){
  .wrap {
    .wrap-header {
      padding: 0 10px;
    }
    .content  {
      padding: 20px 10px;
    }
  }
  .security-wrap{
    width: 100%;
  }
  .content-wrap {
    border: 0;
    padding: 0px;
  }
  .button-wrap {
    display: block;
    div {
      width: 100%!important;
      margin: 5px 0;
      text-align: center;
    }
  }
  .phone-list {
    li {
      display: block;
      .info {
        width: 100%!important;
        text-align: center;
      }
      .button {
        width: 100%;
        margin-top: 3px;
      }
    }
  }
}
.warning-password {
  font-family: Roboto-Regular;
  color: $red-color!important;
}
</style>

<style>
.password .el-input__inner{
  height: 50px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
}
.password .el-input{
  width: 350px;
}
.phone .el-input__inner{
  height: 46px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
}
.phone .el-input{
    width: 338px;
}
.sms .el-input{
  width: 126px;
}
@media only screen and (max-width: 500px){
  .password .el-input{
    width: 100%;
  }
}
@media only screen and (max-width: 600px) {
  .content-wrap, .phoneNumber,.phone .el-select, .phone .el-input {
    width: 100%!important;
  }
}
</style>
