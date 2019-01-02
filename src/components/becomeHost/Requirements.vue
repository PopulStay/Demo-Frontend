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

      <div class="item Additionalrules" v-if="rulesArr.indexOf(5316) > -1">
        <h3 class="h3">Additional rules</h3>
        <ul>
            <li v-for="(item, index) in Addrules" :key="item.ruleId">{{item}} <i class="el-icon-close" @click="RemoveRules(index)"></i></li>
        </ul>

        <el-input placeholder="Can't wear shoes indoors?" v-model="AddInput" class="input-with-select">
          <el-button slot="append" @click="Additionalrules">Add</el-button>
        </el-input>

      </div>

      <div class="item">
        <h3 class="h3">Cancellations</h3>
         <ul>
           <el-radio-group v-model="$store.state.host.cancellationPolicyId">
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
        storerulesArr:[],
        cancellationsObj: {},
        cancellations:1,
        Addrules:[],
        AddInput:'',
        storeAddrules:[],
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
                if(this.rulesArr.indexOf(val.placeRuleId) == -1){
                  this.rulesArr.push(val.placeRuleId)
                }
                if(val.placeRuleId == 5316){
                  this.Addrules.push(val.additionalTitle)
                }
              })
            }

          }
        })
      },
      changeRule(){
        let RulesArr = [];

        this.rulesArr.forEach((val,key) =>{
          if(val != 5316){
            let pamenityObj = {};
            pamenityObj['placeRuleId'] = val
            RulesArr.push(pamenityObj)
          }
        })

        this.storerulesArr = RulesArr;
      },
      Additionalrules(){
        if(this.AddInput != ""){
          this.Addrules.push(this.AddInput)

          let AddpamenityObj = {};
          AddpamenityObj['placeRuleId'] = 5316
          AddpamenityObj['additionalTitle'] = this.AddInput

          this.storeAddrules.push(AddpamenityObj)

          this.AddInput = ""
        }
      },
      RemoveRules(inx){
        this.Addrules.splice(inx,1);
      }
    },
    beforeDestroy(){

      this.storerulesArr.forEach((val,key) =>{
        this.$store.state.host.RulesArr.push(val)
      })

      let storeAddrules = [];
      this.Addrules.forEach((val,key) =>{
        let AddpamenityObj = {};
        AddpamenityObj['placeRuleId'] = 5316
        AddpamenityObj['additionalTitle'] = val
        storeAddrules.push(AddpamenityObj)
      })

      storeAddrules.forEach((val,key) =>{
        this.$store.state.host.RulesArr.push(val)
      })

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
  .Additionalrules{
    li{
      font-size: 16px;
      word-wrap:break-word;
      white-space:normal;
      max-width: 500px;
      position: relative;
      padding-right: 50px;
      i{
        font-size: 16px;
        position: absolute;
        top: 0px;
        right: 0px;
        opacity: 0.5;
        cursor: pointer;
        &:hover{
          opacity: 1;
        }
      }
    }

    .input-with-select{
      max-width: 500px;
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
