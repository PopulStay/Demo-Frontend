<template>
  <div>
    <ul class="tabList flex-wrap">
      <li v-for="(item, index) in hostsTabList" :key="index" :class="hostsTabTitle == item ? 'active' : ''" @click="tripsTabClick(item, index)">{{item}}</li>
    </ul>
    <ul class="list" v-if="hostsTabTitle == 'Published'">
      <li v-for="(item, index) in dataList" :key="index" @click="toListing(item.placeId)">
        <div class="imgWrap" :style="{backgroundImage: 'url(' + item.picture[0].smallPictureUrl +')'}">
          <div class="hover" v-if="hostsTabTitle == 'Drafts'">
            <el-popover placement="bottom-end" width="70" trigger="hover" popper-class="hosts">
              <ul class="popover-content">
                <li class="red">Edit</li>
                <li>Unpublish</li>
              </ul>
              <div slot="reference" class="modification">
                <i class="icon iconfont icon-xiugai"></i>
              </div>
            </el-popover>
          </div>
        </div>
        <p class="text">{{ placeName[index] }}</p>
        <p class="number">{{ item.prices[0].bestPrice }} {{ item.prices[0].currency }} per night</p>
      </li>
    </ul>

    <ul class="list" v-if="hostsTabTitle == 'Drafts'">
      <li v-for="(item, index) in DraftsList" :key="index">

        <div class="imgWrap" :style="{backgroundImage:(item.picture ? 'url(' + item.picture[0].smallPictureUrl +')' :'url('+Placechart+')')}">
          <div class="hover" v-if="hostsTabTitle == 'Drafts'">
              <div slot="reference" class="modification">
                <ul class="popover-content">
                  <li class="red">Edit</li>
                  <li>Delete</li>
                </ul>
                <i class="icon iconfont icon-xiugai"></i>
              </div>
          </div>
        </div>

        <p class="text" v-if="item.placeName">{{ item.placeName }}</p>
        <p class="text" v-else>No title has been set yet</p>

        <p class="number" v-if="item.prices">{{item.prices[0].bestPrice}} {{item.prices[0].currency}} per night</p>
        <p class="number" v-else>No price set yet</p>

      </li>
    </ul>

  </div>
</template>

<script>
import list1 from '../../../assets/images/index/list-1.jpg'

export default {
  data () {
    return {
      hostsTabList: ['Published', 'Drafts'],
      hostsTabTitle: 'Published',
      dataList: [],
      DraftsList: [],
      user:'',
      placeName: [],
      Placechart:list1
    }
  },
  created () {
    this.user = this.$store.state.userInfo;

    let title = this.$route.query.title
    if (title) this.hostsTabTitle = title
    else this.hostsTabTitle = 'Published'
    this.getHostsList()
  },
  methods: {
    getHostsList () {
      if(this.hostsTabTitle == 'Published'){
        this.hostsPublished()
      }else{
        this.hostsDrafts()
      }

    },
    hostsPublished(){
      this.$get(this.placeUrl + '/places', {
        // hostId: this.user.user_id
        hostId: 2880
      }).then((res) => {
        if(res.code == 200){
          res.data.dataList.forEach((val, key) => {
            if(val.placeName){
              this.translation(val.placeName)
            }else{
              this.translation("暂未设置")
            }
          })
          this.dataList = res.data.dataList
        }
      })
    },
    hostsDrafts(){
      this.$get(this.partialplaceUrl + '/temp/places', {
        userId: this.user.user_id
      }).then((res) => {
        if(res.code == 200){
          this.DraftsList = res.data

        }
      })
    },
    tripsTabClick (value, index) {
      this.hostsTabTitle = value
      this.placeName = []
      this.getHostsList()
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
        console.log(placeName)
        this.placeName = placeName
      }).catch(err => {
        console.log(err)
      })
    },
    toListing (placeId) {
      this.$router.push({path: '/listing/lstHome', query: {id: placeId}})
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
    font-size: 16px;
    height: 350px;
    cursor: pointer;

    .imgWrap {
      height: 200px;
      background-size: cover;
      border-radius: 3px;
      position: relative;

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
      display: -webkit-box;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      -webkit-line-clamp: 2;
      overflow: hidden;
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
/*.modification:hover .popover-content{*/
  /*display: block;*/
/*}*/
.popover-content {
  position: absolute;
  right: 10px;
  top: 55px;
  z-index: 1;
  width: 70px;
  padding: 0 20px;
  height: 100px;
  background: white;
  border-radius: 3px;
  display: none;

  li {
    font-family: Roboto-Regular;
    font-size: 16px;
    line-height: 16px;
    height: 20px;
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
