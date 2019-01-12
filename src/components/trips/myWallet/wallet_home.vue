<template>
  <div class="wallet-home" v-if="walletList!==''">
    <button @click="toCreate">Create</button>
    <!-- <button class="imp" @click="toImport">Import</button> -->
    <div>
        <div class="wallet-list" v-for='(item,index) in walletList' :key="index">
            <div class="wallet-wrap-top flex-wrap flex-align-center" :class="item.primary===1?'flex-center-between':'flex-content-end'">
                <div class="top-left" v-if="item.primary===1">Default wallet</div>
                <div class="top-right">
                  <span @click="toWalletDetail(index)">Edit</span>
                  <span v-if="item.primary!==1" @click="setDefault($event)" :name="item.name" :id="item.user_wallet_id">Set as Default</span>
                </div>
            </div>
          <div class="wallet-wrap-down flex-wrap flex-center-between">
            <div class="down-left">{{item.name}}</div>
            <div class="down-right">
              <span class="pps-price">{{item.balance}}</span>
              <span class="pps-pps">PPS</span>
            </div>
          </div>
          <div class="wallet-wrap-down flex-wrap flex-center-between">
            <div class="down-left">{{item.address}}</div>
            <button @click="towalletTransfer(index)">Transfer</button>
          </div>
        </div>
      <h6 class="loading" v-if="loading">Loading<i class="el-icon-loading"></i></h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wallet',
  data () {
    return {
      tripsTabTitle: 'All',
      walletList: {},
      loading:false
    }
  },
  created () {
    this.getUserWallets()
  },
  methods: {
    getUserWallets () {
      this.loading = true
      let user = JSON.parse(localStorage.getItem('user'))
      this.$post(this.userUrl + '/user', {
        action: 'getUserPPSBalance',
        data: {
          user_id: user.user_id
        }
      }).then((res) => {
        if (res.msg.code === 200) {
          this.loading = false
          if (res.data.user_wallets.length === 0) {
            this.$router.replace('create')
          } else {
            var newData = res.data.user_wallets
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
      let user = JSON.parse(localStorage.getItem('user'))
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
        // console.log(res)
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
  max-width: 820px;
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
