<template>
  <div v-if="$store.state.userInfo">
      <div class="Live_Chat" :class="!Live_ChatShow ? 'active' : null">

        <p class="close" v-show="Live_ChatShow"><i class="el-icon-arrow-down" @click="Live_ChatShow = false"></i></p>

        <p class="Live_Chat_xs" v-show="!Live_ChatShow"  @click="Live_ChatShow = true;getLive_ChatList()"><i></i>Chat</p>

          <ul class="Live_ChatList" v-show="Live_ChatShow">
            <li v-for="item in Live_ChatList" @click="Live_Chat_userid(item);">
              <div :style="{backgroundImage:(item.image_url ? 'url(' + item.image_url +')' :'url('+item.image_url+')')}"></div>
              <p>{{item.first_name}}{{item.last_name}}</p>
              <i></i>
            </li>
            <p class="NoList" v-if="Live_ChatList.length == 0">No list</p>
`        </ul>
      </div>

    <div class="Live_Chat_Win" v-if="$store.state.Live_Chat_userid.user_id != ''" ref='Live_Chat_Win' >
      <div class="title" @mousedown="mousedown">
        <span>{{$store.state.Live_Chat_userid.first_name}}{{$store.state.Live_Chat_userid.last_name}}</span>
        <span>
          <i class="iconfont icon-video"></i>
          <i class="iconfont icon-custom-phone"></i>
          <i class="iconfont icon-LC_icon_setting_line"></i>
          <i class="iconfont icon-aui-icon-close" @click="clearLive_Chat"></i>
        </span>
      </div>

      <div class="content" v-show="winshow">
        <div class="message_list">
          <ul class="guest" v-for="item in message_list">
            <li v-if="item.fk_from_user_id != $store.state.userInfo.user_id"  :class="item.fk_from_user_id != $store.state.userInfo.user_id ?  null : ''">
              <div class="img" :style="{backgroundImage:($store.state.Live_Chat_userid.image_url ? 'url(' + $store.state.Live_Chat_userid.image_url +')' :'url('+$store.state.Live_Chat_userid.image_url+')')}"></div>
              <p>{{item.text}}</p>
            </li>
            <li v-if="item.fk_from_user_id == $store.state.userInfo.user_id"  :class="item.fk_from_user_id == $store.state.userInfo.user_id ? 'host' : null">
              <p>{{item.text}}</p>
              <div class="img" :style="{backgroundImage:($store.state.userInfo.image_url ? 'url(' + $store.state.userInfo.image_url +')' :'url('+$store.state.userInfo.image_url+')')}"></div>
            </li>
          </ul>
        </div>

        <div class="botton" v-show="winshow">
          <input type="text" placeholder="Type a message…" v-model="inputtext" @keyup.enter="clickButton">
          <div>
          <span>
            <i class="iconfont icon-tupian1"></i>
            <i class="iconfont icon-emoji"></i>
            <i class="iconfont icon-attachment"></i>
          </span>
            <span @click="clickButton">
            <i class="iconfont icon-send1"></i>
          </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import socketio from 'socket.io-client';
  var socket;
  export default {
    data () {
      return {
        Live_ChatList:[],
        Live_ChatShow:false,
        winshow:true,
        message_list:[],
        inputtext:'',
        userid:"",
        img:"https://media.licdn.com/dms/image/C5103AQE3kKwomhMDSg/profile-displayphoto-shrink_200_200/0?e=1548288000&v=beta&t=OetmBAW99xkc0QmCjzYJMu8XicRP-DZ4uRCWLWutQYY",
        to_user:""
      }
    },
    created(){
      var that = this
      socket = socketio('http://54.254.147.95:3100', {query: {user_id: this.$store.state.userInfo.user_id}});
      socket.on('chat message', function(data){
        if(that.$store.state.Live_Chat_userid.user_id){
          that.getUserMessageList()
        }
      });
    },
    methods:{
      getLive_ChatList(){
        this.$post(this.userUrl + '/user', {
          action:'getUserContactList',
          data:{
            user_id:this.$store.state.userInfo.user_id
          // user_id:2731
          },
        }).then((res) => {
          if(res.msg.code == 200){
            this.Live_ChatList = res.data.chat_list
          }
        })

      },
      clickButton(){
        if(this.inputtext != ""){
          socket.emit('chat message', {
            to_user_id: this.$store.state.Live_Chat_userid.user_id,
            text: this.inputtext
          })
          this.getUserMessageList()
          this.inputtext = ""
        }
      },
      Live_Chat_userid(user){
        this.$store.state.Live_Chat_userid={
          user_id:user.user_id,
          first_name:user.first_name,
          last_name:user.last_name,
          image_url:user.image_url
        }

        this.getUserMessageList()
        this.scrollToBottom();

      },
      getUserMessageList(){
        this.$post(this.userUrl + '/user', {
          action:'getUserMessageList',
          data:{
            user_id:this.$store.state.userInfo.user_id,
            contact_id:this.$store.state.Live_Chat_userid.user_id
          },
        }).then((res) => {
          if(res.msg.code == 200){
            this.message_list = res.data.message_list
          }
        })
      },
      scrollToBottom: function () {
        this.$nextTick(() => {
          var container = this.$el.querySelector(".message_list");
          container.scrollTop = container.scrollHeight;
        })
      },
      clearLive_Chat(){
        this.$store.state.Live_Chat_userid={
          user_id:"",
          first_name:"",
          last_name:"",
          image_url:""
        }
      },
      mousedown(e){

        let odiv = e.target;        //获取目标元素
        console.log(e.currentTarget)

        //算出鼠标相对元素的位置
        let disX = e.clientX - odiv.offsetLeft;
        let disY = e.clientY - odiv.offsetTop;
        document.onmousemove = (e)=>{       //鼠标按下并移动的事件
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.clientX - disX;
          let top = e.clientY - disY;

          //绑定元素位置到positionX和positionY上面
          this.positionX = top;
          this.positionY = left;

          //移动当前元素
          odiv.style.left = left + 'px';
          odiv.style.top = top + 'px';
        };
        document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
    },
    updated(){
      this.getUserMessageList()
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
    p.NoList{
      text-align: center;
      color: white;
      font-size: 20px;
    }
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

      /**&:after{
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
      **/
    }
  }
}
.Live_Chat_xs{
    color: white;
    padding: 15px 20px;
    diaplay:tabel;
    cursor: pointer;
    /**i{
      display:tabel-cell;
      vertical-align:middle;
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #7ED321;
      margin-right: 10px;
    }**/
}
</style>



<style scoped lang="scss">
  .Live_Chat_Win {
    width: 400px;
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.35);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    overflow: hidden;
    margin-right: 20px;
    display: inline-block;
    position: fixed;
    z-index: 9999;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
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
      div.message_list{
        overflow: auto;
        min-height: 200px;
        max-height: 300px;
      }
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
          p {
            display: inline-block;
            background: #E6E7E8;
            border-radius: 14px;
            padding: 5px;
            margin: 0 10px;
          }
          &.host{
            text-align: right;
          }
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
