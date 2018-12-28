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
          <el-input v-model="$store.state.host.prices[0].cleanupServiceFee" type="number"></el-input>
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
  },
  created () {

    if(this.$route.query.id){
      this.getprice(this.$route.query.id)
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

    }
  }
}
</script>

<style scoped lang='scss'>
.fixed {
  ul {
    li {
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
