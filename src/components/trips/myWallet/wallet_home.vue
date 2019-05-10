<template>
  <div class="wallet-home" v-if="walletList.user_wallets[0].user_wallet_id != ''"  v-loading.fullscreen.lock="walletLoading">
    <!--<button @click="toCreate">Create</button>-->
    <!-- <button class="imp" @click="toImport">Import</button> -->
    <div>
        <div class="wallet-list">
            <div class="wallet-wrap-top flex-wrap flex-align-center" :class="walletList.user_wallets[0].primary===1?'flex-center-between':'flex-content-end'">
                <div class="top-left" v-if="walletList.user_wallets[0].primary===1">{{$t('message.Defaultwallet')}}</div>
                <div class="top-right">
                  <span @click="toWalletDetail(index)">{{$t('message.Edit')}}</span>
                  <!--<span v-if="walletList.user_wallets[0].primary!==1" @click="setDefault($event)" :name="walletList.user_wallets[0].name" :id="walletList.user_wallets[0].user_wallet_id">{{$t('message.SetasDefault')}}</span>-->
                </div>
            </div>
          <div class="wallet-wrap-down flex-wrap flex-center-between">
            <div class="down-left">{{walletList.user_wallets[0].name}}</div>
            <div class="down-right">
              <span class="pps-price">{{walletList.user_wallets[0].balance}}</span>
              <span class="pps-pps">PPS</span>
            </div>
          </div>
          <div class="wallet-wrap-down flex-wrap flex-center-between">
            <div class="down-left"></div>
            <div class="down-right">
              <span class="pps-price">{{walletList.eth_balance}}</span>
              <span class="pps-pps">ETH</span>
            </div>
          </div>
          <div class="wallet-wrap-down flex-wrap flex-center-between">
            <div class="down-left">{{walletList.user_wallets[0].address}}</div>
            <button @click="towalletTransfer(index)">{{$t('message.Transfer')}}</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wallet',
  data () {
    return {
      tripsTabTitle: 'All',
      walletList: {
        user_wallets: [
          {
            user_wallet_id: 0,
            address: "",
            password_prompt: "",
            name: "",
            primary: 1,
            balance: "0"
          }
        ],
        eth_balance: ""
      },
      walletLoading:true
    }
  },
  created () {
    this.getUserWallets()
  },
  methods: {
    getUserWallets () {
      this.loading = true
      let user = this.$store.state.userInfo
      this.$post(this.userUrl + '/user', {
        action: 'getUserPPSBalance',
        data: {
          user_id: user.user_id
        }
      }).then((res) => {
        this.walletLoading = false
        if (res.msg.code === 200) {
          this.loading = false
          if (res.data.user_wallets.length === 0) {
            this.$router.replace('create')
          } else {
            var newData = res.data
            if (res.data.user_wallets.length === 1) {
              this.walletList = newData
            } else {
              var sort = function (a, b) {
                if (a.primary > b.primary) {
                  return -1
                } else if (a.primary < b.primary) {
                  return 1
                } else {
                  return 0
                }
              }
              this.walletList = newData.sort(sort)
            }
          }
        }
      })
    },
    setDefault (event) {
      let user = this.$store.state.userInfo
      this.$post(this.userUrl + '/user', {
        action: 'updateUserWallet',
        data: {
          user_id: user.user_id,
          user_wallet_id: event.target.id,
          name: event.target.name,
          primary: 'true'
        }
      }).then((res) => {
        if (res.msg.code === 200) {
          this.getUserWallets()
        }
      })
    },
    toCreate () {
      this.$router.push({path: 'create'})
    },
    toImport () {
      this.$router.push({path: 'importWallet'})
    },
    toWalletDetail (idx) {
      var List = JSON.stringify(this.walletList[idx])
      this.$router.push(
        {name: 'walletDetail', query: {List: List}}
      )
    },
    towalletTransfer(idx){
      var List = JSON.stringify(this.walletList[idx])
      this.$router.push(
        {name: 'walletTransfer', query: {List: List}}
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet-home {
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4a4a4a;
  letter-spacing: 1px;
  min-width: 300px;
  button {
    border: none;
    outline: none;
    width: 88px;
    height: 46px;
    border-radius: 3px;
    background: #f4436c;
    color: #fff;
    cursor: pointer;
  }
  .imp {
    margin-left: 10px;
  }
  .wallet-list {
    margin-top: 38px;
    box-sizing: border-box;
    border: 1px solid #e6e7e8;
    .wallet-wrap-top {
      background: #f8f8f8;
      padding: 15px 12px;
      border-bottom: 1px solid #e6e7e8;
      .top-left {
        display: inline-block;
        text-align: left;
      }
      .top-right {
        span {
          padding: 0 10px;
          cursor: pointer;
          position: relative;
        }
        span:after {
          content: "";
          position: absolute;
          width: 1px;
          height: 19px;
          background: #4a4a4a;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        span:first-child::after {
          display: none;
        }

      }
    }
    .wallet-wrap-down {
      padding: 15px 30px;
      .down-left {
        font-family: Roboto-Medium;
        text-align: left;
      }
      .pps-price {
        margin-left: 20px;
        font-family: Roboto-Medium;
        font-size: 28px;
        color: #f4436c;
        letter-spacing: 1.75px;
      }
      .pps-pps {
        color: #f4436c;
      }
    }

  }
}
@media only screen and (max-width: 375px) {
  .wallet-home .wallet-list .wallet-wrap-top {
    padding: 0 0 12px;
  }
}
@media only screen and (max-width: 400px) {
  .wallet-home .wallet-list .wallet-wrap-down {
    padding: 30px 0;
    text-align: right;
  }
}
</style>
