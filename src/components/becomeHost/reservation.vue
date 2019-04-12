<template>
  <div>
     <div class="becomeHost-header">
      <div class="title">{{$t('message.Getready')}}</div>
      <h3>{{$t('message.ReservationTime')}}</h3>
    </div>
    <div class="reservation">
      <ul>
        <li>
          <p class="label">{{$t('message.AvailableCheckinTimeFrom')}}</p>
          <el-select v-model="$store.state.host.availableCheckinTimeFrom" :placeholder="$t('message.Select')">
            <el-option
              v-for="item in 24"
              :key="item"
              :label="item+' : 00'"
              :value="item">
            </el-option>
          </el-select>
        </li>
        <li>
          <p class="label">{{$t('message.AvailableCheckinTimeTo')}}</p>
          <el-select v-model="$store.state.host.availableCheckinTimeTo" @change="$store.state.host.checkOutTime = ''" :placeholder="$t('message.Select')">
            <el-option
              v-for="item in 24"
              :key="item"
              :label="item+' : 00'"
              :value="item">
            </el-option>
          </el-select>
        </li>
        <li>
          <p class="label">{{$t('message.CheckOutTime')}}</p>
          <el-select v-model="$store.state.host.checkOutTime" :placeholder="$t('message.Select')">
            <el-option
              v-for="item in 24"
              v-show="item < $store.state.host.availableCheckinTimeTo"
              :key="item"
              :label="item+' : 00'"
              :value="item">
            </el-option>
          </el-select>
        </li>
        <li>
          <p class="label">{{$t('message.NeedReserveDay')}}</p>
          <el-select v-model="$store.state.hostinfo.needNoticeDay" @change="needNoticeDayFUN" :placeholder="$t('message.Select')">
            <el-option
              v-for="item in needNoticeDayoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <p class="label">{{$t('message.NeedReserveBeforeTime')}}</p>
          <el-select v-model="$store.state.host.needNoticeBeforeTime" :placeholder="$t('message.Select')">
            <el-option
              v-for="item in 24"
              v-if="item > 5 "
              :key="item"
              :label="item+' : 00'"
              :value="item">
            </el-option>
          </el-select>
        </li>
      </ul>
    </div>

    <button class="r-button next"
            :class="$store.state.host.checkOutTime == '' ||
                    $store.state.host.needNoticeDay == '' ||
                    $store.state.host.needNoticeBeforeTime == '' ||
                    $store.state.host.availableCheckinTimeFrom == '' ||
                    $store.state.host.availableCheckinTimeTo == '' ? 'disable' : null"
            :disabled="$store.state.host.checkOutTime == '' ||
                    $store.state.host.needNoticeDay == '' ||
                    $store.state.host.needNoticeBeforeTime == '' ||
                    $store.state.host.availableCheckinTimeFrom == '' ||
                    $store.state.host.availableCheckinTimeTo == ''"
            @click="next" >{{$t('message.Next')}}</button>


  </div>
</template>

<script>
export default {
  data () {
    return {
      needNoticeDayoptions: [
        {
          value: '0',
          label: this.$t('message.today')
        },
        {
          value: '1',
          label: '1' + this.$t('message.day')
        },
        {
          value: '2',
          label: '2' + this.$t('message.day')
        },
        {
          value: '3',
          label: '3' + this.$t('message.day')
        },
        {
          value: '7',
          label: '7' + this.$t('message.day')
        }
      ],
      needNoticeDay:''
    }
  },
  created () {

    if(this.$route.query.id){
      this.getprice(this.$route.query.id)
    }

    if(this.$store.state.becomehostTitle.ServiceFee != 'ServiceFee'){
      this.$router.push('/becomeHost/ServiceFee')
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
    },
    next () {
      this.$router.push({path: '/becomeHost/Submit', query: {id: this.$route.query.id}})
      this.$store.state.becomehostTitle.reservation = 'reservation'
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
