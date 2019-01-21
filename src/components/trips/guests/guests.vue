<template>
  <div>
    <ul class="tabList flex-wrap flex-wrap-wrap">
      <li v-for="(item, index) in guestsTabList" :key="index" :class="guestsTabTitle == item ? 'active' : ''" @click="guestsTabClick(item, index)">{{item}}</li>
    </ul>
    <ul class="dataList" v-if="islist == true">
      <li  v-for="(item, index) in guestsList" :key="index">
        <div class="list-header flex-wrap-wrap flex-wrap flex-content-between">
          <p class="title">{{item.status}}</p>
          <!-- <p class="time">Booked on 25 October, 2018</p> -->
        </div>
        <div class="list-content flex-wrap flex-wrap-wrap">
          <!--<div class="list-img"></div>-->
          <div class="list-text">
            <div>
              <!-- <p class="title">{{item.title1}}</p>
              <p class="title">{{item.title2}}</p> -->
              <p class="id">Booking ID: {{item.booking_id}}</p>
            </div>
            <div class="bottom flex-wrap flex-content-between">
              <span class="time">{{item.start_time}} - {{item.end_time}} {{item.cha_time}}</span>
              <span class="num">{{item.price}} {{item.currency}}</span>
            </div>
          </div>
          <div class="list-operation flex-wrap" :class="item.status == 'Pending' ? 'flex-column-center flex-wrap' : ''">
            <div>
            </div>
            <div class="OrderButton"><router-link :to="{path:'/trips/guests_details',query: {guestsitem:item,gueststitle:item.status}}">View details</router-link></div>
          </div>
        </div>
      </li>
    </ul>
    <div class="no-data" v-if="islist == false">
      No data
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
        <img src="../../../assets/images/trips/Asset.svg" alt="">
      </div>
      <div class="button" @click="cancelShow = false">Cancel</div>
    </el-dialog>

    <!-- 评价  -->
    <el-dialog  :visible.sync="ReviewShow" class="cancelReview">
      <div class="content">
        <div class="c-left">
          <img src="../../../assets/images/trips/checked-in.png" alt="">
          <p></p>
          <span>Booking ID: {{PaymentHostID}}</span>
        </div>
        <div class="c-right">
          <div class="Boxrate">
            <p>score</p>
            <el-rate v-model="Review.score"></el-rate>
          </div>

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
  var moment = require('moment')

  export default {
    data () {
      return {
        guestsTabTitle: 'All',
        guestsTabList: ['All', 'Completed'],
        guestsList: [],
        islist: true,
        list: [],
        checkoutShow: false,
        cancelShow: false,
        user: '',
        PaymentHostID:"",
        currentPage:1,
        ReviewShow:false,
        totalPage:0,
        Review:{
          score:0,
          Description:""
        },
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
            host_id: this.user.user_id,
            // host_id: 2790,
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
              case 'cancelled ':
                res.data.booking_list[i].status = 'Cancelled'
                break
              case 'cancelled':
                res.data.booking_list[i].status = 'Cancelled'
                break
              default:
                res.data.booking_list[i].status = ''
                break

            }
            res.data.booking_list[i].start_time = moment(res.data.booking_list[i].start_time).format('DD MMM YYYY')
            res.data.booking_list[i].end_time = moment(res.data.booking_list[i].end_time).format('DD MMM YYYY')
            let m1 = moment(res.data.booking_list[i].start_time)
            let m2 = moment(res.data.booking_list[i].end_time)
            res.data.booking_list[i].cha_time = m2.diff(m1, 'day') + 'night'

            this.list = res.data.booking_list
            this.guestsList = res.data.booking_list

          }

          this.guestsList = res.data.booking_list;
          this.totalPage = res.data.total;

        })
      },
      guestsTabClick (value, index) {
        this.guestsTabTitle = value
        this.getguestsList()
      },
      next () {
        this.checkoutShow = false
        this.cancelShow = true
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getguestsList()
      },
      SubmitReview(){

        this.$post(this.userUrl + '/user', {
          action : "addUserReview",
          data : {
            book_id : "911",
            host_id : this.user.user_id,
            message : this.Review.Description,
            score : this.Review.score
          }
        }).then((res) => {
          if(res.msg.code == 200){
            this.$message({
              customClass:"centermessage",
              showClose: true,
              message: 'Comment successful',
              type: 'success',
            });
            this.ReviewShow = false
            this.getguestsList()
          }else{
            this.$message({
              customClass:"centermessage",
              showClose: true,
              message: 'The order has been reviewed',
              type: 'success',
            });
            this.ReviewShow = false
            this.getguestsList()
          }
        })

      },
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
    .OrderButton {
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

    .Boxrate{
      overflow: hidden;
      margin-bottom: 20px;
      p{
        font-family: Roboto-Medium;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0;
        float: left;
      }

      div{
        margin-left: 20px;
        float: left;
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
@media only screen  and (max-width: 1100px) {
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
</style>
<style lang="scss">
.checkoutWrap .el-dialog__body {
  padding: 30px 40px;
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
