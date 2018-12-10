<template>
<div class="verify-model-out">
  <el-dialog :visible.sync="$store.state.show5">
      <div class="login-frame-content">
        <p class="red-color XY-fz30 lineh36" style="margin-bottom:14px;">Verify your identity</p>
        <div class="input-text">
          <input type="text" placeholder="Email address / Mobile number" />
        </div>
        <div class="input-text">
          <input type="text" placeholder="Verification code" class="psw" v-model="code" maxlength="6">
          <p @click="countDown" class="login-sendCode XY-cursorp red-color XY-fz16" :class="{disabled: !this.canClick}">{{content}}</p>
        </div>
        <button class="login-btn XY-fz16 XY-colf XY-cursorp">Next</button>
        <div class="flex-wrap flex-center verify-Next">
          <i class="iconfont icon-54 red-color"></i>
          <span class="red-color XY-fz16">Back to Log in</span>
        </div>
      </div>
  </el-dialog>
</div>
</template>

<script>
import phoneInput from '../common/phoneInput'
export default {
  data () {
    return {
      psw: '',
      code: '',
      checked: false,
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
