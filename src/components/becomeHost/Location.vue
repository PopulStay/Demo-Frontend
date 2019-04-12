<template>
   <div>
    <div class="becomeHost-header">
      <div class="title">{{$t('message.Basics')}}</div>
      <h3>{{$t('message.Location')}}</h3>
    </div>
    <div class="location">
      <ul>
        <li class="flex-wrap flex-align-center">
          <div class="title">{{$t('message.Country')}} / {{$t('message.Region')}}</div>
          <div>
            <el-select v-model="$store.state.hostinfo.Countryvalue" @change="getStateList();Statevalue=''"  :placeholder="$t('message.Select')">
              <el-option
                v-for="(item,index) in Countryoptions"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="flex-wrap flex-align-center">
          <div class="title">{{$t('message.State')}} / {{$t('message.Province')}} / {{$t('message.Region')}}</div>
          <div>
            <el-select v-model="$store.state.hostinfo.Statevalue" @change="getCityList();Cityvalue=''" :placeholder="$t('message.Select')">
              <el-option
                v-for="(item,index) in Stateoptions"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="flex-wrap flex-align-center" v-if="$store.state.hostinfo.Statevalue">
          <div class="title">{{$t('message.City')}}</div>
          <div>
            <el-select v-model="$store.state.hostinfo.Cityvalue" @change="$store.state.host.citycode = $store.state.hostinfo.Cityvalue">
              <el-option
                v-for="(item,index) in Cityoptions"
                :key="index"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="flex-wrap flex-align-center">
          <div class="title">{{$t('message.Address')}}</div>
          <div>
            <el-input :placeholder="$t('message.StreetandnumberPObox')" v-model="$store.state.host.streetLineOne"></el-input>
          </div>
        </li>
        <li class="flex-wrap flex-align-center">
          <div class="title"></div>
          <div>
            <el-input :placeholder="$t('message.Apartmentsuiteunitbuildingflooretc')" v-model="$store.state.host.streetLineTwo"></el-input>
          </div>
        </li>
        <!--<li class="flex-wrap flex-align-center">-->
          <!--<div class="title">Zip code</div>-->
          <!--<div>-->
            <!--<el-input></el-input>-->
          <!--</div>-->
        <!--</li>-->
      </ul>
    </div>

     <button class="r-button next" :class="$store.state.host.citycode == '' || $store.state.host.streetLineOne == '' ? 'disable' : null" :disabled="$store.state.host.citycode == '' || $store.state.host.streetLineOne == ''" @click="next">{{$t('message.Next')}}</button>

   </div>
</template>

<script>
export default {
  data () {
    return {
      Countryoptions: [],
      Countryvalue: 'China',
      Stateoptions: [],
      Statevalue: '',
      Cityoptions:[],
      Cityvalue:'',
      input: ''
    }
  },
  created () {
    if(this.$route.query.id){
      this.getLocation(this.$route.query.id)
    }
    this.getCountryList()

    if(this.$store.state.becomehostTitle.Rooms != 'Rooms'){
      this.$router.push('/becomeHost/Rooms')
    }

  },
  methods: {
    getLocation(id){

      this.$get(this.partialplaceUrl + '/temp/place', {
        tempPlaceId: id
      }).then((res) => {
        if(res.data.citycode){
          this.$store.state.host.citycode = res.data.citycode;
          this.getcitycode(res.data.citycode)
        }

        if(res.data.streetLineOne){
          this.$store.state.host.streetLineOne = res.data.streetLineOne;
        }

        if(res.data.streetLineTwo){
          this.$store.state.host.streetLineTwo = res.data.streetLineTwo;
        }

      })

    },
    getCountryList(){
      this.$get(this.cityUrl + '/countries').then((res) => {
        if(res.code == 200){
          this.Countryoptions = res.data
          this.getStateList()
        }
      })
    },
    getStateList(){
      this.$get(this.cityUrl + '/states',{
        country:this.$store.state.hostinfo.Countryvalue
      }).then((res) => {
        if(res.code == 200){
          this.Stateoptions = res.data
          this.getCityList()
        }
      })
    },
    getCityList(){
      this.$get(this.cityUrl + '/city/by/state',{
        state:this.$store.state.hostinfo.Statevalue
      }).then((res) => {
        if(res.code == 200){
          this.Cityoptions = res.data
        }
      })
    },
    getcitycode(code){
      this.$get(this.cityUrl + '/city', {
        code: code
      }).then((res) => {
        if (res.code === 200) {
          this.Countryvalue=res.data.country;
          this.Statevalue= res.data.state;
          this.Cityvalue=res.data.name;
          this.getStateList()
          this.getCityList()
        }
      })
    },
    next () {
      this.$router.push({path: '/becomeHost/Amenities', query: {id: this.$route.query.id}})
      this.$store.state.becomehostTitle.Location = 'Location'
    }
  }
}
</script>

<style scoped lang="scss">
.location {
  li {
    margin-bottom: 20px;
  }
  .title {
    width: 230px;
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
    letter-spacing: 0;
    line-height: 19px;
  }
}

</style>

<style>

.location .el-input__inner {
  width: 512px;
  height: 46px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
  letter-spacing: 0;
}
@media only screen and (max-width: 800px) {
  .location li {
    display: block;
  }
  .location li .title {
    margin-bottom: 3px;
  }
  .location .el-select, .location .el-input__inner{
      width: 100%;
  }
}
</style>
