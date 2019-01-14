<template>
  <div>
    <e-header></e-header>
    <div class="middle flex-wrap">
      <div class="left">
        <h2>Become a host</h2>
        <ul>
          <li class="cursordefault"><b>Basics</b></li>
          <li class="flex-wrap flex-center-between "
              :class="this.$route.name == 'propertyTypes' ? 'active' : ''" @click="route('propertyTypes')">
            Property types<i class="icon iconfont icon-CHECKMARK active" v-if="$store.state.becomehostTitle.propertyTypes == 'propertyTypes'"></i>
          </li>

          <li class="flex-wrap flex-center-between "
              :class="this.$route.name == 'Rooms' ? 'active' : ''" @click="route('Rooms')">
            Rooms<i class="icon iconfont icon-CHECKMARK active" v-if="$store.state.becomehostTitle.Rooms == 'Rooms'"></i>
          </li>

          <li class="flex-wrap flex-center-between "
              :class="this.$route.name == 'Location' ? 'active' : ''" @click="route('Location')">
            Location<i class="icon iconfont icon-CHECKMARK active" v-if="$store.state.becomehostTitle.Location == 'Location'"></i>
          </li>

          <li class="flex-wrap flex-center-between "
              :class="this.$route.name == 'Amenities' ? 'active' : ''" @click="route('Amenities')">
            Amenities<i class="icon iconfont icon-CHECKMARK active" v-if="$store.state.becomehostTitle.Amenities == 'Amenities'"></i>
          </li>

          <!--<li v-for="(item, index) in BasicsList" :key="index" class="flex-wrap flex-center-between "-->
           <!--:class="$route.name == item.url  ? 'active' : ''" @click="route(item, 'BasicsList')">-->
            <!--{{item.title}} <i class="icon iconfont icon-CHECKMARK active" v-if="item.step"></i>-->
          <!--</li>-->
        </ul>
        <ul>
          <li class="cursordefault"><b>Space</b></li>

          <li class="flex-wrap flex-center-between "
              :class="this.$route.name == 'space' ? 'active' : ''" @click="route('space')">
            About your space<i class="icon iconfont icon-CHECKMARK active" v-if="$store.state.becomehostTitle.space == 'space'"></i>
          </li>

          <li class="flex-wrap flex-center-between "
              :class="this.$route.name == 'Requirements' ? 'active' : ''" @click="route('Requirements')">
            Requirements<i class="icon iconfont icon-CHECKMARK active" v-if="$store.state.becomehostTitle.Requirements == 'Requirements'"></i>
          </li>

          <!--<li v-for="(item, index) in SpaceList" :key="index" class="flex-wrap flex-center-between "-->
           <!--:class="$route.name == item.url  ? 'active' : ''" v-if="stepIndex !== 'BasicsList' || item.step"-->
            <!--@click="route(item, 'SpaceList')">-->
            <!--{{item.title}} <i class="icon iconfont icon-CHECKMARK active" v-if="item.step"></i>-->
          <!--</li>-->
        </ul>
        <ul>
          <li class="cursordefault"><b>Get ready</b></li>

          <li class="flex-wrap flex-center-between "
              :class="this.$route.name == 'Floating' ? 'active' : ''" @click="route('Floating')">
            Floating price<i class="icon iconfont icon-CHECKMARK active" v-if="$store.state.becomehostTitle.Floating == 'Floating'"></i>
          </li>

          <li class="flex-wrap flex-center-between "
              :class="this.$route.name == 'ServiceFee' ? 'active' : ''" @click="route('ServiceFee')">
            Service Fee<i class="icon iconfont icon-CHECKMARK active" v-if="$store.state.becomehostTitle.ServiceFee == 'ServiceFee'"></i>
          </li>

          <li class="flex-wrap flex-center-between "
              :class="this.$route.name == 'reservation' ? 'active' : ''" @click="route('reservation')">
            Receive notification<i class="icon iconfont icon-CHECKMARK active" v-if="$store.state.becomehostTitle.reservation == 'reservation'"></i>
          </li>

          <li class="flex-wrap flex-center-between "
              :class="this.$route.name == 'Submit' ? 'active' : ''" @click="route('Submit')">
            Review & Submit<i class="icon iconfont icon-CHECKMARK active" v-if="$store.state.becomehostTitle.Submit == 'Submit'"></i>
          </li>

          <!--<li v-for="(item, index) in readyList" :key="index" class="flex-wrap flex-center-between "-->
           <!--:class="$route.name == item.url  ? 'active' : ''" v-if="stepIndex === 'readyList' || item.step"-->
           <!--@click="route(item, 'readyList')">-->
            <!--{{item.title}} <i class="icon iconfont icon-CHECKMARK active" v-if="item.step"></i>-->
          <!--</li>-->
        </ul>
      </div>
      <div class="right">
        <router-view/>
      </div>
    </div>
    <e-footer></e-footer>
  </div>
</template>

<script>
import header from '../common/header'
import footer from '../common/footer'

export default {
  name: 'becomehost',
  components: {
    'e-header': header,
    'e-footer': footer
  },
  data () {
    return {
      stepIndex: 'BasicsList',
      BasicsList: [
        {
          title: 'Property types',
          url: 'propertyTypes',
          step: false
        },
        {
          title: 'Rooms',
          url: 'Rooms',
          step: false
        },
        {
          title: 'Location',
          url: 'Location',
          step: false
        },
        {
          title: 'Amenities',
          url: 'Amenities',
          step: false
        }
      ],
      SpaceList: [
        {
          title: 'About your space',
          url: 'space',
          step: false
        },
        {
          title: 'Requirements',
          url: 'Requirements',
          step: false
        }
      ],
      readyList: [
        // {
        //   title: 'Set a price',
        //   url: 'getReady',
        //   step: false
        // },
        {
          title: 'Floating price',
          url: 'Floating',
          step: false
        },
        // {
        //   title: 'Fixed price',
        //   url: 'Fixed',
        //   step: false
        // },
        {
          title: 'Service Fee',
          url: 'ServiceFee',
          step: false
        },
        {
          title: 'Receive notification',
          url: 'reservation',
          step: false
        },
        // {
        //   title: 'Wallet address',
        //   url: 'address',
        //   step: false
        // },
        {
          title: 'Review & Submit',
          url: 'Submit',
          step: false
        }
      ],
      checkoutShow: false,
      contentHasSave: false,
      CurrentPath:''
    }
  },
  created () {
    this.CurrentPath = this.$route.name

    this.$store.state.host.hostId = JSON.parse(localStorage.getItem('user')).user_id


    this.Verify()
  },
  methods: {
    route (value) {

      if(this.$route.query.id){
        this.$router.push({path: '/becomeHost/'+value, query: {id: this.$route.query.id}})
      }else{
        this.$router.push(value)
      }

    },
    Verify(){
      let user = this.$store.state.userInfo;

      if(user.user_identity_confirmation.document_verified != 'true' && user.user_identity_confirmation.email_verified != 'true' && user.user_identity_confirmation.phone_verified != 'true' ){
        this.$alert('Please complete the certification', 'Certification', {
          confirmButtonText: 'OK',
          showClose:false,
          center: true,
          callback: action => {
            this.$router.push({path: '/trips/security'})
          }
        });
      }

    }
  }
}
</script>

<style lang="scss" scoped>
$red-color: #F4436C;
.middle {
  width: 1500px;
  margin: 0 auto 300px;
  padding: 90px 0;
  .left {
    flex: 1;
    .active {
      color: $red-color;
    }
    h2 {
      margin-bottom: 30px;
      margin-top: 0;
      font-family: Roboto-Medium;
      font-size: 28px;
      color: #4A4A4A;
      letter-spacing: 0.88px;
      font-weight: 100;
    }
    ul {
      li {
        font-family: Roboto-Regular;
        font-size: 16px;
        letter-spacing: 1px;
        line-height: 50px;
        box-sizing: border-box;
        padding-right: 30px;
        cursor: pointer;
        a {
          width: 100%;
          height: 100%;
          display: inline-block;
        }
        &.cursordefault{
          cursor: default;
        }
      }
      .icon-CHECKMARK {
        font-size: 30px;
      }
    }
  }
  .right {
    flex: 3.5;
    border-left: 1px solid #E6E7E8;
    min-height: 521px;
    box-sizing: border-box;
    padding-left: 100px;

    .active {
      color: $red-color
    }
  }
}
@media only screen and (min-width: 1000px) and (max-width: 1500px) {
  .middle {
    padding: 90px 30px;
    width: auto;
    .right {
      padding-left: 5%;
    }
  }
}
@media only screen and (min-width: 800px) and (max-width: 1000px) {
  .middle {
    padding: 90px 10px;
    width: auto;
    .left {
      li {
        flex-wrap: wrap;
      }
    }
    .right {
      padding-left: 20px;
    }
  }
}
@media only screen and (max-width: 800px) {
  .middle {
    display: block;
    padding: 30px 20px;
    width: auto;
    .left {
      padding: 20px 0;
      h2 {
        text-align: center;
      }
      ul {
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
        li {
          line-height: 25px;
          &:first-child {
            font-weight: bold
          }
        }
      }
    }
    .right {
      padding: 20px 0;
      border-top: 1px solid #E6E7E8;
      border-left: 0;
      width: 100%;
    }
  }
}
</style>

<style lang="scss">
  .next {
    width: 126px;
    height: 50px;
    line-height: 52px;
    font-family: Roboto-Medium;
    font-size: 16px;
    letter-spacing: 1px;
    margin-top: 50px;
    border: none;
  &.disable{
     opacity: 0.5;
   }
  }
</style>
