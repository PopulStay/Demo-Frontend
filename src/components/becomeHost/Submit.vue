<template>
  <div>
    <div class="becomeHost-header">
      <div class="title">{{$t('message.Space')}}</div>
      <h3>{{$t('message.Reviewourpoliciesbeforeyousubmit')}}</h3>
    </div>
    <div class="submit">
      <p class="text">{{$t('message.PopulStaywillreviewtheversionyoureabout')}}</p>
      <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales enim ac justo vehicula faucibus. Quisque rutrum enim quis risus bibendum viverra. Pellentesque pellentesque odio lorem, a vulputate leo varius in. Curabitur ligula diam, aliquet a gravida mollis, sollicitudin id urna. Cras egestas urna dignissim dolor aliquet, id pellentesque erat bibendum. Quisque pellentesque erat ultricies, sollicitudin ex eget, rhoncus dui. Maecenas et euismod eros. Sed id sem gravida, luctus est sit amet, volutpat quam. Mauris semper malesuada quam ac molestie. Mauris aliquam scelerisque mauris. Duis ac pretium diam, quis pulvinar sapien. Sed tincidunt, erat vitae vulputate tincidunt, massa sapien semper urna, ac sollicitudin leo ipsum vitae lacus.</p>
      <ul>
        <h5>{{$t('message.BysubmittingIconfirmthefollowingistrue')}}</h5>
        <li>
          <el-checkbox v-model="confirm1" @change="submitOK">{{$t('message.Myexperiencecomplieswithlocallaws')}}</el-checkbox>
          <p>Learn more about other laws (like business licensing) that may apply.</p>
        </li>
        <li>
          <el-checkbox v-model="confirm2" @change="submitOK">{{$t('message.IagreetothePopulStayExperiencesAdditional')}}</el-checkbox>
        </li>
        <li>
          <el-checkbox v-model="confirm3" @change="submitOK">{{$t('message.Iconfirmthatmydescriptionsandphotosaremyown')}}</el-checkbox>
        </li>
      </ul>
    </div>

    <button class="r-button next"
            :class="!confirmOK  ? 'disable' : null"
            :disabled="!confirmOK" @click="next">{{$t('message.Next')}}</button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        confirm1:false,
        confirm2:false,
        confirm3:false,
        confirmOK:false
      }
    },
    created () {
      if(this.$store.state.becomehostTitle.reservation != 'reservation'){
        this.$router.push('/becomeHost/reservation')
      }
    },
    methods: {
      submitOK(){
        if(this.confirm1 && this.confirm2 && this.confirm3){
          this.confirmOK = true
        }
      },
      next () {
        if(this.$store.state.becomehostTitle.propertyTypes != "" &&
           this.$store.state.becomehostTitle.Rooms != "" &&
           this.$store.state.becomehostTitle.Location != "" &&
           this.$store.state.becomehostTitle.Amenities != "" &&
           this.$store.state.becomehostTitle.space != "" &&
           this.$store.state.becomehostTitle.Requirements != "" &&
           this.$store.state.becomehostTitle.Floating != "" &&
           this.$store.state.becomehostTitle.ServiceFee != "" &&
           this.$store.state.becomehostTitle.reservation != ""){

          this.confirmOK = false

          if(this.$store.state.becomehostTitle.status){
            this.puttempPlace();
            this.delArrangements();

          }else{

            this.$store.state.becomehostTitle.status = true

            this.$post(this.partialplaceUrl + '/temp/place?userId='+this.$store.state.userInfo.user_id, {
              host:this.$store.state.host,
              hostinfo:this.$store.state.hostinfo,
              becomehostTitle:this.$store.state.becomehostTitle
            }).then((res) => {
              if (res.code === 200){
                if(res.data){
                  this.$store.state.host.tempPlaceId = res.data
                  this.$post(this.placeUrl + '/place', this.$store.state.host).then((res) => {
                    if (res.code === 200) {
                      this.$store.state.becomehostPlaceID = res.data
                      this.postarrangements(res.data)
                    }else{
                      this.$notify({
                        title: this.$t('message.Warning'),
                        message: this.$t('message.Operationfailedpleasetrylater'),
                        type: 'warning'
                      });
                    }
                  })
                }

              }else{
                this.$notify({
                  title: this.$t('message.Warning'),
                  message: this.$t('message.Operationfailedpleasetrylater'),
                  type: 'warning'
                });
              }
            })
          }

        }else{
          this.$notify({
            title: this.$t('message.Warning'),
            message: this.$t('message.Pleasecompletetheinformation'),
            type: 'warning'
          });
        }

      },
      postarrangements(PlaceID){
        var arrangementsList = [];

        for (let key in this.$store.state.host.arrangements) {

          for (let keyy in this.$store.state.host.arrangements[key].utilities){

            let {name, ...arrangementsLists} = this.$store.state.host.arrangements[key].utilities[keyy]

            this.$store.state.host.arrangements[key].utilities[keyy] = arrangementsLists
          }

          var arrangementsListindex = {
            placeId:PlaceID,
            unavailableDate:[],
            utilities:this.$store.state.host.arrangements[key].utilities
          }
          arrangementsList.push(arrangementsListindex)
        }

        this.$post(this.placeUrl + '/arrangements',arrangementsList).then((res) => {
          if (res.code === 200) {
            this.$router.push({path: '/becomeHost/success', query: {id: this.$route.query.id}})
            this.$store.state.becomehostTitle.Submit = 'Submit'

            if(this.$store.state.becomehosttempPlaceId != ""){
              this.hostsDraftsDelete(this.$store.state.becomehosttempPlaceId)
            }
          }
        })

      },
      hostsDraftsDelete(tempPlaceId){
        this.$delete(this.partialplaceUrl + '/temp/place', {
          tempPlaceId: tempPlaceId
        }).then((res) => {
          if(res.code != 200){

          }
        })
      },
      puttempPlace(){
        this.$store.state.host.tempPlaceId = this.$store.state.becomehosttempPlaceId
        this.$put(this.partialplaceUrl + '/temp/place?tempPlaceId='+this.$store.state.becomehosttempPlaceId, {
          host:this.$store.state.host,
          hostinfo:this.$store.state.hostinfo,
          becomehostTitle:this.$store.state.becomehostTitle
        }).then((res) => {
          if (res.code === 200) {
            this.putplace();
          }
        })
      },
      delArrangements(){
        this.$get(this.placeUrl + '/place', {
          placeId: this.$store.state.becomehostPlaceID
        }).then((res) => {
          if (res.code === 200) {
            for(let key in res.data.arrangements){
              this.$delete(this.placeUrl + '/arrangement?arrangementId=' + res.data.arrangements[key].arrangementId).then((res) => {})
            }
          }
        })
      },
      putplace(){
        this.$put(this.placeUrl + '/place?placeId='+this.$store.state.becomehostPlaceID, this.$store.state.host).then((res) => {
          if (res.code === 200) {
            this.postarrangements(this.$store.state.becomehostPlaceID)
            this.$router.push({path: '/becomeHost/success', query: {id: this.$route.query.id}})
            this.$store.state.becomehostTitle.Submit = 'Submit'
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.submit {
  .text {
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
    line-height: 26px;
    margin-bottom: 50px;
  }
  ul {
    h5 {
      font-family: Roboto-Medium;
      font-size: 16px;
      color: #4A4A4A;
      letter-spacing: 1.14px;
      margin: 0;
      padding-bottom: 25px;
      font-weight: 100;
    }
    li {
      font-family: Roboto-Regular;
      font-size: 16px;
      color: #4A4A4A;
      line-height: 22px;
      margin-bottom: 20px;
      p {
        padding-left: 35px
      }
    }
  }
}
</style>

<style>
@media only screen and (max-width: 800px) {
  .submit .el-checkbox__label {
    word-wrap: break-word;
    white-space: initial;
  }
  .submit label {
    display: flex;
  }
}
</style>
