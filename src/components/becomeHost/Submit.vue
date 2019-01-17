<template>
  <div>
    <div class="becomeHost-header">
      <div class="title">Space</div>
      <h3>Review our policies before you submit</h3>
    </div>
    <div class="submit">
      <p class="text">PopulStay will review the version you’re about to submit, so make sure you’re happy with it.<br>You can still go back and fine-tune your descriptions at any time.</p>
      <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales enim ac justo vehicula faucibus. Quisque rutrum enim quis risus bibendum viverra. Pellentesque pellentesque odio lorem, a vulputate leo varius in. Curabitur ligula diam, aliquet a gravida mollis, sollicitudin id urna. Cras egestas urna dignissim dolor aliquet, id pellentesque erat bibendum. Quisque pellentesque erat ultricies, sollicitudin ex eget, rhoncus dui. Maecenas et euismod eros. Sed id sem gravida, luctus est sit amet, volutpat quam. Mauris semper malesuada quam ac molestie. Mauris aliquam scelerisque mauris. Duis ac pretium diam, quis pulvinar sapien. Sed tincidunt, erat vitae vulputate tincidunt, massa sapien semper urna, ac sollicitudin leo ipsum vitae lacus.</p>
      <ul>
        <h5>By submitting, I confirm the following is true:</h5>
        <li>
          <el-checkbox v-model="confirm1" @change="submitOK"> My experience complies with local laws.</el-checkbox>
          <p>Learn more about other laws (like business licensing) that may apply.</p>
        </li>
        <li>
          <el-checkbox v-model="confirm2" @change="submitOK">I agree to the PopulStay Experiences Additional Terms of Service and Guest Refund Policy.</el-checkbox>
        </li>
        <li>
          <el-checkbox v-model="confirm3" @change="submitOK">I confirm that my descriptions and photos are my own, and accurately reflect my experience.</el-checkbox>
        </li>
      </ul>
    </div>

    <button class="r-button next"
            :class="!confirmOK  ? 'disable' : null"
            :disabled="!confirmOK" @click="next">Next</button>
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
          this.$post(this.placeUrl + '/place', this.$store.state.host).then((res) => {
            if (res.code === 200) {
                this.$store.state.becomehostPlaceID = res.data
                this.postarrangements(res.data)
            }
          })

        }else{
          this.$message({
            message: 'Please complete the information',
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
            this.hostsDraftsDelete(this.$store.state.becomehosttempPlaceId)
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
