<template>
  <div>
    <ul class="tabList flex-wrap">
      <li v-for="(item, index) in hostsTabList" :key="index" :class="hostsTabTitle == item ? 'active' : ''" @click="tripsTabClick(item, index)">{{item}}</li>
    </ul>
    <ul class="list">
        <li v-for="(item, index) in dataList" :key="index" v-if="hostsTabTitle == 'Published' ? index < 8 : index > 8">
            <div class="imgWrap">
              <img :src="item.img" alt="">
              <div class="hover">
                <el-popover placement="bottom-end" width="70" trigger="hover" popper-class="hosts">
                  <ul class="popover-content">
                    <li class="red">Edit</li>
                    <li v-if="hostsTabTitle == 'Published'">Unpublish</li>
                    <li v-else>Delete</li>
                  </ul>
                  <div slot="reference" class="modification">
                    <i class="icon iconfont icon-xiugai"></i>
                  </div>
                </el-popover>
              </div>
            </div>
            <p class="text">{{ item.text }}</p>
            <p class="number">{{ item.number }}</p>
        </li>
      </ul>
  </div>
</template>

<script>
import list1 from '../../../assets/images/index/list-1.jpg'
import list2 from '../../../assets/images/index/list-2.png'
import list3 from '../../../assets/images/index/list-3.png'
import list4 from '../../../assets/images/index/list-4.png'
import list5 from '../../../assets/images/index/list-5.png'
import list6 from '../../../assets/images/index/list-6.png'
import list7 from '../../../assets/images/index/list-7.png'
import list8 from '../../../assets/images/index/list-8.png'
import list9 from '../../../assets/images/index/list-9.png'
import list10 from '../../../assets/images/index/list-10.png'
import list11 from '../../../assets/images/index/list-11.png'
import list12 from '../../../assets/images/index/list-12.png'

export default {
  data () {
    return {
      hostsTabList: ['Published', 'Drafts'],
      hostsTabTitle: 'Published',
      dataList: [
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
      ]
    }
  },
  created () {
    this.list = this.dataList
    let title = this.$route.query.title
    if (title) this.hostsTabTitle = title
    else this.hostsTabTitle = 'Published'
  },
  methods: {
    tripsTabClick (value, index) {
      this.hostsTabTitle = value
      let list = this.dataList.filter((item) => item.title === value)
      list.length ? this.list = list : this.list = this.dataList
    }
  }
}
</script>

<style scoped lang="scss">
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
.list {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  li {
    margin: 20px 25px 20px 0;
    width: 260px;
    height: 200px;
    font-size: 16px;
    height: 350px;
    .imgWrap {
      position: relative;
      img{
        width: 100%;
        border-radius: 3px;
      }
      &:hover {
        .hover {
          display: block
        }
      }
      .hover {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.35);
        border-radius: 3px;
        .modification {
          position: absolute;
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background: #FFFFFF;
          border-radius: 3px;
          right: 10px;
          top: 10px;
          .icon-xiugai {
            color: $red-color;
            font-size: 24px;
          }
        }
      }
    }
    .text {
      font-size: 18px;
      color: #000000;
      letter-spacing: 0.62px;
      font-family: Roboto-Medium;
      text-align: left;
      margin-top: 10px;
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
.popover-content {
  li {
    font-family: Roboto-Regular;
    font-size: 16px;
    line-height: 16px;
    cursor: pointer;
  }
  .red {
    color: $red-color;
    margin-bottom: 15px;
  }
}
@media only screen  and (max-width: 900px) {
  .list {
    li {
      width: 100%;
      height: auto;
      margin: 20px 0;
    }
  }
}
</style>

<style>
.hosts {
  padding: 20px;
}
</style>
