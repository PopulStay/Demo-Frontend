<template>
  <div class="invite">
    <p class="top-h2">Invite</p>
    <div class="invite-info flex-wrap flex-content-between">
      <div class="info-wrap">
        <p class="invite-title">Invite friends, get 100 PPS</p>
        <div class="flex-wrap flex-content-between">
          <div class="invite-num">
            <p class="invite-p-top">invited</p>
            <p class="invite-p-down">{{num}}</p>
          </div>
          <div class="invite-num mgr30">
            <p class="invite-p-top">Total PPS</p>
            <p class="invite-p-down">{{total}} PPS</p>
          </div>
        </div>
      </div>
      <div class="invite-wrap-img">
        <img src="../../assets/images/trips/showqrcode.png" class="invite-img">
        <button>Copy and share</button>
      </div>
    </div>
    <p class="top-h2">history</p>
    <div class="date-info">
      <div class="date-info-wrap">
        <p class="date-p-title">{{add}}</p>
        <p class="date-p-content">{{date}}</p>
      </div>
      <div class="date-info-wrap">
        <p class="date-p-title">{{add}}</p>
        <p class="date-p-content">{{date}}</p>
      </div>
      <div class="date-info-wrap">
        <p class="date-p-title">{{add}}</p>
        <p class="date-p-content">{{date}}</p>
      </div>
      <div class="date-info-wrap">
        <p class="date-p-title">{{add}}</p>
        <p class="date-p-content">{{date}}</p>
      </div>
      <div class="date-info-wrap">
        <p class="date-p-title">{{add}}</p>
        <p class="date-p-content">{{date}}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import list1 from '../../assets/images/index/list-1.jpg'
export default {
  data () {
    return {
      num: 10,
      total: 1000,
      add: 'Lorem ipsum',
      date: '22 set 2018'
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
$red-color: #F4436C;
.invite{
  font-family: Roboto-Regular;
  border: 1px solid #E6E7E8;
  font-size: 16px;
  color: #4a4a4a;
  .top-h2{
    padding: 10px 20px;
    letter-spacing: 1px;
    border-bottom: 1px solid #e6e7e6;
    background: #f8f8f8;
  }
  .invite-info{
    padding: 30px;
    border-bottom: 1px solid #E6E7E8;
    .invite-title{
      font-family: Roboto-Medium;
      font-size: 28px;
      color: #4A4A4A;
      letter-spacing: 1.75px;
      margin-bottom: 45px;
    }
    .invite-num{
      display: inline-block;
      .invite-p-top{
        color: #4A4A4A;
        letter-spacing: 1px;
      }
      .invite-p-down{
        font-family: Roboto-Medium;
        font-size: 24px;
        color: #F4436C;
        letter-spacing: 1.5px;
      }
    }
    .invite-wrap-img{
      width: 116px;
      img{
        width: 100%;
        max-height: 116px;
      }
      button{
        margin-top: 15px;
        outline: none;
        cursor: pointer;
        font-family: Roboto-Medium;
        font-size: 13px;
        color: #FFFFFF;
        letter-spacing: 0.81px;
        text-align: center;
        line-height: 30px;
        border: none;
        height: 30px;
        background: #F4436C;
        text-align: center;
        width: 100%;
      }
    }
  }
  .date-info{
    margin: 0 30px;
    padding: 30px 0px;
    .date-info-wrap{
      margin-top: 20px;
      border-bottom: 1px solid #E6E7E8;
        .date-p-title{
        color: #4A4A4A;
        letter-spacing: 1px;
        margin-bottom: 10px;
      }
      .date-p-content{
        color: #E6E7E8;
        margin-bottom: 10px;
      }
    }
    .date-info-wrap:first-child{
      margin-top:0;
    }
    .date-info-wrap:last-child{
      border-bottom:none;
    }
  }
}
.mgl30{
  margin-left: 30px;
}
.mgr30{
  margin-right: 30px;
}
</style>
