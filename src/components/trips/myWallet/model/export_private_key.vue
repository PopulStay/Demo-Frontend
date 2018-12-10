<template>
<div class="export-pkey-model-out">
  <el-dialog :visible.sync="$store.state.show_exportpkey">
    <div class="login-frame-content">
      <p class="red-color XY-fz30 lineh36" style="margin-bottom:14px;">Export private key</p>
      <!-- <div class="input-text">
        <input type="password" placeholder="Password" class="psw">
      </div> -->
      <p class="Warn-p">Warning: Export plain private key is very  <br />dangerous.We recommend you backup with <br />mnemonic or keystore.</p>
      <p class="key-p">5ejwkfhe3iruefhfkjf3ur923yru8fhjksdfhkwer328yfh<br />r392fhjecsjkdfhdfhiewhyiroyu3284783hf2938</p>
      <button class="login-btn XY-fz16 XY-colf XY-cursorp">Copy</button>
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
    }
  }
}
</script>

<style scoped lang="scss">
$red-color: #f4436c;
.export-pkey-model-out {
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
.export-pkey-model-out {
  .login-frame-content {
    padding: 20px 30px;
    .Warn-p{
      color: #f4436c;
      letter-spacing: 0;
      font-size: 16px;
    }
    .key-p{
      word-break: break-word;
      font-size: 16px;
      color: #4A4A4A;
      letter-spacing: 0;
      line-height: 26px;
      margin-top: 35px;
    }
    .login-btn {
      background: $red-color;
      width: 100%;
      border-radius: 3px;
      margin-top: 40px;
      height: 50px;
      line-height: 50px;
      outline: none;
      border: none;
    }
  }
}
</style>
<style lang="scss">
.export-pkey-model-out {
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
