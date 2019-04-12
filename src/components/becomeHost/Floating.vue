<template>
  <div>
    <div class="becomeHost-header">
      <div class="title">{{$t('message.Getready')}}</div>
      <h3>{{$t('message.Fixedprice')}}</h3>
    </div>
    <div class="floating">
      <ul>
        <li>
          <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Suspendisse sodales enim ac justo vehicula faucibus. </p>
          <p class="label">CNY</p>
          <input v-model="$store.state.host.prices[0].bestPrice" type="text" @blur="bindingVerify('bestPrice', $store.state.host.prices[0].bestPrice)" />
          <p class="warning" v-show="verify.indexOf('bestPrice') !== -1">{{$t('message.Pleaseenterthecorrectprice')}}</p>
        </li>
      </ul>
    </div>

    <div class="becomeHost-header">
      <h3>{{$t('message.Floatingprice')}}</h3>
    </div>
    <div class="floating">
      <ul>
        <li>
          <h5>{{$t('message.Lowestprice')}}</h5>
          <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Suspendisse sodales enim ac justo vehicula faucibus. </p>
          <p class="label">CNY</p>
          <input v-model="$store.state.host.prices[0].minPrice" type="text" @blur="bindingVerify('minPrice', $store.state.host.prices[0].minPrice)" />
          <p class="warning" v-show="verify.indexOf('minPrice') !== -1">{{$t('message.Pleaseenterthecorrectprice')}}</p>
        </li>
        <li>
          <h5>{{$t('message.Highestprice')}}</h5>
          <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Suspendisse sodales enim ac justo vehicula faucibus. </p>
          <p class="label">CNY</p>
          <input v-model="$store.state.host.prices[0].maxPrice" type="text" @blur="bindingVerify('maxPrice', $store.state.host.prices[0].maxPrice)" />
          <p class="warning" v-show="verify.indexOf('maxPrice') !== -1">{{$t('message.Pleaseenterthecorrectprice')}}</p>
        </li>
      </ul>
    </div>
    <button class="r-button next"
            :class="verify.length || $store.state.host.prices[0].bestPrice =='' || $store.state.host.prices[0].minPrice =='' || $store.state.host.prices[0].maxPrice ==''  ? 'disable' : null"
            :disabled="verify.length != 0 || $store.state.host.prices[0].bestPrice =='' || $store.state.host.prices[0].minPrice =='' || $store.state.host.prices[0].maxPrice ==''"
            @click="next" >{{$t('message.Next')}}</button>

  </div>
</template>

<script>
  import utils from '../../utils/utils.js'
export default {
  data () {
    return {
      verify: [],
    }
  },
  created () {

    if(this.$route.query.id){
      this.getprice(this.$route.query.id)
    }

    if(this.$store.state.becomehostTitle.Requirements != 'Requirements'){
      this.$router.push('/becomeHost/Requirements')
    }

  },
  methods: {
    getprice (id) {

      this.$get(this.partialplaceUrl + '/temp/place', {
        tempPlaceId: id
      }).then((res) => {
        if(res.code == 200){
          if(res.data.prices[0].bestPrice){
            this.$store.state.host.prices[0].bestPrice = res.data.prices[0].bestPrice;
          }

          if(res.data.prices[0].maxPrice){
            this.$store.state.host.prices[0].maxPrice = res.data.prices[0].maxPrice;
          }

          if(res.data.prices[0].minPrice){
            this.$store.state.host.prices[0].minPrice = res.data.prices[0].minPrice;
          }
        }
      })

    },
    // 失焦验证
    bindingVerify (type, val) {
      let verify = this.verify

      if (type === 'bestPrice') {
        utils.checkPrice(val) ? verify.push(type) : verify.splice(verify.indexOf(type), 1)
      }

      if (type === 'minPrice') {
        utils.checkPrice(val) ? verify.push(type) : verify.splice(verify.indexOf(type), 1)
      }

      if(type === 'maxPrice'){
        utils.checkPrice(val) ? verify.push(type) : verify.splice(verify.indexOf(type), 1)
      }

      this.verify = [...new Set(this.verify)]
    },
    next () {
      this.$router.push({path: '/becomeHost/ServiceFee', query: {id: this.$route.query.id}})
      this.$store.state.becomehostTitle.Floating = 'Floating'
    }
  }
}
</script>

<style scoped lang='scss'>
.floating {
  ul {
    li {
      margin-bottom: 60px;
      h5 {
        font-family: Roboto-Medium;
        font-size: 16px;
        color: #4A4A4A;
        font-weight: 100;
        margin: 0;
      }
      .text {
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #000000;
        line-height: 19px;
        margin: 10px 0 20px 0;
      }
      .label {
        font-family: Roboto-Medium;
        font-size: 16px;
        color: #4A4A4A;
        margin-bottom: 10px;
      }
      input{
        width: 394px;
        height: 46px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        padding: 0 15px;
        font-family: Roboto-Regular;
        font-size: 16px;
      }
    }
  }
}
</style>

<style>
.floating .el-input__inner {
  width: 394px;
  height: 46px;
}
@media only screen and (max-width: 800px) {
  .floating .el-input__inner {
    width: 100%
  }
}
.warning {
  font-family: Roboto-Regular;
  color: #f4436c !important;
  margin-top: 10px;
}
</style>
