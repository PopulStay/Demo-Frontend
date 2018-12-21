<template>
  <div>
    <e-header></e-header>
    <div class="middle flex-wrap">
      <div class="left">
        <h2>Become a host</h2>
        <ul>
          <li>Basics</li>
          <li v-for="(item, index) in BasicsList" :key="index" class="flex-wrap flex-center-between "
           :class="$route.name == item.url  ? 'active' : ''" @click="route(item, 'BasicsList')">
            {{item.title}} <i class="icon iconfont icon-CHECKMARK active" v-if="item.step"></i>
          </li>
        </ul>
        <ul>
          <li>Space</li>
          <li v-for="(item, index) in SpaceList" :key="index" class="flex-wrap flex-center-between "
           :class="$route.name == item.url  ? 'active' : ''" v-if="stepIndex !== 'BasicsList' || item.step"
            @click="route(item, 'SpaceList')">
            {{item.title}} <i class="icon iconfont icon-CHECKMARK active" v-if="item.step"></i>
          </li>
        </ul>
        <ul>
          <li>Get ready</li>
          <li v-for="(item, index) in readyList" :key="index" class="flex-wrap flex-center-between "
           :class="$route.name == item.url  ? 'active' : ''" v-if="stepIndex === 'readyList' || item.step"
           @click="route(item, 'readyList')">
            {{item.title}} <i class="icon iconfont icon-CHECKMARK active" v-if="item.step"></i>
          </li>
        </ul>
      </div>
      <div class="right">
        <router-view/>
        <div class="r-button next" @click="next" v-if="$route.name !== 'success'">Next</div>
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
        {
          title: 'Set a price',
          url: 'getReady',
          step: false
        },
        {
          title: 'Floating price',
          url: 'Floating',
          step: false
        },
        {
          title: 'Fixed price',
          url: 'Fixed',
          step: false
        },
        {
          title: 'Long-term reservation',
          url: 'reservation',
          step: false
        },
        {
          title: 'Wallet address',
          url: 'address',
          step: false
        },
        {
          title: 'Review & Submit',
          url: 'Submit',
          step: false
        }
      ],
      checkoutShow: false
    }
  },
  created () {

  },
  methods: {
    next () {
      let type = this.stepIndex
      let item = this[type].filter((item) => item.url === this.$route.name)
      let index = this[type].findIndex((item) => item.url === this.$route.name)

      if (item[0].url === 'Amenities') {
        this.stepIndex = 'SpaceList'
        if(this.$route.query.id){
          this.$router.push({path: '/becomeHost/'+this['SpaceList'][0].url, query: {id: this.$route.query.id}})
        }else{
          this.$router.push(this['SpaceList'][0].url)
        }
      } else if (item[0].url === 'Requirements') {
        this.stepIndex = 'readyList'
        this.$router.push(this['readyList'][0].url)
      } else if (item[0].url === 'Submit') {
        this.$router.push('success')
      } else {
        if(this.$route.query.id){
          this.$router.push({path:this[type][index + 1].url, query: {id: this.$route.query.id}})
        }else{
          this.$router.push(this[type][index + 1].url)
        }
      }

      // if (item[0].url === 'Amenities') {
      //   this.stepIndex = 'SpaceList'
      //   this.$router.push(this['SpaceList'][0].url)
      // } else if (item[0].url === 'Requirements') {
      //   this.stepIndex = 'readyList'
      //   this.$router.push(this['readyList'][0].url)
      // } else if (item[0].url === 'Submit') {
      //   this.$router.push('success')
      // } else {
      //   this.$router.push(this[type][index + 1].url)
      // }

    },
    route (value, type) {
      if (value.step) {
        this.stepIndex = type
        this.$router.push(value.url)
      }
    }
  },
  filters: {
    state (val) {
      if (val === 1) {
        return 'Checkout'
      } else if (val === 2) {
        return 'Confirm'
      } else if (val === 2) {
        return 'Confirm'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$red-color: #F4436C;
.middle {
  width: 1500px;
  margin: 0 auto;
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
    .next {
      width: 126px;
      height: 50px;
      line-height: 52px;
      font-family: Roboto-Medium;
      font-size: 16px;
      letter-spacing: 1px;
      margin-top: 50px;
    }
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
