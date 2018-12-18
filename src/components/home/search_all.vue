<template>
  <div class="search-all" @scroll="gd_add" id="search-all">
    <e-header></e-header>
    <!-- 列表  -->
    <div class="list home-list">
      <!--<div class="">-->
        <!--<el-select v-model="searchSelect" placeholder="Latest">-->
          <!--<el-option-->
            <!--v-for="(item,index) in SelectList"-->
            <!--:key="index"-->
            <!--:label="item"-->
            <!--:value="item"-->
            <!--class="search-all-select" :class="searchSelect == item?'selected':''">-->
            <!--<span class="icon-CHECKMARK-wrap"><i class="icon iconfont icon-CHECKMARK" v-if="searchSelect == item"></i></span>-->
            <!--<span class="icon-CHECKMARK-text">{{item}}</span>-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</div>-->
      <div class="listitem"  v-for="(item, index) in HouseList">
        <House-Item :key="index" :houselist="item"></House-Item>
      </div>
      <li class="loading" v-if="loading">加载中<i class="el-icon-loading"></i></li>
    </div>
    <e-footer></e-footer>
  </div>
</template>

<script>
import header from '../common/header'
import footer from '../common/footer'
import HouseItem from '@/components/common/HouseItem';
export default {
  name: 'search-all',
  components: {
    'e-header': header,
    'e-footer': footer,
    'House-Item': HouseItem,
  },
  data () {
    return {
      HouseList: [],
      SelectList: ['Lastest', 'Price (Low)', 'Price (High)'],
      searchSelect: 'Lastest',
      visible: false,
      Page:2,
      nowPage:1,
      loading:false
    }
  },
  created () {
    this.gd_add()
  },
  methods: {
    gd_add(){
      if (this.getScrollBottomHeight() == 0 && this.nowPage < this.Page && this.loading == false) {
        console.log(123)
        this.loading = true
        this.$get(this.placeUrl + '/places', {
          pageNo: this.nowPage,
          pageSize: 12
        }).then((res) => {
          if (res.code === 200) {
            this.Page = res.data.count/12
            for(var item in res.data.dataList){
              this.HouseList.push(res.data.dataList[item])
            }
            this.nowPage++;
            this.loading = false;
          }
        })
      }
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
    }
  },
  mounted () {
    window.addEventListener('scroll', this.gd_add)
    this.gd_add()
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

  .el-select{
    margin-left: 15px;
  }

  .listitem{
    width:25%;
    display: inline-block;
    vertical-align: top;
    margin: 20px 0;
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

  }
}

.loading{
  text-align: center;
}
</style>
