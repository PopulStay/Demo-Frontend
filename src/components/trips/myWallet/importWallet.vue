<template>
  <div class="my-wallet-import">
      <div class="top-text">
          <p>Import wallet</p>
      </div>
      <div class="select-wrap">
        <span v-for="(item,index) in importTab" :key="index"  :class="chioos == index ? 'active' : ''"  @click="selectTab(item,index)">{{item}}</span>
      </div>
      <div v-show="chioos==0" class="pb15">
        <!-- <el-input class="mnemonic-input" type="textarea" :rows="2" placeholder="Please use space to separate the mnemonic words" v-model="textareaWord"></el-input> -->
        <textarea name="" id="" cols="" rows="" class="words-txa" placeholder="Please use space to separate the mnemonic words"></textarea>
        <div class="wallet-select">
          <el-select v-model="Wallet" placeholder="m / 44' / 60' / 0' /0 / 0">
            <el-option v-for="(item,index) in walletList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="main-input-box">
            <div class="main-input-div">
            <p>Password</p>
            <input type="password" />
            </div>
            <div class="main-input-div">
            <p>Confirm Password</p>
            <input type="password" />
            </div>
            <div class="main-input-div">
            <p>Password Hint(Optional)</p>
            <input type="password" />
            </div>
            <p class="foot-p XY-fz14">I agree to <em style="">Terms of Service </em>and<em> Privacy Policy</em>.</p>
            <button class="back-btn" @click="$router.go(-1);">Back</button>
            <button class="create-btn">Start importing</button>
            <p class="what-p" :class="isShow?'':'show'" @click="isShow=!isShow">What is a mnemonic? <i class="iconfont icon-54" v-if="!isShow"></i></p>
            <p class="isshow" v-if="isShow">
            The mnemonic is used to derive multiple private keys. It is a unique wallet phrase that gives you a human readable format of words to backup your wallet for recovery. It is typically a phrase that allows you to access an infinite number of accounts. At its purest form it is a patter of letters, words or associations that help you remember the information easily. It is used by Ledger, TREZOR, MetaMask, Jaxx and others.
    <br /><br />
            The accounts you can access with this phrase are determined by the "path." imToken allows for you to import a wallet using the mnemonic from different paths. However, you cannot export a private key on imToken.
    <br /><br />
            Here is an example of what it should look like: scissors invite lock maple supreme raw rapid void congress muscle digital elegant little brisk hair mango congress clump
    <br /><br />
            Remember: We do not save your wallet password and mnemonic in our server, once forgotten,
            it cannot be recovered.
            </p>
            <p class="hide-p" v-if="isShow" @click="isShow = !isShow">Hide  <i class="iconfont icon-54"></i></p>
        </div>
      </div>
      <div class="official" v-show="chioos==1">
        <p class="mgt30">Remember: We do not save your wallet password and mnemonic in our server, once forgotten,
          it cannot be recovered.</p>
        <textarea class="key-store-input" placeholder="keystore content"/>
        <p class="gray-p mgt30">keystore password</p>
        <input type="password" class="psw" >
        <p class="foot-p XY-fz14">I agree to <em style="">Terms of Service </em>and<em> Privacy Policy</em>.</p>
        <button class="back-btn" @click="$router.go(-1);">Back</button>
        <button class="create-btn">Start importing</button>
        <p class="what-p" :class="isShow?'':'show'" @click="isShow=!isShow">What is a keystore? <i class="iconfont icon-54" v-if="!isShow"></i></p>
        <p class="isshow" v-if="isShow">
        The mnemonic is used to derive multiple private keys. It is a unique wallet phrase that gives you a human readable format of words to backup your wallet for recovery. It is typically a phrase that allows you to access an infinite number of accounts. At its purest form it is a patter of letters, words or associations that help you remember the information easily. It is used by Ledger, TREZOR, MetaMask, Jaxx and others.
<br /><br />
        The accounts you can access with this phrase are determined by the "path." imToken allows for you to import a wallet using the mnemonic from different paths. However, you cannot export a private key on imToken.
<br /><br />
        Here is an example of what it should look like: scissors invite lock maple supreme raw rapid void congress muscle digital elegant little brisk hair mango congress clump
<br /><br />
        Remember: We do not save your wallet password and mnemonic in our server, once forgotten,
        it cannot be recovered.
        </p>
        <p class="hide-p" v-if="isShow" @click="isShow = !isShow">Hide  <i class="iconfont icon-54"></i></p>
      </div>
      <div v-show="chioos==2" class="pb15">
        <textarea name="" id="" cols="" rows="" class="words-txa" placeholder="Please input your private key"></textarea>
        <div class="main-input-box">
          <div class="main-input-div">
          <p>Password</p>
          <input type="password" />
          </div>
          <div class="main-input-div">
          <p>Confirm Password</p>
          <input type="password" />
          </div>
          <div class="main-input-div">
          <p>Password Hint(Optional)</p>
          <input type="password" />
          </div>
          <p class="foot-p XY-fz14">I agree to <em style="">Terms of Service </em>and<em> Privacy Policy</em>.</p>
          <button class="back-btn" @click="$router.go(-1);">Back</button>
          <button class="create-btn">Start importing</button>
          <p class="what-p" :class="isShow?'':'show'" @click="isShow=!isShow">What is a mnemonic? <i class="iconfont icon-54" v-if="!isShow"></i></p>
          <p class="isshow" v-if="isShow">
          The mnemonic is used to derive multiple private keys. It is a unique wallet phrase that gives you a human readable format of words to backup your wallet for recovery. It is typically a phrase that allows you to access an infinite number of accounts. At its purest form it is a patter of letters, words or associations that help you remember the information easily. It is used by Ledger, TREZOR, MetaMask, Jaxx and others.
  <br /><br />
          The accounts you can access with this phrase are determined by the "path." imToken allows for you to import a wallet using the mnemonic from different paths. However, you cannot export a private key on imToken.
  <br /><br />
          Here is an example of what it should look like: scissors invite lock maple supreme raw rapid void congress muscle digital elegant little brisk hair mango congress clump
  <br /><br />
          Remember: We do not save your wallet password and mnemonic in our server, once forgotten,
          it cannot be recovered.
          </p>
          <p class="hide-p" v-if="isShow" @click="isShow = !isShow">Hide  <i class="iconfont icon-54"></i></p>
        </div>
      </div>
      <div v-show="chioos==3" class="pb15" style="margin:0 30px;">
        <p class="mgt30">Remember: We do not save your wallet password and mnemonic in our server, once forgotten,
            it cannot be recovered.</p>
        <p class="gray-p mgt30">keystore password</p>
          <input type="text" class="psw" >
        <p class="mgt30 note">Note: Watch Wallet needs pairing with Cold Wallet to offline sign transaction. Make a retired mobile phone as the Cold Wallet is a good choice.</p>
        <button class="back-btn" @click="$router.go(-1);">Back</button>
        <button class="create-btn">Start importing</button>
        <p class="what-p" :class="isShow?'':'show'" @click="isShow=!isShow">how offline signing works <i class="iconfont icon-54" v-if="!isShow"></i></p>
        <p class="isshow" v-if="isShow">
        The mnemonic is used to derive multiple private keys. It is a unique wallet phrase that gives you a human readable format of words to backup your wallet for recovery. It is typically a phrase that allows you to access an infinite number of accounts. At its purest form it is a patter of letters, words or associations that help you remember the information easily. It is used by Ledger, TREZOR, MetaMask, Jaxx and others.
<br /><br />
        The accounts you can access with this phrase are determined by the "path." imToken allows for you to import a wallet using the mnemonic from different paths. However, you cannot export a private key on imToken.
<br /><br />
        Here is an example of what it should look like: scissors invite lock maple supreme raw rapid void congress muscle digital elegant little brisk hair mango congress clump
<br /><br />
        Remember: We do not save your wallet password and mnemonic in our server, once forgotten,
        it cannot be recovered.
        </p>
        <p class="hide-p" v-if="isShow" @click="isShow = !isShow">Hide  <i class="iconfont icon-54"></i></p>
      </div>
  </div>
</template>

<script>

// import trips from './trips'
export default {
  name: 'myWallet-index',
  components: {
    // 'e-header': header
  },
  data () {
    return {
      textareaWord: '',
      TabTitle: 'Mnemonic',
      importTab: ['Mnemonic', 'Official', 'Private key', 'Watch'],
      Wallet: 'm / 44’ / 60’ / 0’ / 0 / 0',
      walletList: ['m / 44’ / 60’ / 0’ / 0 / 0 Jaxx, Metamask (ETH)', 'm / 44’ / 60’ / 0’ / 0 Ledger (ETH)', 'm / 44’ / 60’ / 1’ / 0 / 0 Your custom path'],
      chioos: 0,
      isShow: false
    }
  },
  methods: {
    selectTab (value, index) {
      this.chioos = index
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
.red-color{
  color: $red-color;
}
.my-wallet-import{
  font-family: Roboto-Regular;
  font-size: 16px;
  max-width: 820px;
  // height: 640px;
  border: 1px solid #E6E7E8;
  color: #4a4a4a;
  .select-wrap{
    margin-top: 30px;
    margin-bottom: 40px;
    span{
      padding: 10px 0;
      cursor: pointer;
      margin-left: 30px;
    }
    span.active{
      color: $red-color;
      border-bottom: 1px solid $red-color;
    }
  }
  .wallet-select{
    margin-left: 30px;

  }
  .top-text{
    background: #f8f8f8;
    p{
      border-bottom: 1px solid #E6E7E8;
      padding: 15px 30px;
      color: #4a4a4a;
      letter-spacing: 1px;
    }
  }
  .main-input-box{
    padding: 0px 30px;
    .main-input-div{
      border-bottom: 1px solid #E6E7E8;
      p{
        color: grey;
        margin: 30px 0 10px 0;
      }
      input{
        border: none;
        width: 50%;
        height: 20px;
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
  }
  .mnemonic-input{
    margin-left: 30px;
  }
  textarea{
    width: 400px;
    height: 140px !important;
    display: block;
    resize: none;
    border: 1px solid #E6E7E8;
  }
  textarea.words-txa{
    padding: 20px;
    font-size: 16px;
    margin: 30px 0 30px 30px;
  }
  .el-dropdown{
    margin: 30px 30px 50px 30px;
    cursor: pointer;
  }
}
.el-dropdown-menu{
  left: 360px !important;
  background: #FFFFFF;
  box-shadow: 2px 10px 20px 0 rgba(0,0,0,0.15);
  border-radius: 3px;
}
.el-dropdown-menu__item{
  p{
    display: inline-block;
  }
  .space{
    margin-left: 23px;
  }
}
.el-dropdown-menu__item.active{
  display: flex;
  align-items: center;
  color: #F4436C;
}
.isshow{
  margin-top: 30px;
}
.pb15{
  padding-bottom: 15px;
}
.note{
  font-family: Roboto-Regular;
  font-size: 14px;
  color: #585858;
  line-height: 26px;
  margin-bottom: 20px;
}
.psw{
  border: none;
  border-bottom: 1px solid #E6E7E8;
  width: 100%;
  margin-top: 15px;
  height: 30px;
}
.mgt30{
    margin-top: 30px;
}
.official{
  margin: 15px 30px;
  .key-store-input{
    width: 300px;
    height: 300px;
    resize: none;
    padding: 10px 20px;
    box-sizing: border-box;
    border: 1px solid #E6E7E8;
    font-size: 16px;
    margin-top: 30px !important;
  }
  .gray-p{
    color: #B1B3B6;
  }
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
  margin-left: 15px;
}
.what-p{
  margin-top: 30px;
  letter-spacing: 0;
  cursor: pointer;
  i{
    font-size: 16px;
  }
}
.what-p.show{
  color: #F4436C;
}
.hide-p {
  margin: 30px 0;
  color: #F4436C;
  letter-spacing: 0;
  cursor: pointer;
  i{
    display: inline-block;
    transform: rotate(180deg);
  }
}
@media only screen and (max-width: 500px){
  .my-wallet-import textarea{
    width: 220px;
  }
  .official .key-store-input{
    width: 260px;
  }
}
@media only screen and (max-width: 500px){
  button{
    width: 100%;
  }
  .back-btn{
    width: 100%;
  }
  .create-btn{
    width: 100%;
    margin-left: 0;
    margin-top: 15px;
  }
  .my-wallet-import .select-wrap span{
    line-height: 48px;
    word-wrap: break-word;
  }
}
</style>
<style lang="scss">
.wallet-select .el-input__inner{
  border: none;
}
.wallet-select .el-select .el-input .el-select__caret{
  color: #F4436C;
}
@media only screen and (max-width: 400px){
  .el-select-dropdown{
    width:250px;
  }
}
</style>
