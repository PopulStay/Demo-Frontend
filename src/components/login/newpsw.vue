<template>
<div class="newpsw-model-out">
  <el-dialog :visible.sync="$store.state.show_newpsw" :close-on-click-modal="true">
      <div class="login-frame-content">
        <p class="red-color XY-fz30 lineh36" style="margin-bottom:14px;">New password</p>
        <div class="input-text">
          <input type="text" placeholder="Email address / Mobile number" v-model="number"/>
        </div>
        <div class="input-text">
          <input type="text" placeholder="Password" class="psw" v-model="newpsw"/>
        </div>
        <button class="login-btn XY-fz16 XY-colf XY-cursorp" @click="Tosetsucc">Next</button>
        <div class="flex-wrap flex-center verify-Next XY-cursorp">
          <i class="iconfont icon-54 red-color"></i>
          <span class="red-color XY-fz16" @click="Tologin">Back to Log in</span>
        </div>
      </div>
  </el-dialog>
</div>
</template>

<script>
const sha256 = require('js-sha256').sha256
export default {
  data () {
    return {
      newpsw: '',
      number: ''
    }
  },
  methods: {
    Tosetsucc () {
      if (this.newpsw === '') return false
      this.$post(this.userUrl + '/user', {
        action: 'updateUserPassword',
        data: {
          user_id: '2755',
          need_old_encrypted_password: 'true',
          new_encrypted_password: sha256(this.newpsw)
        }
      }).then((res) => {
        if (res.msg.code === 200) {
          this.$store.state.show_newpsw = false
          this.$store.state.show_resetcuss = true
        } else {

          this.$notify({
            title: this.$t('message.Warning'),
            message: this.$t('message.Operationfailedpleasetrylater'),
            type: 'warning'
          });
        }
      })
    },
    Tologin () {
      this.$store.state.show_newpsw = false
      this.$store.state.show_login = true
    },
    // 关闭数据重置
    close () {
      this.newpsw = ''
      this.number = ''
    }
  }
}
</script>

<style scoped lang="scss">
$red-color: #f4436c;
.newpsw-model-out {
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
.newpsw-model-out {
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
.newpsw-model-out {
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
