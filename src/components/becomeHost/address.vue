<template>
  <div>
     <div class="becomeHost-header">
      <div class="title">Get ready</div>
      <h3>Wallet address</h3>
    </div>
    <div class="address">
      <ul>
        <li>
          <p class="label">Receiving code</p>
          <textarea cols="30" rows="10" placeholder="Wallet address"></textarea>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>

<style scoped lang='scss'>
.address {
  ul {
    li {
      .label {
        font-family: Roboto-Medium;
        font-size: 16px;
        color: #4A4A4A;
        margin-bottom: 10px;
      }
       textarea {
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        width: 394px;
        height: 160px;
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0;
        padding: 15px;
        box-sizing: border-box;
        resize: none;
        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>

<style>
@media only screen and (max-width: 800px) {
  .address textarea {
    width: 100%!important;
  }
}
</style>
