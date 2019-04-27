<template>
  <div class="footer">
    <div class="footer-nav flex-wrap">
        <ul>
          <li><router-link to="/becomeHost/propertyTypes">{{$t('message.Starthosting')}}</router-link></li>
            <li><router-link to="/trips/tripsList">{{$t('message.Trips')}}</router-link></li>
            <!--<li><router-link to="/trips/messages">{{$t('message.Messages')}}</router-link></li>-->
            <li><router-link to="/trips/walletHome">{{$t('message.Wallet')}}</router-link></li>
            <li><a href="javascript:void(0)" @click="$store.state.show_signup = true" v-show="$store.state.userInfo == null">{{$t('message.Signup')}}</a></li>
            <li><a href="javascript:void(0)" @click="$store.state.show_login = true" v-show="$store.state.userInfo == null">{{$t('message.Login')}}</a></li>
        </ul>
        <div class="language">
            <span :class="$i18n.locale == 'en' ? 'active' : null" @click="language('en')">English</span>
            <span :class="$i18n.locale == 'cn' ? 'active' : null" @click="language('cn')">中文</span>
        </div>
    </div>
    <div class="footer-link flex-wrap flex-content-between flex-align-center">
      <p>© PopulStay, 2018. All Rights Reserved.</p>
      <ul class="flex-wrap flex-align-center">
        <li><a href="https://t.me/populstayEN" target="_blank" class="icon iconfont icon-telegram1"></a></li>
        <li><a @click="openwechat" target="_blank" class="icon iconfont icon-wechat1"></a></li>
        <li><a href="https://twitter.com/PopulStay" target="_blank" class="icon iconfont icon-twitter"></a></li>
        <li><a href="https://medium.com/PopulStay" target="_blank" class="icon iconfont icon-medium-m"></a></li>
        <li><a href="https://www.instagram.com/PopulStay/" target="_blank" class="icon iconfont icon-instagram1"></a></li>
        <li><a href="https://fb.me/populstay" target="_blank" class="icon iconfont icon-facebook"></a></li>
        <li><a href="https://www.youtube.com/channel/UCAOiiN8HmppZ-qTeCW2pcwg" target="_blank" class="icon iconfont icon-youtube"></a></li>
        <li><a href="https://github.com/PopulStay" target="_blank" class="icon iconfont icon-github"></a></li>
        <li><a href="https://www.reddit.com/user/PopulStay" target="_blank" class="icon iconfont icon-reddit2"></a></li>
        <li><a href="http://weibo.com/PopulStay" target="_blank" class="icon iconfont icon-weibo"></a></li>
        <li><a href="https://blog.naver.com/PopulStay" target="_blank" class="icon iconfont icon-naver margin"></a></li>
      </ul>
    </div>
    <!--<e-Live_Chat></e-Live_Chat>-->
  </div>
</template>

<script>
const wechatimg = require("../../assets/images/qrcode.jpg");
import Live_Chat from '../livechat/index';
import win from '../livechat/win';

  export default {
    components: {
      'e-Live_Chat': Live_Chat,
      'e-Live_Chat_Win': win
    },
    data () {
      return {
        userData:null,
        Live_ChatList:['123','4556'],
      }
    },
    created() {
      this.$i18n.locale = localStorage.populstayLang == undefined ? 'cn' : localStorage.populstayLang
    },
    methods: {
      language(type){
        this.$i18n.locale = type
        localStorage.setItem('populstayLang',type);
      },
      openwechat() {
        this.$confirm('<img src='+wechatimg+'/>', '', {
          dangerouslyUseHTMLString: true,
          showCancelButton:false,
          showConfirmButton:false,
          customClass:"wechatconfirm",
          center: true
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.footer {
  position: relative;
  border-top: 1px solid #eee;
  .footer-nav {
    justify-content: space-between;
    align-items: flex-end;
    padding: 30px 200px;
    ul{
      li {
        font-family: Roboto-Regular;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 0.44px;
        line-height: 28px;
      }
    }
    .language {


      span {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #000000;
        letter-spacing: 0.02px;
        text-align: right;
        line-height: 16px;
        margin-right: 16px;
        cursor: pointer;
        &:last-child {
          margin-right: 0
        }
        &.active{
          color: #f4436c;
        }
      }
    }
  }
  .footer-link {
    margin: 0 auto;
    border-top: 1px solid #eee;
    padding: 40px 200px;
    p {
      font-family: Roboto-Regular;
      font-size: 14px;
      color: #4A4A4A;
      letter-spacing: 0.02px;
    }
    ul {
      li {
        a {
          color: #9B9B9B;
          font-size: 24px;
          margin-right: 20px;
          cursor: pointer;
        }
        .margin {
           margin-right: 0;
        }
      }
    }
  }

  .Live_Chat_Win_box{
    position: fixed;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    margin: 0 5px;
    z-index: 9999;
  }
}
@media only screen and (max-width: 1500px) {
  .footer .footer-nav,
  .footer .footer-link {
    padding: 30px 100px;
  }
}
@media only screen and (max-width:780px) {
  .footer {
    .footer-nav,
    .footer-link {
      padding: 30px 20px;
    }
    .footer-link {
      display: block;
      text-align: center;
      p {
        margin-bottom: 10px;
      }
      ul {
        display: block;
        li {
          display: inline-block;
          width: 40px;
          text-align: center;
          margin: 5px 0;
          a {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
