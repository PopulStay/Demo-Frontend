<template>
  <div>
     <div class="becomeHost-header">
      <div class="title">{{$t('message.Getready')}}</div>
      <h3>{{$t('message.CleanupServiceFee')}}</h3>
    </div>
    <div class="fixed">
      <ul>
        <li>
          <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Suspendisse sodales enim ac justo vehicula faucibus. </p>
          <p class="label">CNY</p>
          <input type="text"  v-model="$store.state.host.prices[0].cleanupServiceFee"  @blur="bindingVerify('cleanupServiceFee', $store.state.host.prices[0].cleanupServiceFee)">
          <p class="warning" v-show="verify.indexOf('cleanupServiceFee') !== -1">{{$t('message.Pleaseenterthecorrectcleaningfeeprice')}}</p>
        </li>
        <h3>{{$t('message.Longtermreservation')}}</h3>
        <li>
          <p class="label">{{$t('message.WeeklyDiscount')}}</p>
          <input type="text" v-model="$store.state.host.weeklyDiscount" @blur="bindingVerify('weeklyDiscount'),$store.state.host.weeklyDiscount">
          <p class="warning" v-show="verify.indexOf('weeklyDiscount') !== -1">{{$t('message.Pleaseenterthecorrectprice')}}</p>
        </li>
        <li>
          <p class="label">{{$t('message.MonthlyDiscount')}}</p>
          <input type="text" v-model="$store.state.host.monthlyDiscount" @blur="bindingVerify('monthlyDiscount'),$store.state.host.monthlyDiscount">
          <p class="warning" v-show="verify.indexOf('monthlyDiscount') !== -1">{{$t('message.Pleaseenterthecorrectprice')}}</p>
        </li>
        <h3>{{$t('message.Howlongcantenantslive')}}</h3>
        <li>
          <p class="label">{{$t('message.Minimumnumberofdays')}}</p>
          <input type="text" v-model="$store.state.host.guestMinStayNight" @blur="bindingVerify('guestMinStayNight'),$store.state.host.guestMinStayNight">
          <p class="warning" v-show="verify.indexOf('guestMinStayNight') !== -1">{{$t('message.Pleaseenterthecorrectprice')}}</p>
        </li>
        <li>
          <p class="label">{{$t('message.Maximumnumberofdays')}}</p>
          <input type="text" v-model="$store.state.host.guestMaxStayNight" @blur="bindingVerify('guestMaxStayNight'),$store.state.host.guestMaxStayNight">
          <p class="warning" v-show="verify.indexOf('guestMaxStayNight') !== -1">{{$t('message.Pleaseenterthecorrectprice')}}</p>
        </li>
      </ul>
    </div>

    <button class="r-button next"
            :class="$store.state.host.prices[0].cleanupServiceFee == '' ||
                    $store.state.host.weeklyDiscount == '' ||
                    $store.state.host.monthlyDiscount == '' ||
                    $store.state.host.guestMinStayNight == '' ||
                    $store.state.host.guestMaxStayNight == '' ? 'disable' : null"
            :disabled="$store.state.host.prices[0].cleanupServiceFee == '' ||
                    $store.state.host.weeklyDiscount == '' ||
                    $store.state.host.monthlyDiscount == '' ||
                    $store.state.host.guestMinStayNight == '' ||
                    $store.state.host.guestMaxStayNight == ''"
            @click="next" >{{$t('message.Next')}}</button>

  </div>
</template>

<script>
  import utils from '../../utils/utils.js'
export default {
  data () {
    return {
      verify:[]
    }
  },
  created () {

    if(this.$route.query.id){
      this.getprice(this.$route.query.id)
    }

    if(this.$store.state.becomehostTitle.Floating != 'Floating'){
      this.$router.push('/becomeHost/Floating')
    }

  },
  methods: {
    getprice (id) {

      this.$get(this.partialplaceUrl + '/temp/place', {
        tempPlaceId: id
      }).then((res) => {
        if(res.code == 200){
          if(res.data.prices[0].cleanupServiceFee){
            this.$store.state.host.prices[0].cleanupServiceFee = res.data.prices[0].cleanupServiceFee;
          }
        }
      })

    },
    // 失焦验证
    bindingVerify (type, val) {
      let verify = this.verify
      // cleanupServiceFee
      // weeklyDiscount
      // monthlyDiscount
      // guestMinStayNight
      // guestMaxStayNight

      if (type === 'cleanupServiceFee') {
        utils.checkPrice(val) ? verify.push(type) : verify.splice(verify.indexOf(type), 1)
      }


      this.verify = [...new Set(this.verify)]
    },
    next () {
      this.$router.push({path: '/becomeHost/reservation', query: {id: this.$route.query.id}})
      this.$store.state.becomehostTitle.ServiceFee = 'ServiceFee'
    }
  }
}
</script>

<style scoped lang='scss'>
  h3{
    font-weight: 100;
    font-family: Roboto-Medium;
    font-size: 28px;
    color: #4A4A4A;
    letter-spacing: 1px;
    margin: 0;
    padding-bottom: 30px;
  }
.fixed {
  ul {
    li {
      margin-bottom: 30px;
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
.fixed .el-input__inner{
  width: 394px;
  height: 46px;
}
@media only screen and (max-width: 800px) {
  .fixed .el-input__inner {
    width: 100%
  }
}
</style>
