<template>
  <div v-loading.fullscreen.lock="hostsLoading">
    <ul class="tabList flex-wrap">
      <li v-for="(item, index) in hostsTabList" :key="index" :class="hostsTabTitle == item ? 'active' : ''" @click="tripsTabClick(item, index)">{{item}}</li>
    </ul>
    <ul class="list" v-if="hostsTabTitle == $t('message.Published')">
      <li v-for="(item, index) in dataList" :key="index">

        <div class="imgWrap" :style="{backgroundImage:(item.picture[0] ? 'url(' + item.picture[0].smallPictureUrl +')' :'url('+Placechart+')')}">
          <div class="hover" v-if="hostsTabTitle == $t('message.Published')">
            <div slot="reference" class="modification">
              <ul class="popover-content">
                <li v-if="item.tempPlaceId" @click="hostsPlaceEdit(item.placeId,item.tempPlaceId)">{{$t('message.Edit')}}</li>
                <li @click="hostsPublishedDelete(item.placeId,item.tempPlaceId)">{{$t('message.Delete')}}</li>
                <li @click="ImportCalendarShow = true; ImportCalendarplaceId = item.placeId">{{$t('message.Importcalendar')}}</li>
                <li @click="ExportCalendar(item.placeId)">{{$t('message.Exportcalendar')}}</li>
              </ul>
              <i class="icon iconfont icon-xiugai"></i>
            </div>
          </div>
        </div>

        <p class="text" @click="toListing(item.placeId)">{{ item.placeName}}</p>
        <p class="number" @click="toListing(item.placeId)"> {{ item.prices[0].bestPrice }} {{ item.prices[0].currency }} {{$t('message.pernightcn')}} {{$t('message.pernighten')}}</p>
      </li>
      <div v-if="!dataList.length" class="no-data">{{$t('message.Nodata')}}</div>
    </ul>


    <ul class="list" v-if="hostsTabTitle == $t('message.Drafts')">
      <li v-for="(item, index) in DraftsList" :key="index" v-if="!item.becomehostTitle.status">
        <div class="imgWrap" :style="{backgroundImage:(item.host.pictures[0] ? 'url(' + item.host.pictures[0].smallPictureUrl +')' :'url('+Placechart+')')}">
          <div class="hover" v-if="hostsTabTitle == $t('message.Drafts')">
              <div slot="reference" class="modification">
                <ul class="popover-content">
                  <li class="red"  @click="hostsEdit(item.tempPlaceId)">{{$t('message.Edit')}}</li>
                  <li @click="hostsDraftsDelete(item.tempPlaceId)">{{$t('message.Delete')}}</li>
                </ul>
                <i class="icon iconfont icon-xiugai"></i>
              </div>
          </div>
        </div>
        <p class="text" v-if="item.host.placeName">{{ item.host.placeName }}</p>
        <p class="text" v-else>{{$t('message.Notitlehasbeensetyet')}}</p>

        <p class="number" v-if="item.host.prices[0].bestPrice"> {{item.host.prices[0].bestPrice}} {{item.host.prices[0].currency}} {{$t('message.pernightcn')}} {{$t('message.pernighten')}}</p>
        <p class="number" v-else>{{$t('message.Nopricesetyet')}}</p>

      </li>
      <div v-if="!DraftsListshow" class="no-data">{{$t('message.Nodata')}}</div>
    </ul>


    <el-dialog
      title="Import calendar"
      :visible.sync="ImportCalendarShow"
      class="checkoutWrap"
      center>
      <div class="content">
        <p>{{$t('message.CalendarName')}}</p>
        <input type="text" v-model="calendarName">
        <p>{{$t('message.CalendarUrl')}}</p>
        <input type="text" v-model="calendarUrl">
      </div>
      <div class="btn">
        <el-button class="Confirm" @click=" ImportCalendar()">{{$t('message.Confirm')}}</el-button>
        <el-button @click="ImportCalendarShow = false">{{$t('message.Cancel')}}</el-button>
      </div>
    </el-dialog>

    <p v-if="$i18n.locale != language ? onloading() : null"></p>

  </div>
</template>

<script>
import list1 from '../../../assets/images/index/list-1.jpg'

export default {
  data () {
    return {
      language: this.$i18n.locale,
      hostsTabList: [this.$t('message.Published'), this.$t('message.Drafts')],
      hostsTabTitle: this.$t('message.Published'),
      hostsLoading:true,
      dataList: [],
      DraftsList: [],
      user:'',
      placeName: [],
      Placechart:list1,
      calendarName:'',
      calendarUrl:'',
      DraftsListshow:false,
      ImportCalendarShow:false,
      ImportCalendarplaceId:""
    }
  },
  created () {
    this.user = this.$store.state.userInfo;

    let title = this.$route.query.title
    if (title) this.hostsTabTitle = title
    else this.hostsTabTitle = this.$t('message.Published')
    this.getHostsList()
  },
  methods: {
    onloading(){
      this.language = this.$i18n.locale;
      this.hostsTabList = [this.$t('message.Published'), this.$t('message.Drafts')]
      this.hostsTabTitle = this.$t('message.Published')
      this.getHostsList()
    },
    getHostsList () {
      if(this.hostsTabTitle == this.$t('message.Published')){
        this.hostsPublished()
      }else{
        this.hostsDrafts()
      }
    },
    hostsPublished(){
      this.hostsLoading = true
      this.$get(this.placeUrl + '/places', {
        hostId: this.user.user_id
        // hostId: 2790
      }).then((res) => {
        this.hostsLoading = false
        if(res.code == 200){
          res.data.dataList.forEach((val, key) => {
          })
          this.dataList = res.data.dataList
        }
      })
    },
    hostsDrafts(){
      this.hostsLoading = true
      this.$get(this.partialplaceUrl + '/temp/places', {
        userId: this.user.user_id
      }).then((res) => {
        this.hostsLoading = false
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
    toListing (placeId) {
      this.$router.push({path: '/listing/lstHome', query: {id: placeId}})
    },
    hostsEdit (tempPlaceId) {
      this.$store.state.becomehosttempPlaceId = tempPlaceId
      this.$router.push('/becomeHost/propertyTypes')
    },
    hostsDraftsDelete(tempPlaceId){
      this.$confirm(this.$t('message.ThisactionwillpermanentlydeletethelistingWhethertocontinue'), this.$t('message.prompt'), {
        confirmButtonText: this.$t('message.OK'),
        cancelButtonText: this.$t('message.Cancel'),
        type: 'warning'
      }).then(() => {
        this.$delete(this.partialplaceUrl + '/temp/place', {
          tempPlaceId: tempPlaceId
        }).then((res) => {
          if(res.code == 200){
            this.$message({
              type: 'success',
              message: this.$t('message.successfullydeleted')
            });
            this.hostsDrafts()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('message.Undelete')
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
      this.$confirm(this.$t('message.ThisactionwillpermanentlydeletethelistingWhethertocontinue'), this.$t('message.prompt'), {
        confirmButtonText: this.$t('message.OK'),
        cancelButtonText: this.$t('message.Cancel'),
        type: 'warning'
      }).then(() => {
        this.$delete(this.placeUrl + '/place', {
          placeId: placeId
        }).then((res) => {
          if(res.code == 200){
            this.$notify({
              title: this.$t('message.Success'),
              message: this.$t('message.Operationissuccessful'),
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
          message: this.$t('message.Undelete')
        });
      });
    },
    ImportCalendar(){
      if(this.calendarName != "" && this.calendarUrl != ""){
        this.$post(this.calendarUrl + '/api/v1/extcalendars', {
          calendarName: this.calendarName,
          calendarUrl: this.calendarUrl,
          placeId: this.ImportCalendarplaceId
        }).then((res) => {
          console.log(res)
        })
      }

    },
    ExportCalendar(placeId){
      this.$get(this.calendarUrl + '/api/v1/calendars/'+placeId).then((res) => {

        this.$confirm(res.calendarUrl, this.$t('message.Exportcalendar'), {
          confirmButtonText: this.$t('message.Confirm'),
          showCancelButton:false,
          center: true
        })

      }).catch((err) => {
        if(err.response.data.status == 404){
          this.$notify({
            message: this.$t('message.Operationfailedpleasetrylater'),
            showClose:false,
            type: 'warning',
            onClick(){
              this.close()
            }
          });
        }
      })
    },
    close(){
      this.$notify.close()
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
  width: 120px;
  padding: 0 10px;
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
    margin: 10px 0 ;
    &:hover{
      color: $red-color;
    }
  }

  .red {
    color: $red-color;
    margin-bottom: 15px;
  }

}
.checkoutWrap{
  div.content{
    p{
      font-size: 16px;
      font-family: Roboto-Regular;
    }
    input{
      width: 100%;
      border: 1px solid #e6e7e8;
      height: 40px;
      margin: 10px 0 20px;
    }
  }
  div.btn{
    display: flex;
    justify-content: space-between;

    button{
      &.Confirm{
        background: $red-color;
        color: white;
        &:hover{
          color: white;
          border: 1px solid $red-color;
        }
      }
      &:hover{
        color: $red-color;
        border: 1px solid $red-color;
      }
    }
  }
}

@media only screen  and (max-width: 900px) {
  .list {
    li {
      width: 100%;
      height:auto;
      margin: 20px 0;
      .imgWrap{
        height: 240px;
      }
    }
  }
}
</style>

<style>
.hosts {
  padding: 20px;
}
</style>
