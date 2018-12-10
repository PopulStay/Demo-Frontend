<template>
  <div class="my-wallet-keystore">
    <div>
      <p class="top-p">{{topTitle}}</p>
      <div class="select-wrap">
        <span v-for="(item,index) in storeTab" :key="index"  :class="TabTitle == item ? 'active' : ''"  @click="selectTab(item,index)">{{item}}</span>
      </div>
      <div v-show="tabNum==0||tabNum==1">
        <p class="trip-top">Store offline</p>
        <p class="trip-down">Please store the Keystore to a safe offline place like a USB drive. Never put it on internet.</p>
        <p class="trip-top">Don’t transfer via internet tools</p>
        <p class="trip-down">Don’t use Email / Cloud Storage / Notepad / IM tools to transfer Keystore.<br />It easily gets hacked and result in loss.</p>
        <p class="trip-top">Store to password vault</p>
        <p class="trip-down">If you like to store online please make sure some password vault apps, like 1Password / Keeppass.</p>
      </div>
      <div v-show="tabNum==2">
        <p class="trip-top">Only for transport wallet</p>
        <p class="trip-down">Forbidden to save / sreenshot / take photos of the QR code.It’s convenience to transport wallet to your other devices.</p>
        <p class="trip-top">Using in safe environment</p>
        <p class="trip-down">Don’t use Email / Cloud Storage / Notepad / IM tools to transfer Keystore.<br />It easily gets hacked and result in loss.</p>
      </div>
      <img :src="qrCode" class="qrcode-img" v-show="tabNum==2"/>
    </div>
    <div class="key-wrap" v-show="tabNum==0">
      <el-scrollbar :native="false" wrapStyle="" wrapClass="" viewClass="" viewStyle="" noresize="false" tag="section" style="height:100%;width:400px;">
        <p class="scroll-p">5ejwkfhe3iruefhfkjf3ur923yru8fhjksdfhkwer328yfh
r392fhjecsjkdfhdfhiewhyiroyu
fhe3iruefhfkjf3ur3u8ifhcnewffr923yru8fhjksdfhkwer328yfhr392fhjecsjkdfhdfhiewhyiroyu3284783hf29385ejwkfhe3iru
r392fhjecsjkdfhdfhiewhyiroyu3284783hf29385ejwkfhe3iruefhfkjf3ur923yru8fhjksdfhkwer328yfhr392fhjr392fhjecsjkdfhdfhiewhyiroyu
fhe3iruefhfkjf3ur3u8ifhcnewffr923yru8fhjksdfhkwer328yfhr392fhjecsjkdfhdfhiewhyiroyu3284783hf29385ejwkfhe3iru
r392fhjecsjkdfhdfhiewhyiroyu3284783hf29385ejwkfhe3iruefhfkjf3ur923yru8fhjksdfhkwer328yfhr392fhjr392fhjecsjkdfhdfhiewhyiroyu
fhe3iruefhfkjf3ur3u8ifhcnewffr923yru8fhjksdfhkwer328yfhr392fhjecsjkdfhdfhiewhyiroyu3284783hf29385ejwkfhe3iru
r392fhjecsjkdfhdfhiewhyiroyu3284783hf29385ejwkfhe3iruefhfkjf3ur923yru8fhjksdfhkwer328yfhr392fhjr392fhjecsjkdfhdfhiewhyiroyu
fhe3iruefhfkjf3ur3u8ifhcnewffr923yru8fhjksdfhkwer328yfhr392fhjecsjkdfhdfhiewhyiroyu3284783hf29385ejwkfhe3iru
r392fhjecsjkdfhdfhiewhyiroyu3284783hf29385ejwkfhe3iruefhfkjf3ur923yru8fhjksdfhkwer328yfhr392fhj
        </p>
      </el-scrollbar>
    </div>
    <div class="qr-code flex-wrap flex-column-center flex-align-center" v-show="tabNum==1">
      <i class="iconfont icon-shexiangtou"></i>
      <p class="trip-p">Please check around if you are being watched by someone or hidden cameras.</p>
      <button @click="tabNum = 2">Show QR Code</button>
    </div>
    <div class="select-btn">
      <button class="back-btn" @click="$router.go(-1);">Back</button>
      <button class="copy-btn" v-show="tabNum==0">Copy Keystore</button>
    </div>
  </div>
</template>

<script>
import qrCode from '../../../assets/images/trips/showqrcode.png'
export default {
  name: 'keystore',
  components: {
    // 'e-header': header
  },
  data () {
    return {
      topTitle: 'Export Keystore',
      TabTitle: 'Keystore',
      storeTab: ['Keystore', 'QR Code'],
      tabNum: 0,
      showQrcode: false,
      qrCode: qrCode
    }
  },
  methods: {
    selectTab (value, index) {
      this.TabTitle = value
      this.tabNum = index
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
.my-wallet-keystore{
  font-family: Roboto-Regular;
  font-size: 16px;
  .top-p{
    color: #4A4A4A;
    letter-spacing: 1px;
    margin-top: 10px;
  }
  .select-wrap{
    margin-top: 30px;
    margin-bottom: 90px;
    span{
      padding: 10px 0;
      cursor: pointer;
    }
    span:last-child{
      margin-left: 30px;
    }
    span.active{
      color: $red-color;
      border-bottom: 1px solid $red-color;
    }
  }
  .trip-top {
    margin-top: 36px;
    color: $red-color;
  }
  .trip-down {
    margin-top: 20px;
    color: #000000;
    line-height: 25px;
  }
  .key-wrap {
    max-width: 440px;
    min-width: 300px;
    height: 200px;
    margin-top: 50px;
  }
  .select-btn{
    margin-top: 50px;
    button{
      background: #F4436C;
      color: #fff;
      border: none;
      height: 50px;
      border-radius: 3px;
      font-size: 16px;
      cursor: pointer;
    }
    .back-btn{
        width: 126px;
    }
    .copy-btn{
        width: 294px;
        margin-left: 10px;
    }
  }
  .qr-code{
    width: 300px;
    height: 300px;
    padding: 20px;
    box-sizing: border-box;
    i{
      font-size: 70px;
    }
    .trip-p{
      text-align: center;
      margin-top: 20px;
      color: #4A4A4A;
      line-height: 22px;
    }
    button{
      background: #F4436C;
      width: 154px;
      height: 50px;
      font-family: Roboto-Medium;
      color: #FFFFFF;
      margin-top: 20px;
      outline: none;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }
  }
  .qrcode-img{
    width: 300px;
    height: 300px;
    margin-top: 40px;
  }
}
@media only screen and (max-width: 400px) {
  .select-btn{
    text-align: center;
  }
  .my-wallet-keystore .select-btn .back-btn{
    width: 100%;
  }
  .my-wallet-keystore .select-btn .copy-btn{
    width: 100%;
    margin-left: 0;
    margin-top: 15px;
  }
}
</style>
<style lang="scss">
.my-wallet-keystore {
  .key-wrap {
    .el-scrollbar__wrap {
        overflow-x: hidden !important;
    }
    .scroll-p{
        padding: 30px;
    }
  }
}
</style>
