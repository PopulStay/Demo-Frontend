<template>
  <div class="wallet-detail">
    <!--<button @click="toCreate">Create</button>-->
    <div>
        <div class="wallet-list">
            <div class="wallet-wrap-top flex-wrap flex-center-between">
              <div class="top-left">{{$t('message.Transfer')}}</div>
            </div>
          <div class="wallet-wrap-down flex-wrap flex-center-between">
            <div class="flex-wrap flex-column-center">
              <p>PPS</p>
              <input type="number" class="down-left" :placeholder="$t('message.Amount')" v-model="Amount" value="walletList.name"/>
            </div>
            <div class="down-right">
              <span>{{$t('message.Balance')}}</span>
              <span class="pps-price">{{walletList.balance}}</span>
              <span class="pps-pps">PPS</span>
            </div>
          </div>

          <div class="wallet-wrap-down flex-wrap flex-center-between">
            <div class="flex-wrap flex-column-center">
              <p>{{$t('message.TO')}}</p>
              <input class="down-left" :placeholder="$t('message.PleadeenterPPSaddress')" v-model="TOaddress" value="walletList.name"/>
              <span class="warning"  v-show="Wallettype">{{$t('message.Pleaseenterthecorrectwalletaddress')}}</span>
            </div>
          </div>

            <div class="choose-btn">
              <button class="back-btn" @click="$router.go(-1);">{{$t('message.Back')}}</button>
              <button class="create-btn" @click="dialogTransfer">{{$t('message.Confirm')}}</button>
            </div>
        </div>
    </div>
    <el-dialog
      :visible.sync="dialogTransfershow" class="checkoutWrap">
      <div class="input-wrap">
        <input type="password" :placeholder="$t('message.Paymentpassword')" v-model="userPassword">
      </div>
      <div class="button" @click="toTransfer">{{$t('message.Confirmandpay')}}</div>
    </el-dialog>
  </div>
</template>

<script>
  import utils from '../../../utils/utils.js'
  const sha256 = require('js-sha256').sha256
  export default {
  name: 'walletDetail',
  data () {
    return {
      walletList: {},
      Amount:'',
      TOaddress: '',
      userPassword:'',
      dialogTransfershow:false,
      Wallettype:false
    }
  },
  created () {
    this.walletList = JSON.parse(this.$route.query.List)
  },
  methods: {
    dialogTransfer(){
      if(this.Amount != "" || this.TOaddress != ""){
        if(this.walletList.balance < this.Amount){

          this.$notify({
            title: this.$t('message.Warning'),
            message: this.$t('message.Insufficientbalance'),
            type: 'warning'
          });

        }else{

          if(!utils.checkAddress(this.TOaddress)) {
            this.Wallettype = false
            this.dialogTransfershow = true
          }else{
            this.Wallettype = true
          }
        }
      }
    },
    toTransfer(){
      if(this.userPassword != ""){
        this.$post(this.userUrl + '/user', {
        action : "sendPPSFromUser",
        data:{
          user_id : this.$store.state.userInfo.user_id,
          user_wallet_id : this.walletList.user_wallet_id,
          amount : this.Amount,
          encrypted_password : sha256(this.userPassword),
          address : "0x6d4D1EC45057E6326e5Fc3a5306A07b225e78c27"
        }
      }).then((res) => {
        if (res.msg.code === 200) {

          this.$notify({
            title: this.$t('message.Success'),
            message: this.$t('message.Successfultransfer'),
            type: 'warning'
          });
          this.dialogTransfer = false;
        } else {
          var message = 0;
          if(res.msg.code == 952){
              message = this.$t('message.Thepasswordisincorrect')
          }
          this.$notify({
            title: this.$t('message.Success'),
            message: message,
            type: 'warning'
          });
        }
      })

      }


    },
    toCreate () {
      this.$router.push({path: 'create'})
    }
  }
}
</script>

<style lang="scss" scoped>

  .warning {
    color: red;
    margin:10px 0;
    font-family: Roboto-Regular;
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
  .button {
    width: 100%;
    height: 50px;
    background: #F4436C;
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

.wallet-detail {
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
  letter-spacing: 1px;
  max-width: 820px;
  min-width: 300px;
  button{
    border: none;
    outline: none;
    width: 88px;
    height: 46px;
    border-radius: 3px;
    background: #F4436C;
    color: #fff;
    cursor: pointer;
  }
  .imp{
    margin-left: 10px;
  }
  .wallet-list {
    margin-top: 38px;
    // padding: 14px 0 26px 0;
    box-sizing: border-box;
    border: 1px solid #E6E7E8;
    padding-top: 14px;
    button{
      width: 126px;
    }
    .wallet-wrap-top{
      padding: 0 30px 12px;
      border-bottom: 1px solid #E6E7E8;
      .top-left {
        display: inline-block;
        text-align: left;
      }
      .top-right{
        display: inline-block;
        text-align: right;
        span{
          padding: 0 10px;
          cursor: pointer;
          position: relative;
        }
      }
    }
    .wallet-wrap-down{
      margin: 30px 30px 0;
      border-bottom: 1px solid #E6E7E8;

      .flex-column-center{
        width: 50%;
        p{
          font-family: Roboto-Medium;
          font-size: 20px;
        }
        input{
          height: 50px;
          border: none;
        }
      }
      .down-left{
        font-family: Roboto-Medium;
        margin-top: 25px;
        border: 1px solid #E6E7E8;
        text-indent: 10px;
        color: #444444;
        font-size: 16px;
      }
      .pps-price{
        margin-left: 20px;
        font-family: Roboto-Medium;
        font-size: 28px;
        color: #F4436C;
        letter-spacing: 1.75px;
      }
      .pps-pps{
        color: #F4436C;
      }
    }
    .wallet-wrap-set{
      margin: 18px 30px 0;
      padding-bottom: 18px;
      border-bottom: 1px solid #E6E7E8;
      button{
        color: #fff;
        cursor: pointer;
        outline: none;
        border: none;
        background: #F4436C;
        border-radius: 3px;
      }
    }
    .choose-btn{
      margin: 30px;
      button:first-child{
        margin-right: 10px;
      }
    }
  }
  .transactions{
    .tran-text {
      border-bottom: 1px solid #E6E7E8;
      padding:0 30px 10px;
    }
    .transactions-wrap {
      margin: 0 0 0 30px;
      padding: 0 0 20px 0;
      border-bottom: 1px solid #E6E7E8;
      .tran-title {
        margin-top: 20px;
      }
      .tran-date {
        margin-top: 6px;
        color: gray;
      }
    }
  }
}
@media only screen and (max-width: 376px){
    .wallet-detail .wallet-list .choose-btn button{
      width: 100%;
    }
    .wallet-detail .wallet-list .choose-btn button:first-child{
      margin-right: 0px;
      margin-bottom: 15px;
    }
}
</style>

<style>
.el-dialog{
  max-width: 440px;
  min-width: 300px;
}
</style>
