<template>
  <div>
    <div class="wrap">
      <div class="wrap-header">Verify your Phone Number</div>
      <div class="content">
        <div class="step-content" v-if="step === 1">
          <div class="step-input step-input2" v-show="$route.query.type === 'add'">
           <el-select placeholder="United States" v-model="select" @change="data.first = select">
            <el-option v-for="item in nation" :key="item.value" :label="item.name" :value="item.code"></el-option>
          </el-select>
          </div>
          <div class="step-input phoneNumber step-input2 flex-wrap" v-show="$route.query.type === 'add'">
            <div class="first">{{data.first}}</div>
            <div class="input-wrap flex-1">
            <input type="text" v-model="data.phone_number" placeholder="Phone Number">
            </div>
          </div>
          <div class="step-input step-input2">
            <el-input type="password" placeholder="Password" v-model="data.encrypted_password"></el-input>
          </div>
          <div class="r-button button" @click="next">Next</div>
        </div>
        <div class="step-content3" v-if="step === 2">
          <i class="icon iconfont icon-success"></i>
          <p v-if="$route.query.type === 'add'">Your Phone Number has been verified successfully.</p>
          <p v-else>Your phone number has been deleted successfully</p>
          <div class="r-button button"><router-link to="security">Back</router-link></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const sha256 = require('js-sha256').sha256
export default {
  data () {
    return {
      step: 1,
      data: {
        phone_number: '',
        encrypted_password: '',
        first: '+86'
      },
      canClick: true,
      nation: this.$store.state.nation,
      select: '+86'
    }
  },
  methods: {
    next () {
      if (this.data.encrypted_password === '') return false
      this.$post(this.userUrl + '/user', {
        action: 'updateUserPrivateInfo',
        data: {
          user_id: this.$store.state.userInfo.user_id,
          encrypted_password: sha256(this.data.encrypted_password),
          user_data: {
            phone_number: this.data.phone_number !== '' ? this.data.first + this.data.phone_number : ''
          }
        }
      }).then((res) => {
        if (res.msg.code === 200) {
          this.step = this.step + 1
          let user = this.$store.state.userInfo
          user.phone_number = res.data.phone_number
          this.$store.commit('userUpdate', user)
        } else {
          this.$alert('Please try again', 'Warning', {
            confirmButtonText: 'Confirm'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
$red-color: #F4436C;
.phoneNumber {
  border: 1px solid #dcdfe6;
  width: 100%;
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
    padding: 30px;
    .step-content {
      margin: 50px auto;
      width: 300px;
      p {
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 1px;
        line-height: 22px;
        margin-bottom: 15px;
      }
      .step-input {
        position: relative;
        span {
          position: absolute;
          right: 20px;
          color: $red-color;
          font-family: Roboto-Regular;
          font-size: 16px;
          top: 15px;
          cursor: pointer;
        }
      }
      .step-input2 {
        margin-bottom: 15px;
      }
      .button {
        font-family: Roboto-Medium;
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 1px;
        height: 50px;
        line-height: 50px;
        margin-top: 40px;
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .step-content3 {
      margin: 50px 0;
      text-align: center;
      .icon-success {
        font-size: 80px;
        color: $red-color;
        padding-bottom: 12px;
        display: inline-block;
      }
      p {
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0;
      }
      .button {
          width: 180px;
          font-family: Roboto-Medium;
          font-size: 16px;
          color: #FFFFFF;
          letter-spacing: 1px;
          height: 50px;
          line-height: 50px;
          margin: 35px auto 0 auto;
      }
    }
  }
}
.disabled{
  border-color: #ddd;
  cursor: not-allowed;
}
@media only screen and (max-width: 900px) {
  .wrap {
    width: 100%;
  }
}
@media only screen and (max-width: 500px) {
  .wrap {
    .wrap-header {
      padding: 0 10px;
    }
    .content {
      padding: 30px 10px;
    }
  }
}
</style>

<style>
.step-input .el-input__inner {
  height: 46px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
}
.step-input .el-select {
  width: 100%;
}
</style>
