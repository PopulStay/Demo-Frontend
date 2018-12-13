<template>
  <div class="content">
    <e-header></e-header>
    <!-- 轮播  -->
    <div class="banner-wrap">
      <div class="banner-img">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in img" :key="item">
           <img :src="item" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="banner-content">
        <div class="destination">
          <el-popover placement="bottom" width="420" trigger="manual"  v-model="searchListShow" popper-class="inpput_keyList">
            <ul>
              <li class="flex-wrap flex-align-center" v-for="(item, index) in searchList" :key="index" @click="selectSeach(item)">
                <i class="icon iconfont icon-location3dingwei3"></i>
                <span>{{item.fullAddress}}</span>
              </li>
              <li v-show="!searchList.length"><span>There is no data</span></li>
              <!-- <li class="flex-wrap flex-align-center"><i class="icon iconfont icon-185038homehousestreamline"></i><span>Homes in Tokyo, Japan</span></li>
              <li class="flex-wrap flex-align-center"><i class="icon iconfont icon-location3dingwei3"></i><span>Tokyo Station, Tokyo</span></li>
              <li class="flex-wrap flex-align-center"><i class="icon iconfont icon-location3dingwei3"></i><span>TokyoShinjuku-ku</span></li> -->
            </ul>
             <input slot="reference" type="text" @input="input" v-model="searchValue" placeholder="Enter a destination or keyword">
          </el-popover>
        </div>
        <div class="select-time flex-wrap">
          <div class="select-time-start flex-1">
            <p>Check-in</p>
             <el-date-picker v-model="timeStart" type="daterange" range-separator="" @change="selectTime" :picker-options="pickerOptions">
            </el-date-picker>
            <div class="startTime text">
              <p>{{startTextTime[2]}} {{startTextTime[1]}} {{startTextTime[3]}} </p>
              <span> {{startTextTime[0]}}</span>
            </div>
          </div>
          <div class="select-time-end flex-1">
            <p>Check-out</p>
            <el-date-picker v-model="timeEnd" type="daterange" range-separator="" @change="selectTime" :picker-options="pickerOptions"></el-date-picker>
            <div class="endTime text">
              <p>{{endTextTime[2]}} {{endTextTime[1]}} {{endTextTime[3]}}</p>
              <span>{{endTextTime[0]}}</span>
            </div>
          </div>
        </div>
        <div class="guests">
          <p>Guests</p>
           <el-popover placement="bottom" width="350"  v-model="visible" popper-class="c_guests">
              <div class="select flex-wrap flex-center-between" slot="reference" @click="visible = !visible">
                <span>{{guests.adults + guests.children}} guests {{guests.infants >=1 ? "," + guests.infants + "infants":''}}</span>
                <i class="icon iconfont" :class="visible ? 'icon-arrow-up' : 'icon-54'"></i>
              </div>
              <div class="popover">
                <ul class="rooms">
                  <li class="flex-wrap flex-center-between">
                    <span class="r-title">Adults</span>
                    <el-input-number v-model="guests.adults" :min="0" :max="10"></el-input-number>
                  </li>
                  <li class="flex-wrap flex-center-between">
                    <span class="r-title">
                      Children
                      <p>Ages 2-12</p>
                    </span>
                    <el-input-number v-model="guests.children" :min="0" :max="10"></el-input-number>
                  </li>
                  <li class="flex-wrap flex-center-between">
                    <span class="r-title">Infants
                      <p>Under 2</p>
                    </span>
                    <el-input-number v-model="guests.infants" :min="0" :max="10"></el-input-number>
                  </li>
                </ul>
                <div class="bottom flex-wrap flex-center-between">
                  <span></span>
                  <span class="red" @click="visible = false">Close</span>
                </div>
              </div>
            </el-popover>
        </div>
        <div class="button" @click="toSearch">Search</div>
      </div>
    </div>
    <!-- 列表  -->
    <div class="list home-list">
      <h3>Recommended for you</h3>
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="toListing(item.placeId)">
            <img :src="item.picture.length>0 ? item.picture[0].smallPictureUrl : ''" alt="">
            <p class="title">{{ listName[index] }}</p>
            <p class="text">{{ placeName[index] ? placeName[index] : '' }}</p>
            <!-- <p class="number">{{ item.prices.length !== 0 ? item.prices[0].smallPictureUrl : '' }} pps per night</p> -->
            <p class="number">{{ item.prices[0].bestPrice }} pps per night</p>
            <el-rate v-model="item.review" disabled show-score
            :colors="['#99A9BF', '#f4436C', '#FF9900']" text-color="#4A4A4A" score-template="{value}">
            </el-rate>
        </li>
      </ul>
      <p class="more" @click="toSearchAll">Show all &nbsp;<i class="el-icon-arrow-right"></i></p>
    </div>
    <!-- 国家  -->
    <div class="state-list">
      <h3>Lorem ipsum dolor sit amet</h3>
      <ul class="flex-wrap">
        <li class="japan"></li>
        <li class="united-states"></li>
        <li class="china"></li>
        <li class="united-kingdom"></li>
        <li class="france"></li>
        <li class="singapore"></li>
      </ul>
    </div>
    <e-footer></e-footer>
  </div>
</template>

<script>
import banner1 from '../../assets/images/index/banner-1.png'
import banner2 from '../../assets/images/index/banner-2.png'
import banner3 from '../../assets/images/index/banner-3.png'
import banner4 from '../../assets/images/index/banner-4.png'

import list1 from '../../assets/images/index/list-1.jpg'
import list2 from '../../assets/images/index/list-2.png'
import list3 from '../../assets/images/index/list-3.png'
import list4 from '../../assets/images/index/list-4.png'
import list5 from '../../assets/images/index/list-5.png'
import list6 from '../../assets/images/index/list-6.png'
import list7 from '../../assets/images/index/list-7.png'
import list8 from '../../assets/images/index/list-8.png'
import list9 from '../../assets/images/index/list-9.png'
import list10 from '../../assets/images/index/list-10.png'
import list11 from '../../assets/images/index/list-11.png'
import list12 from '../../assets/images/index/list-12.png'

import header from '../common/header'
import footer from '../common/footer'
import formatdata from '../../utils/formatdata.js'
export default {
  name: 'home',
  components: {
    'e-header': header,
    'e-footer': footer
  },
  data () {
    return {
      list: '',
      listName: [],
      placeName: [],
      viewCount: [],
      list1: [
        { img: list1, title: 'TOKYO,JAPAN', text: 'Lorem ipsum dolor sit amet', number: '527pps per night', value: 3.7 },
        { img: list2, title: 'TOKYO,JAPAN', text: 'Lorem ipsum dolor sit amet', number: '527pps per night', value: 3.7 },
        { img: list3, title: 'TOKYO,JAPAN', text: 'Lorem ipsum dolor sit amet', number: '527pps per night', value: 3.7 },
        { img: list4, title: 'TOKYO,JAPAN', text: 'Lorem ipsum dolor sit amet', number: '527pps per night', value: 3.7 },
        { img: list5, title: 'TOKYO,JAPAN', text: 'Lorem ipsum dolor sit amet', number: '527pps per night', value: 3.7 },
        { img: list6, title: 'TOKYO,JAPAN', text: 'Lorem ipsum dolor sit amet', number: '527pps per night', value: 3.7 },
        { img: list7, title: 'TOKYO,JAPAN', text: 'Lorem ipsum dolor sit amet', number: '527pps per night', value: 3.7 },
        { img: list8, title: 'TOKYO,JAPAN', text: 'Lorem ipsum dolor sit amet', number: '527pps per night', value: 3.7 },
        { img: list9, title: 'TOKYO,JAPAN', text: 'Lorem ipsum dolor sit amet', number: '527pps per night', value: 3.7 },
        { img: list10, title: 'TOKYO,JAPAN', text: 'Lorem ipsum dolor sit amet', number: '527pps per night', value: 3.7 },
        { img: list11, title: 'TOKYO,JAPAN', text: 'Lorem ipsum dolor sit amet', number: '527pps per night', value: 3.7 },
        { img: list12, title: 'TOKYO,JAPAN', text: 'Lorem ipsum dolor sit amet', number: '527pps per night', value: 3.7 }
      ],
      isLogin: false,
      searchListShow: false,
      searchValue: '',
      img: [banner1, banner2, banner3, banner4],
      timeStart: '',
      timeEnd: '',
      // startTime: '',
      // endTime: '',
      startTextTime: [],
      endTextTime: [],
      startTimestamp: '',
      endTimestamp: '',
      guests: {
        adults: 0,
        children: 0,
        infants: 0
      },
      visible: false,
      searchList: [],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  created () {
    document.execCommand('BackgroundImageCache', false, true)
    let date = new Date().getTime()
    this.timeStart = new Date()
    this.timeEnd = new Date(date + (1000 * 60 * 60 * 24))
    this.startTextTime = String(this.timeStart).split(' ')
    this.endTextTime = String(this.timeEnd).split(' ')
    // this.search()
    // console.log(typeof Date(this.startTextTime.join(' ')))
    // this.formatStart = formatdata.formatDate(this.startTime)
    // this.formatEnd = formatdata.formatDate(this.endTime)
    // console.log(Date.parse(this.timeStart))
    this.startTimestamp = Date.parse(this.timeStart)
    this.endTimestamp = Date.parse(this.timeEnd)
    this.getHomeSearch()
  },
  methods: {
    selectTime (e) {
      console.log(e)
      this.timeStart = e[0]
      this.timeEnd = e[1]
      this.startTextTime = String(this.timeStart).split(' ')
      this.endTextTime = String(this.timeEnd).split(' ')
      this.startTimestamp = Date.parse(this.timeStart)
      this.endTimestamp = Date.parse(this.timeEnd)
      console.log(this.startTimestamp, this.endTimestamp)
    },
    toSearch () {
      this.$router.push({path: 'search',
        query: {
          time: JSON.stringify([this.startTextTime, this.endTextTime]),
          guests: JSON.stringify(this.guests),
          startTime: formatdata.timestampToTime(this.startTimestamp),
          endTime: formatdata.timestampToTime(this.endTimestamp),
          cityCode: this.searchValue
        }
      })
    },
    toSearchAll () {
      this.$router.push({path: 'searchAll'})
    },
    toListing (placeId) {
      this.$router.push({path: 'listing/lstHome', query: {id: placeId}})
    },
    // 搜索请求
    getHomeSearch () {
      let that = this
      this.$get(this.placeUrl + '/places', {
        pageNo: 7,
        pageSize: 12
      }).then((res) => {
        if (res.code === 200) {
          res.data.dataList.forEach((val, key) => {
            if (val.review.length === 0) {
              val.review = 5
            } else if (val.review.length === 1) {
              val.review = val.review[0]
            } else {
              val.review = 5
            }
            var citycode = val.citycode
            that.getName(citycode)
            this.translation(val.placeName)
          })
          this.list = res.data.dataList

        }
      })
    },
    getName (val) {
      let listName = this.listName
      // viewCount = this.viewCount
      this.$get(this.cityUrl + '/city', {
        code: val
      }).then((res) => {
        if (res.code === 200) {
          // console.log('rrrrrrr')
          listName.push(res.data.fullAddress)
          // if(res.data.viewCount!=''){
          //   var count = 5
          // }
          // viewCount.push(count)
          this.listName = listName
          // this.viewCount = viewCount
        }
      })
    },
    // 输入框输入事件
    input (val) {
      this.searchValue === '' ? this.searchListShow = false : this.searchListShow = true
      this.$get(this.cityUrl + '/cities?filterKey=text&pageSize=5&filterValue=' + this.searchValue).then(res => {
        if (res.code === 200) {
          this.searchList = res.data.dataList
        }
      })
    },
    // 点击搜索出来的列表
    selectSeach (val) {
      this.searchValue = val.fullAddress
      this.searchListShow = false
    },
    translation(obj){
      let placeName = this.placeName;
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
        placeName.push(json.translation[0])
        this.placeName = placeName
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$red-color: #F4436C;
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
.banner-content {
  width: 420px;
  background: #fff;
  position: absolute;
  right: 175px;
  top: 50%;
  transform: translateY(-50%);
  padding: 40px;
  z-index: 100;
  font-family: Roboto-Regular;
  .destination {
    input {
      width: 100%;
      height: 60px;
      box-sizing: border-box;
      padding: 0 20px;
      border-radius: 3px;
      border: 1px solid #e6e7e8;
      font-size: 16px;
      color: #4a4a4a;
    }
  }
  .select-time {
    margin: 30px 0;
    font-size: 16px;
    color: #4A4A4A;
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
  .button {
    width: 100%;
    height: 60px;
    background: $red-color;
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 3px;
    cursor: pointer;
    margin-top: 30px;
    border-radius: 4px
  }
}

.list {
  width: 1500px;
  margin: 0 auto;
  padding: 30px 0;
  overflow: hidden;
  h3 {
    margin: 30px 0;
    font-family: Roboto-Medium;
    font-size: 28px;
    color: #4A4A4A;
    letter-spacing: 0.88px;
    font-weight: 300;
    text-align: left;
  }
  ul {
    overflow: hidden;
    li {
      display: inline-block;
      vertical-align: top;
      margin: 20px 25px 20px 0;
      width: 350px;
      font-size: 16px;
      cursor: pointer;
      img{
        width: 100%;
        height: 260px;
        border-radius: 3px;
      }
      .title {
        color: $red-color;
        margin-top: 5px;
        letter-spacing: 0.62px;
        font-family: Roboto-Medium;
        text-align: left;
      }
      .text {
        font-size: 18px;
        color: #000000;
        letter-spacing: 0.62px;
        font-family: Roboto-Medium;
        text-align: left;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .number {
        font-family: Roboto-Light;
        font-size: 16px;
        color: #4a4a4a;
        margin-top: 8px;
        margin-bottom: 3px;
        letter-spacing: 0.62px;
        text-align: left;
      }
    }
  }
  .more {
    color: $red-color;
    padding: 20px 0;
    cursor: pointer;
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #F4436C;
    letter-spacing: 0.5px;
  }
}

.state-list {
  width: 1500px;
  margin: 0 auto;
  margin-bottom: 80px;
  h3 {
    margin: 30px 0;
    font-family: Roboto-Medium;
    font-size: 28px;
    color: #4A4A4A;
    letter-spacing: 0.88px;
    font-weight: 300
  }
  ul {
    height: 260px;
    margin-top: 50px;
    li {
      min-width: 214px;
      height: 260px;
      background: #fff;
      margin-right: 40px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
    }
    .japan {
      background-image: url(../../assets/images/index/grey/japan-grey.svg);
      &:hover {
        background-image: url(../../assets/images/index/pink/japan-pink.svg);
      }
    }
    .united-states {
      background-image: url(../../assets/images/index/grey/united-states-grey.svg);
      &:hover {
        background-image: url(../../assets/images/index/pink/united-states-pink.svg);
      }
    }
    .china {
      background-image: url(../../assets/images/index/grey/china-grey.svg);
      &:hover {
        background-image: url(../../assets/images/index/pink/china-pink.svg);
      }
    }
    .united-kingdom {
      background-image: url(../../assets/images/index/grey/united-kingdom-grey.svg);
      &:hover {
        background-image: url(../../assets/images/index/pink/united-kingdom-pink.svg);
      }
    }
    .france {
      background-image: url(../../assets/images/index/grey/france-grey.svg);
      &:hover {
        background-image: url(../../assets/images/index/pink/france-pink.svg);
      }
    }
    .singapore {
      background-image: url(../../assets/images/index/grey/singapore-grey.svg);
      &:hover {
        background-image: url(../../assets/images/index/pink/singapore-pink.svg);
      }
    }
  }
}

.popover {
  li {
    margin-bottom: 15px;
  }
  .red {
    color: $red-color;
    cursor: pointer;
  }
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
    padding: 0;
    height: 450px;
    .banner-content {
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;
      .select-time-start {
        margin-right: 0;
      }
      .select-time {
        margin: 15px 0;
        .text {
          padding: 0 15px;
        }
      }
    }
    .banner-img {
      display: none;
    }
  }
}
</style>
<style>
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
.guests .el-input__inner {
  height: 60px;
}
.guests .el-select, .banner-content .el-date-editor.el-input {
  width: 100%;
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
@media only screen and (max-width:500px) {
  .c_guests {
    width: 270px!important;
  }
}
</style>
