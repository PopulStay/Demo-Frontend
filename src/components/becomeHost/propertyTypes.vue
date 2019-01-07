<template>
  <div>

    <div class="becomeHost-header">
      <div class="title">Basics</div>
      <h3>Property types</h3>
    </div>

    <div class="propertyTypes">
      <el-select v-model="$store.state.host.category" placeholder="Please choose your  property type">
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
      <el-select v-model="placeType" placeholder="Please choose your  property type" @change="placeTypeSelect">
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
      <el-select v-model="$store.state.host.propertyTypeId" placeholder="Please choose your  property type">
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

    <button class="r-button next" :class="$store.state.host.propertyTypeId == '' ? 'disable' : null" :disabled="$store.state.host.propertyTypeId == ''" @click="next" >Next</button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: 'Entire place',
        label: 'Entire place'
      },
      {
        value: 'Private room',
        label: 'Private room'
      },
      {
        value: 'Share room',
        label: 'Share room'
      }],
      value: '',
      propertyTypesList:[],
      placeTypesList:[],
      placeType:'',
      placeTypeid:'',
      disable:true
    }
  },
  created () {

    this.$get(this.placeUrl + '/place/properties?pageNo=1&pageSize=99').then((res) => {
      this.propertyTypesList = res.data.propertyTypes.dataList
      this.placeTypesList = res.data.placeTypes.dataList
    })

  },
  methods: {
    getPlace(id){

      this.$get(this.partialplaceUrl + '/temp/place', {
        tempPlaceId: id
      }).then((res) => {
        if(res.data.Propertytypes){
          this.$store.state.host.category = res.data.category;
        }
      })

    },
    placeTypeSelect(e){
      this.placeTypeid = e
    },
    next () {
      this.$router.push({path: '/becomeHost/Rooms', query: {id: this.$route.query.id}})
      this.$store.state.becomehostTitle.propertyTypes = 'propertyTypes'
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
