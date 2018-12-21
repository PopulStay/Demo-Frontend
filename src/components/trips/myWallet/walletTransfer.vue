<template>
  <div class="wallet-detail">
    <button @click="toCreate">Create</button>
    <!--<button class="imp" @click="toImport">Import</button>-->
    <div>
        <div class="wallet-list">
            <div class="wallet-wrap-top flex-wrap flex-center-between">
              <div class="top-left">{{walletList.primary===1?'Default wallet':''}}</div>
              <!--<div class="top-right">-->
                <!--<span>Delete</span>-->
              <!--</div>-->
            </div>
            <div class="wallet-wrap-down flex-wrap flex-center-between">
              <div class="flex-wrap flex-column-center">
                <p>Wallet name</p>
                <input class="down-left" placeholder="请输入名字" v-model="name" value="walletList.name"/>
              </div>
              <div class="down-right">
                <span>{{walletList.eth_balance > 0 ? 'ETH Balance' : 'PPS Balance'}}</span>
                <span class="pps-price">{{walletList.eth_balance > 0 ? walletList.eth_balance : walletList.pps_balance}}</span>
                <span class="pps-pps">{{walletList.eth_balance > 0 ? 'ETH' : 'PPS'}}</span>
              </div>
            </div>
            <div class="wallet-wrap-down flex-wrap flex-center-between">
              <div class="flex-wrap flex-column-center">
                <p>{{walletList.pps_address}}</p>
              </div>
              <div class="down-right">
                <span style="margin-right:15px;">PPS address</span>
                <!-- <span class="pps-price">{{walletList.pps}}567</span> -->
                <button
                v-clipboard:copy="walletList.pps_address"
                v-clipboard:success="CopyPPS"
                >Copy</button>
              </div>
            </div>
            <div class="wallet-wrap-down flex-wrap flex-center-between">
                <div class="flex-wrap flex-column-center">
                    <p>{{walletList.eth_address}}</p>
                </div>
                <div class="down-right">
                    <span style="margin-right:15px;">ETH address</span>
                    <!-- <span class="pps-price">{{walletList.pps}}567</span> -->
                    <button
                v-clipboard:copy="walletList.eth_address"
                v-clipboard:success="CopyETH"
                >Copy</button>
                </div>
            </div>
            <div class="wallet-wrap-set flex-wrap flex-center-between">
                <p>Password</p>
                <button @click="toReset">Reset</button>
            </div>
            <div class="wallet-wrap-set flex-wrap flex-center-between">
                <p>Export private key</p>
                <button @click="showEnterpsw_p">Export</button>
            </div>
            <div class="wallet-wrap-set flex-wrap flex-center-between">
                <p>Export keystore</p>
                <button @click="showEnterpsw_k">Export</button>
            </div>
            <div class="choose-btn">
                <button @click="$router.go(-1);">Back</button>
                <button @click="Save">Save</button>
            </div>
        </div>
        <div class="transactions">
            <p class="tran-text">transactions</p>
            <div class="transactions-wrap" v-for="(item,index) in transActions" :key="index">
                <p class="tran-title">{{item.title}}</p>
                <p class="tran-date">{{item.date}}</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// import header from '../common/header'
export default {
  name: 'walletDetail',
  components: {
  },
  data () {
    return {
      tripsTabTitle: 'All',
      walletList: {
        // name: 'Lorem Ipsum',
        // isDetault: true,
        // title: 'Available balance',
        // pps: '567',
        // type: 'PPS'
      },
      name: '',
      transActions: [
        {
          title: 'Lorem ipsum',
          date: '22 Sep 2018'
        },
        {
          title: 'Lorem ipsum',
          date: '22 Sep 2018'
        },
        {
          title: 'Lorem ipsum',
          date: '22 Sep 2018'
        }
      ]
    }
  },
  created () {
    console.log(JSON.parse(this.$route.query.List))
    this.walletList = JSON.parse(this.$route.query.List)
    this.name = this.walletList.name
  },
  methods: {
    Save () {
      let user = JSON.parse(localStorage.getItem('user'))
      this.$post(this.userUrl + '/user', {
        action: 'updateUserWallet',
        data: {
          user_id: user.user_id,
          user_wallet_id: this.walletList.user_wallet_id,
          name: this.name,
          primary: this.walletList.primary === 1 ? 'true' : 'false'
        }
      }).then((res) => {
        if (res.msg.code === 200) {
          this.$router.push({path: 'walletHome'})
        }
      })
    },
    toReset () {
      this.$router.push({path: 'reset'})
    },
    toCreate () {
      this.$router.push({path: 'create'})
    },
    toImport () {
      this.$router.push({path: 'importWallet'})
    },
    showEnterpsw_p () {
      this.$store.state.show_enterpsw = true
      this.$store.state.show_state = 1
    },
    showEnterpsw_k () {
      this.$store.state.show_enterpsw = true
      this.$store.state.show_state = 2
    },
    CopyPPS () {
      alert('Copied')
    },
    CopyETH () {
      alert('Copied')
    }
    // copyETH () {
    //   this.$copyText(this.walletList.eth_address).then(function (e) {
    //     alert('Copied')
    //     console.log(e)
    //   }, function (e) {
    //     alert('Can not copy')
    //     console.log(e)
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
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
      padding-bottom: 30px;
      border-bottom: 1px solid #E6E7E8;
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
      text-align: right;
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
