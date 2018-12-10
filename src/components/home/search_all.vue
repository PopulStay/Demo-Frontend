<template>
  <div class="search-all">
    <e-header></e-header>
    <!-- 列表  -->
    <div class="list home-list">
      <div class="">
        <el-select v-model="searchSelect" placeholder="Latest">
          <el-option
            v-for="(item,index) in SelectList"
            :key="index"
            :label="item"
            :value="item"
            class="search-all-select" :class="searchSelect == item?'selected':''">
            <span class="icon-CHECKMARK-wrap"><i class="icon iconfont icon-CHECKMARK" v-if="searchSelect == item"></i></span>
            <span class="icon-CHECKMARK-text">{{item}}</span>
          </el-option>
        </el-select>
      </div>
      <ul class="search-all-select-wrap">
        <li v-for="(item, index) in list" :key="index">
            <img :src="item.img" alt="">
            <p class="title">{{ item.title }}</p>
            <p class="text">{{ item.text }}</p>
            <p class="number">{{ item.number }}</p>
            <el-rate  v-model="item.value" disabled show-score
            :colors="['#99A9BF', '#f4436C', '#FF9900']" text-color="#4A4A4A" score-template="{value}">
            </el-rate>
        </li>
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
export default {
  name: 'search-all',
  components: {
    'e-header': header,
    'e-footer': footer
  },
  data () {
    return {
      list: [
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
      SelectList: ['Lastest', 'Price (Low)', 'Price (High)'],
      searchSelect: 'Lastest',
      isLogin: false,
      img: [banner1, banner2, banner3, banner4],
      time: '',
      startTextTime: [],
      endTextTime: [],
      visible: false
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$red-color: #F4436C;
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
      float: left;
      margin: 20px 25px 20px 0;
      width: 350px;
      font-size: 16px;
      img{
        width: 100%;
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
}
@media only screen and (max-width:780px) {
  .list {
    ul {
      li {
        width: 100%;
      }
    }
  }
}
@media only screen and (max-width:500px) {
 .banner-wrap {
    padding: 30px 0;
    height: 500px;
    .banner-content {
      width: 100%;
      padding: 40px 10px;
      box-sizing: border-box;
    }
    .banner-img {
      display: none;
    }
  }
}
</style>
<style>
.icon-CHECKMARK-wrap {
  display: inline-block;
  width: 20px;
}
.icon-CHECKMARK {
  font-size: 20px;
}
.search-all-select-wrap{
  margin-top: 50px;
}
.icon-CHECKMARK-text {
  font-family: Roboto-Regular;
  font-size: 16px;
  line-height: 24px;
}
/* .search-all-select{
  margin-top: 30px;
} */
.search-all-select.el-select-dropdown__item.selected {
  color: #fff !important;
  background: #f4436c !important;
  position: relative;
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
.home-list .el-rate__text {
  font-family: Roboto-Light;
  font-size: 12px;
  color: #4A4A4A;
  letter-spacing: 0.47px;
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
