<template>
  <div class="content lst-detail">
    <div type="flex" class="lst-home">
      <div class="lst-home-right">
        <div class="top flex-wrap flex-center-between">
          <div class="top-wrap flex-wrap flex-center">
            <p class="pps-p">{{this.book_detail.currency}}</p>
            <!--<i class="iconfont icon-54"></i>-->
          </div>
           <p class="top-wrap-p"><em>{{book_detail.Total}} {{this.book_detail.currency}}</em> {{$t('message.pernighten')}} {{$t('message.pernightcn')}}</p>
        </div>
        <div class="detail-content">
          <div class="content-wrap">
            <i class="iconfont icon-rili"></i>
            <span>{{book_detail.check_in_date}}</span>
            <i class="iconfont icon-54 icon-class"></i>
            <span>{{book_detail.check_out_date}}</span>
            <!-- <el-date-picker v-model="time" type="daterange" range-separator="" @change="selectTime">
            </el-date-picker> -->
          </div>
          <div class="content-wrap mgt20">
            <i class="iconfont icon-geren"></i>
            <span>{{book_detail.guest_number}} {{$t('message.guests')}}</span>
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
            <div class="left">{{data.prices ? data.prices[0].bestPrice : null}} {{book_detail.currency}} × {{book_detail.night}} {{$t('message.night')}}</div>
            <div class="left">{{$t('message.Cleaningfee')}}</div>
            <div class="left">{{$t('message.Servicefee')}}</div>
            <div class="left">{{$t('message.Total')}}</div>
          </div>
          <div class="gus-div ">
            <div class="right">{{data.prices ? data.prices[0].bestPrice * book_detail.night : null}} {{this.book_detail.currency}}</div>
            <div class="right">{{book_detail.Cleaningfee}} {{this.book_detail.currency}}</div>
            <div class="right">{{book_detail.Servicefee}} {{this.book_detail.currency}}</div>
            <!-- <div class="left">7.5</div> -->
            <div class="right">{{book_detail.Total}} {{this.book_detail.currency}}</div>
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
            <p class="name-p">{{data.placeName}}</p>
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
        <div class="d_item" v-show="data.arrangementsLen">
          <p class="h1-p">{{$t('message.Sleepingarrangements')}}</p>
          <div class="arrangement h1-p" v-for="(item, index) in data.arrangements"  :key="index" v-show="index < 4 || arrangementsShowMore">
            <i class="iconfont icon-chuang1"></i>
            <p class="arr-top" v-for="(items, index) in item.utilities" :key="index" v-show="items.count != 0">{{items.count}} {{items.utility}}</p>
          </div>
          <div class="read-more flex-wrap flex-align-center" @click="arrangementsShowMore = !arrangementsShowMore" v-if="data.arrangementsLen>4">
            <p>{{arrangementsShowMore ? $t('message.hide') : $t('message.Showmoresleepingarrangements')}}</p>
            <i class="iconfont icon-54" :class="arrangementsShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item">
          <p class="h1-p">{{$t('message.Checkinout')}}</p>
          <p>{{$t('message.Checkintime')}} {{data.availableCheckinTimeFrom}}:00 － {{data.availableCheckinTimeTo}}:00 · {{$t('message.Checkouttimebefore')}} {{data.checkOutTime}}:00</p>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item" v-show="data.amenitiesLen">
          <p class="h1-p">{{$t('message.Amenities')}}</p>
          <ul>
            <li class="function-p" v-for="(item, index) in data.amenities" :key="index" v-show="index < 5 || amenitiesShowMore">{{item.amenity}}</li>
          </ul>
          <div class="read-more flex-wrap flex-align-center" @click="amenitiesShowMore = !amenitiesShowMore" v-if="data.amenitiesLen>5">
            <p>{{amenitiesShowMore ? $t('message.hide') : $t('message.Showmoreamenities')}}</p>
            <i class="iconfont icon-54" :class="amenitiesShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item" v-show="data.safeAmenitiesLen">
          <p class="h1-p">{{$t('message.SafeAmenities')}}</p>
          <ul>
            <li class="rules-p" v-for="(item, index) in data.safeAmenities" :key="index" v-show="index < 3 || safeAmenitiesShowMore">{{item.safeAmenity}}</li>
          </ul>
          <div class="read-more flex-wrap flex-align-center" @click="safeAmenitiesShowMore = !safeAmenitiesShowMore" v-if="data.safeAmenitiesLen>3">
            <p>{{safeAmenitiesShowMore ? $t('message.hide') : $t('message.Showmoresafeamenities')}}</p>
            <i class="iconfont icon-54" :class="safeAmenitiesShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item" v-show="data.spacesLen">
          <p class="h1-p">{{$t('message.Spaces')}}</p>
          <ul>
            <li class="rules-p" v-for="(item, index) in data.spaces" :key="index" v-show="index < 3 || spaceShowMore">{{item.space}}</li>
          </ul>
          <div class="read-more flex-wrap flex-align-center" @click="spaceShowMore = !spaceShowMore" v-if="data.spacesLen>3">
            <p>{{spaceShowMore ? $t('message.hide') : $t('message.Readallspaces')}}</p>
            <i class="iconfont icon-54" :class="spaceShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item" v-show="data.rulesLen">
          <p class="h1-p">{{$t('message.HouseRules')}}</p>
          <ul>
            <li class="rules-p" v-for="(item, index) in data.rules" :key="index" v-show="index < 3 || rulesShowMore">{{item.additionalTitle == "" ? item.rule : item.additionalTitle}}</li>
          </ul>
          <div class="read-more flex-wrap flex-align-center" @click="rulesShowMore = !rulesShowMore" v-if="data.rulesLen>3">
            <p>{{rulesShowMore ? $t('message.hide') : $t('message.Readallrules')}}</p>
            <i class="iconfont icon-54" :class="rulesShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item">
          <p class="h1-p">{{$t('message.Cancellations')}}</p>
          <p class="arr-top">{{data.cancellationPolicy ? data.cancellationPolicy.name : ''}}</p>
          <p class="arr-top">{{data.cancellationPolicy ? data.cancellationPolicy.title : ''}}</p>
          <p class="arr-down" v-if="cancellationsShowMore">{{data.cancellationPolicy ? data.cancellationPolicy.description : ''}}</p>
          <div class="read-more flex-wrap flex-align-center" @click="cancellationsShowMore = !cancellationsShowMore">
            <p>{{cancellationsShowMore ? $t('message.hide') : $t('message.Readmoreaboutthepolicy')}}</p>
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
        <button class="confirm-btn" style="margin-top:47px;" @click="toBook" :disabled="disVerify" :class="disVerify ? 'disabled' : null" v-loading.fullscreen.lock="dialogloading">{{$t('message.Confirmandpay')}}</button>
        <!-- <p class="h1-p">Nearby landmarks</p>
        <el-amap></el-amap> -->
      </div>
    </div>
    <div class="qrcode-confirm-pay-model-out">
      <el-dialog :visible.sync="qrcode">
        <div class="login-frame-content">
          <p class="qrcode-p">{{$t('message.Yourbalanceisnotenough')}}</p>
          <img src="../../assets/images/trips/showqrcode.png" class="qrcode-img">
          <button class="confirm-qrcode-btn confirm-btn XY-fz16 XY-colf XY-cursorp" @click="qrcode = false">{{$t('message.Cancel')}}</button>
        </div>
      </el-dialog>
    </div>

    <!-- pps支付-->
    <div class="confirm-pay-model-out">

      <el-dialog  :visible.sync="pswInput" class="checkoutWrap" :before-close="handleClose">
        <div class="input-wrap">
          <input type="password"  autocomplete="new-password" :placeholder="$t('message.Paymentpassword')" v-model="userPassword">
        </div>
        <div class="button" @click="paynext">{{$t('message.Confirmandpay')}}</div>
      </el-dialog>

    </div>

    <!-- 二维码 -->

    <el-dialog  :visible.sync="qr_codeshow" width="22%" class="cancelWrap">
      <div class="text-wrap">
        <p>Sweep the payment <span>{{book_detail.total_price}}</span> {{this.book_detail.currency}}</p>
      </div>
      <div class="asset">
        <img :src="qr_codeURL" alt="">
      </div>
      <div class="button" @click="qr_codeshow = false">Cancel</div>
    </el-dialog>

    <!--支付成功提示-->
    <el-dialog
      :visible.sync="SuccessfulPayment"
      width="22%"
      class="SuccessfulPayment"
      :show-close="false"
      :close-on-press-escape="false">
      <p>{{$t('message.Successfulpaymentwilljumptotheorder')}}</p>
      <i class="el-icon-loading"></i>
    </el-dialog>


  </div>
</template>
<script>
import Cookies from 'js-cookie';
import QRCode from 'qrcode'
var moment = require('moment')
const sha256 = require('js-sha256').sha256

export default {
  name: 'listing-detail',
  data () {
    return {
      isLogin: false,
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
      booking_id:'',
      wallet:'Please choose a wallet',
      walletID:0,
      walletshow:false,
      userPassword:'',
      data: {
        arrangementsLen:0,
        amenitiesLen:0,
        safeAmenitiesLen:0,
        spacesLen:0,
        rulesLen:0,
        lng:'0',
        lat:'0'
      },
      listName: '',
      placeName:'',
      guest_number:0,
      qr_codeshow:false,
      qr_codeURL:'',
      alreadyPay:false,
      SuccessfulPayment:false,
      dialogloading:false,
      disVerify:false
    }
  },
  created () {
    if(Cookies.get('Book')){
      let Book = JSON.parse(Cookies.get('Book'))
      this.getPlace(Book.placeId)
      this.book_detail = Book

    }else{
      this.$router.go(-1)
    }

  },
  mounted(){
    this.getWalletList()
  },
  methods: {
    readBooking(id){
      this.$post(this.bookUrl + '/booking', {
        action : "readBooking",
        data : {
          "booking_id" : id
        }
      }).then((res) => {
        if (res.msg.code === 200) {
          res.data.start_time = moment(res.data.start_time).format('DD MMM YYYY')
          res.data.end_time = moment(res.data.end_time).format('DD MMM YYYY')
          this.book_detail = res.data
          this.getPlace(res.data.place_id)
        }
      })
    },
    selectTime (e) {
      this.startTextTime = String(e[0]).split(' ')
      this.endTextTime = String(e[1]).split(' ')
    },
    getWalletList(){

      this.$post(this.userUrl + '/user', {
        action: 'getUserPPSBalance',
        data: {
          user_id: this.$store.state.userInfo.user_id
        }
      }).then((res) => {

        if(res.msg.code == 200){
          this.walletID = res.data.user_wallets[0].user_wallet_id
        }
      })

    },
    toBook(){
      this.dialogloading = true;
      this.disVerify = true;
      if(this.book_detail.currency == "CNY"){
        this.$post(this.bookUrl + '/booking ', {
          action: 'makeBooking',
          data: {
            user_id: this.$store.state.userInfo.user_id,
            place_id: this.book_detail.place_id,
            check_in_date: this.book_detail.check_in_date,
            check_out_date: this.book_detail.check_out_date,
            guest_number: this.book_detail.guest_number,
            currency: this.book_detail.currency,
            channel:this.book_detail.channel
          }
        }).then((res) => {
          this.dialogloading = false
          if (res.msg.code === 200) {
            this.pswInput = true
            this.booking_id = res.data.booking_id
          }

          if (res.msg.code === 952) {
            this.$notify({
              title: this.$t('message.Warning'),
              message: this.$t('message.Currenttimeperiodcannotbebook'),
              type: 'warning'
            });
            this.timeStart = ""
            this.timeEnd = ""
          }

          if (res.msg.code === 500){
            this.$notify({
              title: this.$t('message.Warning'),
              message: this.$t('message.Operationfailedpleasetrylater'),
              type: 'warning'
            });
          }

        })
      }else{
        this.$post(this.bookUrl + '/booking ', {
          action: 'makeBooking',
          data: {
            user_id: this.$store.state.userInfo.user_id,
            place_id: this.book_detail.placeId,
            check_in_date: this.book_detail.check_in_date,
            check_out_date: this.book_detail.check_out_date,
            guest_number: this.book_detail.guest_number,
            currency: this.book_detail.currency,
          }
        }).then((res) => {
          this.dialogloading = false
          if (res.msg.code === 200) {
            this.booking_id = res.data.booking_id
            this.pswInput = true
          }

          if (res.msg.code === 952) {
            this.$notify({
              title: this.$t('message.Warning'),
              message: this.$t('message.Currenttimeperiodcannotbebook'),
              type: 'warning'
            });
          }
        })
      }

    },
    paynext () {


        this.$post(this.userUrl + '/user', {
          action: "depositPPS",
          data: {
            user_id:this.$store.state.userInfo.user_id,
            booking_id: this.booking_id,
            user_wallet_id: this.walletID,
            encrypted_password:sha256(this.userPassword)
          }
        }).then((res) => {
          if(res.msg.code == 952){

            this.$notify({
              message: this.$t('message.Incorrectpassword'),
              showClose:false,
              type: 'warning',
              onClick(){
                this.close()
              }
            });

          }
          if(res.msg.code == 500){

            this.$notify({
              message: this.$t('message.Thebalanceisinsufficientandtheoperationfailed'),
              showClose:false,
              type: 'warning',
              onClick(){
                this.close()
              }
            });

          }

          if(res.msg.code == 200){

            this.pswInput = false;
            this.SuccessfulPayment = true;

            this.clock = window.setInterval(() => {
              window.clearInterval(this.clock)
              this.SuccessfulPayment = false;
              this.$router.push({path: '/trips/tripsList'})
            }, 3000)
          }

        }).catch(err => {
          console.log(err.response.data.status)
        })
    },
    CNYpaynext(){
      this.$post(this.bookUrl + '/booking ', {
        action:'getBookingQrCode',
        data:{
          booking_id:this.$route.query.book_id
        }
      }).then((res) => {
        console.log(res)
        if(res.msg.code == 200){

          QRCode.toDataURL(res.data.qr_code)
          .then(url => {

            this.qr_codeshow=true;
            this.qr_codeURL=url;

            this.PayTime = window.setInterval(() => {
                this.$post(this.bookUrl + '/booking ', {
                  action : "checkIfBookingIsPay",
                  data : {
                    booking_id : this.book_detail.booking_id
                  }
                }).then((res) => {
                  if (res.msg.code === 200) {
                    if(res.data.alreadyPay){
                      this.alreadyPay = true
                      this.$router.push("/trips/tripsList")
                      window.clearInterval(this.PayTime)
                    }
                  }
                })
            }, 5000)


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
          // that.translation('placeName',placeName)
          this.data = res.data
          this.data.arrangementsLen = res.data.arrangements.length
          this.data.amenitiesLen = res.data.amenities.length
          this.data.safeAmenitiesLen = res.data.safeAmenities.length
          this.data.spacesLen = res.data.spaces.length
          this.data.rulesLen = res.data.rules.length
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
    },
    day(type){
      if(type == "currencyPrice"){
        return (new Date(this.book_detail.end_time).getTime() - new Date(this.book_detail.start_time).getTime())/ 1000 / 60 / 60 / 24
      }
    },
    close(){
      this.$notify.close()
    }
  },
  mounted () {
    this.getWalletList()
  },
  destroyed () {
    Cookies.remove('Book')
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
    margin: 0 200px;

    .lst-home-left{
      width: 60%;
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
        width: 50%;
        line-height: 36px;
        display: inline-block;
        &:first-child{
          width: 100%;
        }
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
        color: #4a4a4a;
        margin-top: 20px;
        line-height: 1.5;
        font-size: 16px;
        text-align: justify;
      }
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
      right: 200px;
      top: 150px;
      width:  380px;
      border: 1px solid #E6E7E8;
      border-radius: 3px;
      font-family: Roboto-Regular;
      font-size: 16px;
      color: #4A4A4A;
      padding: 34px 20px 0;
      .gus-wrap{
        margin-top: 15px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e6e7e8;
        .gus-div .right{
          text-align: right;
        }
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
      color: #000000;
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

@media only screen and (max-width:1500px) {
  .lst-detail {
    .lst-home {
      display: block;
      margin: 0 100px;
    }
    .lst-home-left{
      width: 50% !important;
    }

    .lst-home-right{
      right: 100px !important;
    }
  }
}

@media only screen and (max-width:1300px) {
  .lst-detail {

    .lst-home-right{
      width: auto !important;
      position: inherit !important;
      top:20px !important;
      right:0px !important;

    }

    .lst-home-left{
      width: 100% !important;
    }


  }
}

@media only screen and (max-width:800px) {
  .lst-detail {
    .lst-home{
      margin: 0 20px;
    }

    .lst-home-right{
      width: auto !important;
      position: inherit !important;
      top:20px !important;
      right:0px !important;

    }

    .lst-home-left{
      width: 100% !important;
    }


  }
}

</style>
<style lang="scss">
  .SuccessfulPayment {
    text-align: center;
    p {
      font-size: 18px;
    }
    i {
      font-size:30px;
      margin-top:20px;
      color:#F4436C;
    }
  }

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

button.disabled{
  opacity:0.5;
  cursor: not-allowed;
}
</style>
