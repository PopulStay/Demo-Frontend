<template>
  <div class="footer">
    <div class="footer-nav flex-wrap">
        <ul>
            <li><router-link to="/becomeHost/propertyTypes">Become a host</router-link></li>
            <li><router-link to="/trips/tripsList">Trips</router-link></li>
            <li><router-link to="/trips/messages">Messages</router-link></li>
            <li><router-link to="/trips/walletHome">Wallet</router-link></li>
            <li><a href="javascript:void(0)" @click="$store.state.show_signup = true" v-show="$store.state.userInfo == null">Sign up</a></li>
            <li><a href="javascript:void(0)" @click="$store.state.show_login = true" v-show="$store.state.userInfo == null">Log in</a></li>
        </ul>
        <div class="language">
            <span>English</span>
            <span>中文</span>
            <span>日本語</span>
        </div>
    </div>
    <div class="footer-link flex-wrap flex-content-between flex-align-center">
      <p>© PopulStay, 2018. All Rights Reserved.</p>
      <ul class="flex-wrap flex-align-center">
        <li><a href="https://t.me/populstayEN" target="_blank" class="icon iconfont icon-telegram1"></a></li>
        <li><a href="" target="_blank" class="icon iconfont icon-wechat1"></a></li>
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
  </div>
</template>

<script>

</script>

<style scoped lang="scss">
.footer {
  border-top: 1px solid #eee;
  .footer-nav {
    width: 1500px;
    margin: 0 auto;
    justify-content: space-between;
    align-items: flex-end;
    padding: 30px 0;
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
      display: none;

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
      }
    }
  }
  .footer-link {
    width: 1500px;
    margin: 0 auto;
    border-top: 1px solid #eee;
    padding: 40px 0;
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
}
@media only screen and (max-width: 1500px) {
  .footer .footer-nav,.footer .footer-link {
    width: auto;
    padding: 30px 30px;
  }
}
@media only screen and (max-width:780px) {
  .footer {
    .footer-link {
      display: block;
      text-align: center;
      padding: 20px 30px;
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
