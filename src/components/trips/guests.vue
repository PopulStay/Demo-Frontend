<template>
  <div>
    <ul class="tabList flex-wrap flex-wrap-wrap">
      <li v-for="(item, index) in guestsTabList" :key="index" :class="guestsTabTitle == item ? 'active' : ''" @click="guestsTabClick(item, index)">{{item}}</li>
        <li v-for="(item, index) in tripsTabList" :key="index" :class="tripsTabTitle == item ? 'active' : ''" @click="tripsTabClick(item, index)">{{item}}</li>
    </ul>
    <ul class="dataList" v-if="islist == true">
      <li  v-for="(item, index) in tripsList" :key="index">
        <div class="list-header flex-wrap-wrap flex-wrap flex-content-between">
          <p class="title">{{item.status}}</p>
          <!-- <p class="time">Booked on 25 October, 2018</p> -->
        </div>
        <div class="list-content flex-wrap flex-wrap-wrap">
          <div class="list-img">
            <img src="../../assets/images/trips/cancelled.png" alt="">
          </div>
          <div class="list-text">
            <div>
              <!-- <p class="title">{{item.title1}}</p>
              <p class="title">{{item.title2}}</p> -->
              <p class="id">Booking ID: {{item.booking_id}}</p>
            </div>
            <div class="bottom flex-wrap flex-content-between">
              <span class="time">{{item.strat_time}} - {{item.end_time}} {{item.cha_time}}</span>
              <span class="num">{{item.price}} {{item.currency}}</span>
            </div>
          </div>
          <div class="list-operation flex-wrap" :class="item.status == 'Pending' ? 'flex-column-center flex-wrap' : ''">
            <div>
              <p class="details"><router-link :to="{path:'/trips/guests_details',query: {title:item.title}}">View details</router-link></p>
              <p class="cancel" >Cancel</p>
              <!-- v-if="item.title === 'Pending'" -->
            </div>
            <div class="checkout">Confirm</div>
             <!-- v-if="item.title === 'Upcoming'" -->
          </div>
        </div>
      </li>
    </ul>
    <div class="no-data" v-else-if="islist == false">
       no data
    </div>
    <!-- 待定结账弹窗  -->
    <el-dialog  :visible.sync="checkoutShow" width="25%" class="checkoutWrap">
      <div class="input-wrap">
        <input type="text" placeholder="Login password">
      </div>
       <div class="input-wrap">
        <input type="text" placeholder="Payment password">
      </div>
      <div class="button" @click="next">Confirm and pay</div>
    </el-dialog>
    <!-- 扫码付款弹窗  -->
    <el-dialog  :visible.sync="cancelShow" width="22%" class="cancelWrap">
      <div class="text-wrap">
        <p>Your balance is not enough.</p>
        <p>Please use the Token wallet to scan the</p>
        <p>QR code to make a payment.</p>
      </div>
      <div class="asset">
        <img src="../../assets/images/trips/Asset.svg" alt="">
      </div>
      <div class="button" @click="cancelShow = false">Cancel</div>
    </el-dialog>
  </div>
</template>

<script>
  import cancelled from '../../assets/images/trips/cancelled.png'
  import checked from '../../assets/images/trips/checked-in.png'
  import completed from '../../assets/images/trips/completed.png'
  import pending from '../../assets/images/trips/pending.png'
  import upcoming from '../../assets/images/trips/upcoming.png'
  var moment = require('moment')

  export default {
    data () {
      return {
        guestsTabTitle: 'All',
        guestsTabList: ['All', 'Pending', 'Upcoming', 'Checked-in', 'Completed', 'Cancelled'],
        dataList: [
          {title: 'Pending', img: cancelled, title1: 'Lorem ipsum dolor sit amet', title2: 'consectetur adipiscing elit', id: '114693321', time: '23 Sep 2018 - 25 Sep 2018  2 nights', num: '552', state: 0},
          {title: 'Upcoming', img: checked, title1: 'Lorem ipsum dolor sit amet', title2: 'consectetur adipiscing elit', id: '114693321', time: '23 Sep 2018 - 25 Sep 2018  2 nights', num: '552', state: 1},
          {title: 'Checked-in', img: completed, title1: 'Lorem ipsum dolor sit amet', title2: 'consectetur adipiscing elit', id: '114693321', time: '23 Sep 2018 - 25 Sep 2018  2 nights', num: '552', state: 2},
          {title: 'Completed', img: pending, title1: 'Lorem ipsum dolor sit amet', title2: 'consectetur adipiscing elit', id: '114693321', time: '23 Sep 2018 - 25 Sep 2018  2 nights', num: '552', state: 3},
          {title: 'Cancelled', img: upcoming, title1: 'Lorem ipsum dolor sit amet', title2: 'consectetur adipiscing elit', id: '114693321', time: '23 Sep 2018 - 25 Sep 2018  2 nights', num: '552', state: 4}
        ],
        guestsList: [],
        islist: true,
        list: [],
        checkoutShow: false,
        cancelShow: false,
        user: ''
      }
    },
    created () {
      this.user = this.$store.state.userInfo;

      this.list = this.dataList
      let title = this.$route.query.guestsitem
      if (title) this.guestsTabTitle = title
      else this.guestsTabTitle = 'All'

      this.getguestsList()
    },
    methods: {
      getguestsList () {
        // let user = JSON.parse(localStorage.getItem('user'))

        var status = '';

        switch (this.guestsTabTitle) {
          case 'Pending':
            status = 'pending_for_payment'
            break
          case 'Upcoming':
            status = 'pending_for_checking'
            break
          case 'Checked-in':
            status = 'checked_in'
            break
          case 'Completed':
            status = 'completed'
            break
          case 'Cancelled':
            status = 'cancelled'
            break
          default:
            status = ''
            break
        }

        this.$post(this.bookUrl + '/booking', {
          action: 'listHostBookings',
          data: {
            // host_id: user.user_id,
            host_id: 2732,
            page: 0,
            status:status
          }
        }).then((res) => {
          res.data.length > 0 ? this.islist = true : this.islist = false;

          for (let i in res.data) {

            switch (res.data[i].status) {
              case 'pending_for_payment':
                res.data[i].status = 'Pending'
                break
              case 'pending_for_checking':
                res.data[i].status = 'Upcoming'
                break
              case 'checked_in':
                res.data[i].status = 'Checked-in'
                break
              case 'completed':
                res.data[i].status = 'Completed'
                break
              case 'cancelled ':
                res.data[i].status = 'Cancelled'
                break
              default:
                res.data[i].status = ''
                break

              res.data[i].strat_time = moment(res.data[i].strat_time).format('DD MMM YYYY')
              res.data[i].end_time = moment(res.data[i].end_time).format('DD MMM YYYY')
              // console.log(moment.duration(res.data[i].end_time - res.data[i].strat_time), 'days')
              let m1 = moment(res.data[i].strat_time)
              let m2 = moment(res.data[i].end_time)
              // console.log(m1)
              // console.log(m2)
              res.data[i].cha_time = m2.diff(m1, 'day') + 'night'
              // du = moment(res.data[i].end_time - res.data[i].strat_time).format('D night');
              // console.log(res.data[i].strat_time.substring(7))
              // res.data[i].time_cha = res.data[i].strat_time.substring(7) - res.data[i].end_time.substring(7)
            }
            this.list = res.data
            this.tripsList = res.data
            console.log(this.tripsList)
          }
          this.guestsList = res.data;

        })
      },
      guestsTabClick (value, index) {
        this.guestsTabTitle = value
        this.getguestsList()

      },
      next () {
        this.checkoutShow = false
        this.cancelShow = true
      }
    },
    tripsTabClick (value, index) {
      this.tripsTabTitle = value
      // let list = this.dataList.filter((item) => item.title === value)
      // list.length ? this.list = list : this.list = this.dataList
      if (this.list.length > 0) {
        // if (value === 'All') {
        //   console.log('all')
        //   this.tripsList = this.list
        //   this.islist = true
        //   return false
        // }
        let list = this.list.filter((item) => item.status === value)
        list.length > 0 ? this.tripsList = list : this.tripsList = ''
        list.length > 0 ? this.islist = true : this.islist = false
      }
    },
    next () {
      this.checkoutShow = false
      this.cancelShow = true
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
.dataList {
  li {
    margin-bottom: 50px;
    min-height: 300px;
    .list-header {
      margin-bottom: 15px;
      .title {
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 1px;
      }
      .time {
        font-family: Roboto-Regular;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 0.88px;
      }
    }
    .list-content{
      border: 1px solid #E6E7E8;
    }
  }
  .list-img {
    img {
      width: 250px;
      height: 100%;
      min-height: 200px;
    }
  }
  .list-text {
    flex: 2.5;
    text-align: left;
    box-sizing: border-box;
    padding: 30px 30px 30px 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-family: Roboto-Medium;
      font-size: 16px;
      color: #4A4A4A;
      letter-spacing: 1px;
    }
    .id {
      font-family: Roboto-Regular;
      font-size: 14px;
      color: #4A4A4A;
      letter-spacing: 0.88px;
      margin-top: 10px;
    }
    .flex-item:nth-child(4){
      align-items: flex-end;
    }
    .bottom {
      width: 100%;
      box-sizing: border-box;
      .time {
        font-family: Roboto-Regular;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 0.88px;
      }
      .num {
        font-family: Roboto-Medium;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 1px;
        text-align: center;
      }
    }
  }
  .list-operation {
    flex: 1;
    padding: 30px 0;
    text-align: center;
    border-left: none;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    p {
      font-family: Roboto-Regular;
      font-size: 14px;
      color: #4A4A4A;
      letter-spacing: 0.88px;
      line-height: 30px;
    }
    .checkout {
      display: inline-block;
      border-radius: 3px;
      width: 130px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-family: Roboto-Medium;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0.88px;
      background: $red-color;
      cursor: pointer;
    }
    .Edit {
      display: flex;
      flex-direction: column;
      justify-content: center;
      p{
        color: #FFFFFF;
        font-size: 14px;
        line-height: 1;
      }
    }
  }
}
.checkoutWrap {
  .input-wrap {
    border-bottom: 1px solid #E6E7E8;
    height: 60px;
    line-height: 60px;
    input {
      border: none;
      font-size: 16px;
      font-family: Roboto-Regular;
      color: #B1B3B6;
      letter-spacing: 0;
      width: 100%;
      padding: 0 15px;
      color: #B1B3B6;
      box-sizing: border-box;
    }
  }
  .button {
    width: 100%;
    height: 50px;
    background: $red-color;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 3px;
    cursor: pointer;
    margin-top: 30px;
    border-radius: 4px;
  }
}
.cancelWrap {
  .text-wrap {
    padding: 10px 0;
    p {
      font-family: Roboto-Regular;
      font-size: 16px;
      color: #4A4A4A;
      letter-spacing: 0;
      text-align: center;
      line-height: 22px;
      cursor: pointer;
    }
  }
  .asset {
    text-align: center;
    padding: 25px 0;
  }
  .button {
    width: 90%;
    height: 50px;
    margin: 0 auto;
    background: $red-color;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 1px;
    cursor: pointer;
    margin-top: 10px;
    border-radius: 4px;
    font-family: Roboto-Medium;
  }
}
@media only screen  and (max-width: 1100px) {
  .dataList {
    li {
      .list-content {
        display: block;
        border: none;
        .list-img {
          img {
            width: 100%;
          }
        }
        .list-text {
          padding: 5px 0;
        }
        .list-operation {
          padding: 5px 0;
          justify-content: space-between;
          flex-direction: row;
        }
      }
    }
  }
}
@media only screen  and (max-width: 766px) {
  .dataList .list-operation{
    flex: 1;
    padding: 0 0 30px 0;
  }
}
@media only screen  and (max-width: 399px) {
  .dataList .list-operation{
    flex: 1;
    padding: 0 0 30px 0;
  }
  .dataList .list-text{
    width: 100%;
  }
}
.no-data{
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #999;
  font-size: 17px;
  border: 1px solid;
}
</style>
<style>
.checkoutWrap .el-dialog__body {
  padding: 30px 40px;
}
</style>
