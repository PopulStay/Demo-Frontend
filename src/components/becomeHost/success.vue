<template>
  <div class="content flex-wrap flex-center">
      <i class="icon iconfont icon-success"></i>
      <h3>Thank you! You’ve successfully submitted your property.</h3>
      <div class="flex-wrap button-wrap">
        <div class="r-button button">View my property</div>
        <div class="r-button button">
          <router-link to="/trips/editProfile">Edit submission</router-link>
        </div>
      </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  height: 100%;
  flex-direction: column;
  .icon-success {
    font-size: 130px;
    color: #F4436C;
  }
  h3 {
    font-family: Roboto-Medium;
    font-size: 28px;
    color: #4A4A4A;
    letter-spacing: 0;
    text-align: center;
    font-weight: 100;
  }
  .button {
    width: 180px;
    height: 50px;
    line-height: 50px;
    margin: 0 10px;
    a {
      width: 100%;
      height: 100%;
    }
  }
}
@media only screen and (max-width: 800px) {
  .button-wrap {
    display: block;
    .button {
      margin: 10px;
    }
  }
}
</style>
