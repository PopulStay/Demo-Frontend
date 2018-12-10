<template>
  <div>
    <ul class="tabList flex-wrap flex-wrap-wrap">
        <li v-for="(item, index) in tripsTabList" :key="index" :class="$route.query.title == item ? 'active' : ''" @click="tripsTabClick(item, index)">{{item}}</li>
    </ul>
    <div class="wrap">
      <div class="header flex-wrap flex-content-between">
        <p class="h3">{{this.$route.query.title}}</p>
        <p class="time">Booked on 25 October, 2018</p>
      </div>
      <div class="content flex-wrap">
        <div class="flex-1 c-left">
          <img src="../../assets/images/trips/checked-in.png" alt="">
        </div>
        <div class="c-right">
          <h3>Lorem ipsum dolor sit amet consectetur adipiscing elit</h3>
          <ul>
            <li class="flex-wrap flex-align-center">
              <div class="title flex-1">Booking ID</div>
              <div class="text flex-2 flex-wrap">114693321</div>
            </li>
            <li class="flex-wrap">
              <div class="title flex-1">
                <p class="check">Check-in</p>
                <p class="check">Check-out</p>
              </div>
              <div class="text flex-2">
                <p class="check">23 Sep 2018</p>
                <p class="check">25 Sep 2018</p>
                <p class="check">2 nights</p>
              </div>
            </li>
            <li class="flex-wrap flex-align-center">
              <div class="title flex-1">Contact details</div>
              <div class="text flex-2 flex-wrap">name@mail.com</div>
            </li>
            <li class="flex-wrap flex-align-center">
              <div class="title flex-1">Host name</div>
              <div class="text flex-2 flex-wrap">Nunc Eget</div>
            </li>
            <li class="flex-wrap flex-align-center">
              <div class="title flex-1">Guest name</div>
              <div class="text flex-2 flex-wrap">Fusce Inibs, Sed Placerat</div>
            </li>
            <li class="flex-wrap flex-align-center">
              <div class="title flex-1">Booked capacity</div>
              <div class="text flex-2 flex-wrap">2 adults</div>
            </li>
            <li class="flex-wrap flex-align-center">
              <div class="title flex-1">Payment details</div>
              <div class="text flex-2 flex-wrap">
                <span class="flex-2">PPS 100 x 2 nights</span>
                <span class="flex-1">PPS</span>
                <span class="flex-1">500</span>
              </div>
            </li>
            <li class="flex-wrap flex-align-center">
              <div class="title flex-1"></div>
              <div class="text last-li flex-2">
                <p class="flex-wrap">
                  <span class="flex-2">Cleaning fee</span>
                  <span class="flex-1">PPS</span>
                  <span class="flex-1">0</span>
                </p>
                <p class="flex-wrap">
                  <span class="flex-2">Service fee</span>
                  <span class="flex-1">PPS</span>
                  <span class="flex-1">7.5</span>
                </p>
                <p class="flex-wrap">
                  <span class="flex-2 red">Total</span>
                  <span class="flex-1 red">PPS</span>
                  <span class="flex-1 red">507.5</span>
                </p>
              </div>
            </li>
          </ul>
          <div class="button-wrap flex-wrap">
            <div class="button r-button Pending" v-if="this.$route.query.title === 'Pending'">Confirm and pay</div>
            <div class="button r-button" v-else-if="this.$route.query.title === 'Upcoming'">Confirm</div>
            <div class="button r-button check-out" v-else-if="this.$route.query.title === 'Checked-in'">
              <p>Edit</p>
              <p>Check-out time</p>
            </div>
            <div class="button r-button" v-else-if="this.$route.query.title === 'Completed'">Delete</div>
            <div class="button r-button" v-else-if="this.$route.query.title === 'Cancelled'">Delete</div>

            <div class="button r-button" @click="cancel" v-if="this.$route.query.title !== 'Completed' && this.$route.query.title !== 'Cancelled'">Cancel</div>
            <div class="button r-button" @click="cancel" v-else>Share</div>
          </div>
        </div>
      </div>

      <!-- 待定取消弹窗  -->
      <el-dialog  :visible.sync="pendingShow" width="500px" class="pendingWrap">
        <h3>Cancel my booking</h3>
        <p>Please let us know the reason why you</p>
        <p>wish to cancel your booking.</p>
        <div class="select-wrap">
          <el-select v-model="value11" placeholder="Please select one reason" style="width:100% !important;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"  class="pendingWrap-select">
              <span class="icon-CHECKMARK-wrap"><i class="icon iconfont icon-CHECKMARK" v-if="value11 == item.value"></i></span>
              <span class="pendingWrap-text">{{item.label}}</span>
            </el-option>
          </el-select>
        </div>
        <div class="r-button button" @click="submit">Submit</div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pendingShow: false,
      value11: '',
      tripsTabList: ['All', 'Pending', 'Upcoming', 'Checked-in', 'Completed', 'Cancelled'],
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
      }]
    }
  },
  methods: {
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
          title: item
        }
      })
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
