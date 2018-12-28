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
          <el-checkbox-group v-model="rulesArr"  @change="changeRule">
            <li v-for="(item, index) in rules" :key="item.ruleId"><el-checkbox :label="item.ruleId">{{item.rule}}</el-checkbox></li>
          </el-checkbox-group>
        </ul>
      </div>
      <div class="item">
        <h3 class="h3">Cancellations</h3>
         <ul>
           <el-radio-group v-model="$store.state.host.cancellations">
              <li v-for="(item, index) in cancellationsObj" :key="item.cancellationPolicyId">
                <el-radio :label="item.cancellationPolicyId">{{item.name}}<p>{{item.title}}</p></el-radio>
              </li>
           </el-radio-group>
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
        rules: {},
        rulesArr:[],
        cancellationsObj: {},
        cancellations:1
      }
    },
    created () {

      this.$get(this.placeUrl + '/place/rules').then((res) => {
        this.rules = res.data.dataList
      })

      this.$get(this.placeUrl + '/place/cancellation_policies').then((res) => {
        this.cancellationsObj = res.data.dataList
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

            if(res.data.rules){
              res.data.rules.forEach((val, key) => {
                this.rulesArr.push(val.placeRuleId)
              })
            }

            console.log( this.rulesArr)

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

        this.rulesArr.forEach((val,key) =>{
          let pamenityObj = {};
          pamenityObj['placeRuleId'] = val
          RulesArr.push(pamenityObj)
        })

        this.$store.state.host.RulesArr = RulesArr;
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
