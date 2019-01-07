<template>
  <div class="content lst-detail">
  <el-dialog :visible.sync="isVerify" class="verify" center>
    <p class="red-color" style="margin-bottom:28px;">You’ll need to provide identification</p>
    <button class="verify-btn XY-cursorp">Verify</button>
  </el-dialog>
    <div type="flex" class="lst-home">
      <div class="lst-home-right">
        <div class="top flex-wrap flex-center-between">
          <div class="top-wrap flex-wrap flex-center">
            <p class="pps-p">{{this.book_detail.currency}}</p>
            <!--<i class="iconfont icon-54"></i>-->
          </div>
           <p class="top-wrap-p"><em>{{this.book_detail.currency}} {{book_detail.total_price}}</em>per night</p>
        </div>
        <div class="detail-content">
          <div class="content-wrap">
            <i class="iconfont icon-rili"></i>
            <span>{{book_detail.strat_time}}</span>
            <i class="iconfont icon-54 icon-class"></i>
            <span>{{book_detail.end_time}}</span>
            <!-- <el-date-picker v-model="time" type="daterange" range-separator="" @change="selectTime">
            </el-date-picker> -->
          </div>
          <div class="content-wrap mgt20">
            <i class="iconfont icon-geren"></i>
            <span>{{guest_number}} guests</span>
          </div>
        </div>
        <!-- <div class="select-time flex-wrap">
          <div class="select-time-start flex-1">
            <el-date-picker v-model="time" type="daterange" range-separator="" @change="selectTime">
            </el-date-picker>
          </div>
          <div class="select-time-end flex-1">
            <p>Check-out</p>
            <el-date-picker v-model="time" type="daterange" range-separator="" @change="selectTime"></el-date-picker>
          </div>
        </div> -->

        <div class="gus-wrap flex-wrap flex-center-between">
          <div class="gus-div">
            <div class="left">{{this.book_detail.currency}} {{(new Date(book_detail.end_time).getTime() - new Date(book_detail.strat_time).getTime())/ 1000 / 60 / 60 / 24}} nights</div>
            <div class="left">Cleaning Service fee</div>
            <!-- <div class="left">Service fee</div> -->
            <div class="left">Total</div>
          </div>
          <div class="gus-div ">
            <div class="left">{{this.book_detail.currency}} {{data.prices[0].bestPrice}}</div>
            <div class="left">{{book_detail.cleanup_service_fee}}</div>
            <!-- <div class="left">7.5</div> -->
            <div class="left">{{this.book_detail.currency}} {{book_detail.total_price}}</div>
          </div>
        </div>
        <div class="foot-wrap flex-wrap flex-center-between">
          <div class="foot-wrap-left">
            <p class="p-1">{{data.cancellationPolicy ? data.cancellationPolicy.name : ''}}</p>
            <p class="p-2">{{data.cancellationPolicy ? data.cancellationPolicy.title : ''}}</p>
            <!--<p class="p-3">More details</p>-->
          </div>
          <img src="../../assets/images/listing/cancellation.svg" class="right-svg-img">
        </div>
      </div>
      <div class="lst-home-left">
        <div class="top flex-wrap flex-center-between">
          <div class="top-left">
            <p class="entire-p">{{data.category}}</p>
            <p class="name-p">{{placeName}}</p>
            <p class="address-p">{{listName}}</p>
          </div>
        </div>
        <!--<div class="detail-name-wrap">-->
          <!--<p class="bolder-p">Lorem Ipsum</p>-->
          <!--<p class="normal-p">E12345671X</p>-->
          <!--<p class="normal-p">United States</p>-->
          <!--<p class="normal-p">lorem@mail.com</p>-->
        <!--</div>-->
        <p class="spilt-p"></p>
        <!--<div class="read-more flex-wrap flex-align-center" v-show="!isShowMoreAddTitle" @click="isShowMoreAddTitle = true,isShowMoreAdd1Content = true,isShowMoreAddfooter = true">-->
          <!--<p>Add a guest</p>-->
          <!--<i class="iconfont icon-54"></i>-->
        <!--</div>-->
        <!--<div class="" v-show="isShowMoreAdd1Content" style="display:none;">-->
          <!--<p class="addg-p">Add a guest</p>-->
          <!--<input type="text" placeholder="Full name" class="full-name">-->
          <!--<div class="addg-select" >-->
            <!--<el-select v-model="identifySelect" placeholder="Latest">-->
              <!--<el-option class="addg-select-item"-->
                <!--v-for="(item,index) in SelectList"-->
                <!--:key="index"-->
                <!--:label="item"-->
                <!--:value="item">-->
              <!--</el-option>-->
            <!--</el-select>-->
            <!--<div v-show="identifySelect == 'Identity Card'">-->
              <!--<input type="text" placeholder="Identity card number" class="full-name">-->
              <!--<input type="text" placeholder="Email/Phone number" class="full-name">-->
            <!--</div>-->
            <!--<div v-show="identifySelect == 'Passport'">-->
              <!--<input type="text" placeholder="Passport number" class="full-name mgb14">-->
              <!--<el-select v-model="Country_name" placeholder="Issuing Country">-->
                <!--<el-option-->
                  <!--v-for="(item,index) in Country"-->
                  <!--:key="index"-->
                  <!--:label="item"-->
                  <!--:value="item">-->
                <!--</el-option>-->
              <!--</el-select>-->
              <!--<p class="date-p">Date of expiry</p>-->
              <!--<div class="lst-detail-select">-->
                <!--<el-select v-model="date.month" placeholder="Month">-->
                  <!--<el-option v-for="item in list.month" :key="item" :label="item" :value="item"></el-option>-->
                <!--</el-select>-->
                <!--<el-select v-model="date.day" placeholder="Day">-->
                  <!--<el-option v-for="item in list.day" :key="item" :label="item" :value="item"></el-option>-->
                <!--</el-select>-->
                <!--<el-select v-model="date.year" placeholder="Year">-->
                  <!--<el-option v-for="item in list.year" :key="item" :label="item" :value="item"></el-option>-->
                <!--</el-select>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div v-show="identifySelect == 'Driver’s license'">-->
              <!--<input type="text" placeholder="Driver's license number" class="full-name">-->
              <!--<input type="text" placeholder="Email/Phone number" class="full-name">-->
            <!--</div>-->
            <!--<button class="save-btn">Save</button>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="read-more flex-wrap flex-align-center" v-show="isShowMoreAddfooter" style="display:none;">-->
          <!--<p>Add a guest</p>-->
          <!--<i class="iconfont icon-54"></i>-->
        <!--</div>-->
        <div class="d_item" >
          <p class="h1-p">Sleeping arrangements</p>
          <div class="arrangement h1-p" v-for="(item, index) in data.arrangements"  :key="index" v-show="index < 4 || arrangementsShowMore">
            <i class="iconfont icon-chuang1"></i>
            <p class="arr-top" v-for="(items, index) in item.utilities" :key="index">{{items.count}} {{items.utility}}</p>
          </div>
          <div class="read-more flex-wrap flex-align-center" @click="arrangementsShowMore = !arrangementsShowMore">
            <p>{{arrangementsShowMore ? 'hide' : 'Show more sleeping arrangements'}}</p>
            <i class="iconfont icon-54" :class="arrangementsShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item" v-show="data.amenities.length">
          <p class="h1-p">Amenities</p>
          <ul>
            <li class="function-p" v-for="(item, index) in data.amenities" :key="index" v-show="index < 4 || amenitiesShowMore">{{item.amenity}}</li>
          </ul>
          <div class="read-more flex-wrap flex-align-center" @click="amenitiesShowMore = !amenitiesShowMore">
            <p>{{amenitiesShowMore ? 'hide' : 'Show more amenities'}}</p>
            <i class="iconfont icon-54" :class="amenitiesShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item" v-show="data.safeAmenities.length">
          <p class="h1-p">Safe Amenities</p>
          <ul>
            <li class="rules-p" v-for="(item, index) in data.safeAmenities" :key="index" v-show="index < 3 || safeAmenitiesShowMore">{{item.safeAmenity}}</li>
          </ul>
          <div class="read-more flex-wrap flex-align-center" @click="safeAmenitiesShowMore = !safeAmenitiesShowMore" v-if="data.safeAmenities.length>3">
            <p>{{safeAmenitiesShowMore ? 'hide' : 'Show more amenities'}}</p>
            <i class="iconfont icon-54" :class="safeAmenitiesShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item" v-show="data.spaces.length">
          <p class="h1-p">Spaces</p>
          <ul>
            <li class="rules-p" v-for="(item, index) in data.spaces" :key="index" v-show="index < 3 || spaceShowMore">{{item.space}}</li>
          </ul>
          <div class="read-more flex-wrap flex-align-center" @click="spaceShowMore = !spaceShowMore" v-if="data.spaces.length>3">
            <p>{{spaceShowMore ? 'hide' : 'Read all spaces'}}</p>
            <i class="iconfont icon-54" :class="spaceShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item" v-show="data.rules.length">
          <p class="h1-p">House Rules</p>
          <ul>
            <li class="rules-p" v-for="(item, index) in data.rules" :key="index" v-show="index < 3 || rulesShowMore">{{item.rule}}</li>
          </ul>
          <div class="read-more flex-wrap flex-align-center" @click="rulesShowMore = !rulesShowMore" v-if="data.rules.length>3">
            <p>{{rulesShowMore ? 'hide' : 'Read all rules'}}</p>
            <i class="iconfont icon-54" :class="rulesShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item">
          <p class="h1-p">Cancellations</p>
          <p class="arr-top">{{data.cancellationPolicy ? data.cancellationPolicy.name : ''}}</p>
          <p class="arr-top">{{data.cancellationPolicy ? data.cancellationPolicy.title : ''}}</p>
          <p class="arr-top" v-if="cancellationsShowMore">{{data.cancellationPolicy ? data.cancellationPolicy.description : ''}}</p>
          <div class="read-more flex-wrap flex-align-center" @click="cancellationsShowMore = !cancellationsShowMore">
            <p>{{cancellationsShowMore ? 'hide' : 'Read more about the policy'}}</p>
            <i class="iconfont icon-54" :class="cancellationsShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>
        <!-- <div v-show="isShowMore4">
          <p class="more-p-title">Nulla ut neque nec</p>
          <p class="more-p-content">Arcu faucibus ullamcorper id sit amet augue. Nunc non sem non massa finibus pellentesque ut id lorem. In vitae mi a urna congue fringilla a suscipit arcu. Vestibulum non urna tincidunt leo faucibus ultricies dignissim interdum nibh. Nunc sollicitudin accumsan tellus quis pulvinar. Integer volutpat est a ante tempor pulvinar. Morbi rhoncus felis ac arcu </p>
          <div class="read-more flex-wrap flex-align-center" v-show="isShowMore4" @click="isShowMore4 = !isShowMore4">
            <p>hide</p>
            <i class="iconfont icon-54" style="display:inline-block;transform: rotate(180deg)"></i>
          </div>
        </div> -->
        <!--<p class="h1-p">Say hello to your host</p>-->
        <!--<textarea name="" id="" class="textarea-say"></textarea>-->
        <!--<p class="spilt-p"></p>-->
        <!--<p class="detail-terms-p">I agree to the <em>House Rules</em>,<em> Terms and Conditions</em>,<em> Privacy Policy</em>,<em> Cancellation Policy</em>, and the <em>Guest Refund Policy</em>. I also agree to pay the total amount shown, which includes Service Fees.</p>-->
        <button class="confirm-btn" style="margin-top:47px;" @click="CNYpaynext" v-if="this.book_detail.currency == 'CNY'">Confirm and pay</button>
        <button class="confirm-btn" style="margin-top:47px;" @click="pswInput = true" v-else>Confirm and pay</button>
        <!-- <p class="h1-p">Nearby landmarks</p>
        <el-amap></el-amap> -->
      </div>
    </div>
    <div class="qrcode-confirm-pay-model-out">
      <el-dialog :visible.sync="qrcode">
        <div class="login-frame-content">
          <p class="qrcode-p">Your balance is not enough.<br />Please use the Token wallet to scan the<br />QR code to make a payment.</p>
          <img src="../../assets/images/trips/showqrcode.png" class="qrcode-img">
          <button class="confirm-qrcode-btn confirm-btn XY-fz16 XY-colf XY-cursorp" @click="qrcode = false">Cancel</button>
        </div>
      </el-dialog>
    </div>
    <div class="confirm-pay-model-out">

      <el-dialog  :visible.sync="pswInput" class="checkoutWrap" :before-close="handleClose">
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
          <input type="password"  autocomplete="off" placeholder="Payment password" v-model="userPassword">
        </div>
        <div class="button" @click="paynext">Confirm and pay</div>
      </el-dialog>

    </div>

    <!-- 二维码 -->

    <el-dialog  :visible.sync="qr_codeshow" width="22%" class="cancelWrap">
      <div class="text-wrap">
        <p>Please open Alipay, sweep the payment</p>
      </div>
      <div class="asset">
        <img :src="qr_codeURL" alt="">
      </div>
      <div class="button" @click="qr_codeshow = false">Cancel</div>
    </el-dialog>

  </div>
</template>
<script>
import banner1 from '../../assets/images/index/banner-1.png'
import banner2 from '../../assets/images/index/banner-2.png'
import banner3 from '../../assets/images/index/banner-3.png'
import banner4 from '../../assets/images/index/banner-4.png'

import QRCode from 'qrcode'

const sha256 = require('js-sha256').sha256

export default {
  name: 'listing-detail',
  data () {
    return {
      isLogin: false,
      img: [banner1, banner2, banner3, banner4],
      SelectList: ['Identity Card', 'Passport', 'Driver’s license'],
      Country: ['China', 'England'],
      Country_name: 'Issuing Country',
      identifySelect: 'Identity Card',
      time: '',
      startTextTime: [],
      endTextTime: [],
      date: {
        month: '',
        day: '',
        year: ''
      },
      book_detail: '',
      list: {
        month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        day: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        year: []
      },
      selectValue: '1 guest',
      isVerify: false,
      visible: false,
      arrangementsShowMore:false,
      amenitiesShowMore: false,
      safeAmenitiesShowMore: false,
      rulesShowMore: false,
      spaceShowMore:false,
      cancellationsShowMore: false,
      isShowMoreAddTitle: false,
      isShowMoreAdd1Content: false,
      isShowMoreAddfooter: false,
      pswInput: false,
      qrcode: false,
      wallet:'Please choose a wallet',
      walletID:0,
      walletList:[],
      walletshow:false,
      userPassword:'',
      data:{},
      listName: '',
      placeName:'',
      guest_number:0,
      qr_codeshow:false,
      qr_codeURL:''
    }
  },
  methods: {
    selectTime (e) {
      this.startTextTime = String(e[0]).split(' ')
      this.endTextTime = String(e[1]).split(' ')
    },
    Verify () {
      this.isVerify = !this.isVerify
    },
    getWalletList(){

      this.$post(this.userUrl + '/user', {
        action: 'getUserPPSBalance',
        data: {
          user_id: this.$store.state.userInfo.user_id
        }
      }).then((res) => {
        if(res.msg.code == 200){
          console.log(res.data.user_wallets)
          this.walletList = res.data.user_wallets
        }
      })

    },
    paynext () {

        this.$post(this.paymentUrl + '/api/v1/payments/deposit', {
          bookingId: this.book_detail.booking_id,
          userWalletId: this.walletID,
          userWalletEncryptedPassword:sha256(this.userPassword)
        }).then((res) => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })

        this.$alert('The transaction is going on, please check the order status in time.', 'Paying', {
          confirmButtonText: 'OK',
          callback: action => {
            location.reload();
          }
        });

    },
    CNYpaynext(){
      this.$post(this.bookUrl + '/booking ', {
        action:'getBookingQrCode',
        data:{
          booking_id:this.book_detail.booking_id
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
    getPlace (id) {
      var that = this
      this.$get(this.placeUrl + '/place', {
        placeId: id
      }).then((res) => {
        if (res.code === 200) {
          var placeName = res.data.placeName
          that.getName(res.data.citycode)
          that.translation('placeName',placeName)
          this.data = res.data
        }
      })
    },
    getName (val) {
      this.$get(this.cityUrl + '/city', {
        code: val
      }).then((res) => {
        if (res.code === 200) {
          this.listName = res.data.fullAddress
        }
      })
    },
    translation(type,obj){
      this.$jsonp(this.youdaoUrl+'/api',
        {
          q: obj,
          appKey: this.$store.state.appKey,
          salt: this.$store.state.salt,
          from: '',
          to: 'en',
          sign:this.$md5(this.$store.state.appKey+obj+this.$store.state.salt+this.$store.state.secret_key)
        }
      ).then(json => {
        if(type == "placeName"){
          this.placeName = json.translation[0]
        }else if(type == "description"){
          this.description = json.translation[0]
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleClose(done) {
      this.walletshow = false
      this.pswInput = false
    }
  },
  mounted () {
    this.getWalletList()
    this.getPlace(this.book_detail.place_id)
  },
  created () {
    if(this.$route.query.book_detail == undefined) {
      this.$router.go(-1)
    }else{
      this.book_detail = JSON.parse(this.$route.query.book_detail)
      this.book_detail.currency = this.book_detail.currency.replace("'","")
      this.book_detail.currency = this.book_detail.currency.replace("'","")
      this.guest_number = this.$route.query.guest_number
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$red-color: #F4436C;
.lst-detail{
  .lst-home{
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
    position: relative;
    .lst-home-left{
      // margin-right: 21%;
      margin-left: 10%;
      width: 37.5%;
      .more-p-title{
        font-family: Roboto-Medium;
        margin-top: 30px;
        font-size: 16px;
        color: #000000;
        letter-spacing: 0;
        line-height: 26px;
      }
      .more-p-content{
        margin-top: 5px;
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0;
        line-height: 26px;
      }
      .top{
        font-family: Roboto-Medium;
        margin-top: 60px;
        .top-left{
          line-height: 20px;
          .entire-p{
            font-size: 16px;
            color: $red-color;
            letter-spacing: 0.62px;
            margin-bottom: 14px;
          }
          .name-p{
            font-size: 28px;
            letter-spacing: 0.97px;
            margin-bottom: 19px;
            line-height: 1.2;
          }
          .address-p{
            font-size: 18px;
            letter-spacing: 0.7px;
          }
        }
        .top-right{
          justify-content: start;
          letter-spacing: 0.56px;
          line-height: 20px;
          img{
            width:80px;
            height: 80px;
            margin-bottom: 10px;
          }
        }
      }
      .detail-wrap{
        flex: 0.6;
        font-size: 18px;
        color: #4A4A4A;
        letter-spacing: 0.7px;
        margin-top: 46px;
        i{
          margin-right: 10px;
          font-size: 30px;
        }
        .wrap-top{
          margin-bottom: 41px;
          align-items: center;
          div{
            width: 150px;
          }
          .wrap-mgr{
            margin-left: 60px;
          }
        }
        .intro-p{
          letter-spacing: 0;
          line-height: 26px;
        }
      }
      .read-more{
        margin-top: 26px;
        color: $red-color;
        letter-spacing: 0;
        cursor: pointer;
        i{
          margin-left: 10px;
        }
      }
      .spilt-p{
        background: #E6E7E8;
        height: 1px;
        width: 100%;
        margin-top: 50px;
      }
      .h1-p{
        font-family: Roboto-Medium;
        font-size: 28px;
        margin-top: 49px;
        margin-bottom: 10px;
      }
      .function-p{
        width: 250px;
        line-height: 36px;
        display: inline-block;
      }
      .arrangement{
        width: 150px;
        min-height: 140px;
        border-radius: 3px;
        border: 1px solid #E6E7E8;
        box-sizing: border-box;
        padding: 20px;
        display: inline-block;
        margin-right: 20px;

        i{
          font-size: 30px;
        }
      }
      .rules-p{
        line-height: 26px;
      }
      .arr-top{
        padding-top: 15px;
        font-family: Roboto-Medium;
        font-size: 16px;
      }
      .arr-down{
        font-family: Roboto-Regular;
        color: #000000;
        line-height: 19px;
        font-size: 16px;
      }
      // .amap-page-container {
      //   height: 400px;
      //   max-width: 600px;
      //   min-width: 300px;
      // }
      .el-vue-amap-container{
        height: 400px;
        max-width: 600px;
        min-width: 300px;
      }
    }
    .scrool-fix-rili{
      display: none;
      max-width: 400px;
      padding: 34px 30px;
      height: 575px;
    }
    .lst-home-right{
      position: fixed;
      right: 12%;
      top: 150px;
      width:  400px;
      border: 1px solid #E6E7E8;
      // height: 509px;
      border-radius: 3px;
      font-family: Roboto-Regular;
      font-size: 16px;
      color: #4A4A4A;
      padding: 34px 20px 0;
      // margin-right: 21%;
      .gus-wrap{
        margin-top: 15px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e6e7e8;
      }
      button{
        background: #F4436C;
        border-radius: 3px;
        color: #fff;
        letter-spacing: 1px;
        line-height: 11px;
        font-family: Roboto-Medium;
        width: 100%;
        height: 50px;
        outline: none;
        border: none;
        cursor: pointer;
      }
      .top{
        padding-bottom: 24px;
        border-bottom: 1px solid #E6E7E8;
        .top-wrap{
          // padding-bottom: 1px solid #e6e7e8;
          .pps-p{
            font-family: Roboto-Medium;
            font-size: 28px;
            margin-right: 10px;
          }
          i{
            font-size: 20px;
          }
        }
        .top-wrap-p{
          color: #000000;
          line-height: 24px;
          em{
            font-family: Roboto-Medium;
            font-size: 20px;
            color: #4A4A4A;
            margin-right: 10px;
          }
        }
      }
      .detail-content{
        box-sizing: border-box;
        padding: 30px 0;
        border-bottom: 1px solid #E6E7E8;
        .content-wrap{
          width: 100%;
          i{
            font-size:30px;
            vertical-align: middle;
          }
          .icon-class{
            transform:rotate(-90deg);
            display:inline-block;
            font-size:18px;
            margin-left:18px;
            margin-right:4px;
          }
          span{
            margin-left:15px;
            font-family: Roboto-Regular;
            font-size: 18px;
            color: #4A4A4A;
          }
        }
      }
      .foot-wrap{
        margin: 30px 0;
        .foot-wrap-left{
          flex: .6;
          font-size: 16px;
          .p-1{
            font-family: Roboto-Medium;
            font-size: 16px;
            color: #4A4A4A;
          }
          .p-2{
            font-family: Roboto-Regular;
            font-size: 16px;
            color: #000000;
            line-height: 19px;
          }
          .p-3{
            font-family: Roboto-Regular;
            color: #F4436C;
            line-height: 19px;
          }
        }
        .right-svg-img{
          width: 44.7px;
          height: 52px;
        }
      }
    }
  }
  .left{
    margin-top: 10px;
  }
}
.mgb14{
  margin-bottom: 14px;
}
.mgt20{
  margin-top: 20px;
}
.addg-p{
  font-family: Roboto-Medium;
  font-size: 16px;
  color: #4A4A4A;
  letter-spacing: 0;
  margin-top: 35px;
}
.full-name{
  display: block;
  height: 46px;
  width: 290px;
  font-size: 16px;
  border: 1px solid #E6E7E8;
  border-radius: 3px;
  margin-top: 14px;
  text-indent: 15px;
  box-sizing: border-box;
}
.full-name::placeholder{
  color: #B1B3B6;
}
.addg-select{
  margin-top: 14px;
  // max-width: 290px;
  // min-width: 200px;
  .el-input--suffix .el-input__inner{
  max-width: 290px;
  min-width: 200px;
  border: 1px solid #E6E7E8;
  border-radius: 3px;
  }
}
.save-btn{
  font-family: Roboto-Medium;
  background: $red-color;
  outline: none;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 145px;
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  letter-spacing: 1px;
  margin-top: 14px;
}
.date-p{
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #585858;
  letter-spacing: 0;
  margin-top: 14px;
}
.textarea-say{
  width: 100%;
  height: 150px;
  border: 1px solid #E6E7E8;
  outline: none;
  padding: 0;
  font-size: 26px;
  box-sizing: border-box;
  margin-top: 29px;
}
.confirm-btn{
  font-family: Roboto-Medium;
  background: $red-color;
  outline: none;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  max-width: 340px;
  min-width: 200px;
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  letter-spacing: 1px;
  margin: 14px 0 100px 0;
}
.detail-terms-p{
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #585858;
  line-height: 26px;
  margin-top: 49px;
  em{
    color: #F4436C;
    cursor: pointer;
  }
}
.editProfile-select{
  margin-top: 9px;
}
.detail-name-wrap{
  margin-top: 30px;
}
.bolder-p{
  font-family: Roboto-Medium;
  font-size: 16px;
  color: #4A4A4A;
  letter-spacing: 1px;
  line-height: 26px;
}
.normal-p{
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #000000;
  letter-spacing: 1px;
  line-height: 26px;
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
.transform {
  display: inline-block;
  transform: rotate(180deg)
}

@media only screen and (max-width:1131px) {
  .lst-detail .lst-home{
    display: block;
    // margin: 0 auto;
  }
  .lst-detail .lst-home .lst-home-right{
    position: initial;
    margin: 0 auto;
  }
  .lst-detail .lst-home .lst-home-left{
    width: 100%;
    margin: 0 auto;
    padding: 30px;
    box-sizing: border-box;
  }
}
@media only screen and (max-width:480px) {
  .lst-detail .lst-home .lst-home-right{
    position: initial;
    margin: 0 auto;
    width: 300px;
  }
  .content-wrap{
      .icon-class {
        margin-left: 10px!important;
      }
      span{
        margin-left: 10px!important;
      }
    }
}
</style>
<style lang="scss">

.cancelWrap {

  .el-dialog {
    min-width: 440px;
  }
}
.lst-detail .el-input__inner{
  // max-width: 112px;
  // width: 60px;
}
.lst-detail ::-webkit-input-placeholder {
  color:#4a4a4a;
}
// .lst-detail .el-select {
//   margin-right: 15px;
// }
.elst-detail .el-select:last-child {
  margin-right: 0
}
 .lst-detail{
    .verify{
      .el-dialog--center .el-dialog__body{
        text-align: center;
      }
      .el-dialog{
        max-width: 440px;
        min-width: 300px;
        height: 224px;
      }
      p{
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0.5px;
        text-align: center;
        line-height: 22px;
      }
      .verify-btn{
        margin: 0 auto;
        max-width: 360px;
        min-width: 220px;
        height: 50px;
        outline: none;
        font-family: Roboto-Medium;
        background: #F4436C;
        border-radius: 3px;
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 1px;
        text-align: center;
        line-height: 11px;
        border: none;
      }
    }
    .el-carousel__button{
      width: 10px;
      height: 10px;
      border-radius:50%;
    }
    .el-carousel__indicators--outside button{
      background: #fff;
      opacity: .5;
    }
    // .el-select{
    //   max-width: 290px;
    //   min-width: 200px;
    // }
 }

.home-list .el-rate__icon {
  font-size: 14px;
}
.home-list  .el-rate {
  text-align: left;
}
.el-carousel, .el-carousel__container {
  height: 100%;
}
.el-carousel__container img {
  width: 100%;
  height: 100%;
}
.el-carousel__indicators--outside {
  position: absolute;
}
// .guests .el-input__inner {
//   height: 60px;
// }
// .guests .el-select, .banner-content .el-date-editor.el-input {
//   width: 100%;
// }
.select-time .el-input__inner {
  height: 60px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
}
.banner-content .el-input__inner {
  padding: 0 20px;
}
.lst-detail-select{
  margin-top: 10px;
}
</style>
<style lang="scss">
.lst-detail .el-input__inner{
  width:100%;
}
.lst-detail .confirm-pay-model-out .el-dialog{
    max-width: 440px;
    min-width: 300px;
    border-radius: 3px;
      .login-frame-content{
        padding: 0 10px;
        font-size:16px;
        p{
          font-family: Roboto-Regular;
          font-size: 16px;
          color: #B1B3B6;
          letter-spacing: 0;
        }
        .psw{
          display: block;
          outline:none;
          border:none;
          border-bottom:1px solid #E6E7E8;
          width: 100%;
          height: 30px;
          font-size:22px;
          margin-bottom:24px;
        }
        .confirm-btn{
          width: 100%;
          margin: 0 auto;
        }
      }
  }
.lst-detail .qrcode-confirm-pay-model-out .el-dialog{
  max-width: 440px;
  min-width: 300px;
  border-radius: 3px;
  font-family: Roboto-Regular;
  margin: 0 auto;
  text-align: center;
  .login-frame-content{
    .qrcode-p{
      width:281px;
      font-size: 16px;
      color: #4A4A4A;
      letter-spacing: 0;
      text-align: center;
      line-height: 22px;
      margin: 0 auto 30px;
    }
    .qrcode-img{
      width:200px;
      height: 200px;
    }
    .confirm-qrcode-btn{
      width: 100%;
      margin: 30px auto 10px;
    }
  }
}
.addg-select-item .el-select>.el-input{
  max-width:290px;
  min-width: 200px;
}
.addg-select .el-select .el-input--suffix{
  width: 290px;
}
.lst-detail-select .el-select .el-input{
  width: 112px;
}
// .footer{
//   border-top: none !important;
// }
</style>
