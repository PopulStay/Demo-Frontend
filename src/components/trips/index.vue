<template>
  <div>
    <e-header></e-header>
    <e-enterPsw></e-enterPsw>
    <e-screen />
    <e-exportPkey />
    <div class="middle flex-wrap">
      <div class="left">
        <h2>{{ leftTitle}}</h2>
        <ul class="tab-list">
          <li v-for="(item, index) in tabList" :key="index" :class="$route.name == item.url ? 'active' : ''" @click="tabClick(item)">
            <router-link :to="item.url">{{item.title}}</router-link>
          </li>
        </ul>
        <el-select v-model="tabSelect" placeholder="My account" class="h1">
          <router-link :to="item.url" v-for="item in tabList" :key="item.title">
            <el-option  :label="item.title" :value="item.title"></el-option>
          </router-link>
        </el-select>
      </div>
      <div class="right flex-wrap-wrap">
        <router-view/>
      </div>
    </div>
    <e-footer></e-footer>
  </div>
</template>

<script>
import header from '../common/header'
import footer from '../common/footer'
import trips from './myTrips/trips'
import enterPsw from './myWallet/model/enterpsw'
import exportPkey from './myWallet/model/export_private_key'
import screen from './myWallet/model/screen'

export default {
  name: 'trips-index',
  components: {
    'e-header': header,
    'e-footer': footer,
    'trips': trips,
    'e-enterPsw': enterPsw,
    'e-exportPkey': exportPkey,
    'e-screen': screen
  },
  data () {
    return {
      leftTitle: 'My account',
      tripsTabTitle: 'All',
      tabSelect: 'My account',
      tabList: [
        {
          title: 'My trips',
          url: 'tripsList'
        },
        {
          title: 'Hosts',
          url: 'hosts'
        },
        {
          title: 'Guests',
          url: 'guests'
        },
        {
          title: 'Messages',
          url: 'messages'
        },
        {
          title: 'Edit profile',
          url: 'editProfile'
        },
        {
          title: 'Security',
          url: 'security'
        },
        {
          title: 'My Wallet',
          url: 'walletHome'
        },
        {
          title: 'Feedback',
          url: 'Feedback'
        },
        {
          title: 'Invite',
          url: 'invite'
        }],
      checkoutShow: false,
      gender: 'My account'
    }
  },
  beforeMount () {
    console.log(this.$route.name)
  },
  methods: {
    tabClick (value) {
      this.leftTitle = value.title
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
.middle {
  width: 80.129%;
  margin: 0 auto;
  padding: 4.26% 0;
  flex-wrap: wrap;
  .left {
    flex: 1;
    .el-select{
      display: none;
    }
    .active {
      color: $red-color;
    }
    h2 {
      margin-bottom: 30px;
      margin-top: 0;
      font-family: Roboto-Medium;
      font-size: 28px;
      color: #4A4A4A;
      letter-spacing: 0.88px;
      font-weight: 100;
    }
    ul {
      li {
        font-family: Roboto-Regular;
        font-size: 16px;
        letter-spacing: 1px;
        line-height: 50px;
        cursor: pointer;
        a {
          width: 100%;
          height: 100%;
          display: inline-block;
        }
      }
    }
  }
  .right {
    flex: 3.5;
  }
}
@media only screen and (max-width: 1300px) {
  .middle {
    width: auto;
    padding: 30px
  }
}
@media only screen and (max-width: 600px) {
  .middle {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
  }
  h2{
    display: none;
  }
  .tab-list{
    display: none;
  }
  .middle .left .el-select{
    display: block;
    margin-bottom: 20px;
  }
}
</style>

<style lang="scss">
.h1 {
  .el-input__inner {
    border: none;
    text-align: center;
    font-family: Roboto-Medium;
    font-size: 28px;
    color: #4A4A4A;
    letter-spacing: 0.88px;
  }
}
</style>
