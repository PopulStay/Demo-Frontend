<template>
  <div class="wrapper">
    <ul>
       <li class="flex-wrap wrapper-item">
          <div class="flex-1 step-title">
            Added
          </div>
          <div class="li-right">
             <div class="wrap">
              <div class="wrap-header">Phone number</div>
              <div class="content phone">
                <ul class="phone-list">
                  <li class="flex-wrap flex-center-between">
                    <div class="info flex-wrap flex-align-center">
                      <span class="flex-1">Phone numbers</span>
                      <span class="number flex-1">+1 212***5268</span>
                      <span class="red flex-1">Remove</span>
                    </div>
                    <div class="r-button button">
                      <router-link to="/trips/ChangePhone">Change</router-link>
                    </div>
                  </li>
                </ul>
                <p class="red add" @click="verify('addPhone')">Add a phone number</p>
              </div>
            </div>
          </div>
        </li>
        <li class="flex-wrap wrapper-item" v-show="setp.indexOf('addPhone') !== -1">
          <div class="flex-1 step-title">
            Add a phone number
          </div>
          <div class="li-right">
             <div class="wrap">
              <div class="wrap-header">Phone number</div>
              <div class="content phone">
                <p class="text">No phone number entered<br>We’ll send you booking requests, reminders, and other notifications.</p>
                <div class="content-wrap">
                  <h5>Add a phone number</h5>
                  <p>We’ll send notifications to this phone number.</p>
                  <el-select placeholder="United States">
                  </el-select>
                  <div class="phoneNumber flex-wrap">
                    <div class="first">+1</div>
                    <div class="input-wrap flex-1">
                      <input type="text">
                    </div>
                  </div>
                  <div class="flex-wrap button-wrap flex-center-between">
                    <div class="r-button" @click="verify('sms')">Verify via SMS</div>
                    <div class="r-button" @click="verify('phone')">Verify via phone</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="flex-wrap wrapper-item" v-show="setp.indexOf('sms') !== -1">
          <div class="flex-1 step-title">
            Verify via SMS
          </div>
          <div class="li-right">
             <div class="wrap">
              <div class="wrap-header">Phone number</div>
              <div class="content phone">
                <p class="text">No phone number entered<br>We’ll send you booking requests, reminders, and other notifications.</p>
                <div class="content-wrap">
                  <h5>Enter your security code</h5>
                  <p>We texted your code to +1 212***5268.<br>It may take a minute to arrive.</p>
                  <div class="sms">
                    <el-input></el-input>
                  </div>
                  <p class="reset">Didn’t get it? <span class="red">Try again</span></p>
                  <div class="flex-wrap button-wrap flex-center-between code">
                    <div class="r-button">Verify</div>
                    <div class="red">Verify via phone</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="flex-wrap wrapper-item" v-show="setp.indexOf('phone') !== -1">
          <div class="flex-1 step-title">
            Verify via phone
          </div>
          <div class="li-right">
             <div class="wrap">
              <div class="wrap-header">Phone number</div>
              <div class="content phone">
                <p class="text">No phone number entered<br>We’ll send you booking requests, reminders, and other notifications.</p>
                <div class="content-wrap">
                  <h5>Enter your security code</h5>
                  <p>We’ll call you with your code at +1 212***5268.</p>
                  <div class="sms">
                    <el-input></el-input>
                  </div>
                  <p class="reset">Didn’t get it? <span class="red">Try again</span></p>
                  <div class="flex-wrap button-wrap flex-center-between code">
                    <div class="r-button">Verify</div>
                    <div class="red">Text me instead</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      warningShow: false,
      setp: []
    }
  },
  methods: {
    verify (value) {
      this.setp.push(value)
    }
  }
}
</script>

<style scoped lang="scss">
$red-color: #F4436C;
.wrapper {
  width: 1500px;
  margin: 0 auto;
  padding: 50px 0;
}
.step-title {
  height: 46px;
  line-height: 46px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #585858;
  letter-spacing: 0;
}
.li-right {
  flex: 4;
}
.wrap {
  width: 820px;
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
  }
  .content {
    padding: 20px 30px;
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
    .button {
      width: 130px;
      height: 50px;
      line-height: 52px;
      font-family: Roboto-Medium;
      font-size: 16px;
      letter-spacing: 1px;
      a {
        width: 100%;
        height: 100%;
        display: inline-block;
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
    padding: 40px 30px;
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
}
@media only screen and (max-width: 1500px) {
  .wrapper {
    width: auto;
    padding: 50px 30px;
  }
}
@media only screen and (max-width: 1100px) {
  .wrapper {
    .wrapper-item {
      display: block;
      .li-right {
        .wrap {
          width: 100%;
        }
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  .wrapper {
    padding: 50px 10px;
    .phone {
      padding: 40px 10px;
      .content-wrap {
        border: 0;
        padding: 0px;
      }
      .button-wrap {
        display: block;
        div {
          width: 100%!important;
          margin: 5px 0;
          text-align: center
        }
      }
      .phone-list {
        li {
          display: block;
          .info {
            width: 100%;
            text-align: center;
          }
          .button {
            width: 100%;
            margin-top: 3px;
          }
        }
      }
    }
  }
}
</style>

<style>
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
@media only screen and (max-width: 600px) {
  .content-wrap, .phoneNumber,.phone .el-select, .phone .el-input {
    width: 100%!important;
  }
}
</style>
