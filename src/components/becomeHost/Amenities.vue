<template>
  <div>
    <div class="becomeHost-header">
      <div class="title">{{$t('message.Basics')}}</div>
      <h3>{{$t('message.Amenities')}}</h3>
    </div>

    <div class="amenities flex-wrap">
      <ul>
        <el-checkbox-group v-model="$store.state.hostinfo.AmenitiesArr"  @change="changeAment">
          <li v-for="(item, index) in amenities" :key="item.amenityId"><el-checkbox :label="item.amenityId">{{item.amenity}}</el-checkbox></li>
        </el-checkbox-group>
      </ul>
    </div>

    <div class="safeAmenities">
      <h3>{{$t('message.SafeAmenities')}}</h3>
      <ul>
        <el-checkbox-group v-model="$store.state.hostinfo.safeAmenitiesArr"  @change="changesafeAment">
          <li v-for="(item, index) in SafeAmenities" :key="item.safeAmenityId"><el-checkbox :label="item.safeAmenityId">{{item.safeAmenity}}</el-checkbox></li>
        </el-checkbox-group>
      </ul>
    </div>

    <div class="spaces">
      <h3>{{$t('message.Spaces')}}</h3>
      <ul>
        <el-checkbox-group v-model="$store.state.hostinfo.SpacesArr"  @change="changeSpaces">
          <li v-for="(item, index) in Spaces" :key="item.spaceId"><el-checkbox :label="item.spaceId">{{item.space}}</el-checkbox></li>
        </el-checkbox-group>
      </ul>
    </div>

    <button class="r-button next" @click="next">{{$t('message.Next')}}</button>

  </div>
</template>
<script>
export default {
  data () {
    return {
      checked: true,
      amenities: {},
      AmenitiesArr:[],
      SafeAmenities: {},
      safeAmenitiesArr:[],
      SpacesArr:[],
      Spaces: {},
    }
  },
  created () {

    this.$get(this.placeUrl + '/place/safe_amenities').then((res) => {
      this.SafeAmenities = res.data.dataList
    })

    this.$get(this.placeUrl + '/place/amenities').then((res) => {
      this.amenities = res.data.dataList
    })

    this.$get(this.placeUrl + '/place/spaces').then((res) => {
      this.Spaces = res.data.dataList
    })

    if(this.$route.query.id){
      this.getAmenities(this.$route.query.id)
    }

    if(this.$store.state.becomehostTitle.Location != 'Location'){
      this.$router.push('/becomeHost/Location')
    }

  },
  methods: {
    changeAment () {
      let AmenitiesArr = [];
      this.$store.state.hostinfo.AmenitiesArr.forEach((val,key) =>{
        let pamenityObj = {};
        pamenityObj['pamenityId'] = val
        AmenitiesArr.push(pamenityObj)
      })

      this.$store.state.host.amenities = AmenitiesArr;
    },
    changesafeAment(){
      let changesafeAmentArr = [];
      this.$store.state.hostinfo.safeAmenitiesArr.forEach((val,key) =>{
        let psafeAmenityObj = {};
        psafeAmenityObj['psafeAmenityId'] = val
        changesafeAmentArr.push(psafeAmenityObj)
      })

      this.$store.state.host.safeAmenities = changesafeAmentArr
    },
    changeSpaces(){
      let changeSpacesArr = [];
      this.$store.state.hostinfo.SpacesArr.forEach((val,key) =>{
        let psafeAmenityObj = {};
        psafeAmenityObj['pspaceId'] = val
        changeSpacesArr.push(psafeAmenityObj)
      })

      this.$store.state.host.spaces = changeSpacesArr
    },
    getAmenities (id) {

      this.$get(this.partialplaceUrl + '/temp/place', {
        tempPlaceId: id
      }).then((res) => {
        if(res.code == 200){
          if(res.data.amenities){
            res.data.amenities.forEach((val, key) => {
              this.$store.state.hostinfo.AmenitiesArr.push(val.pamenityId)
            })
          }
          if(res.data.safeAmenities){
            res.data.safeAmenities.forEach((val, key) => {
              this.$store.state.hostinfo.safeAmenitiesArr.push(val.psafeAmenityId)
            })
          }

          if(res.data.spaces){
            res.data.spaces.forEach((val, key) => {
              this.$store.state.hostinfo.SpacesArr.push(val.pspaceId)
            })
          }
        }
      })

    },
    next () {
      this.$router.push({path: '/becomeHost/space', query: {id: this.$route.query.id}})
      this.$store.state.becomehostTitle.Amenities = 'Amenities'
    }
  }

}
</script>

<style lang='scss' scoped>
h3 {
  font-weight: 100;
  font-family: Roboto-Medium;
  font-size: 28px;
  color: #4A4A4A;
  letter-spacing: 1px;
  margin: 0;
  padding-bottom: 30px
}
.safeAmenities,
.spaces{
  margin-top: 50px;
}
ul {
  min-width: 300px;
  overflow: hidden;
  li {
    margin-bottom: 15px;
    width: 40%;
    display: inline-block;
    vertical-align: top;
    margin-right:10%;
  }
}
@media only screen and (max-width: 800px) {
  .amenities {
    display: block;
  }
}
</style>

<style lang="scss">
  .el-checkbox {
      .el-checkbox__label{
        display:inline-block;
        word-wrap:break-word;
        white-space:normal;
      }
  }
  .el-checkbox__input{
    float: left;
  }
</style>
