<template>
  <div class="Live_Chat_Win">
    <div class="title">
      <span>wangyan</span>
      <span>
        <i class="iconfont icon-video"></i>
        <i class="iconfont icon-custom-phone"></i>
        <i class="iconfont icon-LC_icon_setting_line"></i>
        <i class="iconfont icon-aui-icon-close"></i>
      </span>
    </div>

    <div class="content" v-show="winshow">
      <ul class="guest">
        <li>
          <div class="img" :style="{backgroundImage:(img ? 'url(' + img +')' :'url('+img+')')}"></div>
          <p>Hello</p>
        </li>
      </ul>

      <ul class="host">
        <li>
          <p>Hello</p>
          <div class="img" :style="{backgroundImage:(img ? 'url(' + img +')' :'url('+img+')')}"></div>
        </li>
      </ul>

      <div class="botton" v-show="winshow">
        <input type="text" placeholder="Type a message…">
        <div>
          <span>
            <i class="iconfont icon-tupian1"></i>
            <i class="iconfont icon-emoji"></i>
            <i class="iconfont icon-attachment"></i>
          </span>
          <span>
            <i class="iconfont icon-send1"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        winshow:true,
        img:"https://media.licdn.com/dms/image/C5103AQE3kKwomhMDSg/profile-displayphoto-shrink_200_200/0?e=1548288000&v=beta&t=OetmBAW99xkc0QmCjzYJMu8XicRP-DZ4uRCWLWutQYY"
      }
    },
    created(){

    }
  }
</script>

<style scoped lang="scss">
  .Live_Chat_Win {
    width: 280px;
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.35);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    overflow: hidden;
    margin-right: 20px;
    float: right;
    display: inline-block;
    .title{
      background: #1C1E4D;
      color: white;
      display: flex;
      justify-content: space-between;
      padding: 10px;
      span{
        i{
          margin: 0 5px;
          cursor: pointer;
        }
      }

    }
    .content{
      ul{
        li{
          margin: 20px 10px;
          div.img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-size: cover;
            display: inline-block;
            display:tabel-cell;
            vertical-align:middle;
          }
          p{
            display: inline-block;
            background: #E6E7E8;
            border-radius: 14px;
            padding: 5px;
            margin:0 10px;
          }
        }
        &.host{
          text-align: right;
        }
      }
    }

    .botton {
      border-top: 1px solid #E6E7E8;
      padding-top: 10px ;
      margin: 10px;
      input {
        border: none;
        font-family: Roboto-Regular;
        font-size: 14px;
        color: #4a4a4a;
        letter-spacing: 0;
        padding: 0;
      }

      div {
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        span {
          i {
            margin: 0 3px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>

