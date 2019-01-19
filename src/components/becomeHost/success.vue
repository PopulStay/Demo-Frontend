<template>
  <div class="content flex-wrap flex-center">
      <i class="icon iconfont icon-success"></i>
      <h3>Thank you! You’ve successfully submitted your property.</h3>
      <div class="flex-wrap button-wrap">
        <div class="r-button button" @click="success">View my property</div>

        <!--<div class="r-button button">-->
          <!--<router-link to="/trips/editProfile">Edit submission</router-link>-->
        <!--</div>-->
      </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
      }
    },
    created () {
      if(this.$store.state.becomehostTitle.propertyTypes != 'propertyTypes'){
        this.$router.push('/becomeHost/propertyTypes')
      }
    },
    methods:{
      success(){
        this.$router.push({path: '/listing/lstHome', query: {id: this.$store.state.becomehostPlaceID}})
      },
      clearhost(){
        this.$store.state.host={
          hostId:'',
          category: '',
          propertyTypeId:'',
          placeName:'',
          description:'',
          pictures:[],
          weeklyDiscount:'',
          monthlyDiscount:'',
          checkOutTime:'',
          guestNumber: 0,
          bedroomNumber: 0,
          bedNumber: 0,
          bathNumber: 0,
          arrangements:[],
          citycode:'',
          streetLineOne:'',
          streetLineTwo:'',
          needNoticeDay:'',
          needNoticeBeforeTime: '',
          availableCheckinTimeFrom:'',
          availableCheckinTimeTo:'',
          guestMinStayNight:'',
          guestMaxStayNight:'',
          amenities:[],
          safeAmenities:[],
          spaces:[],
          rules:[],
          cancellationPolicyId:'',
          prices:[
            {
              currency:"PPS",
              bestPrice:'',
              minPrice:'',
              maxPrice:'',
              cleanupServiceFee:''
            }
          ],
        }
        this.$store.state.hostinfo={
          propertyName:'',
          Countryvalue:'',
          Statevalue:'',
          Cityvalue:'',
          AmenitiesArr:[],
          safeAmenitiesArr:[],
          SpacesArr:[],
          rulesArr:[],
          Addrules:[],
          needNoticeDay:''
        }
        this.$store.state.becomehostTitle={
          propertyTypes:"",
          Rooms:"",
          Location:"",
          Amenities:"",
          space:"",
          Requirements:"",
          Floating:"",
          ServiceFee:"",
          reservation:"",
          Submit:'',
          status:false
        }
        this.$store.state.becomehosttempPlaceId = ""
      }
    },
    beforeDestroy(){
      this.clearhost()

      console.log(this.$store.state)
    }
  }
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  flex-direction: column;
  .icon-success {
    font-size: 130px;
    color: #F4436C;
  }
  h3 {
    font-family: Roboto-Medium;
    font-size: 28px;
    color: #4A4A4A;
    letter-spacing: 0;
    text-align: center;
    font-weight: 100;
  }
  .button {
    width: 180px;
    height: 50px;
    line-height: 50px;
    margin: 0 10px;
    a {
      width: 100%;
      height: 100%;
    }
  }
}
@media only screen and (max-width: 800px) {
  .button-wrap {
    display: block;
    .button {
      margin: 10px;
    }
  }
}
</style>
