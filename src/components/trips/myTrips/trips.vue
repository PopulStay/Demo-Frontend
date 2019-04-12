<template>
  <div>
    <ul class="tabList flex-wrap flex-wrap-wrap" v-loading.fullscreen.lock="tripsLoading">
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
              <p class="id flex-item">{{$t('message.Booking')}} ID: {{item.booking_id}}</p>
            </div>
            <div class="bottom flex-wrap flex-content-between flex-item">
              <span class="time">{{getMoment(item.start_time)}} - {{getMoment(item.end_time)}} {{item.cha_time}}</span>
              <span class="num">{{item.price}} {{item.currency}}</span>
            </div>
          </div>
          <div class="list-operation flex-wrap" :class="item.status == $t('message.Pending') || item.status == $t('message.Completed') ? 'flex-column-center flex-wrap' : ''">
            <div>
              <p class="details"><router-link :to="{path:'/trips/trips_details',query: {tripsitem:item,tripstitle:item.status}}">{{$t('message.Viewdetails')}}</router-link></p>

              <!--取消预定-->
              <p class="cancel XY-cursorp" v-if="item.status == $t('message.Pending')" @click="bookingID = item.booking_id; getRefundFee()">{{$t('message.Cancel')}}</p>

              <p class="cancel XY-cursorp" v-if="item.status == $t('message.Upcoming') || item.status == $t('message.Checkedin')" @click="bookingID = item.booking_id; currentstatus = true; getRefundFee()">{{$t('message.Refund')}}</p>
            </div>

            <!--支付-->
            <div class="OrderButton" v-if="item.status == $t('message.Pending') && item.currency != 'CNY'" @click="PaymentShow = true; bookingID = item.booking_id">{{$t('message.Pay')}}</div>
            <div class="OrderButton" v-if="item.status == $t('message.Pending') && item.currency == 'CNY'" @click="qr_codeshow = true; bookingID = item.booking_id;CNYPayment(); numprice = item.price; currency = item.currency">{{$t('message.Pay')}}</div>

            <!--入住-->
            <div class="OrderButton" v-if="item.status == $t('message.Upcoming') && new Date(item.end_time).getTime() > new Date().getTime() && new Date(item.start_time).getTime() < new Date().getTime()" @click=" bookingID = item.booking_id;CheckInOut('1')">{{$t('message.Checkin')}}</div>
            <div class="OrderButton disabledbtn" v-if="item.status == $t('message.Upcoming') && new Date(item.end_time).getTime() > new Date().getTime() && new Date(item.start_time).getTime() > new Date().getTime()">{{$t('message.Checkintimeout')}}</div>
            <div class="OrderButton disabledbtn" v-if="item.status == $t('message.Upcoming') && new Date(item.start_time).getTime() < new Date().getTime() && new Date(item.end_time).getTime() < new Date().getTime()" >{{$t('message.Timeout')}}</div>

            <!--退房-->
            <div class="OrderButton" v-if="item.status == $t('message.Checkedin') && new Date(item.end_time).getTime() > new Date().getTime()" @click="bookingID = item.booking_id;CheckInOut('0')">{{$t('message.Checkout')}}</div>
            <div class="OrderButton disabledbtn" v-if="item.status == $t('message.Checkedin') && new Date(item.end_time).getTime() < new Date().getTime()" >{{$t('message.Timeout')}}</div>

            <!--评价-->
            <div class="OrderButton" v-if="item.status == 'Completed' && !item.have_place_review" @click="ReviewShow = true; bookingID = item.booking_id">{{$t('message.Review')}}</div>
            <div class="OrderButton disabledbtn" v-if="item.status == $t('message.Completed') && item.have_place_review">{{$t('message.Reviewed')}}</div>


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
      {{$t('message.Nodata')}}
    </div>

    <!-- 取消预定  -->
    <el-dialog  :visible.sync="CancelBookingShow" class="checkoutWrap">

      <div>
        <p class="RefundAmount" v-if="currentstatus">{{$t('message.Refundamount')}}:<span>{{RefundFee}}</span> {{RefundFeeCurrency}}</p>
        <div class="input-wrap">
          <input type="password" placeholder="Payment password" v-model="userPassword">
        </div>
        <div class="button" @click="CancelBooking('Cancel')">{{$t('message.Cancel')}}</div>
      </div>

      <!--<div v-else>-->
      <!--<p class="Refusetorefund"><span>Refuse to refund</span></p>-->
      <!--<div class="button" @click="CancelBookingShow = false">OK</div>-->
      <!--</div>-->

    </el-dialog>


    <!-- 待定结账弹窗  -->
    <el-dialog  :visible.sync="PaymentShow" class="checkoutWrap">
      <div class="input-wrap">
        <input type="password" :placeholder="$t('message.Paymentpassword')" v-model="userPassword">
      </div>
      <div class="button" @click="paynext">{{$t('message.Confirmandpay')}}</div>
    </el-dialog>

    <!-- 扫码付款弹窗  -->
    <el-dialog  :visible.sync="qr_codeshow" class="cancelWrap">
      <div class="text-wrap">
        <p>{{$t('message.Sweepthepayment')}} <span>{{numprice}}</span> {{currency}}</p>
      </div>
      <div class="asset">
        <img :src="qr_codeURL" alt="">
      </div>
      <div class="button" @click="qr_codeshow = false">{{$t('message.Cancel')}}</div>
    </el-dialog>

    <!-- 评价  -->
    <el-dialog  :visible.sync="ReviewShow" class="cancelReview">
      <div class="content">
        <div class="c-left">
          <img src="../../../assets/images/trips/checked-in.png" alt="">
          <p></p>
          <span>{{$t('message.Booking')}} ID: {{bookingID}}</span>
        </div>
        <div class="c-right">
          <ul>
            <li>
              <p>{{$t('message.Accuracy')}}</p>
              <el-rate v-model="Review.Accuracy" disabled-void-color="#F4436C"></el-rate>
            </li>
            <li>
              <p>{{$t('message.Location')}}</p>
              <el-rate v-model="Review.Location"></el-rate>
            </li>
            <li>
              <p>{{$t('message.Communication')}}</p>
              <el-rate v-model="Review.Communication"></el-rate>
            </li>
            <li>
              <p>{{$t('message.Checkin')}}</p>
              <el-rate v-model="Review.Checkin"></el-rate>
            </li>
            <li>
              <p>{{$t('message.Cleanliness')}}</p>
              <el-rate v-model="Review.Cleanliness"></el-rate>
            </li>
            <li>
              <p>{{$t('message.Value')}}</p>
              <el-rate v-model="Review.Value"></el-rate>
            </li>
          </ul>

          <div class="Description">
            <p>{{$t('message.Description')}}</p>
            <textarea v-model="Review.Description"></textarea>
          </div>

          <div class="Submit flex-wrap">
            <div class="button r-button" @click="SubmitReview">{{$t('message.Submit')}}</div>
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

    <p v-if="$i18n.locale != language ? onloading() : null"></p>

  </div>
</template>

<script>
  import QRCode from 'qrcode'
  var moment = require('moment')
  const sha256 = require('js-sha256').sha256
  export default {
    data () {
      return {
        language: this.$i18n.locale,
        tripsTabTitle: this.$t('message.All'),
        tripsLoading:true,
        webxiang: 'nb',
        tripsTabList: [this.$t('message.All'), this.$t('message.Pending'), this.$t('message.Upcoming'), this.$t('message.Checkedin'), this.$t('message.Collect'), this.$t('message.Completed'), this.$t('message.Cancelled'), this.$t('message.Refund')],
        tripsList: [],
        islist: true,
        list: [],
        PaymentShow: false,
        ReviewShow: false,
        qr_codeshow:false,
        qr_codeURL:'',
        CancelBookingShow: false,
        user: '',
        walletID:0,
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
      else this.tripsTabTitle = this.$t('message.All')

      this.getTripsList()
      this.getWalletList()
    },
    methods: {
      onloading(){
        this.language = this.$i18n.locale;
        this.tripsTabList = [this.$t('message.All'), this.$t('message.Pending'), this.$t('message.Upcoming'), this.$t('message.Checkedin'), this.$t('message.Collect'), this.$t('message.Completed'), this.$t('message.Cancelled'), this.$t('message.Refund')]
        this.tripsTabTitle = this.$t('message.All');
        this.getTripsList()
      },
      getTripsList () {

        this.tripsLoading = true

        var status = '';

        switch (this.tripsTabTitle) {
          case this.$t('message.Pending'):
            status = 'pending_for_payment'
            break
          case this.$t('message.Upcoming'):
            status = 'pending_for_checking'
            break
          case this.$t('message.Checkedin'):
            status = 'checked_in'
            break
          case this.$t('message.Completed'):
            status = 'completed'
            break
          case this.$t('message.Collect'):
            status = 'pending_for_collect'
            break
          case this.$t('message.Cancelled'):
            status = 'cancelled'
            break
          case this.$t('message.Refund'):
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
          this.tripsLoading = false
          res.data.booking_list.length > 0 ? this.islist = true : this.islist = false;

          for (let i in res.data.booking_list) {
            switch (res.data.booking_list[i].status) {
              case 'pending_for_payment':
                res.data.booking_list[i].status = this.$t('message.Pending')
                break
              case 'pending_for_checking':
                res.data.booking_list[i].status = this.$t('message.Upcoming')
                break
              case 'checked_in':
                res.data.booking_list[i].status = this.$t('message.Checkedin')
                break
              case 'completed':
                res.data.booking_list[i].status = this.$t('message.Completed')
                break
              case 'pending_for_collect':
                res.data.booking_list[i].status = this.$t('message.Collect')
                break
              case 'cancelled':
                res.data.booking_list[i].status = this.$t('message.Cancelled')
                break
              case 'pending_for_refund':
                res.data.booking_list[i].status = this.$t('message.Refund')
                break
              default:
                res.data.booking_list[i].status = this.$t('message.Pending')
                break
            }
            res.data.booking_list[i].cha_time = ((new Date(res.data.booking_list[i].end_time).getTime() - new Date(res.data.booking_list[i].start_time).getTime())/ 1000 / 60 / 60 / 24) + this.$t('message.night')
          }
          this.tripsList = res.data.booking_list;
          this.totalPage = res.data.total

        })

      },
      getMoment(time){
        if(this.$i18n.locale == 'cn'){
          return moment(time).locale("zh-cn").format('LL')
        }else{
          return moment(time).locale("en-au").format('DD MMM YYYY')
        }
      },
      getWalletList(){

        this.$post(this.userUrl + '/user', {
          action: 'getUserPPSBalance',
          data: {
            user_id: this.user.user_id
          }
        }).then((res) => {
          if(res.msg.code == 200){
            this.walletID = res.data.user_wallets[0].user_wallet_id
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
            if (res.msg.code == 200) {

              if(res.data.refund_fee == 0){
                this.$notify({
                  title: this.$t('message.Warning'),
                  message: this.$t('message.Nonrefundable'),
                  type: 'warning'
                });
              }else{
                this.RefundFee = res.data.refund_fee
                this.RefundFeeCurrency = res.data.currency
                this.CancelBookingShow = true;
              }
            } else {
              this.$notify({
                title: this.$t('message.Warning'),
                message: this.$t('message.Nonrefundable'),
                type: 'warning'
              });
            }
          })
        }else{
          this.CancelBookingShow = true;
        }

      },
      //取消预定/退款
      CancelBooking(Canceltype){
        this.$post(this.bookUrl + '/booking', {
          action: 'cancelBooking',
          data: {
            user_id: this.user.user_id,
            booking_id: this.bookingID,
            encrypted_password:sha256(this.userPassword)
          }
        }).then((res) => {

          if (res.msg.code == 200) {

            if(Canceltype == "Cancel"){
              this.$notify({
                title: this.$t('message.Success'),
                message: this.$t('message.Cancelsuccessfully'),
                type: 'success'
              });
            }else{
              this.$notify({
                title: this.$t('message.Success'),
                message: 'Check out successfully.',
                type: 'success'
              });
            }

            this.CancelBookingShow = false
            this.getTripsList()

          }
        })

      },
      //支付
      paynext () {
        if(this.userPassword != ""){
          this.$post(this.userUrl + '/user', {
            action: "depositPPS",
            data: {
              user_id:this.$store.state.userInfo.user_id,
              booking_id: this.bookingID,
              user_wallet_id: this.walletID,
              encrypted_password:sha256(this.userPassword)
            }
          }).then((res) => {
            if(res.msg.code == 952){
              this.$notify({
                message: this.$t('message.Incorrect password'),
                showClose:false,
                type: 'warning',
                onClick(){
                  this.close()
                }
              });
            }

            if(res.msg.code == 500){
              this.$notify({
                message: this.$t('message.Operationfailedpleasetrylater'),
                showClose:false,
                type: 'warning',
                onClick(){
                  this.close()
                }
              });
              this.PaymentShow = false;
            }

            if(res.msg.code == 200){
              this.$notify({
                message: this.$t('message.Successfulpaymentwilljumptotheorder'),
                showClose:false,
                type: 'success',
                onClick(){
                  this.close()
                }
              });
              this.PaymentShow = false;
              this.getTripsList()
            }
          }).catch(err => {
            console.log(err.response.data.status)
          })


          this.userPassword = "";
        }



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
              message: this.$t('message.Commentsuccessful'),
              type: 'success',
            });
            this.ReviewShow = false
            this.getTripsList()
          }else{
            this.$message({
              customClass:"centermessage",
              showClose: true,
              message: this.$t('message.Theorderhasbeenreviewed'),
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
                message: this.$t('message.Successfulstay'),
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
            if(res.msg.code == 200){
              this.$message({
                customClass:"centermessage",
                showClose: true,
                message: this.$t('message.Checkoutsuccessfully'),
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
        color: #000;
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
          padding: 20px;
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
      .list-text{
        min-height: 80px;
      }
    }
    .tabList{
      li{
        width: 20%;
      }
      .active{
        border: none;
      }
    }
  }
  @media only screen and (max-width: 766px) {
    .dataList .list-operation{
      flex: 1;
      padding: 0 0 30px 0;
    }
    .tabList{
      li{
        width: 30%;
        margin: 0;
      }
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
