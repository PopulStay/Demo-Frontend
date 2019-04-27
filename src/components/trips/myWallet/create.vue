<template>
  <div class="my-wallet-create">
      <div class="top-text">
          <p>{{$t('message.Createwallet')}}</p>
      </div>
      <div class="main-input-box">
        <div class="main-input-div">
          <p>{{$t('message.Walletname')}}</p>
          <input type="text" v-model="name"/>
        </div>
        <div class="main-input-div">
          <p>{{$t('message.Paymentpassword')}}</p>
          <input type="password" v-model="psw"/>
        </div>
        <div class="main-input-div">
          <p>{{$t('message.ConfirmPaymentpassword')}}</p>
          <input type="password" v-model="repsw"/>
        </div>
        <div class="main-input-div">
          <p>{{$t('message.PasswordHint')}} {{$t('message.Optional')}}</p>
          <input type="text" v-model="psw_pro"/>
        </div>
        <ul class="XY-fz14">
          <li>{{$t('message.Passwordstengthiscriticaltoguardyourwallet')}}</li>
          <li>{{$t('message.Wecantrecoverthepasswordpleasebackupcautiously')}}</li>
        </ul>
        <p class="foot-p XY-fz14">{{$t('message.Iagreeto')}}<em style="">{{$t('message.TermsofService')}}</em>{{$t('message.and')}}<em>{{$t('message.PrivacyPolicy')}}</em>.</p>
        <!--<button class="back-btn" @click="$router.go(-1);">Back</button>-->
        <button class="create-btn" @click="toCreate">{{$t('message.Createwallet')}}</button>
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
      let user = this.$store.state.userInfo

      if (this.name != "" && this.psw != "" && this.psw === this.repsw) {

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

      }else{

        this.$notify({
          title: this.$t('message.Warning'),
          message: this.$t('message.Pleaseconfirmuserinformation'),
          type: 'warning'
        });
      }
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
        width: 100%;
        height: 20px;
        background: #E6E7E8;
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
