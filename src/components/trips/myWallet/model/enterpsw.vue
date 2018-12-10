<template>
<div class="enterpsw-model-out">
  <el-dialog :visible.sync="$store.state.show_enterpsw">
    <div class="login-frame-content">
      <p class="red-color XY-fz30 lineh36" style="margin-bottom:14px;">Please enter password</p>
      <div class="input-text">
        <input type="password" placeholder="Password" class="psw">
      </div>
      <button class="login-btn XY-fz16 XY-colf XY-cursorp" @click="toWhich">Next</button>
    </div>
  </el-dialog>
</div>
</template>

<script>
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
    },
    toReset () {
      this.$store.state.show_login = false
      this.$store.state.show_verify = true
    },
    toSignUp () {
      this.$store.state.show_login = false
      this.$store.state.show_signup = true
    },
    toWhich () {
      if (this.$store.state.show_state === 2) {
        this.$store.state.show_enterpsw = false
        this.$store.state.screen = true
      } else if (this.$store.state.show_state === 1) {
        this.$store.state.show_enterpsw = false
        this.$store.state.show_exportpkey = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
$red-color: #f4436c;
.enterpsw-model-out {
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
.enterpsw-model-out {
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
</style>
<style lang="scss">
.enterpsw-model-out {
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog{
    // height: 298px;
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
