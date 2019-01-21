<template>
  <div>
    <ul class="tabList flex-wrap flex-wrap-wrap">
      <li v-for="(item, index) in tripsTabList" :key="index" :class="tripsTabTitle == item ? 'active' : ''" @click="tripsTabClick(item, index)">{{item}}</li>
    </ul>
    <ul class="dataList" v-if="islist == true">
      <li  v-for="(item, index) in tripsList" :key="index">
        <div class="list-header flex-wrap-wrap flex-wrap flex-content-between">
          <p class="title">{{item.status}}</p>
          <!-- <p class="time">Booked on 25 October, 2018</p> -->
        </div>
        <div class="list-content flex-wrap">
          <!--<div class="list-img"></div>-->
          <div class="list-text">
            <div>
              <!-- <p class="title flex-item">{{item.title1}}</p> -->
              <!-- <p class="title flex-item">{{item.title2}}</p> -->
              <p class="id flex-item">Booking ID: {{item.booking_id}}</p>
            </div>
            <div class="bottom flex-wrap flex-content-between flex-item">
              <span class="time">{{item.start_time}} - {{item.end_time}} {{item.cha_time}}</span>
              <span class="num">{{item.price}} {{item.currency}}</span>
            </div>
          </div>
          <div class="list-operation flex-wrap" :class="item.status == 'Pending' || item.status == 'Completed' ? 'flex-column-center flex-wrap' : ''">
            <div>
              <p class="details"><router-link :to="{path:'/trips/trips_details',query: {tripsitem:item,tripstitle:item.status}}">View details</router-link></p>

              <!--取消预定-->
              <p class="cancel XY-cursorp" v-if="item.status == 'Pending'" @click="bookingID = item.booking_id; getRefundFee()">Cancel</p>

              <p class="cancel XY-cursorp" v-if="item.status == 'Upcoming' || item.status == 'Checked-in'" @click="bookingID = item.booking_id; currentstatus = true; getRefundFee()">Refund</p>
            </div>

            <!--支付-->
            <div class="OrderButton" v-if="item.status == 'Pending' && item.currency != 'CNY'" @click="PaymentShow = true; bookingID = item.booking_id">Payment</div>
            <div class="OrderButton" v-if="item.status == 'Pending' && item.currency == 'CNY'" @click="bookingID = item.booking_id;CNYPayment(); numprice = item.price; currency = item.currency">Payment</div>

            <!--入住-->
            <div class="OrderButton" v-if="item.status == 'Upcoming' && new Date(item.end_time).getTime() < new Date().getTime() && new Date(item.start_time).getTime() > new Date().getTime()" @click=" bookingID = item.booking_id;CheckInOut('1')">Check in</div>
            <div class="OrderButton disabledbtn" v-if="item.status == 'Upcoming' && new Date(item.end_time).getTime() > new Date().getTime()" >Check in timeout</div>
            <div class="OrderButton disabledbtn" v-if="item.status == 'Upcoming' && new Date(item.start_time).getTime() < new Date().getTime()" >Check in</div>

            <!--退房-->
            <div class="OrderButton" v-if="item.status == 'Checked-in' && new Date(item.end_time).getTime() > new Date().getTime()" @click="bookingID = item.booking_id;CheckInOut('0')">Check out</div>
            <div class="OrderButton disabledbtn" v-if="item.status == 'Checked-in' && new Date(item.end_time).getTime() < new Date().getTime()" >Time out</div>

            <!--评价-->
            <div class="OrderButton" v-if="item.status == 'Completed' && !item.have_place_review" @click="ReviewShow = true; bookingID = item.booking_id">Review</div>
            <div class="OrderButton disabledbtn" v-if="item.status == 'Completed' && item.have_place_review">Reviewed</div>


            <!--<div class="OrderButton" v-else-if="item.status == 'Completed'">Confirm</div>-->
            <!--<div class="OrderButton Edit" v-else-if="item.status == 'Cancelled'">-->
              <!--<p>Edit</p>-->
              <!--<p>Check-out time </p>-->
            <!--</div>-->
          </div>
        </div>
      </li>
    </ul>
    <div class="no-data" v-else-if="islist == false">
      No data
    </div>

    <!-- 取消预定  -->
    <el-dialog  :visible.sync="CancelBookingShow"class="checkoutWrap">

      <div>
        <p class="RefundAmount" v-if="currentstatus">Refund amount:<span>{{RefundFee}}</span> {{RefundFeeCurrency}}</p>
        <div class="input-wrap">
          <input type="password" placeholder="Payment password" v-model="userPassword">
        </div>
        <div class="button" @click="CancelBooking">Cancel</div>
      </div>

      <!--<div v-else>-->
        <!--<p class="Refusetorefund"><span>Refuse to refund</span></p>-->
        <!--<div class="button" @click="CancelBookingShow = false">OK</div>-->
      <!--</div>-->

    </el-dialog>


    <!-- 待定结账弹窗  -->
    <el-dialog  :visible.sync="PaymentShow" class="checkoutWrap">
      <el-popover placement="bottom-start" width="300" trigger="manual" v-model="walletshow" popper-class="state-popover">
        <div slot="reference" class="walletList flex-wrap flex-center-between" @click="walletshow = !walletshow">
          <p>{{wallet}}</p>
          <i class="icon iconfont" :class="walletshow ? 'icon-arrow-up' : 'icon-54'"></i>
        </div>
        <div class="popover">
          <ul>
            <li v-for="(item, index) in walletList" :key="index" @click="wallet = item.name; walletID = item.user_wallet_id; walletshow = false">
              {{item.name}}
            </li>
          </ul>
        </div>
      </el-popover>

       <div class="input-wrap">
        <input type="password" placeholder="Payment password" v-model="userPassword">
      </div>
      <div class="button" @click="paynext">Confirm and pay</div>
    </el-dialog>

    <!-- 扫码付款弹窗  -->
    <el-dialog  :visible.sync="qr_codeshow" class="cancelWrap">
      <div class="text-wrap">
        <p>Sweep the payment <span>{{numprice}}</span> {{currency}}</p>
      </div>
      <div class="asset">
        <img :src="qr_codeURL" alt="">
      </div>
      <div class="button" @click="qr_codeshow = false">Cancel</div>
    </el-dialog>

    <!-- 评价  -->
    <el-dialog  :visible.sync="ReviewShow" class="cancelReview">
      <div class="content">
        <div class="c-left">
          <img src="../../../assets/images/trips/checked-in.png" alt="">
          <p></p>
          <span>Booking ID: {{bookingID}}</span>
        </div>
        <div class="c-right">
          <ul>
            <li>
              <p>Accuracy</p>
              <el-rate v-model="Review.Accuracy" disabled-void-color="#F4436C"></el-rate>
            </li>
            <li>
              <p>Location</p>
              <el-rate v-model="Review.Location"></el-rate>
            </li>
            <li>
              <p>Communication</p>
              <el-rate v-model="Review.Communication"></el-rate>
            </li>
            <li>
              <p>Check-in</p>
              <el-rate v-model="Review.Checkin"></el-rate>
            </li>
            <li>
              <p>Cleanliness</p>
              <el-rate v-model="Review.Cleanliness"></el-rate>
            </li>
            <li>
              <p>Value</p>
              <el-rate v-model="Review.Value"></el-rate>
            </li>
          </ul>

          <div class="Description">
            <p>Description</p>
            <textarea v-model="Review.Description"></textarea>
          </div>


          <div class="Submit flex-wrap">
            <div class="button r-button" @click="SubmitReview">Submit</div>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="10"
      layout="prev, pager, next"
      :total="totalPage">
    </el-pagination>

  </div>
</template>

<script>
  import QRCode from 'qrcode'
var moment = require('moment')
const sha256 = require('js-sha256').sha256
export default {
  data () {
    return {
      tripsTabTitle: 'All',
      webxiang: 'nb',
      tripsTabList: ['All', 'Pending', 'Upcoming', 'Checked-in', 'Collect', 'Completed', 'Cancelled', 'Refund'],
      tripsList: [],
      islist: true,
      list: [],
      PaymentShow: false,
      ReviewShow: false,
      qr_codeshow:false,
      qr_codeURL:'',
      CancelBookingShow: false,
      user: '',
      wallet:'Please choose a wallet',
      walletID:0,
      walletList:[],
      walletshow:false,
      userPassword:'',
      bookingID:0,
      Review:{
        Accuracy:0,
        Location:0,
        Communication:0,
        Checkin:0,
        Cleanliness:0,
        Value:0,
        Description:""
      },
      currentPage:1,
      totalPage:0,
      RefundFee:"",
      RefundFeeCurrency:"",
      currentstatus:false,
      numprice:"",
      currency:"",
    }
  },
  created () {
    this.user = this.$store.state.userInfo;

    this.list = this.dataList
    let title = this.$route.query.tripsitem
    if (title) this.tripsTabTitle = title
    else this.tripsTabTitle = 'All'

    this.getTripsList()
    this.getWalletList()
  },
  methods: {
    getTripsList () {
      // let user = JSON.parse(localStorage.getItem('user'))

      var status = '';

      switch (this.tripsTabTitle) {
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
        case 'Collect':
          status = 'pending_for_collect'
          break
        case 'Cancelled':
          status = 'cancelled'
          break
        case 'Refund':
          status = 'pending_for_refund'
          break
        default:
          status = ''
          break
      }

      this.$post(this.bookUrl + '/booking', {
        action: 'listGuestBookings',
        data: {
          guest_id: this.user.user_id,
          page: this.currentPage-1,
          status:status
        }
      }).then((res) => {
        res.data.booking_list.length > 0 ? this.islist = true : this.islist = false;

          for (let i in res.data.booking_list) {
            switch (res.data.booking_list[i].status) {
              case 'pending_for_payment':
                res.data.booking_list[i].status = 'Pending'
                break
              case 'pending_for_checking':
                res.data.booking_list[i].status = 'Upcoming'
                break
              case 'checked_in':
                res.data.booking_list[i].status = 'Checked-in'
                break
              case 'completed':
                res.data.booking_list[i].status = 'Completed'
                break
              case 'pending_for_collect':
                res.data.booking_list[i].status = 'Collect'
                break
              case 'cancelled':
                res.data.booking_list[i].status = 'Cancelled'
                break
              case 'pending_for_refund':
                res.data.booking_list[i].status = 'Refund'
                break
              default:
                res.data.booking_list[i].status = 'Pending'
                break
            }
            res.data.booking_list[i].start_time = moment(res.data.booking_list[i].start_time).format('DD MMM YYYY')
            res.data.booking_list[i].end_time = moment(res.data.booking_list[i].end_time).format('DD MMM YYYY')
            res.data.booking_list[i].cha_time = ((new Date(res.data.booking_list[i].end_time).getTime() - new Date(res.data.booking_list[i].start_time).getTime())/ 1000 / 60 / 60 / 24) + 'night'
          }
          this.tripsList = res.data.booking_list;
          this.totalPage = res.data.total

      })

    },
    getWalletList(){

      this.$post(this.userUrl + '/user', {
        action: 'getUserPPSBalance',
        data: {
          user_id: this.user.user_id
        }
      }).then((res) => {
        if(res.msg.code == 200){
          this.walletList = res.data.user_wallets
        }
      })
    },
    tripsTabClick (value, index) {
      this.tripsTabTitle = value
      this.currentPage = 1;
      this.getTripsList()

    },
    getRefundFee(){

      if(this.currentstatus){
        this.$post(this.bookUrl + '/booking', {
          action: 'getRefundFee',
          data: {
            booking_id: this.bookingID,
          }
        }).then((res) => {
          console.log(res)
          if (res.msg.code == 200) {

            if(res.data.refund_fee == 0){
              this.$notify({
                title: 'warning',
                message: 'Non-refundable.',
                type: 'warning'
              });
            }else{
              this.RefundFee = res.data.refund_fee
              this.RefundFeeCurrency = res.data.currency
              this.CancelBookingShow = true;
            }
          } else {
            this.$notify({
              title: 'warning',
              message: 'Non-refundable.',
              type: 'warning'
            });
          }
        })
      }

    },
    //取消预定/退款
    CancelBooking(){
      this.$post(this.bookUrl + '/booking', {
        action: 'cancelBooking',
        data: {
          user_id: this.user.user_id,
          booking_id: this.bookingID,
          encrypted_password:sha256(this.userPassword)
        }
      }).then((res) => {
        if (res.msg.code == 200) {

          this.$notify({
            title: 'success',
            message: 'Check out successfully.',
            type: 'success'
          });

          this.CancelBookingShow = false
          this.getTripsList()
        }
      })

    },
    //支付
    paynext () {

      this.$post(this.paymentUrl + '/api/v1/payments/deposit', {
        bookingId: this.bookingID,
        userWalletId: this.walletID,
        userWalletEncryptedPassword:sha256(this.userPassword)
      }).then((res) => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })

      this.PaymentShow = false;
      this.userPassword = "";
      this.$alert('Please wait, your order is being paid', 'Paying', {
        confirmButtonText: 'OK',
        callback: action => {
          location.reload();
        }
      });

    },
    //支付宝支付
    CNYPayment(){
      this.$post(this.bookUrl + '/booking ', {
        action:'getBookingQrCode',
        data:{
          booking_id:this.bookingID
        }
      }).then((res) => {
        if(res.msg.code == 200){

          QRCode.toDataURL(res.data.qr_code)
            .then(url => {

              this.qr_codeshow=true;
              this.qr_codeURL=url
            })
            .catch(err => {
              console.error(err)
            })
        }
      })
    },
    //评论
    SubmitReview(){

      this.$post(this.placeUrl + '/place/place_review', {
        userId: this.user.user_id,
        bookId: this.bookingID,
        message: this.Review.Description,
        accuracy_score:  this.Review.Accuracy,
        checkin_score: this.Review.Checkin,
        cleanlines_score: this.Review.Cleanliness,
        communication_score: this.Review.Communication,
        location_score: this.Review.Location,
        value_score: "0",
      }).then((res) => {
        if(res.code == 200){
          this.$message({
            customClass:"centermessage",
            showClose: true,
            message: 'Comment successful',
            type: 'success',
          });
          this.ReviewShow = false
          this.getTripsList()
        }else{
          this.$message({
            customClass:"centermessage",
            showClose: true,
            message: 'The order has been reviewed',
            type: 'success',
          });
          this.ReviewShow = false
          this.getTripsList()
        }
      })

    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTripsList()
    },
    //入住
    CheckInOut(type){
      if(type == 1){

        this.$post(this.bookUrl + '/booking', {
          action:"bookingCheckin",
          data:{
            guest_id: this.user.user_id,
            booking_id: this.bookingID
          }
        }).then((res) => {

          console.log(res)
          if(res.msg.code == 200){
            this.$message({
              customClass:"centermessage",
              showClose: true,
              message: 'Successful stay',
              type: 'success',
            });
            this.getTripsList()
          }

        })

      }else{

        this.$post(this.bookUrl + '/booking', {
          action:"bookingCheckout",
          data:{
            user_id: this.user.user_id,
            booking_id: this.bookingID
          }
        }).then((res) => {
          console.log(res)
          if(res.msg.code == 200){
            this.$message({
              customClass:"centermessage",
              showClose: true,
              message: 'Check out successfully',
              type: 'success',
            });
            this.getTripsList()
          }
        })

      }

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
.dataList {
  li {
    margin-bottom: 50px;
    /*min-height: 300px;*/
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
    width: 250px;
    height: 200px;
    background: url("../../../assets/images/trips/cancelled.png");
    background-size: cover;
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
    min-height: 160px;
    .flex-item{
      width: 100%;
    }
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
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-left: none;
    margin: 0 auto;
    p {
      font-family: Roboto-Regular;
      font-size: 14px;
      color: #4A4A4A;
      letter-spacing: 0.88px;
      line-height: 30px;
    }
    .OrderButton {
      display: inline-block;
      border-radius: 3px;
      min-width: 130px;
      padding: 0 15px;
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
  p.RefundAmount{
    font-size: 20px;
    font-family: Roboto-Regular;
    margin-bottom: 20px;
    span{
      font-size: 30px;
      font-family:Roboto-Medium;
      color: $red-color;
    }
  }
  p.Refusetorefund{
    text-align: center;
    font-size: 30px;
    font-family:Roboto-Medium;
    color: $red-color;
  }
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
      padding: 0;
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
      font-size: 18px !important;
      color: #4A4A4A;
      letter-spacing: 0;
      text-align: center;
      line-height: 22px;
      cursor: pointer;
    }
    span{
      font-size: 30px;
      color: $red-color;
      font-family: Roboto-Medium;
    }
  }
  .asset {
    text-align: center;
    padding: 15px 0;
    img{
      width: 70%;
    }
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

.cancelReview{

  .content{
    overflow: hidden;
  }

  .c-left{
    width:23%;
    float: left;
    img{
      width: 100%;
    }
    p{
      font-family: Roboto-Medium;
      font-size: 16px;
      color: #4A4A4A;
      letter-spacing: 1px;
      margin: 10px 0;
    }
    span{
      font-family: Roboto-Regular;
      font-size: 14px;
      color: #4A4A4A;
      letter-spacing: 0.88px;
    }
  }

  .c-right{

    float: left;
    width: 67%;
    padding-left: 5%;

    ul{

      li{
        display: inline-block;
        width: 48%;
        margin-bottom: 20px;

        &:nth-child(2n){
          float: right;
        }

        p{
          font-family: Roboto-Medium;
          font-size: 16px;
          color: #4A4A4A;
          letter-spacing: 0;
          display: inline-block;
        }

       div{
          display: inline-block;
         float: right;
       }
      }
    }

    .Description{
      p{
        font-family: Roboto-Medium;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0;
      }
      textarea{
        width: 97%;
        height: 100px;
        margin: 10px 0 ;
      }
    }

    .Submit{
      div{
        padding: 10px 15px;
      }
    }
  }

}
@media only screen and (max-width: 1100px) {
  .dataList {
    li {
      .list-content {
        display: block;
        border: none;
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
@media only screen and (max-width: 766px) {
  .dataList .list-operation{
    flex: 1;
    padding: 0 0 30px 0;
  }
}
@media only screen and (max-width: 399px) {
  .dataList .list-operation{
    flex: 1;
    padding: 0 0 30px 0;
  }
  .dataList .list-text{
    width: 100%;
  }
}
.walletList{
  height: 60px;

  p{
    font-size: 18px;
  }

}

.popover {
  li {
    letter-spacing: .83px;
    padding: 5px 0;
    cursor: pointer;
    &:hover {
      color: #F4436C
    }
    i {
      font-style: normal;
      margin-left: 5px;
      color: #999;
    }
  }
}
</style>
<style lang="scss">
.checkoutWrap .el-dialog__body {
  padding: 30px 40px;
}
.cancelWrap .el-dialog,
.checkoutWrap .el-dialog{
  max-width: 440px;
  min-width: 300px;
}
@media only screen and (max-width: 700px) {
  .checkoutWrap .el-dialog__body {
    padding: 30px 15px!important;
  }
}

.cancelReview {
  .el-dialog {
    width: 40%;
    min-width: 800px;
  }
}
.el-pagination{
  text-align: right;
}
</style>
