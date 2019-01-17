<template>
  <div>
    <div class="becomeHost-header">
      <div class="title">Get ready</div>
      <h3>Fixed price</h3>
    </div>
    <div class="floating">
      <ul>
        <li>
          <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Suspendisse sodales enim ac justo vehicula faucibus. </p>
          <p class="label">PPS</p>
          <el-input v-model="$store.state.host.prices[0].bestPrice" type="text"></el-input>
        </li>
      </ul>
    </div>

    <div class="becomeHost-header">
      <h3>Floating price</h3>
    </div>
    <div class="floating">
      <ul>
        <li>
          <h5>Lowest price</h5>
          <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Suspendisse sodales enim ac justo vehicula faucibus. </p>
          <p class="label">PPS</p>
          <el-input v-model="$store.state.host.prices[0].minPrice" type="text"></el-input>
        </li>
        <li>
          <h5>Highest price</h5>
          <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Suspendisse sodales enim ac justo vehicula faucibus. </p>
          <p class="label">PPS</p>
          <el-input v-model="$store.state.host.prices[0].maxPrice" type="text"></el-input>
        </li>
      </ul>
    </div>

    <button class="r-button next"
            :class="$store.state.host.prices[0].bestPrice == '' || $store.state.host.prices[0].minPrice == '' || $store.state.host.prices[0].maxPrice == '' ? 'disable' : null"
            :disabled="$store.state.host.prices[0].bestPrice == '' || $store.state.host.prices[0].minPrice == '' || $store.state.host.prices[0].maxPrice == ''"
            @click="next" >Next</button>

  </div>
</template>

<script>
export default {
  data () {
    return {
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
</style>
