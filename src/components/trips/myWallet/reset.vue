<template>
  <div class="my-wallet-reset">
      <div class="top-text">
          <p>Reset password</p>
      </div>
      <div class="main-input-box">
        <div class="main-input-div-left">
          <input type="password" placeholder="Old password"/>
          <input type="password"  placeholder="New password"/>
          <input type="password"  placeholder="Confirm password"/>
        </div>
        <div class="main-input-div-right">
            <button class="back-btn" @click="$router.go(-1);">Cancel</button>
            <button class="create-btn">Save</button>
        </div>
      </div>
  </div>
</template>

<script>

// import trips from './trips'
export default {
  name: 'reset',
  components: {
    // 'e-header': header
  },
  data () {
    return {

    }
  },
  methods: {
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
.my-wallet-reset{
  font-family: Roboto-Regular;
  font-size: 16px;
  width: 820px;
  // height: 264px;
  border: 1px solid #E6E7E8;
  .top-text{
    background: #f8f8f8;
    p{
      font-weight: 600;
      border-bottom: 1px solid #E6E7E8;
      padding: 15px 20px;
      color: gray;
    }
  }
  .main-input-box{
    padding: 10px 20px;
    .main-input-div-left{
      display: inline-block;
      input{
        border: 1px solid #E6E7E8;
        width: 300px;
        height: 40px;
        margin: 10px 0;
        text-indent: 20px;
        display: block;
      }
      input::placeholder{
        color: gray;
      }
    }
    .main-input-div-right{
      display: inline-block;
      text-align: right;
      width: 350px;
    }
    button{
      color: #fff;
      border-radius: 3px;
      border: none;
      background: #F4436C;
      font-size: 16px;
      width: 126px;
      height: 50px;
      outline: none;
      cursor: pointer;
      // font-weight: 700;
    }
    // .back-btn{
    //   width: 120px;
    //   height: 50px;
    // }
    .create-btn{
      margin-left: 15px;
    }
  }
}
@media only screen and (max-width: 900px) {
  .my-wallet-reset{
    width: 400px;
  }
}
@media only screen and (max-width: 400px) {
  .my-wallet-reset{
    width: 300px;
  }
  .my-wallet-reset .main-input-box .main-input-div-right{
    width: 100%;
    text-align: center;
  }
  .my-wallet-reset .main-input-box button{
    width: 100%;
  }
  .my-wallet-reset .main-input-box .main-input-div-left input{
    width: 200px;
  }
  .my-wallet-reset .main-input-box .create-btn{
    margin-left: 0;
    margin-top: 15px;
  }
}
</style>
