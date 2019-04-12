<template>
  <div>
    <e-header></e-header>
    <!-- price.show = false,rating.show = false,guests.show = false,more.show = false -->
    <div class="middle search" v-loading.fullscreen.lock="searchLoading">
      <div class="m-header flex-wrap">
        <div class="item select-time" :class="startTime != '' ? 'redborder' :null">
          <el-date-picker v-model="time" type="daterange" range-separator="" @change="selectTime" :picker-options="pickerOptions">
          </el-date-picker>
          <div class="startTime text" v-if="startTime != ''">
            <p>{{getMoment(timeStart)}} </p>
            <span> {{getWeek(timeStart)}}</span>
          </div>
          <div class="startTime text text1" v-if="startTime == ''">
            <span>{{$t('message.Checkin')}}</span>
          </div>
        </div>
        <div class="item select-time" :class="endTime != '' ? 'redborder' :null">
          <el-date-picker v-model="time" type="daterange" range-separator="" @change="selectTime" :picker-options="pickerOptions"></el-date-picker>
          <div class="endTime text" v-if="endTime != ''">
            <p>{{getMoment(timeEnd)}}</p>
            <span>{{getWeek(timeEnd)}}</span>
          </div>
          <div class="endTime text text1" v-if="endTime == ''">
            <span>{{$t('message.Checkout')}}</span>
          </div>
          <i v-if="endTime != ''" class="el-icon-error clonetime" @click="time='';startTime='';endTime='';search();"></i>
        </div>

        <el-popover placement="bottom-start" width="300" trigger="manual" v-model="price.show" popper-class="s-popover">
          <div slot="reference" class="item" :class="this.price.value[0] != 0 || this.price.value[1] != 5000 ? 'redborder' :null" @click="price.show = !price.show,rating.show = false,guests.show = false,more.show = false">{{price.text === '' ? $t('message.Pricepernight') : price.text}}</div>
          <div class="popover">
             <el-slider
              v-model="price.value"
              range
              :max="5000">
            </el-slider>
            <div class="price flex-wrap">
              <div class="flex-1" style="margin-right: 10px;">
                <p>{{$t('message.Min')}}</p>
                <div class="price-text flex-wrap flex-center-between">
                  <span>PPS</span>
                  <span>{{price.value[0]}}</span>
                </div>
              </div>
              <div class="flex-1" style="margin-left: 10px;">
                 <p>{{$t('message.Max')}}</p>
                 <div class="price-text flex-wrap flex-center-between">
                  <span>PPS</span>
                  <span>{{price.value[1]}}</span>
                </div>
              </div>
            </div>
            <div class="popover-button flex-wrap flex-center-between">
              <span @click="prices(price,'hide')">{{$t('message.Clear')}}</span>
              <span class="red"  @click="prices(price)">{{$t('message.Apply')}}</span>
            </div>
          </div>
        </el-popover>

        <el-popover placement="bottom-start" width="300" trigger="manual" v-model="rating.show" popper-class="s-popover">
          <div slot="reference" class="item" :class="rating.level != 0 ? 'redborder' :null" @click="rating.show = !rating.show,price.show = false,guests.show = more.show = false">{{rating.text === '' ? $t('message.Starrating') : rating.text}}</div>
          <div class="popover">
            <ul class="level flex-wrap flex-center">
              <li class="flex-1" :class="rating.level === 1 ? 'active' : ''" @click="handlevel(1)">1</li>
              <!-- <li class="flex-1" :class="rating.level === '≤ 2' ? 'active' : ''" @click="handlevel('≤ 2')">≤ 2</li> -->
              <li class="flex-1" :class="rating.level === 2 ? 'active' : ''" @click="handlevel(2)">2</li>
              <li class="flex-1" :class="rating.level === 3 ? 'active' : ''" @click="handlevel(3)">3</li>
              <li class="flex-1" :class="rating.level === 4 ? 'active' : ''" @click="handlevel(4)">4</li>
              <li class="flex-1" :class="rating.level === 5 ? 'active' : ''" @click="handlevel(5)">5</li>
            </ul>
            <div class="popover-button flex-wrap flex-center-between">
              <span @click="ratings('','hide')">{{$t('message.Clear')}}</span>
              <span class="red" @click="ratings(rating)">{{$t('message.Apply')}}</span>
            </div>
          </div>
        </el-popover>

        <el-popover placement="bottom-start" width="300" trigger="manual" v-model="guests.show" popper-class="s-popover">
          <div slot="reference" class="item" :class="guests.adults + guests.children != 1 || guests.infants != 0 ? 'redborder' :null" @click="guests.show = !guests.show,rating.show = false,price.show = false,more.show = false">
            {{guests.adults + guests.children == 0 ? 'Guests' : guests.adults + guests.children + ' Guests' }}
          </div>
          <div class="popover">
            <ul class="rooms guests search-guests">
              <li class="flex-wrap flex-center-between">
                <span class="r-title">{{$t('message.Adults')}}</span>
                <el-input-number v-model="guests.adults" :min="1" :max="16"></el-input-number>
              </li>
              <li class="flex-wrap flex-center-between">
                <span class="r-title">
                  {{$t('message.Children')}}
                  <p>{{$t('message.Ages212')}}</p>
                </span>
                <el-input-number v-model="guests.children" :min="0" :max="16"></el-input-number>
              </li>
              <li class="flex-wrap flex-center-between">
                <span class="r-title">{{$t('message.Infants')}}
                  <p>{{$t('message.Under2')}}</p>
                </span>
                <el-input-number v-model="guests.infants" :min="0" :max="10"></el-input-number>
              </li>
            </ul>
            <div class="popover-button flex-wrap flex-center-between">
              <span @click="guestss(guests, 'hide')">{{$t('message.Clear')}}</span>
              <span class="red" @click="guestss(guests)">{{$t('message.Apply')}}</span>
            </div>
          </div>
        </el-popover>

        <el-popover placement="bottom-end" width="675" trigger="manual" v-model="more.show" popper-class="s-popover s-select">
          <div slot="reference" class="item filter" :class="this.more.home.length != 0 || this.more.beds != 0 || this.more.bedrooms != 0 || this.more.bathrooms != 0 || this.more.Amenities.length != 0 || this.more.safeAmenities.length != 0 || this.more.spaceids.length != 0 ? 'redborder' :null" @click="more.show = !more.show,guests.show = false,rating.show = false,price.show = false">{{$t('message.Morefilters')}}</div>
          <div class="popover filters">
            <div class="item flex-wrap">
              <div class="title">{{$t('message.Hometype')}}</div>
              <div class="content">
                <el-checkbox-group v-model="more.home" @change="changeTap">
                  <!-- more.home.length !== 0 ? more.home = [more.home[more.home.length - 1]] : '' -->
                <ul class="flex-wrap flex-wrap" style="width: 80%">
                  <li><el-checkbox label="0">{{$t('message.Entireplace')}}</el-checkbox></li>
                  <li><el-checkbox label="1">{{$t('message.Privateroom')}}</el-checkbox></li>
                  <li><el-checkbox label="2">{{$t('message.Shareroom')}}</el-checkbox></li>
                </ul>
                </el-checkbox-group>
              </div>
            </div>
            <!-- 暂时删除此选项 -->
            <!-- <div class="item flex-wrap">
              <div class="title">Trip type</div>
              <div class="content">
                <ul class="trip-type">
                  <el-checkbox-group v-model="more.trip" @change="more.trip.length !== 0 ? more.trip = [more.trip[more.trip.length - 1]] : ''">
                    <li>
                    <el-checkbox label="0">For families</el-checkbox>
                    <p>Explore entire homes with 5-star reviews from families<br>and essentials like a kitchen and TV</p>
                  </li>
                  <li>
                    <el-checkbox label="1">For work</el-checkbox>
                    <p>Explore top-rated homes with essentials like a workspace, wifi,<br>and self check-in</p>
                  </li>
                  </el-checkbox-group>
                </ul>
              </div>
            </div> -->
            <div class="item flex-wrap" style="margin-bottom: 8px">
              <div class="title flex-wrap flex-align-center">{{$t('message.Beds')}}</div>
              <div class="content rooms" style="padding-left: 20px;">
                <el-input-number v-model="more.beds" :min="0" :max="10"></el-input-number>
              </div>
            </div>
            <div class="item flex-wrap" style="margin-bottom: 8px">
              <div class="title flex-wrap flex-align-center">{{$t('message.Bedrooms')}}</div>
              <div class="content rooms" style="padding-left: 20px;">
                <el-input-number v-model="more.bedrooms" :min="0" :max="10"></el-input-number>
              </div>
            </div>
            <div class="item flex-wrap">
              <div class="title flex-wrap flex-align-center">{{$t('message.Bathrooms')}}</div>
              <div class="content rooms" style="padding-left: 20px;">
                <el-input-number v-model="more.bathrooms" :min="0" :max="10"></el-input-number>
              </div>
            </div>
            <div class="item flex-wrap">
              <div class="title">{{$t('message.Amenities')}}</div>
              <div class="content flex-wrap amenities">
                <ul class="flex-1">
                  <el-checkbox-group v-model="more.Amenities" style="top:200px !important;" @change="changeAment">
                    <li v-for="(item,index) in amenitiesList" :key="item.amenityId"><el-checkbox :label="item.amenityId">{{item.amenity}}</el-checkbox></li>
                    <!-- <li><el-checkbox label="1">Air conditioning</el-checkbox></li>
                    <li><el-checkbox label="2">Washer</el-checkbox></li>
                    <li><el-checkbox label="3">Dryer</el-checkbox></li>
                    <li><el-checkbox label="4">Breakfast</el-checkbox></li>
                    <li><el-checkbox label="5">Indoor fireplace</el-checkbox></li>
                    <li><el-checkbox label="6">Buzzer/wireless intercom</el-checkbox></li> -->
                  </el-checkbox-group>
                </ul>
                <!-- <ul class="flex-1">
                  <el-checkbox-group v-model="more.Amenities">
                    <li><el-checkbox label="7">Laptop friendly workspace</el-checkbox></li>
                    <li><el-checkbox label="8">Crib</el-checkbox></li>
                    <li><el-checkbox label="9">High chair</el-checkbox></li>
                    <li><el-checkbox label="10">Self check-in</el-checkbox></li>
                    <li><el-checkbox label="11">Smoke detector</el-checkbox></li>
                    <li><el-checkbox label="12">Carbon monoxide detector</el-checkbox></li>
                    <li><el-checkbox label="13">Private bathroom</el-checkbox></li>
                  </el-checkbox-group>
                </ul> -->
              </div>
            </div>
            <div class="item flex-wrap">
              <div class="title">{{$t('message.SafeAmenity')}}</div>
              <div class="content flex-wrap amenities">
                <ul class="flex-1">
                  <el-checkbox-group v-model="more.safeAmenities" style="top:200px !important;" @change="changeSafeAment">
                    <li v-for="(item,index) in safeAmenitiesList" :key="item.safeAmenityId"><el-checkbox :label="item.safeAmenityId">{{item.safeAmenity}}</el-checkbox></li>
                  </el-checkbox-group>
                </ul>
              </div>
            </div>
            <div class="item flex-wrap">
              <div class="title">{{$t('message.Spaces')}}</div>
              <div class="content flex-wrap amenities">
                <ul class="flex-1">
                  <el-checkbox-group v-model="more.spaceids" style="top:200px !important;" @change="changeSpace">
                    <li v-for="(item,index) in spaceids" :key="item.spaceId"><el-checkbox :label="item.spaceId">{{item.space}}</el-checkbox></li>
                  </el-checkbox-group>
                </ul>
              </div>
            </div>
            <div class="popover-button flex-wrap flex-center-between">
              <span @click="moreFilters(more, 'hide') ">{{$t('message.Clear')}}</span>
              <span class="red" @click="moreFilters(more)">{{$t('message.Apply')}}</span>
            </div>
          </div>
        </el-popover>
      </div>
      <div class="m-content flex-wrap" v-if="isList != true">
        <div class="left">

          <div class="listitem left"  v-for="(item, index) in HouseList" @mouseover="HouseItem(item)" @mouseout="activeLAT = 0; activeLNG = 0">
            <House-Item :key="index" :houselist="item"></House-Item>
          </div>

          <el-pagination
            background
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="pageTotal">
          </el-pagination>

        </div>

        <!--<div class="left">-->
          <!---->
            <!--<ul>-->
              <!--<li v-for="(item, index) in list" :key="index"  @click="toListing(item.placeId)">-->
                <!--<img :src="item.picture.length>0 ? item.picture[0].smallPictureUrl : ''" alt="">-->
                <!--<p class="title">{{ listName[index] }}</p>-->
                <!--<p class="text">{{ placeName ? placeName : '' }}</p>-->
                <!--<p class="number">{{ item.prices[0].bestPrice }} pps per night</p>-->
                <!--<el-rate v-model="item.review" disabled show-score-->
                <!--:colors="['#99A9BF', '#f4436C', '#FF9900']" text-color="#4A4A4A" score-template="{value}">-->
                <!--</el-rate>-->
              <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
        <div class="right flex-1" :class="AmapFixed ? 'isFixed' : null" id="Amap">
          <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap">
            <el-amap-marker v-for="(item, index) in HouseList" :key="index" :class="activeLAT == item.lat || activeLNG == item.lng ? 'activeZindex' : null"
            :position="[item.lng, item.lat]"
            :clickable="true"
            animation="AMAP_ANIMATION_DROP">
              <el-popover placement="top" width="230" trigger="click" popper-class="map-popover">
                <div slot="reference" class="amap-overlay-text-container" :class="activeLAT == item.lat || activeLNG == item.lng ? 'active' : null">
                  <div>PPS {{item.prices.length !== 0 ? item.prices[0].bestPrice : ''}} </div>
                </div>
                <div class="map" @click="toListing(item.placeId)">

                  <img :src="item.picture.length !== 0 ? item.picture[0].smallPictureUrl : ''" alt="">
                  <div class="map-info">
                    <p class="title">{{item.citycode}}</p>
                    <p class="text">{{item.cancellationPolicy ? item.cancellationPolicy.title : ''}}</p>
                    <p class="number">{{item.prices[0].bestPrice}} pps per night</p>
                    <el-rate :value="item.review" disabled show-score
                             :colors="['#99A9BF', '#f4436C', '#FF9900']" text-color="#4A4A4A" score-template="{value}">
                    </el-rate>
                  </div>
                </div>
              </el-popover>
            </el-amap-marker>
          </el-amap>
        </div>
      </div>
      <div class="m-content nodata" v-else>
        <p class="nodata-title">{{$t('message.noresult')}}</p>
        <p class="nodata-content">{{$t('message.Toseemoreresults')}}</p>
        <!-- <button class="nodata-btn" @click="clear()">Delete all filter conditions</button> -->
      </div>
    </div>
    <e-footer></e-footer>
  </div>
</template>

<script>
import header from '../common/header'
import footer from '../common/footer'
import formatdata from '../../utils/formatdata.js'
import HouseItem from '@/components/common/HouseItem';
import Cookies from 'js-cookie';
var moment = require('moment')

export default {
  components: {
    'e-header': header,
    'e-footer': footer,
    'House-Item': HouseItem,
  },
  data () {
    return {
      list: [],
      searchLoading:true,
      HouseList: [],
      listName: [],
      time: '',
      cityCode:"",
      startTextTime: [],
      endTextTime: [],
      isList: true,
      guests: {
        show: false,
        isfilter: false,
        adults: 0,
        children: 0,
        infants: 0
      },
      price: {
        show: false,
        isfilter: false,
        value: [0, 5000],
        text: ''
      },
      rating: {
        show: false,
        isfilter: false,
        level: 0,
        text: ''
      },
      more: {
        show: false,
        home: [],
        isfilter: false,
        beds: 0,
        bedrooms: 0,
        bathrooms: 0,
        Amenities: [],
        safeAmenities: [],
        spaceids: []
      },
      zoom: 8,
      center: [139.73456, 35.694135],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      amenitiesList: [],
      safeAmenitiesList: [],
      spaceids: [],
      pageNo:1,
      pageSize:9,
      pageTotal:0,
      startTime:'',
      endTime:'',
      activeLAT:"",
      activeLNG:"",
      AmapFixed:false,
    }
  },
  created () {
    if(Cookies.get('search')){
      let data = JSON.parse(Cookies.get('search'))

      if(data.time){
        if(JSON.parse(data.time)[0] != ''){
          this.timeStart = JSON.parse(data.time)[0]
          this.timeEnd = JSON.parse(data.time)[1]
          this.startTime = data.startTime
          this.endTime = data.endTime
        }
      }
      if(data.guests){
        let guests = JSON.parse(data.guests)
        this.guests.adults = guests.adults
        this.guests.children = guests.children
        this.guests.infants = guests.infants
      }

      this.cityCode = data.cityCode

    }


    // 搜索请求
    this.search()
    this.getAmenityids()
    this.getSafe_amenities()
    this.getSpaces()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll) // 滚动监听
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = document.querySelector('#Amap').offsetTop
      this.AmapFixed = scrollTop > (offsetTop - 100)
    },
    changeTap (e) {
      if (this.more.home.length !== 0) {
        this.more.home = [this.more.home[this.more.home.length - 1]]
      } else {
        this.more.home = []
      }
    },
    changeAment (e) {
      console.log(this.more.Amenities)
      if (this.more.Amenities.length !== 0) {
        this.more.Amenities = this.more.Amenities
      } else {
        this.more.Amenities = []
      }
    },
    changeSafeAment () {
      if (this.more.safeAmenities.length !== 0) {
        this.more.safeAmenities = this.more.safeAmenities
      } else {
        this.more.safeAmenities = []
      }
    },
    changeSpace () {
      if (this.more.spaceids.length !== 0) {
        this.more.spaceids = this.more.spaceids
      } else {
        this.more.spaceids = []
      }
    },
    selectTime (e) {
      this.timeStart = e[0]
      this.timeEnd = e[1]
      // this.startTextTime = String(this.timeStart).split(' ')
      // this.endTextTime = String(this.timeEnd).split(' ')
      this.startTime = formatdata.timestampToTime(Date.parse(this.timeStart))
      this.endTime = formatdata.timestampToTime(Date.parse(this.timeEnd))
      this.search()
    },
    handlevel (val) {
      this.rating.level = val
    },
    // 搜索请求
    search () {
      this.searchLoading = true

      var url = "?pageNo="+this.pageNo+"&pageSize="+this.pageSize;

      if(this.startTime != "" && this.endTime != "" && this.startTime  != 'NaN-NaN-NaN' && this.endTime  != 'NaN-NaN-NaN'){
        url = url + '&startDate=' + this.startTime + '&endDate=' + this.endTime;
      }

      if(this.cityCode != ""){
        url = url + '&cityCode=' + this.cityCode;
      }

      if(this.price.value[0] != 0 && this.price.isfilter != false || this.price.value[1] != 5000 && this.price.isfilter !== false){
        url = url + '&minPrice=' + this.price.value[0] + '&maxPrice=' + this.price.value[1];
      }

      if(this.rating.isfilter != false){
        url = url + '&placeScore=' + this.rating.level;
      }

      if(this.guests.isfilter != false){
        url = url + '&minGuestNumber=' + (this.guests.adults + this.guests.children);
      }

      if(this.more.home.length != 0){

        if(this.more.home[0] === '0' & this.more.isfilter !== false){
          url = url + '&category=' + 'Entire place';
        }else if(this.more.home[0] === '1' & this.more.isfilter !== false){
          url = url + '&category=' + 'Private Room';
        }else{
          url = url + '&category=' + 'Share room';
        }

      }

      if(this.more.beds != 0){
        url = url + '&minBedNumber=' + this.more.beds;
      }

      if(this.more.bedrooms != 0){
        url = url + '&minBedroomNumber=' + this.more.bedrooms;
      }

      if(this.more.bathrooms != 0){
        url = url + '&minBathNumber=' + this.more.bathrooms;
      }

      if(this.more.Amenities.length != 0){
        url = url + '&amenityIds=' + this.more.Amenities.join(',');
      }

      if(this.more.safeAmenities.length != 0){
        url = url + '&safeAmenityIds=' + this.more.safeAmenities.join(',');
      }

      if(this.more.spaceids.length != 0){
        url = url + '&spaceIds=' + this.more.spaceids.join(',');
      }

      this.$get(this.placeUrl + '/places'+url).then((res) => {
        this.searchLoading = false

        if (res.code === 200) {

          if (res.data.count == 0) {
            this.isList = true
          } else {
            this.isList = false
            res.data.dataList.forEach((val, key) => {
              if (val.review.length === 0) {
                val.review = 5
              } else if (val.review.length === 1) {
                val.review = val.review[0]
              } else {
                val.review = 5
              }
            })

            this.HouseList = res.data.dataList;
            this.center = [res.data.dataList[0].lng, res.data.dataList[0].lat]
            this.pageTotal = res.data.count
          }

        }
      })
    },
    // 价格弹窗确认
    prices (val, type) {
      if (type === 'hide') {
        this.price = {
          show: false,
          text: '',
          value: [0, 5000],
          isfilter: false
        }
        return false
      } else {

        if (val.value[0] != 0 && val.value[0] != 5000) {
          val.text = 'PPS ' + val.value[0] + ' - PPS ' + val.value[1]
        } else {
          val.text = ''
        }

        val.show = false
        val.isfilter = true
        this.search()
      }
    },
    // 星级
    ratings (val, type) {
      if (type === 'hide') {
        this.rating = {
          show: false,
          text: '',
          isfilter: false,
          level: 0
        }
      } else {
        val.text = val.level + ' Star'
        val.show = false
        val.isfilter = true
      }
      this.search()
    },
    // 星级
    guestss (val, type) {
      if (type === 'hide') {
        this.guests = {
          show: false,
          adults: 1,
          children: 0,
          infants: 0,
          isfilter: false
        }
      } else {
        val.show = false
        val.isfilter = true
      }
      this.search()
    },
    moreFilters (val, type) {
      if (type === 'hide') {
        this.more = {
          show: false,
          home: [],
          beds: 0,
          bedrooms: 0,
          bathrooms: 0,
          Amenities: [],
          safeAmenities: [],
          spaceids: [],
          isfilter: false
        }
      } else {
        val.show = false
        val.isfilter = true
      }
      this.search()
    },
    toListing (id) {
      this.$router.push({path: 'listing/lstHome', query: {id: id}})
    },
    getAmenityids () {
      this.$get(this.placeUrl + '/place/amenities').then((res) => {
        if (res.code === 200) {
          this.amenitiesList = res.data.dataList
        }
      })
    },
    getSafe_amenities () {
      this.$get(this.placeUrl + '/place/safe_amenities').then((res) => {
        this.safeAmenitiesList = res.data.dataList
      })
    },
    getSpaces () {
      this.$get(this.placeUrl + '/place/spaces').then((res) => {
        this.spaceids = res.data.dataList
      })
    },
    getScrollBottomHeight() {
      return this.getPageHeight() - this.getScrollTop() - this.getWindowHeight();

    },
    getPageHeight() {
      return document.querySelector("html").scrollHeight
    },
    getScrollTop() {
      var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
      return scrollTop;
    },
    getWindowHeight() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.search()
    },
    HouseItem(item){
      this.activeLAT = item.lat
      this.activeLNG = item.lng
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
    }
  }
}
</script>

<style lang="scss" scoped>
$red-color: #F4436C;
.redborder{
  border: 1px solid $red-color !important;
}
.middle {
  min-height: 500px;
  margin: 0 200px;
  // z-index: 10;
  // position: relative;
  .m-header {
    padding: 50px 0;
    .item {
      padding: 0 25px;
      height: 46px;
      line-height: 46px;
      text-align: center;
      border: 1px solid #E6E7E8;
      margin-right: 20px;
      border-radius: 4px;
      position: relative;
      font-family: Roboto-Regular;
      font-size: 16px;
      cursor: pointer;
      color: #4A4A4A;
      // z-index: 20;
      // position: relative;

      i.clonetime{
        position: absolute;
        right: 5px;
        bottom:5px;
        color: $red-color;
        font-size: 14px;
      }
      .text {
        width: 100%;
        height: 46px;
        padding-top: 8px;
        line-height: 16px;
        box-sizing: border-box;

        p {
          font-family: Roboto-Regular;
          font-size: 16px;
          color: #4a4a4a;
        }
        span {
          font-family: Roboto-Regular;
          font-size: 16px;
          color: #4A4A4A;
        }
      }
      .text1{
        justify-content: center;
        line-height: 46px;
        padding-top:0px;
      }
      &:focus {
        border-color: $red-color;
      }
    }
  }
  .nodata{
    border-top: 1px solid #eee;

    .nodata-title{
      font-size: 30px;
      margin-top: 20px;
      color: $red-color;
    }

    .nodata-content{
      padding: 5px 0 20px 0;
      max-width: 350px;
      box-sizing: border-box;
    }

    .nodata-btn{
      background: #fff;
      border: 1px solid #E6E7E8;
      text-align: center;
      color: #4A4A4A;
      padding: 0 25px;
      border-radius: 4px;
      height: 46px;
      font-size: 16px;
      line-height: 46px;
      outline: none;
      margin-bottom: 20px;
      cursor: pointer;
    }

  }
  .left {
    width: 60%;
    margin-left: -10px;

    .listitem{
      width:33.33%;
      display: inline-block;
      vertical-align: top;
      margin: 20px 0;
      .content{
        margin: 0 10px 10px;
      }

      @media only screen and (max-width: 1400px) {
        width:50%;
      }

      @media only screen and (max-width: 1200px) {
        width:33.33%;
      }

      @media only screen and (max-width: 900px) {
        width:50%;
      }

      @media only screen and (max-width: 640px) {
        width:100%;
        margin: 0 0 20px;
      }
    }

  }
  .right {
    width: 30%;
    padding-top: 20px;
    box-sizing: border-box;

  }
  .isFixed{
    position: fixed;
    right: 200px;
    top:100px;
  }
}
.popover {
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
}
.price {
  margin: 20px 0 30px 0;
  p {
    margin-bottom: 3px;
  }
  .price-text {
    height: 30px;
    line-height: 30px;
    border: 1px solid #E6E7E8;
    padding: 2px 10px;
    box-sizing: border-box;
    border-radius: 3px;
  }
}
.level {
  border: 1px solid #E6E7E8;
  margin: 30px 0;
  li {
    height: 40px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    border-right: 1px solid #E6E7E8;
    &:last-child {
      border-right: 0
    }
  }
  .active {
    background: $red-color;
    color: #fff;
    border-color: $red-color;
  }
}
.guests {
  li {
    margin-bottom: 20px;
  }
}
.filters {
  .item {
     margin-bottom: 25px;
    .title {
      font-family: Roboto-Medium;
      font-size: 16px;
      color: $red-color;
      flex: 1;
      flex-wrap: wrap;
    }
    .content {
      flex: 4;
      li{
        margin-right: 5px;
        :first-child{
          margin-right: 0;
        }
      }
      .trip-type {
        li {
          margin-bottom: 20px;
        }
        p {
          font-size: 14px;
          padding-left: 35px;
        }
      }
    }
    .amenities {
      li {
        margin-bottom: 10px;
      }
    }
  }
}
.popover-button {
  span {
    cursor: pointer;
  }
}
.red {
  color: $red-color
}
@media only screen and (max-width: 1500px) {
  .middle {
    margin: 0 100px;
  }
}
@media only screen and (max-width: 1200px) {
  .middle{
    .flex-wrap.m-content{
      display: block;
    }
  }
}
@media only screen and (max-width: 1000px) {
  .middle {

    .m-header {

      flex-wrap: wrap;
      div {
        margin-bottom: 10px;
      }
    }
  }
}
@media only screen and (max-width: 760px) {
  .middle {
    margin: 0 20px;

    .m-content {
     display: block;
     .right {
       width: 100%;
       height: 500px;
     }
   }
  }
}
@media only screen and (max-width: 500px) {
  .middle {
    .m-header {
      .select-time {
        width: 48%;
        margin: 0% 1% 1% 1%;
        box-sizing: border-box;
      }
      >span {
        width: 48%;
        margin: 0 1% 1% 1%;
        box-sizing: border-box;
        display: inline-block;
        .item {
          margin: 0;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>

<style lang="scss">
  .el-vue-amap-container,
  .el-vue-amap-container .el-vue-amap{
    min-height: 490px;
    max-height: 900px;
  }
.el-pagination{
  text-align: center;
  margin: 30px 0;
}
.select-time .el-input__inner {
  height: 46px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
}
.s-popover {
  padding: 20px 30px;
  box-sizing: border-box;
}
.search-guests .el-input__inner {
  height: 40px!important;
}
@media only screen and (max-width: 700px) {
  .s-popover {
    max-width: 100%!important;
    overflow: auto;
    max-height: 400px;
    padding: 20px 15px;
  }
  .filters {
    max-height: 300px;
    min-width: 300px;
  }
  .filters .amenities {
    display: block;
    margin-left:20px;
  }
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    min-width: 25px;
  }
}
.amap-overlay-text-container {
  border-radius: 8px;
  padding: 5px 8px;
  font-family: Roboto-Regular;
  background: #fff;
  font-size: 16px;
  color: #f4436c;
  box-shadow: 0 2px 4px 0 var(--color-map-price-marker-shadow, rgba(0,0,0,0.05)) !important;
  position: relative;

  &.active{
    background: #f4436c !important;
    color: white;
  }
}
.activeZindex{
  z-index: 9999!important;
}
.map-popover {
  padding: 0;
}
.map {
  font-size: 14px;
  cursor: pointer;
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
.s-select{
  top:200px !important;
}
.s-select .el-checkbox__label{
  max-width: 200px;
  white-space: pre-line;
}
.s-select .el-checkbox__input{
  vertical-align: top;
}
.s-select {
  overflow: auto;
  max-height: 600px;
}
.amenities {
}
</style>
