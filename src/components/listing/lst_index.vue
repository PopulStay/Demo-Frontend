<template>
  <div class="content lst-index">
    <el-dialog :visible.sync="isVerify" class="verify" center>
      <p class="red-color" style="margin-bottom:28px;">{{$t('message.Youwillneedtoverify')}}</p>
      <button class="verify-btn XY-cursorp" @click="toDetail">{{$t('message.Verify')}}</button>
    </el-dialog>
    <!-- <e-header></e-header> -->
    <!-- 轮播  -->
    <div class="banner-wrap" v-if="picture.length == 1 && picture[0].status != 200 ? false : true">
      <div class="banner-img">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in picture" :key="item.pictureId" v-if="item.status == 200">
            <img :src="item.bigPictureUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <el-row type="flex" class="lst-home" id="BOOKing">
      <div class="lst-home-left">
        <div class="top flex-wrap flex-center-between">
          <div class="top-left">
            <p class="entire-p">{{data.category}}</p>
            <p class="name-p">{{data.placeName}}</p>
            <p class="address-p">{{listName}}</p>
          </div>
          <div class="top-right flex-wrap flex-column-center flex-align-center">
            <div class="Img" :style="{backgroundImage:'url(' + hostImg + ')'}" ></div>
            <p>{{host.first_name}}{{host.last_name}}</p>
            <!--<button class="LiveChat" @click="LiveChat()" v-if="$store.state.userInfo">Live Chat</button>-->
          </div>
        </div>
        <div class="detail-wrap">

          <div class="wrap-top flex-wrap">
            <div class="flex-wrap flex-align-center">
              <i class="iconfont icon-geren"></i>
              <span>{{data.guestNumber}} {{$t('message.guests')}}</span>
            </div>
            <div class="wrap-mgr">
              <i class="iconfont icon-185038homehousestreamline"></i>
              <span>{{data.bedroomNumber}} {{$t('message.bedroom')}}</span>
            </div>
          </div>
          <div class="wrap-top flex-wrap">
            <div class="flex-wrap flex-align-center">
              <i class="iconfont icon-chuang1"></i>
              <span>{{data.bedNumber}} {{$t('message.bed')}}</span>
            </div>
            <div class="wrap-mgr">
              <i class="iconfont icon-weiyu"></i>
              <span>{{data.bathNumber}} {{$t('message.bath')}}</span>
            </div>
          </div>
          <p class="intro-p" v-if="!descriptionShowMore">{{data.description ? data.description.substring(0,200) : null}}</p>
          <p class="intro-p" v-if="descriptionShowMore" >{{data.description}}</p>
          <!-- <p class="intro-p" v-for="(item, index) in data.spaces" :key="index" v-show="index < 0 || descriptionShowMore">{{item.space}}</p> -->
        </div>
        <!--<div class="read-more flex-wrap flex-align-center"  @click="descriptionShowMore = !descriptionShowMore" v-if="data.description.length>200">-->
          <!--<p>{{descriptionShowMore ? 'hide' : 'Read more about the space'}}</p>-->
          <!--<i class="iconfont icon-54" :class="descriptionShowMore ? 'transform' : ''"></i>-->
        <!--</div>-->
        <p class="spilt-p"></p>

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

        <div class="d_item">
          <p class="h1-p">{{$t('message.Landmarksnearby')}}</p>
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

      <div  class="lst-home-right lst-home-right-xl" :class="isShow?'lst-home-right-xl-fix':'lst-home-right-xl-sta'">
        <div :class="AmapFixed ? 'isFixed' : null">
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
            <p class="top-wrap-p"><em>{{this.data.prices ? this.data.prices[0].bestPrice : 0}} {{CurrentCurrency}}</em>{{$t('message.pernightcn')}} {{$t('message.pernighten')}}</p>
          </div>
          <div class="select-time flex-wrap">
            <div class="select-time-start flex-1">
              <p>{{$t('message.Checkin')}}</p>
              <el-date-picker v-model="timeStart" type="daterange" range-separator="" @change="selectTime" :picker-options="pickerOptions">
              </el-date-picker>
              <div class="startTime text" v-if="timeStart != ''">
                <p>{{getMoment(timeStart)}} </p>
                <span> {{getWeek(timeStart)}}</span>
              </div>
              <div class="startTime text text1" v-if="timeStart == ''">
                <span>{{$t('message.Checkin')}}</span>
              </div>
            </div>
            <div class="select-time-end flex-1">
              <p>{{$t('message.Checkout')}}</p>
              <el-date-picker v-model="timeEnd" type="daterange" range-separator="" @change="selectTime" :picker-options="pickerOptions"></el-date-picker>
              <div class="endTime text" v-if="timeEnd != ''">
                <p>{{getMoment(timeEnd)}}</p>
                <span>{{getWeek(timeEnd)}}</span>
              </div>
              <div class="endTime text text1" v-if="timeEnd == ''">
                <span>{{$t('message.Checkout')}}</span>
              </div>
              <i v-if="timeEnd != ''" class="el-icon-error clonetime" @click="timeStart='';timeEnd='';"></i>
            </div>
          </div>
          <div class="guests listing_index">
            <p>{{$t('message.Guests')}}</p>
            <el-popover placement="bottom" width="300"  v-model="visible_xl" popper-class="c_guests">
              <div class="select flex-wrap flex-center-between" slot="reference" @click="visible_xl = !visible_xl">
                <span>{{num1 + num2}} {{num1+num2 >1 ? $t('message.guests') : $t('message.guest')}} {{num3 >=1 ? num3 > 1 ? ", " + num3 + ' ' +$t('message.infants') : "," + num3 + ' ' + $t('message.infant') :''}}</span>
                <i class="icon iconfont" :class="visible_xl ? 'icon-arrow-up' : 'icon-54'"></i>
              </div>
              <div class="placementbottom">
                <ul class="rooms">
                  <li class="flex-wrap flex-center-between">
                    <span class="r-title">{{$t('message.Adults')}}</span>
                    <el-input-number v-model="num1" :min="1" :max="data.guestNumber - num2" @change="HandleChangeAdult"></el-input-number>
                  </li>
                  <li class="flex-wrap flex-center-between">
                    <span class="r-title">
                      {{$t('message.Children')}}
                      <p>{{$t('message.Ages212')}}</p>
                    </span>
                    <el-input-number v-model="num2" :min="0" :max="data.guestNumber - num1" @change="HandleChangeAdult"></el-input-number>
                  </li>
                  <li class="flex-wrap flex-center-between">
                    <span class="r-title">{{$t('message.Infants')}}
                      <p>{{$t('message.Under2')}}</p>
                    </span>
                    <el-input-number v-model="num3" :min="0" :max="5"></el-input-number>
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
              <div class="left">{{data.prices[0].bestPrice}} {{CurrentCurrency}} × {{days('days')}} {{$t('message.night')}}</div>
              <!-- days('days') -->
              <div class="left">{{$t('message.Cleaningfee')}}</div>
               <div class="left">{{$t('message.Servicefee')}}</div>
              <div class="left">{{$t('message.Total')}}</div>
            </div>
            <div class="gus-div ">
              <div class="right">{{days('place_price')}} {{CurrentCurrency}}</div>
              <div class="right">{{data.prices[0].cleanupServiceFee}} {{CurrentCurrency}}</div>
              <div class="right">{{days('service')}} {{CurrentCurrency}}</div>
              <!-- <div class="left">{{days('service')}}</div> -->
              <div class="right">{{days('total_price')}} {{CurrentCurrency}}</div>
            </div>
          </div>

          <div class="qrbox" v-if="CurrentCurrency == 'CNY'">
            <div :class="channel == 'alipay_qr' ? 'active' : null" @click="channel = 'alipay_qr'"><i class="iconfont icon-zhifubao"></i>{{$t('message.AliPay')}}</div>
            <div :class="channel == 'wx_pub_qr' ? 'active' : null" @click="channel = 'wx_pub_qr'"><i class="iconfont icon-weixinzhifu"></i>{{$t('message.WechatPay')}}</div>
          </div>

          <button @click="Verify">{{$t('message.Book')}}</button>
        </div>
      </div>
    </el-row>
    <!-- 移动端固定底部  -->
    <div class="lst-footer">
      <div style="height: 100%;" class="flex-wrap flex-center-between">
        <div>Total: 500</div>
        <div class="button" @click="isBack = true">Book</div>
      </div>
    </div>
    <el-dialog :visible.sync="isBack" class="isBack" center :close-on-click-modal="true">
      <div  class="lst-home-right lst-home-right-xl" :class="isShow?'lst-home-right-xl-fix':'lst-home-right-xl-sta'">
        <div :class="AmapFixed ? 'isFixed' : null">
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
            <p class="top-wrap-p"><em>{{this.data.prices ? this.data.prices[0].bestPrice : 0}} {{CurrentCurrency}}</em> {{$t('message.pernighten')}} {{$t('message.pernightcn')}}</p>
          </div>
          <div class="select-time flex-wrap">
            <div class="select-time-start flex-1">
              <p>{{$t('message.Checkin')}}</p>
              <el-date-picker v-model="timeStart" type="daterange" range-separator="" @change="selectTime" :picker-options="pickerOptions">
              </el-date-picker>
              <div class="startTime text" v-if="timeStart != ''">
                <p>{{getMoment(timeStart)}} </p>
                <span> {{getWeek(timeStart)}}</span>
              </div>
              <div class="startTime text text1" v-if="timeStart == ''">
                <span>{{$t('message.Checkin')}}</span>
              </div>
            </div>
            <div class="select-time-end flex-1">
              <p>{{$t('message.Checkout')}}</p>
              <el-date-picker v-model="timeEnd" type="daterange" range-separator="" @change="selectTime" :picker-options="pickerOptions"></el-date-picker>
              <div class="endTime text" v-if="timeEnd != ''">
                <p>{{getMoment(timeEnd)}}</p>
                <span>{{getWeek(timeEnd)}}</span>
              </div>
              <div class="endTime text text1" v-if="timeEnd == ''">
                <span>{{$t('message.Checkout')}}</span>
              </div>
              <i v-if="timeEnd != ''" class="el-icon-error clonetime" @click="timeStart='';timeEnd='';"></i>
            </div>
          </div>
          <div class="guests listing_index">
            <p>{{$t('message.Guests')}}</p>
            <el-popover placement="bottom" width="300"  v-model="visible_xl" popper-class="c_guests">
              <div class="select flex-wrap flex-center-between" slot="reference" @click="visible_xl = !visible_xl">
                <span>{{num1 + num2}} {{num1+num2 >1 ? $t('message.guests') : $t('message.guest')}} {{num3 >=1 ? num3 > 1 ? ", " + num3 + ' ' +$t('message.infants') : "," + num3 + ' ' + $t('message.infant') :''}}</span>
                <i class="icon iconfont" :class="visible_xl ? 'icon-arrow-up' : 'icon-54'"></i>
              </div>
              <div class="placementbottom">
                <ul class="rooms">
                  <li class="flex-wrap flex-center-between">
                    <span class="r-title">{{$t('message.Adults')}}</span>
                    <el-input-number v-model="num1" :min="1" :max="data.guestNumber - num2" @change="HandleChangeAdult"></el-input-number>
                  </li>
                  <li class="flex-wrap flex-center-between">
                    <span class="r-title">
                      {{$t('message.Children')}}
                      <p>{{$t('message.Ages212')}}</p>
                    </span>
                    <el-input-number v-model="num2" :min="0" :max="data.guestNumber - num1" @change="HandleChangeAdult"></el-input-number>
                  </li>
                  <li class="flex-wrap flex-center-between">
                    <span class="r-title">{{$t('message.Infants')}}
                      <p>{{$t('message.Under2')}}</p>
                    </span>
                    <el-input-number v-model="num3" :min="0" :max="5"></el-input-number>
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
              <div class="left">{{data.prices[0].bestPrice}} {{CurrentCurrency}} × {{days('days')}} {{$t('message.night')}}</div>
              <!-- days('days') -->
              <div class="left">{{$t('message.Cleaningfee')}}</div>
              <div class="left">{{$t('message.Servicefee')}}</div>
              <div class="left">{{$t('message.Total')}}</div>
            </div>
            <div class="gus-div ">
              <div class="right">{{days('place_price')}} {{CurrentCurrency}}</div>
              <div class="right">{{data.prices[0].cleanupServiceFee}} {{CurrentCurrency}}</div>
              <div class="right">{{days('service')}} {{CurrentCurrency}}</div>
              <!-- <div class="left">{{days('service')}}</div> -->
              <div class="right">{{days('total_price')}} {{CurrentCurrency}}</div>
            </div>
          </div>

          <div class="qrbox" v-if="CurrentCurrency == 'CNY'">
            <div :class="channel == 'alipay_qr' ? 'active' : null" @click="channel = 'alipay_qr'"><i class="iconfont icon-zhifubao"></i>{{$t('message.AliPay')}}</div>
            <div :class="channel == 'wx_pub_qr' ? 'active' : null" @click="channel = 'wx_pub_qr'"><i class="iconfont icon-weixinzhifu"></i>{{$t('message.WechatPay')}}</div>
          </div>

          <button @click="Verify">{{$t('message.Book')}}</button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<script>
var moment = require('moment')
import Cookies from 'js-cookie';
export default {
  name: 'listing-home',
  data () {
    return {
      isLogin: false,
      picture: [],
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
      host: {},
      num1: 1,
      num2: 0,
      num3: 0,
      isVerify: false,
      visible: false,
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

          let currentHours = new Date().getHours()
          let Hours = this.data.availableCheckinTimeTo

          let startdateArr = [];
          let enddateArr = [];

          if(this.unavailableDate){
            if(this.unavailableDate.length){

              for(var item in this.unavailableDate){
                var fromDateStr =  this.unavailableDate[item].fromDate.toString();
                var toDateStr =  this.unavailableDate[item].toDate.toString();

                var startDate = new Date(fromDateStr.substring(0, 4) + "-" + fromDateStr.substring(4, 6) + "-" + fromDateStr.substring(6, 8)).getTime()-86400000;
                var endDate = new Date(toDateStr.substring(0, 4) + "-" + toDateStr.substring(4, 6) + "-" + toDateStr.substring(6, 8)).getTime()-86400000;

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

            if(currentHours > Hours){
              return time.getTime() < Date.now() - 8.64e7 + 86400000 || time.getTime() > dates || time.getTime() < dateNeedNoticeDay-86400000
            }else{
              return time.getTime() < Date.now() - 8.64e7 || time.getTime() > dates || time.getTime() < dateNeedNoticeDay-86400000
            }
          }

        }
      },
      isShow: false,
      unavailableDate:[],
      currencyType:['PPS'],
      CurrentCurrency:'PPS',
      hostImg:'',
      AmapFixed:false,
    }
  },
  created () {
    this.getPlace(this.$route.query.id)
    this.place_id = this.$route.query.id
    this.startTextTime = String(this.timeStart).split(' ')
    this.endTextTime = String(this.timeEnd).split(' ')
    this.startTimestamp = Date.parse(this.timeStart)
    this.endTimestamp = Date.parse(this.timeEnd)

    //获取不可预定日历
    this.getDate(this.$route.query.id)

  },
  methods: {
    selectTime (e) {
      this.timeStart = e[0]
      this.timeEnd = e[1]
      // this.startTextTime = String(this.timeStart).split(' ')
      // this.endTextTime = String(this.timeEnd).split(' ')
      this.startTimestamp = Date.parse(this.timeStart)
      this.endTimestamp = Date.parse(this.timeEnd)
      if(this.startTimestamp != this.endTimestamp){
        this.getBookInfo()
      }else{
        this.$notify({
          title: this.$t('message.Warning'),
          message: this.$t('message.Checkindateandcheckoutdatecannotbethesame'),
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
              title: this.$t('message.Warning'),
              message: this.$t('message.Cantbookyourownhouse'),
              type: 'warning'
            });
          }else{
            let Book = {
              "placeId": this.place_id,
              "night": this.days('days'),
              "Cleaningfee": this.data.prices[0].cleanupServiceFee,
              "Servicefee": this.days('service'),
              "Total": this.days('total_price'),
              "check_in_date": moment(this.startTimestamp).format('YYYY-MM-DD'),
              "check_out_date": moment(this.endTimestamp).format('YYYY-MM-DD'),
              "guest_number": this.num1 + this.num2,
              "currency": this.CurrentCurrency,
              "channel": this.channel
            }
            Cookies.set('Book', JSON.stringify(Book));
            this.$router.push('/listing/lstDetail')
          }


        }else {
          this.isVerify = !this.isVerify
        }

      }


    },
    toDetail () {
      this.$router.push({path: '/trips/security'})
    },
    //获取不可预定列表
    getDate(id){
        this.$get(this.placeUrl + '/place/unavailableDate', {
          placeId: id
        }).then((res) => {
          if(res.code == 200){
            for(var item in res.data){
              this.unavailableDate = res.data
            }
          }
        })
    },

    // 搜索请求
    getPlace (id) {
      var that = this
      this.$get(this.placeUrl + '/place', {
        placeId: id
      }).then((res) => {
        if (res.code === 200) {
          res.data.picture.forEach((val, key) => {
            val.status = 0

            let newImg = new Image()
            newImg.src = val.bigPictureUrl

            newImg.onload = () => {
              val.status = 200
            }

            newImg.onerror = () => {
              val.status = 400
            }
            console.log(val)


            this.picture = res.data.picture

          })


          if (res.data.prices.length === 0) res.data.prices.push([{bestPrice: 0}])
          var citycode = res.data.citycode
          that.getName(citycode)
          that.getUserName(res.data.hostId)
          this.data = res.data
          this.data.arrangementsLen = res.data.arrangements.length
          this.data.amenitiesLen = res.data.amenities.length
          this.data.safeAmenitiesLen = res.data.safeAmenities.length
          this.data.spacesLen = res.data.spaces.length
          this.data.rulesLen = res.data.rules.length




        }

        this.GetHostImg(res.data.hostId)
      })
    },
    GetHostImg(hostid){
      this.$post(this.userUrl + '/user', {
        action: "getUserInfo",
        data: {
          user_id : hostid
        }
      }).then((res) => {
        if(res.msg.code == 200){
          this.hostImg = res.data.image_url
        }else{
          this.hostImg = "https://testapi.image.populstay.com/files/populstay_placeimage/on2m5nqk5t_original.jpg"
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
        // if(this.data.prices){
        //   data = this.data.prices[0].bestPrice + ' x ' + day
        // }else{
        //   data = 0 + ' x ' + day
        // }
        data = day
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
        this.host = res.data
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
    getMoment(time){
      if(this.$i18n.locale == 'cn'){
        return moment(time).locale("zh-cn").format('LL')
      }else{
        return moment(time).locale("en-au").format('DD MMM YYYY')
      }
    },
    getWeek(time){
      if(this.$i18n.locale == 'cn'){
        return moment(time).locale("zh-cn").format('dddd')
      }else{
        return moment(time).locale("en-au").format('dddd')
      }
    },
    //book吸顶
    handleBook () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = document.querySelector('#BOOKing').offsetTop
      this.AmapFixed = scrollTop > (offsetTop - 100)
    },
    CurrentCurrencyfun(command){
      this.CurrentCurrency = command
    },
    LiveChat(){
      this.$store.state.Live_Chat_userid={
        user_id:this.host.user_id,
        first_name:this.host.first_name,
        last_name:this.host.last_name,
        image_url:this.host.image_url
      }
    }

  },
  mounted () {
    window.addEventListener('scroll', this.handleBook)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleBook)
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
    margin: 0 200px;
    @media only screen and (max-width:1500px){
      margin: 0 100px;
    }

    @media only screen and (max-width:780px){
      margin: 0 20px;
    }
    .lst-home-left{
      width: 60%;
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
          div.Img{
            width:80px;
            height: 80px;
            margin-bottom: 10px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 50%;
          }
          .LiveChat{
            background: #F4436C;
            border-radius: 3px;
            border: none;
            padding: 10px 5px;
            font-family: Roboto-Medium;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
            line-height: 11px;
            cursor: pointer;
            margin-top: 10px;
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
        min-width: 300px;
        max-width: 700px;
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
  width: 40%;
  max-width: 400px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
  position: absolute;
  top: 60px;
  right: 0px;

  &>div{
    border: 1px solid #E6E7E8;
    padding: 34px 20px;
    border-radius: 3px;
  }
  .isFixed{
    position: fixed;
    right: 200px;
    top: 110px;
    width: 100%;
    max-width: 358px;
    background: white;
    z-index: 99;
    @media only screen and (max-width:1500px){
      right: 100px;
    }

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
  .gus-wrap {
    margin-top: 15px;
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
  padding: 0 100px;
  border-top: 1px solid rgb(235, 235, 235) !important;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;

  @media only screen and (max-width: 780px){
    padding: 0 20px;
  }
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

.isBack {
  .lst-home-right {
    width: 100%;
    margin-top: 0;
    border: 0;
    padding: 30px 0;
    height: auto;
    position: inherit;
    max-width: 100%;
    .isFixed{
      position: inherit;
      max-width: 100%;
      padding: 0;
      border: none;
    }
  }
}
.transform {
  display: inline-block;
  transform: rotate(180deg)
}
@media only screen and (max-width: 1300px){
  .lst-index .lst-home .lst-home-left{
    width: 100%;
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
  .isBack {
    .el-dialog {
      max-height: 520px;
    }
  }
 .lst-index{
    .verify{
      .el-dialog--center .el-dialog__body{
        text-align: center;
      }
      .el-dialog{
        max-width: 440px;
        min-width: 300px;
      }
      p{
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0.5px;
        text-align: center;
        line-height: 22px;
        margin: 20px 0;
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
.el-popover .red{
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
