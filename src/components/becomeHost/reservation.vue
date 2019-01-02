<template>
  <div>
     <div class="becomeHost-header">
      <div class="title">Get ready</div>
      <h3>Receive notification</h3>
    </div>
    <div class="reservation">
      <ul>
        <li>
          <p class="label">Check Out Time</p>
          <el-select v-model="$store.state.host.checkOutTime">
            <el-option
              v-for="item in 24"
              :key="item"
              :label="item+' : 00'"
              :value="item">
            </el-option>
          </el-select>
        </li>
        <li>
          <p class="label">Need Notice Day</p>
          <el-select v-model="needNoticeDay" @change="needNoticeDayFUN">
            <el-option
              v-for="item in needNoticeDayoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <p class="label">Need Notice Before Time</p>
          <el-select v-model="$store.state.host.needNoticeBeforeTime" @change="needNoticeDayFUN">
            <el-option
              v-for="item in 24"
              v-if="item > 5 "
              :key="item"
              :label="item+' : 00'"
              :value="item">
            </el-option>
          </el-select>
        </li>
        <li>
          <p class="label">Available Checkin Time From</p>
          <el-select v-model="$store.state.host.availableCheckinTimeFrom">
            <el-option
              v-for="item in 24"
              :key="item"
              :label="item+' : 00'"
              :value="item">
            </el-option>
          </el-select>
        </li>
        <li>
          <p class="label">Available Checkin Time To</p>
          <el-select v-model="$store.state.host.availableCheckinTimeTo">
            <el-option
              v-for="item in 24"
              :key="item"
              :label="item+' : 00'"
              :value="item">
            </el-option>
          </el-select>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      needNoticeDayoptions: [
        {
          value: '0',
          label: 'today'
        },
        {
          value: '1',
          label: '1 day'
        },
        {
          value: '2',
          label: '2 day'
        },
        {
          value: '3',
          label: '3 day'
        },
        {
          value: '7',
          label: '7 day'
        }
      ],
      needNoticeDay:''
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
          if(res.data.weeklyDiscount){
            this.$store.state.host.weeklyDiscount = res.data.weeklyDiscount;
          }

          if(res.data.monthlyDiscount){
            this.$store.state.host.monthlyDiscount = res.data.monthlyDiscount;
          }

          if(res.data.checkOutTime){
            this.$store.state.host.checkOutTime = res.data.checkOutTime;
          }
        }
      })

    },
    needNoticeDayFUN(e){
      this.$store.state.host.needNoticeDay = e
    }
  }
}
</script>

<style scoped lang='scss'>
.reservation {
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
.reservation .el-input__inner{
  width: 394px;
  height: 46px;
}
@media only screen and (max-width: 800px) {
  .reservation .el-input__inner {
    width: 100%
  }
}
</style>
