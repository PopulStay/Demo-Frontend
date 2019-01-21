<template>
  <div class="content lst-index">
    <el-dialog :visible.sync="isVerify" class="verify" center>
      <p class="red-color" style="margin-bottom:28px;">You’ll need to provide identification<br />before you book.</p>
      <button class="verify-btn XY-cursorp" @click="toDetail">Verify</button>
    </el-dialog>
    <!-- <e-header></e-header> -->
    <!-- 轮播  -->
    <div class="banner-wrap">
      <div class="banner-img">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in data.picture" :key="item.pictureId">
           <img :src="item.bigPictureUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <el-row type="flex" class="lst-home">
      <div class="lst-home-left">
        <div class="top flex-wrap flex-center-between">
          <div class="top-left">
            <p class="entire-p">{{data.category}}</p>
            <p class="name-p">{{data.placeName}}</p>
            <p class="address-p">{{listName}}</p>
          </div>
          <div class="top-right flex-wrap flex-column-center flex-align-center">
            <img src="../../assets/images/listing/Group.png" />
            <p>{{hostName}}</p>
          </div>
        </div>
        <div class="detail-wrap">

          <div class="wrap-top flex-wrap">
            <div class="flex-wrap flex-align-center">
              <i class="iconfont icon-geren"></i>
              <span>{{data.guestNumber}} guests</span>
            </div>
            <div class="wrap-mgr">
              <i class="iconfont icon-185038homehousestreamline"></i>
              <span>{{data.bedroomNumber}} bedroom</span>
            </div>
          </div>
          <div class="wrap-top flex-wrap">
            <div class="flex-wrap flex-align-center">
              <i class="iconfont icon-chuang1"></i>
              <span>{{data.bedNumber}} bed</span>
            </div>
            <div class="wrap-mgr">
              <i class="iconfont icon-weiyu"></i>
              <span>{{data.bathNumber}} bath</span>
            </div>
          </div>

          <p class="intro-p" v-if="!descriptionShowMore" v-html="data.description.substring(0,200)"></p>
          <p class="intro-p" v-if="descriptionShowMore" v-html="data.description"></p>
          <!-- <p class="intro-p" v-for="(item, index) in data.spaces" :key="index" v-show="index < 0 || descriptionShowMore">{{item.space}}</p> -->
        </div>
        <div class="read-more flex-wrap flex-align-center"  @click="descriptionShowMore = !descriptionShowMore" v-if="data.description.length>200">
          <p>{{descriptionShowMore ? 'hide' : 'Read more about the space'}}</p>
          <i class="iconfont icon-54" :class="descriptionShowMore ? 'transform' : ''"></i>
        </div>
        <p class="spilt-p"></p>

        <div class="d_item" v-show="data.arrangementsLen">
          <p class="h1-p">Sleeping arrangements</p>
          <div class="arrangement h1-p" v-for="(item, index) in data.arrangements"  :key="index" v-show="index < 4 || arrangementsShowMore">
            <i class="iconfont icon-chuang1"></i>
            <p class="arr-top" v-for="(items, index) in item.utilities" :key="index" v-show="items.count != 0">{{items.count}} {{items.utility}}</p>
          </div>
          <div class="read-more flex-wrap flex-align-center" @click="arrangementsShowMore = !arrangementsShowMore" v-if="data.arrangementsLen>4">
            <p>{{arrangementsShowMore ? 'hide' : 'Show more sleeping arrangements'}}</p>
            <i class="iconfont icon-54" :class="arrangementsShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item">
          <p class="h1-p">Check in/out</p>
          <p>Check in time {{data.availableCheckinTimeFrom}}:00 － {{data.availableCheckinTimeTo}}:00 · Check-out time before {{data.checkOutTime}}:00</p>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item" v-show="data.amenitiesLen">
          <p class="h1-p">Amenities</p>
          <ul>
            <li class="function-p" v-for="(item, index) in data.amenities" :key="index" v-show="index < 5 || amenitiesShowMore">{{item.amenity}}</li>
          </ul>
          <div class="read-more flex-wrap flex-align-center" @click="amenitiesShowMore = !amenitiesShowMore" v-if="data.amenitiesLen>5">
            <p>{{amenitiesShowMore ? 'hide' : 'Show more amenities'}}</p>
            <i class="iconfont icon-54" :class="amenitiesShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item" v-show="data.safeAmenitiesLen">
          <p class="h1-p">Safe Amenities</p>
          <ul>
            <li class="rules-p" v-for="(item, index) in data.safeAmenities" :key="index" v-show="index < 3 || safeAmenitiesShowMore">{{item.safeAmenity}}</li>
          </ul>
          <div class="read-more flex-wrap flex-align-center" @click="safeAmenitiesShowMore = !safeAmenitiesShowMore" v-if="data.safeAmenitiesLen>3">
            <p>{{safeAmenitiesShowMore ? 'hide' : 'Show more amenities'}}</p>
            <i class="iconfont icon-54" :class="safeAmenitiesShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item" v-show="data.spacesLen">
          <p class="h1-p">Spaces</p>
          <ul>
            <li class="rules-p" v-for="(item, index) in data.spaces" :key="index" v-show="index < 3 || spaceShowMore">{{item.space}}</li>
          </ul>
          <div class="read-more flex-wrap flex-align-center" @click="spaceShowMore = !spaceShowMore" v-if="data.spacesLen>3">
            <p>{{spaceShowMore ? 'hide' : 'Read all spaces'}}</p>
            <i class="iconfont icon-54" :class="spaceShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item" v-show="data.rulesLen">
          <p class="h1-p">House Rules</p>
          <ul>
            <li class="rules-p" v-for="(item, index) in data.rules" :key="index" v-show="index < 3 || rulesShowMore">{{item.additionalTitle == "" ? item.rule : item.additionalTitle}}</li>
          </ul>
          <div class="read-more flex-wrap flex-align-center" @click="rulesShowMore = !rulesShowMore" v-if="data.rulesLen>3">
            <p>{{rulesShowMore ? 'hide' : 'Read all rules'}}</p>
            <i class="iconfont icon-54" :class="rulesShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item">
          <p class="h1-p">Cancellations</p>
          <p class="arr-top">{{data.cancellationPolicy ? data.cancellationPolicy.name : ''}}</p>
          <p class="arr-top">{{data.cancellationPolicy ? data.cancellationPolicy.title : ''}}</p>
          <p class="arr-down" v-if="cancellationsShowMore">{{data.cancellationPolicy ? data.cancellationPolicy.description : ''}}</p>
          <div class="read-more flex-wrap flex-align-center" @click="cancellationsShowMore = !cancellationsShowMore">
            <p>{{cancellationsShowMore ? 'hide' : 'Read more about the policy'}}</p>
            <i class="iconfont icon-54" :class="cancellationsShowMore ? 'transform' : ''"></i>
          </div>
          <p class="spilt-p"></p>
        </div>

        <div class="d_item">
          <p class="h1-p">Nearby landmarks</p>
          <el-amap v-if="Object.keys(data).length !== 0" vid="amapDemo" :zoom="6" :center="[data.lng, data.lat]" class="amap">
              <el-amap-marker
              :position="[data.lng, data.lat]"
              :clickable="true"
              animation="AMAP_ANIMATION_DROP">

                <el-popover placement="top" width="230" trigger="click" popper-class="map-popover">
                  <div slot="reference" class="amap-overlay-text-container1">
                    <i class="iconfont icon-location"></i>
                  </div>
                </el-popover>
              </el-amap-marker>
          </el-amap>
        </div>
      </div>

      <el-col :span="7" class="scrool-fix-rili" :class="isShow?'scrool-fix-rili-show':'scrool-fix-rili-hide'"></el-col>
      <el-col :span="7" class="lst-home-right lst-home-right-xl" :class="isShow?'lst-home-right-xl-fix':'lst-home-right-xl-sta'">
        <div>
          <div class="top flex-wrap flex-center-between">
            <div class="top-wrap flex-wrap flex-center">
              <el-dropdown  trigger="click" @command="CurrentCurrencyfun">
                <span class="el-dropdown-link pps-p XY-cursorp">
                  {{CurrentCurrency}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="pps-p" :command="item" v-for="(item,index) in currencyType" :key="index" >{{item}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <p class="top-wrap-p"><em>{{CurrentCurrency}} {{this.data.prices ? this.data.prices[0].bestPrice : 0}}</em>per night</p>
          </div>
          <div class="select-time flex-wrap">
            <div class="select-time-start flex-1">
              <p>Check-in</p>
              <el-date-picker v-model="timeStart" type="daterange" range-separator="" @change="selectTime" :picker-options="pickerOptions">
              </el-date-picker>
              <div class="startTime text" v-if="timeStart != ''">
                <p>{{startTextTime[2]}} {{startTextTime[1]}} {{startTextTime[3]}} </p>
                <span> {{startTextTime[0]}}</span>
              </div>
              <div class="startTime text text1" v-if="timeStart == ''">
                <span>Check in</span>
              </div>
            </div>
            <div class="select-time-end flex-1">
              <p>Check-out</p>
              <el-date-picker v-model="timeEnd" type="daterange" range-separator="" @change="selectTime" :picker-options="pickerOptions"></el-date-picker>
              <div class="endTime text" v-if="timeEnd != ''">
                <p>{{endTextTime[2]}} {{endTextTime[1]}} {{endTextTime[3]}}</p>
                <span>{{endTextTime[0]}}</span>
              </div>
              <div class="endTime text text1" v-if="timeEnd == ''">
                <span>Check out</span>
              </div>
              <i v-if="timeEnd != ''" class="el-icon-error clonetime" @click="timeStart='';timeEnd='';"></i>
            </div>
          </div>
          <div class="guests listing_index">
            <p>Guests</p>
            <el-popover placement="bottom" width="300"  v-model="visible_xl" popper-class="c_guests">
              <div class="select flex-wrap flex-center-between" slot="reference" @click="visible_xl = !visible_xl">
                <span>{{num1 + num2}} guests {{num3 >=1 ? "," + num3 + "infants":''}}</span>
                <i class="icon iconfont" :class="visible_xl ? 'icon-arrow-up' : 'icon-54'"></i>
              </div>
              <div class="placementbottom">
                <ul class="rooms">
                  <li class="flex-wrap flex-center-between">
                    <span class="r-title">Adults</span>
                    <el-input-number v-model="num1" :min="1" :max="data.guestNumber - num2" @change="HandleChangeAdult"></el-input-number>
                  </li>
                  <li class="flex-wrap flex-center-between">
                    <span class="r-title">
                      Children
                      <p>Ages 2-12</p>
                    </span>
                    <el-input-number v-model="num2" :min="0" :max="data.guestNumber - num1" @change="HandleChangeAdult"></el-input-number>
                  </li>
                  <li class="flex-wrap flex-center-between">
                    <span class="r-title">Infants
                      <p>Under 2</p>
                    </span>
                    <el-input-number v-model="num3" :min="0" :max="10"></el-input-number>
                  </li>
                </ul>
                <div class="bottom flex-wrap flex-center-between">
                  <span></span>
                  <span class="red" @click="visible_xl = false">Close</span>
                </div>
              </div>
            </el-popover>
          </div>
          <div class="gus-wrap flex-wrap flex-center-between " v-if="timeStart != ''">
            <div class="gus-div ">
              <!-- <div class="left">PPS {{this.data.prices ? this.data.prices[0].bestPrice : 0}} x {{time | days}} nights</div> -->
              <div class="left">{{CurrentCurrency}} {{days('days')}} nights</div>
              <!-- days('days') -->
              <div class="left">Cleaning fee</div>
               <div class="left">Service fee</div>
              <div class="left">Total</div>
            </div>
            <div class="gus-div ">
              <div class="left">{{CurrentCurrency}} {{days('place_price')}}</div>
              <div class="left">{{CurrentCurrency}} {{data.prices[0].cleanupServiceFee}}</div>
              <div class="left">{{CurrentCurrency}} {{days('service')}}</div>
              <!-- <div class="left">{{days('service')}}</div> -->
              <div class="left">{{CurrentCurrency}} {{days('total_price')}}</div>
            </div>
          </div>

          <div class="qrbox" v-if="CurrentCurrency == 'CNY'">
            <div :class="channel == 'alipay_qr' ? 'active' : null" @click="channel = 'alipay_qr'"><i class="iconfont icon-zhifubao"></i>AliPay</div>
            <div :class="channel == 'wx_pub_qr' ? 'active' : null" @click="channel = 'wx_pub_qr'"><i class="iconfont icon-weixinzhifu"></i>Wechat Pay</div>
          </div>

          <button @click="Verify" :disabled="disVerify" :class="disVerify ? 'disabled' : null" v-loading.fullscreen.lock="dialogloading">Book</button>
        </div>
      </el-col>
    </el-row>
    <!-- 移动端固定底部  -->
    <div class="lst-footer">
      <div style="height: 100%;" class="flex-wrap flex-center-between">
        <div>Total: 500</div>
        <div class="button" @click="isBack = true">Book</div>
      </div>
    </div>
    <el-dialog :visible.sync="isBack" class="isBack" center :close-on-click-modal="true">
       <div class="lst-home-right lst-home-right-xl" :class="isShow?'lst-home-right-xl-fix':'lst-home-right-xl-sta'">
        <div class="top flex-wrap flex-center-between">
          <div class="top-wrap flex-wrap flex-center">
            <p class="pps-p">{{CurrentCurrency}}</p>
            <i class="iconfont icon-54"></i>
          </div>
          <p class="top-wrap-p"><em>{{CurrentCurrency}} {{this.data.prices ? this.data.prices[0].bestPrice : 0}}</em>per night</p>
        </div>
        <div class="select-time flex-wrap">
          <div class="select-time-start flex-1">
            <p>Check-in</p>
            <el-date-picker v-model="time" type="daterange" range-separator="" @input="selectTime" :picker-options="pickerOptions">
            </el-date-picker>
            <div class="startTime text">
              <p>{{startTextTime[2]}} {{startTextTime[1]}} {{startTextTime[3]}} </p>
              <span> {{startTextTime[0]}}</span>
            </div>
          </div>
          <div class="select-time-end flex-1">
            <p>Check-out</p>
            <el-date-picker v-model="time" type="daterange" range-separator="" @input="selectTime" :picker-options="pickerOptions"></el-date-picker>
            <div class="endTime text">
              <p>{{endTextTime[2]}} {{endTextTime[1]}} {{endTextTime[3]}}</p>
              <span>{{endTextTime[0]}}</span>
            </div>
          </div>
        </div>
        <div class="guests listing_index">
          <p>Guests</p>
          <el-popover placement="bottom" width="300"  v-model="visible_xl2">
              <div class="select flex-wrap flex-center-between" slot="reference" @click="visible_xl2 = !visible_xl2">
                <span>{{num1 + num2}} guests {{num3 >=1 ? "," + num3 + "infants":''}}</span>
                <i class="icon iconfont" :class="visible_xl2 ? 'icon-arrow-up' : 'icon-54'"></i>
              </div>
              <div class="placementbottom">
                <ul class="rooms">
                  <li class="flex-wrap flex-center-between">
                    <span class="r-title">Adults</span>
                    <el-input-number v-model="num1" :min="1" :max="data.guestNumber - num2" @change="HandleChangeAdult"></el-input-number>
                  </li>
                  <li class="flex-wrap flex-center-between">
                    <span class="r-title">
                      Children
                      <p>Ages 2-12</p>
                    </span>
                    <el-input-number v-model="num2" :min="0" :max="data.guestNumber - num1" @change="HandleChangeAdult"></el-input-number>
                  </li>
                  <li class="flex-wrap flex-center-between">
                    <span class="r-title">Infants
                      <p>Under 2</p>
                    </span>
                    <el-input-number v-model="num3" :min="0" :max="10"></el-input-number>
                  </li>
                </ul>
                <div class="bottom flex-wrap flex-center-between">
                  <span></span>
                  <span class="red" @click="visible_xl = false">Close</span>
                </div>
              </div>
            </el-popover>
        </div>
        <div class="gus-wrap flex-wrap flex-center-between ">
          <div class="gus-div ">
            <div class="left">PPS {{days('days')}} nights</div>
            <div class="left">Cleaning Service fee</div>
            <!-- <div class="left">Service fee</div> -->
            <div class="left">Total</div>
          </div>
          <div class="gus-div ">
            <div class="left">PPS {{days('place_price')}}</div>
            <!-- <div class="left">0</div> -->
            <div class="left">{{days('clean')}}</div>
            <div class="left">{{days('total_price')}}</div>
          </div>
        </div>
        <button @click="Verify">Book</button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import banner1 from '../../assets/images/index/banner-1.png'
import banner2 from '../../assets/images/index/banner-2.png'
import banner3 from '../../assets/images/index/banner-3.png'
import banner4 from '../../assets/images/index/banner-4.png'
var moment = require('moment')
export default {
  name: 'listing-home',
  components: {
    // 'e-header': header,
    // 'e-footer': footer
  },
  data () {
    return {
      isLogin: false,
      img: [banner1, banner2, banner3, banner4],
      time: '',
      place_id: '',
      listName: '',
      placeName:'',
      description:'',
      timeStart: '',
      timeEnd: '',
      startTextTime: [],
      endTextTime: [],
      startTimestamp: '',
      endTimestamp: '',
      selectValue: '1 guest',
      hostName: '',
      num1: 1,
      num2: 0,
      num3: 0,
      isVerify: false,
      visible_xs: false,
      visible_xl2: false,
      visible_xl: false,
      descriptionShowMore: false,
      arrangementsShowMore:false,
      amenitiesShowMore: false,
      safeAmenitiesShowMore: false,
      rulesShowMore: false,
      spaceShowMore:false,
      cancellationsShowMore: false,
      channel:'alipay_qr',
      isBack: false,
      data: {
        arrangementsLen:0,
        amenitiesLen:0,
        safeAmenitiesLen:0,
        spacesLen:0,
        rulesLen:0,
        lng:'0',
        lat:'0'
      },
      bookInfo: '',
      pickerOptions: {
        onPick: ({maxDate, minDate}) => {
          this.maxDate = new Date(maxDate).getTime();
          this.minDate = new Date(minDate).getTime();
        },
        disabledDate: (time) => {

          let dates = new Date().getTime() + (1000 * 60 * 60 * 24) * this.data.guestMaxStayNight
          let dateNeedNoticeDay = new Date().getTime() + (1000 * 60 * 60 * 24) * this.data.needNoticeDay

          let startdateArr = [];
          let enddateArr = [];

          if(this.unavailableDate){
            if(this.unavailableDate.length){

              for(var item in this.unavailableDate){

                var startDate = new Date(this.unavailableDate[item].startDate).getTime()-86400000;
                var endDate = new Date(this.unavailableDate[item].endDate).getTime()-86400000;

                if(!this.minDate){
                  if (time.getTime() > startDate && time.getTime() < endDate) {
                    return time.getTime()
                  }
                }

                if(this.minDate <= startDate) {
                  startdateArr.push(startDate)
                }


                if(this.minDate >= endDate) {
                  enddateArr.push(endDate)
                }

              }


              if(this.minDate){
                if(startdateArr.length && time.getTime() > Math.min.apply(Math,startdateArr)+86400000) {
                  return time.getTime();
                }

                if(enddateArr.length && time.getTime() < Math.max.apply(Math,enddateArr)){
                  return time.getTime();
                }
              }

            }
          }


          if(dates){
            return time.getTime() < Date.now() - 8.64e7 || time.getTime() > dates || time.getTime() < dateNeedNoticeDay
          }

        }
      },
      isShow: false,
      unavailableDate:[],
      currencyType:['PPS','CNY'],
      CurrentCurrency:'PPS',
      disVerify:false,
      dialogloading:false
    }
  },
  created () {
    this.getPlace(this.$route.query.id)
    this.place_id = this.$route.query.id
    this.startTextTime = String(this.timeStart).split(' ')
    this.endTextTime = String(this.timeEnd).split(' ')
    this.startTimestamp = Date.parse(this.timeStart)
    this.endTimestamp = Date.parse(this.timeEnd)

  },
  methods: {
    selectTime (e) {
      this.timeStart = e[0]
      this.timeEnd = e[1]
      this.startTextTime = String(this.timeStart).split(' ')
      this.endTextTime = String(this.timeEnd).split(' ')
      this.startTimestamp = Date.parse(this.timeStart)
      this.endTimestamp = Date.parse(this.timeEnd)
      if(this.startTimestamp != this.endTimestamp){
        this.getBookInfo()
      }else{
        this.$notify({
          title: 'warning',
          message: 'Check-in date and check-out date cannot be the same.',
          type: 'warning'
        });
        this.timeStart = ""
        this.timeEnd = ""
      }
      this.maxDate = null;
      this.minDate = null;
    },
    HandleChangeAdult(){
      this.getBookInfo()
    },
    Verify () {
      let user = this.$store.state.userInfo

      if (!user) {

        this.$store.state.show_login = true

      } else {

        if(user.user_identity_confirmation.document_verified === 'true' && user.user_identity_confirmation.email_verified === 'true' && user.user_identity_confirmation.phone_verified === 'true' ){

          if(user.user_id == this.data.hostId){
            this.$notify({
              title: 'warning',
              message: 'Can\'t book your own house.',
              type: 'warning'
            });
          }else{
            this.dialogloading = true
            this.disVerify = true
            if(this.CurrentCurrency == "CNY"){
              this.$post(this.bookUrl + '/booking ', {
                action: 'makeBooking',
                data: {
                  user_id: user.user_id,
                  place_id: this.place_id,
                  check_in_date: moment(this.startTimestamp).format('YYYY-MM-DD'),
                  check_out_date: moment(this.endTimestamp).format('YYYY-MM-DD'),
                  guest_number: this.num1 + this.num2,
                  currency: this.CurrentCurrency,
                  channel:this.channel
                }
              }).then((res) => {
                this.dialogloading = false
                if (res.msg.code === 200) {
                  this.$router.push({path: 'lstDetail', query: {book_id: res.data.booking_id ,guest_number:this.num1 + this.num2}})
                }

                if (res.msg.code === 952) {
                  this.$notify({
                    title: 'warning',
                    message: 'Current time period cannot be book.',
                    type: 'warning'
                  });
                  this.disVerify = false
                  this.timeStart = ""
                  this.timeEnd = ""
                }
              })
            }else{
              this.$post(this.bookUrl + '/booking ', {
                action: 'makeBooking',
                data: {
                  user_id: user.user_id,
                  place_id: this.place_id,
                  check_in_date: moment(this.startTimestamp).format('YYYY-MM-DD'),
                  check_out_date: moment(this.endTimestamp).format('YYYY-MM-DD'),
                  guest_number: this.num1 + this.num2,
                  currency: this.CurrentCurrency,
                }
              }).then((res) => {
                console.log(res)
                this.dialogloading = false
                if (res.msg.code === 200) {
                  this.$router.push({path: 'lstDetail', query: {book_id: res.data.booking_id ,guest_number:this.num1 + this.num2}})
                }

                if (res.msg.code === 952) {
                  this.$notify({
                    title: 'warning',
                    message: 'Current time period cannot be book.',
                    type: 'warning'
                  });
                  this.disVerify = false
                  this.timeStart = ""
                  this.timeEnd = ""
                }
              })
            }
          }


        }else {
          this.isVerify = !this.isVerify
        }

      }


    },
    toDetail () {
      this.$router.push({path: 'VerifyIdentity'})
    },
    // 搜索请求
    getPlace (id) {
      var that = this
      this.$get(this.placeUrl + '/place', {
        placeId: id
      }).then((res) => {
        if (res.code === 200) {
          if (res.data.prices.length === 0) res.data.prices.push([{bestPrice: 0}])
          var citycode = res.data.citycode
          var hostname = res.data.hostId
          var placeName = res.data.placeName
          var description = res.data.description
          that.getName(citycode)
          that.getUserName(hostname)
          // that.translation('placeName',placeName)
          // that.translation('description',description)


          if(res.data.arrangements[0]){
            if(res.data.arrangements[0].unavailableDate){
              for(var item in res.data.arrangements[0].unavailableDate){
                this.unavailableDate.push(res.data.arrangements[0].unavailableDate[item])
              }
            }
          }

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
      }).catch(err => {
        console.log(err)
      })
    },
    // 计算价格
    prices (type) {
      let dayTime = ''
      let day = ''
      let data = ''
      dayTime = this.endTimestamp - this.startTimestamp
      day = dayTime / (1000 * 60 * 60 * 24)

      if (type === 'days') {
        if(this.data.prices){
          data = this.data.prices[0].bestPrice + ' x ' + day
        }else{
          data = 0 + ' x ' + day
        }
      }

      else if (type === 'place_price') {
        data = this.bookInfo.place_price
      }

      else if (type === 'clean') {
        data = this.bookInfo.cleanup_service_fee
      }

      else if (type === 'service') {
        data = this.bookInfo.service_fee
      }

      else if (type === 'total_price') {
        data = this.bookInfo.total_price
      }

      return data
    },
    getUserName (hostid) {
      this.$post(this.userUrl + '/user', {
        action: 'getUserInfo',
        data: {
          user_id: hostid
        }
      }).then((res) => {
        this.hostName = res.data.first_name + res.data.last_name
      })
    },
    getBookInfo () {

      this.$post(this.bookUrl + '/booking ', {
        action: 'estimateBookingPrice',
        data: {
          place_id: this.place_id,
          check_in_date: moment(this.startTimestamp).format('YYYY-MM-DD'),
          check_out_date: moment(this.endTimestamp).format('YYYY-MM-DD'),
          guest_number: this.num1 + this.num2,
          currency: this.CurrentCurrency
        }
      }).then((res) => {
        if (res.msg.code === 200) {
          this.disVerify = false
          this.bookInfo = res.data
        }
      })

    },
    //翻译
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
            this.description = json.translation[0].replace('\n','<br/>')
          }
      }).catch(err => {
        console.log(err)
      })
    },
    //book吸顶
    handleBook () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
    },
    CurrentCurrencyfun(command){
      this.CurrentCurrency = command
    }

  },
  mounted () {
    window.addEventListener('scroll', this.handleBook)
  },
  computed: {
    days () {
      return function (type) {
        return this.prices(type)
      }
    }
  },
  beforeCreate () {
    var userAgentInfo = navigator.userAgent
    var Agents = ['Android', 'iPhone',
      'SymbianOS', 'Windows Phone',
      'iPad', 'iPod']
    var flag = false
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = true
        break
      }
    }
    if (flag) return false
    else {
      // document.addEventListener('scroll', function (event) {
      //   var scrollDistance = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //   if (scrollDistance >= 830) {
      //     this.isShow = true
      //     // document.getElementsByClassName('lst-home-right-xl')[0].style.cssText = 'position:fixed;top:100px;right: 9.5%;'
      //     // document.getElementsByClassName('scrool-fix-rili')[0].style.cssText = 'display:block'
      //   } else {
      //     this.isShow = false
      //     // document.getElementsByClassName('lst-home-right-xl')[0].style.cssText = 'position:static;'
      //     // document.getElementsByClassName('scrool-fix-rili')[0].style.cssText = 'display:none;'
      //   }
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$red-color: #F4436C;
.lst-index{
  padding-bottom: 30px;
  .banner-wrap {
    height: 900px;
    position: relative;
  }
  .banner-img {
    height: 100%;
  }
  .banner-bg {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
  }

  @media only screen and (max-width: 1500px) {
    .list {
      width: auto;
      padding: 0 30px;
      ul {
        text-align: center;
        li {
          float: none;
          display: inline-block;
        }
      }
    }
    .state-list {
      width: auto;
      padding: 0 30px;
      ul {
        display: block;
        text-align: center;
        height: auto;
        li{
          display: inline-block;
          margin-bottom: 30px;
        }
      }
    }
  }
  @media only screen and (max-width:780px) {
    .list {
      ul {
        li {
          width: 100%;
        }
      }
    }
    .state-list {
      ul {
        li{
          margin-right: 0
        }
      }
    }
    .banner-wrap {
      .banner-content {
        right: 50%;
        transform: translateX(50%) translateY(-50%);
      }
    }
  }
  @media only screen and (max-width:500px) {
    .banner-wrap {
      padding: 30px 0;
      height: 300px;
      .banner-content {
        width: 100%;
        padding: 40px 10px;
        box-sizing: border-box;
      }
      // .banner-img {
      //   display: none;
      // }
    }
  }
  .lst-home{
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
    position: relative;
    justify-content: space-around;
    .lst-home-left{
      width: 37.5%;
      // margin-right: 21%;
      // margin-left: 10%;
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
            line-height: 30px;
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
          line-height: 30px;
          word-wrap:break-word;
          // height: 90px;
          // overflow: hidden;
        }
        .intro-p2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
      .read-more{
        margin-top: 20px;
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
        vertical-align: top;
      }
      .function-p{
        width: 250px;
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
    .scrool-fix-rili-show{
      display:block;
    }
    .scrool-fix-rili-hide{
      display:none;
    }
  }
}
.lst-home-right-xs{
  display: none;
}
.lst-home-right{
  margin-top: 60px;
  // margin-left: 10%;
  max-width: 400px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
  // margin-right: 21%;
  &>div{
    border: 1px solid #E6E7E8;
    padding: 34px 20px;
    border-radius: 3px;
  }

  .qrbox{
    display: flex;
    justify-content: space-between;

    div{
      width: 46%;
      margin: 20px 0;
      height: 60px;
      line-height: 60px;
      text-align: center;
      border:1px solid #E6E7E8;
      display: inline-block;
      font-size: 16px;
      cursor: pointer;

      &.active{
        border: 1px solid #F4436C;
      }

      i {
        font-size: 30px;
        margin-right: 10px;
        color: rgb(36, 175, 65);
        vertical-align:middle;
      }

      &:first-child {
        i{
          color: rgb(54, 180, 242);
        }
      }
    }
  }

  .left{
    margin-top: 10px;
  }
  .gus-wrap{
    margin-top: 15px;
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
    margin-top: 20px;
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
}
.lst-footer {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 1000;
  height: 60px;
  box-sizing: border-box;
  padding: 0 30px;
  border-top: 1px solid rgb(235, 235, 235) !important;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
  .button {
    background: #F4436C;
    border-radius: 3px;
    color: #fff;
    letter-spacing: 1px;
    line-height: 44px;
    font-family: Roboto-Medium;
    width: 150px;
    height: 44px;
    outline: none;
    border: none;
    text-align: center;
    cursor: pointer;
  }
}

button.disabled{
  opacity:0.5;
  cursor: not-allowed;
}
.isBack {
  .lst-home-right {
    margin-top: 0;
    border: 0;
    padding: 30px 0;
    height: auto;
  }
}
.transform {
  display: inline-block;
  transform: rotate(180deg)
}
@media only screen and (max-width: 1000px){
  .lst-index .lst-home .lst-home-left{
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  .lst-home-right-xs{
    display: block;
    margin-top: 20px;
    box-sizing: border-box;
  }
  .lst-home .lst-home-right-xl{
    display: none;
  }
  .lst-home .lst-home-right-xl-fix{
    position:fixed;
    top:100px;
    right: 9.5%;
  }
  .lst-home .lst-home-right-xl-sta{
    position:static;
  }
  .scrool-fix-rili{
    display: none !important;
  }
  .lst-footer {
    display: block;
  }
}
</style>
<style lang="scss">
 .lst-index{
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
        width: 100%;
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
    .el-carousel .el-carousel__indicators--outside{
      transform: translateX(-50%);
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
    .placementtop{
      width:250px !important;
    }
 }

.lst-home-right{
  .select-time {
    margin: 30px 0;
    font-size: 16px;
    color: #4A4A4A;
    cursor:pointer;

    i.clonetime{
      position: absolute;
      right: 5px;
      bottom:5px;
      color: #F4436C;
      font-size: 14px;
      cursor: pointer;
    }

    p {
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      height: 60px;
      border-radius: 3px;
      padding: 0 30px;
      box-sizing: border-box;
      border: 1px solid #e6e7e8;
      cursor:pointer;
    }
    .select-time-start {
      margin-right: 10px;
      position: relative;
    }
    .select-time-end {
      margin-left: 10px;
      position: relative;
    }
    .text {
      width: 100%;
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      padding: 0 20px;
      box-sizing: border-box;
      p {
        font-family: Roboto-Regular;
        font-size: 18px;
        color: #4a4a4a;
      }
      span {
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #B1B3B6;
        line-height: 16px;
      }
    }
  }
  .guests {
    cursor: pointer;
    p {
      margin-bottom: 5px;
    }
    .select {
      width: 100%;
      height: 60px;
      box-sizing: border-box;
      padding: 0 30px;
      border-radius: 3px;
      border: 1px solid #e6e7e8;
      font-size: 16px;
      color: #4a4a4a;
    }
  }
}
.listing_index {
  .el-input__inner {
    height: 40px!important;
  }
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
.lst-index .guests .el-input__inner {
  height: 40px;
}
@media only screen and (max-width:500px) {
  .lst-index .guests .el-popover{
    width: 71% !important;
    margin-top: 60px;
  }
}
.guests .el-select, .banner-content .el-date-editor.el-input {
  width: 100%;
}
.lst-index .el-popover .red{
  color: #F4436C;
  cursor: pointer;
}
.home-list .el-rate__text {
  font-family: Roboto-Light;
  font-size: 12px;
  color: #4A4A4A;
  letter-spacing: 0.47px;
}
.banner-content .el-select .el-input.is-focus .el-input__inner,.banner-content .el-select .el-input__inner:focus{
  border-color: #c0c4cc
}
.banner-content .el-input.is-active .el-input__inner,.banner-content .el-input__inner:focus {
  border-color: #dcdfe6
}
.banner-content .el-date-editor .el-range__icon {
  display: none
}

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
.amap-overlay-text-container1 {
  border: none;
  padding: 3px 5px;
  font-family: Roboto-Regular;
  font-size: 16px;
  position: relative;
  background: transparent !important;

  i{
    font-size: 30px;
    color:#F4436C;
  }
}
.map-popover {
  padding: 0;
}
.map {
  font-size: 14px;
  img {
    width: 100%;
  }
  .map-info {
    padding: 10px;
  }
  .text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-rate__icon {
    font-size: 14px;
  }
}

 .el-dropdown-menu{
   box-shadow: 2px 10px 20px 0 rgba(0,0,0,0.15);
   li.pps-p{
     font-size: 18px;
     color: #4a4a4a;
     &:hover{
       color: #F4436C;
     }
   }
 }
</style>
