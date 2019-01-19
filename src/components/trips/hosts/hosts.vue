<template>
  <div>
    <ul class="tabList flex-wrap">
      <li v-for="(item, index) in hostsTabList" :key="index" :class="hostsTabTitle == item ? 'active' : ''" @click="tripsTabClick(item, index)">{{item}}</li>
    </ul>
    <ul class="list" v-if="hostsTabTitle == 'Published'">
      <li v-for="(item, index) in dataList" :key="index">

        <div class="imgWrap" :style="{backgroundImage:(item.picture[0] ? 'url(' + item.picture[0].smallPictureUrl +')' :'url('+Placechart+')')}">
        <!--<div class="imgWrap" :style="{backgroundImage: 'url(' + item.picture[0].smallPictureUrl +')'}">-->
          <div class="hover" v-if="hostsTabTitle == 'Published'">
            <div slot="reference" class="modification">
              <ul class="popover-content">
                <li class="red"  @click="hostsPlaceEdit(item.placeId,item.tempPlaceId)">Edit</li>
                <li @click="hostsPublishedDelete(item.placeId,item.tempPlaceId)">Delete</li>
              </ul>
              <i class="icon iconfont icon-xiugai"></i>
            </div>
          </div>
        </div>

        <p class="text" @click="toListing(item.placeId)">{{ item.placeName}}</p>
        <p class="number" @click="toListing(item.placeId)">{{ item.prices[0].bestPrice }} {{ item.prices[0].currency }} per night</p>
      </li>
      <div v-if="!dataList.length" class="no-data">No data</div>
    </ul>


    <ul class="list" v-if="hostsTabTitle == 'Drafts'">
      <li v-for="(item, index) in DraftsList" :key="index" v-if="!item.becomehostTitle.status">
        <div class="imgWrap" :style="{backgroundImage:(item.host.pictures[0] ? 'url(' + item.host.pictures[0].smallPictureUrl +')' :'url('+Placechart+')')}">
          <div class="hover" v-if="hostsTabTitle == 'Drafts'">
              <div slot="reference" class="modification">
                <ul class="popover-content">
                  <li class="red"  @click="hostsEdit(item.tempPlaceId)">Edit</li>
                  <li @click="hostsDraftsDelete(item.tempPlaceId)">Delete</li>
                </ul>
                <i class="icon iconfont icon-xiugai"></i>
              </div>
          </div>
        </div>
        <p class="text" v-if="item.host.placeName">{{ item.host.placeName }}</p>
        <p class="text" v-else>No title has been set yet</p>

        <p class="number" v-if="item.host.prices[0].bestPrice">{{item.host.prices[0].bestPrice}} {{item.host.prices[0].currency}} per night</p>
        <p class="number" v-else>No price set yet</p>

      </li>
      <div v-if="!DraftsListshow" class="no-data">No data</div>
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
      Placechart:list1,
      DraftsListshow:false
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
        hostId: this.user.user_id
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

          res.data.forEach((val, key) => {
            if(!val.becomehostTitle.status){
              this.DraftsListshow = true
            }
          })

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
        return json.translation[0]
        placeName.push(json.translation[0])
        this.placeName = placeName
      }).catch(err => {
        console.log(err)
      })
    },
    toListing (placeId) {
      this.$router.push({path: '/listing/lstHome', query: {id: placeId}})
    },
    hostsEdit (tempPlaceId) {
      this.$store.state.becomehosttempPlaceId = tempPlaceId
      this.$router.push('/becomeHost/propertyTypes')
    },
    hostsDraftsDelete(tempPlaceId){
      this.$confirm('This action will permanently delete the listing, Whether to continue?', 'prompt', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$delete(this.partialplaceUrl + '/temp/place', {
          tempPlaceId: tempPlaceId
        }).then((res) => {
          console.log(res)
          if(res.code == 200){
            this.$message({
              type: 'success',
              message: 'successfully deleted!'
            });
            this.hostsDrafts()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Undelete'
        });
      });
    },
    hostsPlaceEdit(placeId,tempPlaceId){
      this.$store.state.becomehostPlaceID = placeId
      this.$store.state.becomehosttempPlaceId = tempPlaceId
      this.$router.push('/becomeHost/propertyTypes')
    },
    hostsPublishedDelete(placeId,tempPlaceId){
      let deltempPlaceId = tempPlaceId;
      this.$confirm('This action will permanently delete the listing, Whether to continue?', 'prompt', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$delete(this.placeUrl + '/place', {
          placeId: placeId
        }).then((res) => {
          if(res.code == 200){
            this.$notify({
              title: 'success',
              message: 'Operation is successful',
              type: 'success'
            });
            this.hostsPublished()
            this.$delete(this.partialplaceUrl + '/temp/place', {
              tempPlaceId: deltempPlaceId
            }).then((res) => {
              if(res.code == 200){
                this.hostsDrafts()
              }
            })

          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Undelete'
        });
      });
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
.modification:hover .popover-content{
  display: block;
}
.popover-content {
  position: absolute;
  right: 0px;
  top: 37px;
  z-index: 1;
  width: 70px;
  padding: 0 20px;
  background: white;
  border-radius: 3px;
  display: none;

  li {
    font-family: Roboto-Regular;
    font-size: 16px;
    line-height: 16px;
    height: 20px;
    cursor: pointer;
    width: auto;
    margin: 20px 0 ;
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
