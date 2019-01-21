<template>
  <div>
      <div class="Live_Chat" :class="!Live_ChatShow ? 'active' : null">

        <p class="close" v-show="Live_ChatShow"><i class="el-icon-arrow-down" @click="Live_ChatShow = false"></i></p>

        <p class="Live_Chat_xs" v-show="!Live_ChatShow"  @click="Live_ChatShow = true"><i></i>Chat</p>

          <ul class="Live_ChatList" v-show="Live_ChatShow">
            <li v-for="item in Live_ChatList">
              <div :style="{backgroundImage:(item.imgurl ? 'url(' + item.imgurl +')' :'url('+item.imgurl+')')}"></div>
              <p>{{item.name}}</p>
              <i></i>
            </li>
`        </ul>

      </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        Live_ChatList:[
          {name:'wangyan',imgurl:"https://media.licdn.com/dms/image/C5103AQE3kKwomhMDSg/profile-displayphoto-shrink_200_200/0?e=1548288000&v=beta&t=OetmBAW99xkc0QmCjzYJMu8XicRP-DZ4uRCWLWutQYY"},
        ],
        Live_ChatShow:true
      }
    },
    created(){

    }
  }
</script>

<style scoped lang="scss">
.Live_Chat{
  position: fixed;
  right: 0px;
  bottom: 0px;
  width: 300px;
  height: 100%;
  background: rgba(28,30,77,0.95);
  z-index: 999999999;
  &.active{
    height: auto;
  }

  p.close{
    i{
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
    margin: 30px 20px;
  }

  ul.Live_ChatList{
    li{
      diaplay:tabel;
      margin: 20px;
      position: relative;
      cursor: pointer;

      div{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-size: cover;
        display: inline-block;
        display:tabel-cell;
        vertical-align:middle;
      }
      p {
        color: white;
        display: inline-block;
        display: tabel-cell;
        vertical-align: middle;
        margin-left: 15px;
      }

      &:after{
        position: absolute;
        content: "";
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #7ED321;
        top: 50%;
        right: 20px;
        transform: translateX(-50%);
      }
    }
  }
}
.Live_Chat_xs{
    color: white;
    padding: 15px 20px;
    diaplay:tabel;
    cursor: pointer;
    i{
      display:tabel-cell;
      vertical-align:middle;
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #7ED321;
      margin-right: 10px;
    }
}
</style>
