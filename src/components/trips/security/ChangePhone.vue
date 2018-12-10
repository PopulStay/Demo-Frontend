<template>
  <div>
    <div class="wrap">
      <div class="wrap-header">Change your phone number</div>
      <div class="content">
        <div class="step-title flex-wrap">
            <p :class="step > 0 ? 'active' : '' ">1. Verify your identity</p>
            <p class="flex-wrap flex-align-center" :class="step > 1 ? 'active' : '' "><span></span>2. Change your phone number</p>
            <p class="flex-wrap flex-align-center" :class="step > 2 ? 'active' : '' "><span></span>3. Updated successfully</p>
        </div>
        <div class="step-content" v-if="step === 1">
          <p>Verified phone number<br>+1 212***5268</p>
          <div class="step-input">
            <el-input placeholder="Verification code"></el-input>
            <span>Send</span>
          </div>
          <div class="r-button button" @click="next">Next</div>
        </div>
        <div class="step-content" v-if="step === 2">
          <div class="step-input step-input2">
            <el-input placeholder="New phone number"></el-input>
          </div>
          <div class="step-input">
            <el-input placeholder="Verification code"></el-input>
            <span>Send</span>
          </div>
          <div class="r-button button" @click="next">Next</div>
        </div>
        <div class="step-content3" v-if="step === 3">
          <i class="icon iconfont icon-success"></i>
          <p>Your phone number has been changed successfully.</p>
          <div class="r-button button"><router-link to="security">Back</router-link></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      step: 1
    }
  },
  methods: {
    next () {
      this.step = this.step + 1
    }
  }
}
</script>

<style scoped lang="scss">
$red-color: #F4436C;
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
    .step-title {
      font-family: Roboto-Regular;
      font-size: 16px;
      color: #4A4A4A;
      letter-spacing: 1px;
      text-align: center;
      span {
        display: inline-block;
        width: 54px;
        height: 1px;
        background: #000;
        margin: 0 12px;
      }
      .active {
        color: $red-color;
        span {
          background: $red-color
        }
      }
    }
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
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
      }
    }
  }
}
@media only screen and (max-width: 900px) {
  .wrap {
    width: 100%;
    .content {
      padding: 30px 10px;
      .step-title {
        display: block;
        p {
          flex-direction: column;
          span {
            width: 2px;
            height: 54px;
            margin: 5px 0;
          }
        }
      }
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
@media only screen and (max-width: 500px) {
  .step-content {
    width: 100%!important;
  }
}
</style>
