<template>
  <div>
     <div class="becomeHost-header">
      <div class="title">Get ready</div>
      <h3>Cleanup Service Fee</h3>
    </div>
    <div class="fixed">
      <ul>
        <li>
          <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Suspendisse sodales enim ac justo vehicula faucibus. </p>
          <p class="label">PPS</p>
          <el-input type="text" v-model="$store.state.host.prices[0].cleanupServiceFee"></el-input>
        </li>
        <h3>Long-term reservation</h3>
        <li>
          <p class="label">Weekly Discount</p>
          <el-input type="text" v-model="$store.state.host.weeklyDiscount"></el-input>
        </li>
        <li>
          <p class="label">Monthly Discount</p>
          <el-input type="text" v-model="$store.state.host.monthlyDiscount"></el-input>
        </li>
        <h3>How long can tenants live?</h3>
        <li>
          <p class="label">Minimum number of days</p>
          <el-input type="text" v-model="$store.state.host.guestMinStayNight"></el-input>
        </li>
        <li>
          <p class="label">Maximum number of days</p>
          <el-input type="text" v-model="$store.state.host.guestMaxStayNight"></el-input>
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
            @click="next" >Next</button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
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
