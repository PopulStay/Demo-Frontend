<template>
  <div>
    <div class="becomeHost-header">
      <div class="title">Space</div>
      <h3>Requirements</h3>
    </div>
    <div class="requirements">
      <div class="item">
        <h3>Guest requirements</h3>
        <p>Lorem ipsum dolor sit amet</p>
        <p>Etiam a elit et sapien dictum hendrerit</p>
        <p>Vestibulum quis purus convallis</p>
        <p>Proin tincidunt magna at felis porttitor</p>
        <p>Morbi convallis odio a mauris</p>
        <p>Phasellus semper libero nec</p>
      </div>
      <div class="item">
        <h3 class="h3">House Rules</h3>
         <ul>
           <el-checkbox-group v-model="AmenitiesArr"  @change="changeRule">
             <li v-for="(item, index) in rulesObj" :key="item.ruleId"><el-checkbox :label="item.ruleId">{{item.rule}}</el-checkbox></li>
           </el-checkbox-group>
        </ul>
      </div>
      <div class="item">
        <h3 class="h3">Cancellations</h3>
         <ul>
          <li>
            <el-checkbox>Flexible</el-checkbox>
            <p>Full refund within limited period.</p>
          </li>
          <li>
            <el-checkbox>Moderate</el-checkbox>
            <p>Full refund within limited period.</p>
          </li>
          <li>
            <el-checkbox>Strict</el-checkbox>
            <p>50% refund up until 1 week prior to check in.</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        checked: true,
        rulesObj: {},
        cancellationsObj: {},
        AmenitiesArr:[],
        cancellations:''
      }
    },
    created () {

      this.$get(this.placeUrl + '/place/rules').then((res) => {
        this.rulesObj = res.data.dataList
      })

      this.$get(this.placeUrl + '/place/cancellation_policies').then((res) => {
        this.cancellations = res.data.dataList
      })

      if(this.$route.query.id){
        this.getRequirements(this.$route.query.id)
      }

    },
    methods: {

      getRequirements(id){
        this.$get(this.partialplaceUrl + '/temp/place', {
          tempPlaceId: id
        }).then((res) => {
          if(res.code == 200){
            // if(res.data.amenities){
            //   res.data.amenities.forEach((val, key) => {
            //     this.AmenitiesArr.push(val.pamenityId)
            //   })
            // }
            // if(res.data.safeAmenities){
            //   res.data.safeAmenities.forEach((val, key) => {
            //     this.safeAmenitiesArr.push(val.psafeAmenityId)
            //   })
            // }
          }
        })
      },
      changeRule(){

        let RulesArr = [];

        this.AmenitiesArr.forEach((val,key) =>{
          let pamenityObj = {};
          pamenityObj['ruleId'] = val
          RulesArr.push(pamenityObj)
        })

        this.$store.state.host.RulesArr = RulesArr;
        console.log(this.$store.state.host.RulesArr)

      }

    }

  }
</script>


<style scoped lang='scss'>
.requirements {
  h3 {
    font-weight: 100;
    font-family: Roboto-Medium;
    font-size: 28px;
    color: #4A4A4A;
    letter-spacing: 1px;
    margin: 0;
    padding-bottom: 30px;
  }
  .item {
    padding-bottom: 50px;
    border-bottom: 1px solid #E6E7E8;
    .h3 {
      margin-top: 50px;
      padding: 0;
    }
    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }
    p {
      font-family: Roboto-Regular;
      font-size: 16px;
      color: #4A4A4A;
      line-height: 26px;
    }
    ul {
      margin-top: 10px;
      margin-left: 3px;
      li {
        margin-bottom: 15px;
        p {
          padding-left: 35px;
          margin-top: -5px;
        }
      }
    }
  }
}
</style>

<style>
.item .el-checkbox__label {
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
}
</style>
