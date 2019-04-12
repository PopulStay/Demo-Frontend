<template>
  <div>

    <div class="becomeHost-header">
      <div class="title">{{$t('message.Basics')}}</div>
      <h3>{{$t('message.Propertytypes')}}</h3>
    </div>

    <div class="propertyTypes">
      <el-select v-model="$store.state.host.category" :placeholder="$t('message.Pleasechooseyourpropertytype')">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span class="icon-CHECKMARK-wrap"><i class="icon iconfont icon-CHECKMARK" v-if="$store.state.host.category == item.value"></i></span>
          <span class="icon-CHECKMARK-text">{{item.label}}</span>
        </el-option>
      </el-select>
    </div>

    <div class="propertyTypes">
      <el-select v-model="placeTypeName" :placeholder="$t('message.Pleasechooseyourpropertytype')" @change="placeTypeSelect">
        <el-option
          v-for="item in placeTypesList"
          :key="item.placeTypeId"
          :label="item.placeName"
          :value="item.placeTypeId">
          <span class="icon-CHECKMARK-wrap"><i class="icon iconfont icon-CHECKMARK" v-if="placeType == item.placeTypeId"></i></span>
          <span class="icon-CHECKMARK-text">{{item.placeName}}</span>
        </el-option>
      </el-select>
    </div>

    <div class="propertyTypes">

      <el-select v-model="propertyName" :placeholder="$t('message.Pleasechooseyourpropertytype')" @change="propertyTypeSelect">
        <el-option
          v-for="item in propertyTypesList"
          v-if="placeTypeid == item.placeTypeId"
          :key="item.propertyTypeId"
          :label="item.propertyName"
          :value="item.propertyTypeId">
          <span class="icon-CHECKMARK-wrap"><i class="icon iconfont icon-CHECKMARK" v-if="$store.state.host.propertyTypeId == item.propertyTypeId"></i></span>
          <span class="icon-CHECKMARK-text">{{item.propertyName}}</span>
        </el-option>
      </el-select>

    </div>

    <button class="r-button next" :class="$store.state.host.propertyTypeId == '' ? 'disable' : null" :disabled="$store.state.host.propertyTypeId == ''" @click="next" >{{$t('message.Next')}}</button>

    <p v-if="$i18n.locale != language ? onloading() : null"></p>


  </div>
</template>

<script>
export default {
  data () {
    return {
      language:'',
      options: [{
        value: 'Entire place',
        label: this.$t('message.Entireplace')
      },
      {
        value: 'Private room',
        label: this.$t('message.Privateroom')
      },
      {
        value: 'Share room',
        label: this.$t('message.Shareroom')
      }],
      value: '',
      propertyTypesList:[],
      placeTypesList:[],
      placeTypeName:'',
      placeTypeid:'',
      disable:true,
      propertyName:''
    }
  },
  created () {

    if(this.$store.state.becomehosttempPlaceId != ""){
      this.gettempPlace(this.$store.state.becomehosttempPlaceId)
    }

    this.$get(this.placeUrl + '/place/properties?pageNo=1&pageSize=99').then((res) => {
      this.propertyTypesList = res.data.propertyTypes.dataList
      this.placeTypesList = res.data.placeTypes.dataList
    })

    if(this.$store.state.host.propertyTypeId){
      this.propertyType(this.$store.state.host.propertyTypeId)
    }
},
  methods: {
    onloading(){
      this.language = this.$i18n.locale;
      this.options = [{
          value: 'Entire place',
          label: this.$t('message.Entireplace')
        },
        {
          value: 'Private room',
          label: this.$t('message.Privateroom')
        },
        {
          value: 'Share room',
          label: this.$t('message.Shareroom')
        }]
    },
    gettempPlace(id){
      this.$get(this.partialplaceUrl + '/temp/place?tempPlaceId='+id).then((res) => {
        if (res.code === 200) {
          this.$store.state.host = res.data.host
          this.$store.state.hostinfo = res.data.hostinfo
          this.$store.state.becomehostTitle = res.data.becomehostTitle

          if(this.$store.state.host.propertyTypeId){
            this.propertyType(this.$store.state.host.propertyTypeId)
          }

        }
      })
    },
    placeTypeSelect(e){
      this.placeTypeid = e
    },
    propertyTypeSelect(e){
      this.$store.state.host.propertyTypeId = e
    },
    next () {
      this.$router.push({path: '/becomeHost/Rooms', query: {id: this.$route.query.id}})
      this.$store.state.becomehostTitle.propertyTypes = 'propertyTypes'
    },
    propertyType(id){
      this.$get(this.placeUrl + '/place/property', {
        propertyTypeId: id
      }).then((res) => {
        if(res.code == 200){
          this.propertyName = res.data.propertyName;
          this.placeType(res.data.placeTypeId)
        }
      })
    },
    placeType(id){
      this.$get(this.placeUrl + '/place/property', {
        placeTypeId: id
      }).then((res) => {
         if(res.code == 200){
          this.placeTypeName = res.data.placeName;
        }
      })
    }
  }
}
</script>

<style lang="scss">
.icon-CHECKMARK-wrap {
  display: inline-block;
  width: 20px;
}
.icon-CHECKMARK {
  font-size: 20px;
}
.propertyTypes{
  margin-bottom: 40px;

  .el-input__inner {
    width: 400px;
    height: 46px;
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
    line-height: 24px;
  }
}
.icon-CHECKMARK-text {
  font-family: Roboto-Regular;
  font-size: 16px;
  line-height: 24px;
}
@media only screen and (max-width: 800px) {
  .propertyTypes .el-select, .propertyTypes .el-input__inner{
      width: 100%;
  }
}
</style>
