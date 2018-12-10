<template>
  <div>
    <ul class="tabList flex-wrap flex-wrap-wrap">
        <li v-for="(item, index) in tripsTabList" :key="index" :class="tripsTabTitle == item ? 'active' : ''" @click="tripsTabClick(item, index)">{{item}}</li>
    </ul>
    <ul class="dataList">
      <li  v-for="(item, index) in dataList" :key="index" v-if="item.title === tripsTabTitle">
        <div class="list-header flex-wrap-wrap flex-wrap flex-content-between">
          <p class="title">{{item.title}}</p>
          <p class="time">Booked on 25 October, 2018</p>
        </div>
        <div class="list-content flex-wrap flex-wrap-wrap">
          <div class="list-img">
            <img :src="item.img" alt="">
          </div>
          <div class="list-text">
            <div>
              <p class="title">{{item.title1}}</p>
              <p class="title">{{item.title2}}</p>
              <p class="id">Booking ID: {{item.id}}</p>
            </div>
            <div class="bottom flex-wrap flex-content-between">
              <span class="time">{{item.time}}</span>
              <span class="num">{{item.num}} PPS</span>
            </div>
          </div>
          <div class="list-operation flex-wrap" :class="item.state == 3 || item.state == 4 ? 'flex-column-center flex-wrap' : ''">
            <div>
              <p class="details"><router-link :to="{path:'/trips/guests_details',query: {title:item.title}}">View details</router-link></p>
              <p class="cancel" v-if="item.title === 'Upcoming'">Cancel</p>
            </div>
            <div class="checkout" v-if="item.title === 'Upcoming'">Confirm</div>
          </div>
        </div>
      </li>
    </ul>
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
        <img src="../../assets/images/trips/Asset.svg" alt="">
      </div>
      <div class="button" @click="cancelShow = false">Cancel</div>
    </el-dialog>
  </div>
</template>

<script>
import completed from '../../assets/images/trips/completed.png'
import upcoming from '../../assets/images/trips/upcoming.png'

export default {
  data () {
    return {
      tripsTabTitle: 'Upcoming',
      tripsTabList: ['Upcoming', 'Completed'],
      dataList: [
        {title: 'Upcoming', img: upcoming, title1: 'Lorem ipsum dolor sit amet', title2: 'consectetur adipiscing elit', id: '114693321', time: '23 Sep 2018 - 25 Sep 2018  2 nights', num: '552', state: 1},
        {title: 'Upcoming', img: upcoming, title1: 'Lorem ipsum dolor sit amet', title2: 'consectetur adipiscing elit', id: '114693321', time: '23 Sep 2018 - 25 Sep 2018  2 nights', num: '552', state: 1},
        {title: 'Completed', img: completed, title1: 'Lorem ipsum dolor sit amet', title2: 'consectetur adipiscing elit', id: '114693321', time: '23 Sep 2018 - 25 Sep 2018  2 nights', num: '552', state: 3},
        {title: 'Completed', img: completed, title1: 'Lorem ipsum dolor sit amet', title2: 'consectetur adipiscing elit', id: '114693321', time: '23 Sep 2018 - 25 Sep 2018  2 nights', num: '552', state: 3}
      ],
      list: [],
      checkoutShow: false,
      cancelShow: false
    }
  },
  created () {
    this.list = this.dataList
    let title = this.$route.query.title
    if (title) this.tripsTabTitle = title
    else this.tripsTabTitle = 'Upcoming'
  },
  methods: {
    tripsTabClick (value, index) {
      this.tripsTabTitle = value
      // let list = this.dataList.filter((item) => item.title === value)
      // list.length ? this.list = list : this.list = this.dataList
    },
    next () {
      this.checkoutShow = false
      this.cancelShow = true
    }
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
    min-height: 300px;
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
    img {
      width: 250px;
      height: 100%;
      min-height: 200px;
    }
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
@media only screen  and (max-width: 1100px) {
  .dataList {
    li {
      .list-content {
        display: block;
        border: none;
        .list-img {
          img {
            width: 100%;
          }
        }
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
<style>
.checkoutWrap .el-dialog__body {
  padding: 30px 40px;
}
</style>
