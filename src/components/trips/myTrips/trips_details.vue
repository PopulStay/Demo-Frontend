<template>
  <div>
    <ul class="tabList flex-wrap flex-wrap-wrap">
        <li v-for="(item, index) in tripsTabList" :key="index" :class="$route.query.tripstitle == item ? 'active' : ''" @click="tripsTabClick(item, index)">{{item}}</li>
    </ul>
    <div class="wrap">
      <div class="header flex-wrap flex-content-between">
        <p class="h3">{{this.$route.query.tripstitle}}</p>
        <!--<p class="time">Booked on 25 October, 2018</p>-->
      </div>
      <div class="content flex-wrap">
        <div class="flex-1 c-left">
          <img :src="place_data.picture ? place_data.picture[0].mediumPictureUrl : '../../../assets/images/trips/checked-in.png'" alt="" @click="toListing($route.query.tripsitem.place_id)">
        </div>
        <div class="c-right">
          <!--<h3>Lorem ipsum dolor sit amet consectetur adipiscing elit</h3>-->
          <ul>
            <li class="flex-wrap flex-align-center">
              <div class="title flex-1">{{$t('message.Booking')}} ID</div>
              <div class="text flex-2 flex-wrap">{{this.$route.query.tripsitem.booking_id}}</div>
            </li>
            <li class="flex-wrap">
              <div class="title flex-1">
                <p class="check">{{$t('message.Checkin')}}</p>
                <p class="check">{{$t('message.Checkout')}}</p>
              </div>
              <div class="text flex-2">
                <p class="check">{{getMoment(this.$route.query.tripsitem.start_time)}} {{this.$route.query.tripsitem.available_checkin_time_from}}:00 - {{this.$route.query.tripsitem.available_checkin_time_to}}:00</p>
                <p class="check">{{getMoment(this.$route.query.tripsitem.end_time)}} {{this.$route.query.tripsitem.check_out_time}}:00</p>
                <p class="check">{{(new Date(this.$route.query.tripsitem.end_time) - new Date(this.$route.query.tripsitem.start_time)) / 1000 / 60 / 60 / 24}} {{$t('message.night')}}</p>
              </div>
            </li>
            <li class="flex-wrap flex-align-center">
              <div class="title flex-1">{{$t('message.Contactdetails')}}</div>
              <div class="text flex-2 flex-wrap">{{this.user.email_address}}</div>
            </li>
            <!--<li class="flex-wrap flex-align-center">-->
              <!--<div class="title flex-1">Host name</div>-->
              <!--<div class="text flex-2 flex-wrap">en</div>-->
            <!--</li>-->
            <!--<li class="flex-wrap flex-align-center">-->
              <!--<div class="title flex-1">Guest name</div>-->
              <!--<div class="text flex-2 flex-wrap">Fusce Inibs, Sed Placerat</div>-->
            <!--</li>-->
            <!--<li class="flex-wrap flex-align-center">-->
              <!--<div class="title flex-1">Booked capacity</div>-->
              <!--<div class="text flex-2 flex-wrap">2 adults</div>-->
            <!--</li>-->
            <li class="flex-wrap flex-align-center">
              <div class="title flex-1">{{$t('message.Paymentdetails')}}</div>
              <div class="text flex-2 flex-wrap">
                <span class="flex-2">{{parseInt(this.$route.query.tripsitem.cha_time)}} {{$t('message.night')}}</span>
                <span class="flex-1">{{this.$route.query.tripsitem.currency}}</span>
                <span class="flex-1">{{parseInt(this.$route.query.tripsitem.cha_time) * this.$route.query.tripsitem.price}}</span>
              </div>
            </li>
            <li class="flex-wrap flex-align-center">
              <div class="title flex-1"></div>
              <div class="text last-li flex-2">
                <p class="flex-wrap">
                  <span class="flex-2">{{$t('message.Cleaningfee')}}</span>
                  <span class="flex-1">{{this.$route.query.tripsitem.currency}}</span>
                  <span class="flex-1">{{this.$route.query.tripsitem.cleanup_service_fee}}</span>
                </p>
                <p class="flex-wrap">
                  <span class="flex-2">{{$t('message.Servicefee')}}</span>
                  <span class="flex-1">{{this.$route.query.tripsitem.currency}}</span>
                  <span class="flex-1">{{(this.$route.query.tripsitem.total_price - this.$route.query.tripsitem.price).toFixed(2)}}</span>
                </p>
                <p class="flex-wrap">
                  <span class="flex-2 red">{{$t('message.Total')}}</span>
                  <span class="flex-1 red">{{this.$route.query.tripsitem.currency}}</span>
                  <span class="flex-1 red">{{this.$route.query.tripsitem.total_price}}</span>
                </p>
              </div>
            </li>
          </ul>
          <div class="button-wrap flex-wrap">
            <div class="button r-button" @click="$router.go(-1)">{{$t('message.Back')}}</div>
          </div>
        </div>
      </div>

      <!-- 待定取消弹窗  -->
      <el-dialog  :visible.sync="pendingShow" width="500px" class="pendingWrap">
        <h3>{{$t('message.Cancelmybooking')}}</h3>
        <p>{{$t('message.Pleaseletusknowthereasonwhyyou')}}</p>
        <p>{{$t('message.wishtocancelyourbooking')}}</p>
        <div class="select-wrap">
          <el-select v-model="value11" placeholder="Please select one reason" style="width:100% !important;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"  class="pendingWrap-select">
              <span class="icon-CHECKMARK-wrap"><i class="icon iconfont icon-CHECKMARK" v-if="value11 == item.value"></i></span>
              <span class="pendingWrap-text">{{item.label}}</span>
            </el-option>
          </el-select>
        </div>
        <div class="r-button button" @click="submit">{{$t('message.Submit')}}</div>
      </el-dialog>
    </div>

    <p v-if="$i18n.locale != language ? onloading() : null"></p>

  </div>
</template>

<script>

  var moment = require('moment')

export default {
  data () {
    return {
      pendingShow: false,
      language: this.$i18n.locale,
      value11: '',
      tripsTabList: [this.$t('message.All'), this.$t('message.Pending'), this.$t('message.Upcoming'), this.$t('message.Checkedin'), this.$t('message.Collect'), this.$t('message.Completed'), this.$t('message.Cancelled'), this.$t('message.Refund')],
      options: [{
        value: '1',
        label: 'Please select one reason'
      }, {
        value: '2',
        label: 'I don’t need a place to stay anymore'
      }, {
        value: '3',
        label: 'I’ve booked the wrong dates'
      }, {
        value: '4',
        label: 'I can’t travel on the dates I booked'
      }, {
        value: '5',
        label: 'I’ve find a better place on another website'
      }],
      user: '',
      place_id:'',
      place_data:{},
    }
  },
  beforeMount () {
    if(this.$route.query.tripsitem.place_id){
      this.getplace(this.$route.query.tripsitem.place_id)
    }else{
      this.$router.push('/trips/tripsList')
    }

  },
  created () {
    this.user = this.$store.state.userInfo;
  },
  methods: {
    onloading(){
      this.$router.push('/trips/tripsList')
    },
    getMoment(time){
      if(this.$i18n.locale == 'cn'){
        return moment(time).locale("zh-cn").format('LL')
      }else{
        return moment(time).locale("en-au").format('DD MMM YYYY')
      }
    },
    cancel () {
      this.pendingShow = true
    },
    submit () {
      this.pendingShow = false
      this.$router.push('/trips/tripsList')
    },
    tripsTabClick (item) {
      this.$router.push({
        path: '/trips/tripsList',
        query: {
          tripsitem: item
        }
      })
    },
    getplace(place_id){
      this.$get(this.placeUrl + '/place', {
        placeId: place_id
      }).then((res) => {
          if (res.code === 200){
            console.log(res)
            if(res.data){
              this.place_data = res.data
            }else{
              this.$notify({
                title: this.$t('message.Warning'),
                message: this.$t('message.Thehousehasbeendeleted'),
                type: 'warning'
              });
              this.$router.push('/trips/tripsList')
            }
          }

      })
    },
    toListing (placeId) {
      this.$router.push({path: '/listing/lstHome', query: {id: placeId}})
    }
  }
}
</script>

<style lang="scss" scoped>
$red-color: #F4436C;
.tabList {
  margin-bottom: 30px;
  li {
    margin-right: 35px;
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #000000;
    letter-spacing: 1px;
    line-height: 19px;
    cursor: pointer;
    padding: 8px 0;
  }
  .active {
    color: $red-color;
    border-bottom: 1px solid $red-color;
  }
}
.wrap {
  padding: 30px;
  border: 1px solid #E6E7E8;
  .header {
    .h3 {
      font-family: Roboto-Medium;
      font-size: 16px;
      color: #F4436C;
      letter-spacing: 1px;
    }
    .time {
      font-family: Roboto-Regular;
      font-size: 14px;
      color: #4A4A4A;
      letter-spacing: 0.88px;
    }
  }
  .content {
    padding-top: 30px;
    .c-left {
      box-sizing: border-box;
      img {
        width: 100%;
        cursor: pointer;
      }
    }
    .c-right {
      flex: 3;
      box-sizing: border-box;
      padding-left: 30px;
      h3 {
        text-align: left;
        font-weight: 100;
        margin: 0;
        font-family: Roboto-Medium;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 1px;
        margin-bottom: 30px;
      }
      ul {
        li {
          font-family: Roboto-Regular;
          font-size: 16px;
          color: #4A4A4A;
          letter-spacing: 1px;
          line-height: 26px;
          border-bottom: 1px solid #E6E7E8;
          padding: 15px 0;
          .title {
            width: 300px;
            text-align: left;
          }
          .text {
            text-align: left;
          }
          .last-li {
            p {
              margin-bottom: 25px;
            }
          }
          .check {
            margin-bottom: 2px;
          }
        }
      }
    }
  }
  .red {
    color: $red-color;
    font-family: Roboto-Medium;
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 26px;
  }
  .button {
    width: 130px;
    height: 40px;
    line-height: 42px;
    font-size: 14px;
    letter-spacing: 0.88px;
    margin: 50px 20px 0 0;
  }
  .confirm {
    width: 150px
  }
  .check-out {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1;
  }
}
.pendingWrap {
  h3 {
    font-family: Roboto-Regular;
    font-size: 30px;
    color: #F4436C;
    line-height: 36px;
    margin: 0;
    padding-bottom: 20px;
    font-weight: 100;
  }
  p {
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
    letter-spacing: 0;
  }
 .select-wrap {
   margin: 40px 0;
 }
 .button {
   width: 200px;
   height: 50px;
   line-height: 50px;
   margin: 0 auto;
   font-size: 16px;
 }
}
.icon-CHECKMARK-wrap {
  display: inline-block;
  width: 20px;
}
@media only screen and (max-width: 1000px) {
  .wrap {
    .content {
      display: block;
      .c-left {
        margin-bottom: 20px;
      }
      .c-right {
        padding: 0
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  .wrap {
    padding: 30px 10px;
  }
}
</style>
<style>
.select-wrap .el-select{
  width: 100%;
}
.select-wrap .el-select input {
  height: 46px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
}
.select-wrap .el-scrollbar {
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #000000;
}
.pendingWrap-select:hover {
  color: #f4436c
}
.pendingWrap-select.el-select-dropdown__item.selected {
  color: #b1b3b6;
  font-family: Roboto-Regular;
  font-weight: 100;
}
.pendingWrap-select {
  color: #4a4a4a;
  font-family: Roboto-Regular;
  font-size: 16px;
}
</style>
