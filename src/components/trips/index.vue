<template>
  <div>
    <e-header></e-header>
    <e-enterPsw></e-enterPsw>
    <e-screen />
    <e-exportPkey />
    <div class="middle flex-wrap">
      <div class="left">
        <h2>{{ leftTitle}}</h2>
        <ul class="tab-list" id="tab-list"  :class="AmapFixed ? 'isFixed' : null">
          <li v-for="(item, index) in tabList" :key="index" :class="routeName == item.url ? 'active' : ''" @click="tabClick(item)">
            <router-link :to="item.url">{{item.title}}</router-link>
          </li>
        </ul>
        <el-select v-model="tabSelect" :placeholder="leftTitle" class="h1">
          <router-link :to="item.url" v-for="item in tabList" :key="item.title">
            <el-option  :label="item.title" :value="item.title"></el-option>
          </router-link>
        </el-select>
      </div>
      <div class="right flex-wrap-wrap">
        <router-view/>
      </div>
    </div>

    <p v-if="$i18n.locale != language ? onloading() : null"></p>
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
      language:'',
      leftTitle:  this.$t('message.Myaccount'),
      tabSelect:  this.$t('message.Myaccount'),
      tabList: [
        {
          title:  this.$t('message.Mytrips'),
          url: 'tripsList'
        },
        {
          title:  this.$t('message.Mylistings'),
          url: 'hosts'
        },
        {
          title:  this.$t('message.Myguests'),
          url: 'guests'
        },
        // {
        //   title:  this.$t('message.Messages'),
        //   url: 'messages'
        // },
        {
          title:  this.$t('message.Editprofile'),
          url: 'editProfile'
        },
        {
          title:  this.$t('message.Security'),
          url: 'security'
        },
        {
          title:  this.$t('message.Wallet'),
          url: 'walletHome'
        },
        {
          title:  this.$t('message.Feedback'),
          url: 'Feedback'
        },
        // {
        //   title: this.$t('message.Invite'),
        //   url: 'invite'
        // }
        ],
      checkoutShow: false,
      gender: 'My account',
      routeName:'',
      AmapFixed:false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll) // 滚动监听
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  beforeMount () {
    if(this.$route.name == 'guests_details'){
      this.routeName = "guests"
    }else if(this.$route.name == 'trips_details'){
      this.routeName = "tripsList"
    }else if(this.$route.name == 'ChangePhone' || this.$route.name == 'ChangeEmail' || this.$route.name == 'VerifyIdentity'){
      this.routeName = "security"
    }else if(this.$route.name == 'create' || this.$route.name == 'walletDetail' || this.$route.name == 'walletTransfer'){
      this.routeName = "walletHome"
    }else{
      this.routeName = this.$route.name
    }
  },
  methods: {
    onloading(){
      this.language = this.$i18n.locale;
      this.leftTitle = this.$t('message.Myaccount');
      this.tabList = [
        {
          title:  this.$t('message.Mytrips'),
          url: 'tripsList'
        },
        {
          title:  this.$t('message.Mylistings'),
          url: 'hosts'
        },
        {
          title:  this.$t('message.Myguests'),
          url: 'guests'
        },
        {
          title:  this.$t('message.Editprofile'),
          url: 'editProfile'
        },
        {
          title:  this.$t('message.Security'),
          url: 'security'
        },
        {
          title:  this.$t('message.Wallet'),
          url: 'walletHome'
        },
        {
          title:  this.$t('message.Feedback'),
          url: 'Feedback'
        }
      ]
    },
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = document.querySelector('#tab-list').offsetTop
      this.AmapFixed = scrollTop > (offsetTop - 100)
    },
    tabClick (value) {
      this.routeName = value.url
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
  margin: 0 200px;
  min-height: 700px;
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

    .isFixed{
        position: fixed;
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
@media only screen and (max-width: 1500px) {
  .middle {
    margin: 0 100px;
  }
}
@media only screen and (max-width: 1300px) {
  .middle {
    display: block;
    box-sizing: border-box;
  }
  h2{
    display: none;
  }
  .tab-list{
    display: none;
  }
  .middle .left .el-select{
    display: block;
    margin-bottom: 50px;
  }
}

@media only screen and (max-width: 800px){
  .middle {
    margin: 0 20px;
  }
}
</style>

<style lang="scss">
.h1 {
  .el-select__caret{
    font-size:20px !important;
  }

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
