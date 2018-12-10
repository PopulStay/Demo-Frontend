<template>
  <div class="my-wallet-create">
      <div class="top-text">
          <p>Create wallet</p>
      </div>
      <div class="main-input-box">
        <div class="main-input-div">
          <p>Wallet name</p>
          <input type="text" v-model="name"/>
        </div>
        <div class="main-input-div">
          <p>Password</p>
          <input type="password" v-model="psw"/>
        </div>
        <div class="main-input-div">
          <p>Confirm Password</p>
          <input type="password" v-model="repsw"/>
        </div>
        <div class="main-input-div">
          <p>Password Hint(Optional)</p>
          <input type="text" v-model="psw_pro"/>
        </div>
        <ul class="XY-fz14">
          <li>Password stength is critical to guard your wallet</li>
          <li>We can’t recover the password, please backup cautiously</li>
        </ul>
        <p class="foot-p XY-fz14">I agree to <em style="">Terms of Service </em>and<em> Privacy Policy</em>.</p>
        <button class="back-btn" @click="$router.go(-1);">Back</button>
        <button class="create-btn" @click="toCreate">Create wallet</button>
      </div>
  </div>
</template>

<script>
const sha256 = require('js-sha256').sha256
// import trips from './trips'
export default {
  name: 'myWallet-index',
  components: {
  },
  data () {
    return {
      name: '',
      psw: '',
      repsw: '',
      psw_pro: ''
    }
  },
  methods: {
    toCreate () {
      let user = JSON.parse(localStorage.getItem('user'))
      if (this.psw !== this.repsw) {
        this.$alert('Two inconsistent passwords', 'Warning', {
          confirmButtonText: 'Confirm'
        })
        return false
      }
      this.$post(this.userUrl + '/user', {
        action: 'createUserWallet',
        data: {
          user_id: user.user_id,
          wallet_name: this.name,
          encrypted_password: sha256(this.psw),
          password_prompt: this.repsw
        }
      }).then((res) => {
        if (res.msg.code === 200) {
          this.$router.replace('walletHome')
        }
      })
    }
  },
  filters: {
    state (val) {
      if (val === 1) {
        return 'Checkout'
      } else if (val === 2) {
        return 'Confirm'
      } else if (val === 2) {
        return 'Confirm'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$red-color: #F4436C;
.my-wallet-create{
  font-family: Roboto-Regular;
  font-size: 16px;
  max-width: 820px;
  border: 1px solid #E6E7E8;
  .top-text{
    background: #f8f8f8;
    p{
      font-weight: 600;
      border-bottom: 1px solid #E6E7E8;
      padding: 15px 20px;
      color: #484848;
      letter-spacing: 1px;
      font-weight: 100;
      // margin: 0px;
    }
  }
  .main-input-box{
    padding: 0px 20px 20px;
    .main-input-div{
      border-bottom: 1px solid #E6E7E8;
      p{
        color: grey;
        margin: 30px 0 10px 0;
      }
      input{
        border: none;
        width: 50%;
        height: 20px;
      }
    }
    ul{
      margin: 30px 0;
      padding-left: 20px;
    }
    ul,li{
      list-style: disc;
      color: $red-color;
      line-height: 26px;
    }
    .foot-p{
      margin: 30px 0;
      em{
        color: $red-color;
        font-style: normal;
        cursor: pointer;
      }
    }
    button{
      color: #fff;
      border-radius: 3px;
      border: none;
      background: #F4436C;
      font-size: 16px;
      cursor: pointer;
    }
    .back-btn{
      width: 120px;
      height: 50px;
    }
    .create-btn{
      width: 200px;
      height: 50px;
      margin-left: 15px;
    }
  }
}
@media only screen and (max-width: 500px){
  .my-wallet-create .main-input-box .create-btn{
    margin-left: 0;
    margin-top: 10px;
    width: 100% !important;
  }
  .my-wallet-create .main-input-box .back-btn{
    width: 100% !important;
  }
}
</style>
