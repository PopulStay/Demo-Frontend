<template>
  <div>
    <div class="becomeHost-header">
      <div class="title">{{$t('message.Space')}}</div>
      <h3>{{$t('message.Requirements')}}</h3>
    </div>
    <div class="requirements">
      <div class="item">
        <h3>{{$t('message.Guestrequirements')}}</h3>
        <p>Lorem ipsum dolor sit amet</p>
        <p>Etiam a elit et sapien dictum hendrerit</p>
        <p>Vestibulum quis purus convallis</p>
        <p>Proin tincidunt magna at felis porttitor</p>
        <p>Morbi convallis odio a mauris</p>
        <p>Phasellus semper libero nec</p>
      </div>
      <div class="item">
        <h3 class="h3">{{$t('message.HouseRules')}}</h3>
        <ul>
          <el-checkbox-group v-model="$store.state.hostinfo.rulesArr"  @change="changeRule">
            <li v-for="(item, index) in rules" :key="item.ruleId"><el-checkbox :label="item.ruleId">{{item.rule}}</el-checkbox></li>
          </el-checkbox-group>
        </ul>
      </div>

      <div class="item Additionalrules" v-if="$store.state.hostinfo.rulesArr.indexOf(5316) > -1">
        <h3 class="h3">{{$t('message.Additionalrules')}}</h3>
        <ul>
            <li v-for="(item, index) in $store.state.hostinfo.Addrules" :key="item.ruleId">{{item}} <i class="el-icon-close" @click="RemoveRules(index)"></i></li>
        </ul>

        <el-input placeholder="Can't wear shoes indoors?" v-model="AddInput" class="input-with-select">
          <el-button slot="append" @click="Additionalrules">Add</el-button>
        </el-input>

      </div>

      <div class="item">
        <h3 class="h3">{{$t('message.Cancellations')}}</h3>
         <ul>
           <el-radio-group v-model="$store.state.host.cancellationPolicyId">
              <li v-for="(item, index) in cancellationsObj" :key="item.cancellationPolicyId">
                <el-radio :label="item.cancellationPolicyId">{{item.name}}<p>{{item.title}}</p></el-radio>
              </li>
           </el-radio-group>
        </ul>
      </div>
    </div>

    <button class="r-button next"
            :class="$store.state.host.cancellationPolicyId == '' ? 'disable' : null"
            :disabled="$store.state.host.cancellationPolicyId == ''"
            @click="next">{{$t('message.Next')}}</button>

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

      if(this.$store.state.becomehostTitle.space != 'space'){
        this.$router.push('/becomeHost/space')
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
                if(this.$store.state.hostinfo.rulesArr.indexOf(val.placeRuleId) == -1){
                  this.$store.state.hostinfo.rulesArr.push(val.placeRuleId)
                }
                if(val.placeRuleId == 5316){
                  this.$store.state.hostinfo.Addrules.push(val.additionalTitle)
                }
              })
            }

          }else{
            this.$notify({
              message: 'Operation failed, please try later.',
              showClose:false,
              type: 'warning',
              onClick(){
                this.close()
              }
            });
          }
        })
      },
      changeRule(){
        let RulesArr = [];

        this.$store.state.hostinfo.rulesArr.forEach((val,key) =>{
          if(val != 5316){
            let pamenityObj = {};
            pamenityObj['pruleId'] = val
            pamenityObj['yes'] = 1
            RulesArr.push(pamenityObj)
          }
        })

        this.storerulesArr = RulesArr;
      },
      Additionalrules(){
        if(this.AddInput != ""){
          if(this.AddInput.length > 300){

            this.$notify({
              title: 'warning',
              message: 'Cannot exceed 300 characters',
              type: 'warning'
            });

          }else{
            this.$store.state.hostinfo.Addrules.push(this.AddInput)

            let AddpamenityObj = {};
            AddpamenityObj['pruleId'] = 5316
            AddpamenityObj['additionalTitle'] = this.AddInput
            AddpamenityObj['yes'] = 1

            this.storeAddrules.push(AddpamenityObj)
            this.AddInput = ""
          }
        }

      },
      RemoveRules (idx) {
        console.log(idx)
        this.$store.state.hostinfo.Addrules.splice(idx, 1)
        console.log(this.$store.state.hostinfo.Addrules)
      },
      next () {
        this.$router.push({path: '/becomeHost/Floating', query: {id: this.$route.query.id}})
        this.$store.state.becomehostTitle.Requirements = 'Requirements'
      }
    },
    beforeDestroy(){
      this.$store.state.host.rules = []

      this.storerulesArr.forEach((val,key) =>{
        this.$store.state.host.rules.push(val)
      })

      let storeAddrules = [];
      this.$store.state.hostinfo.Addrules.forEach((val,key) =>{
        let AddpamenityObj = {};
        AddpamenityObj['pruleId'] = 5316
        AddpamenityObj['additionalTitle'] = val
        AddpamenityObj['yes'] = 1
        storeAddrules.push(AddpamenityObj)
      })

      storeAddrules.forEach((val,key) =>{
        this.$store.state.host.rules.push(val)
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
