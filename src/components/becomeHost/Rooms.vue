<template>
  <div>
    <div class="becomeHost-header">
      <div class="title">Basics</div>
      <h3>Rooms</h3>
    </div>
    <div class="rooms">

      <ul class="rooms-list">
        <li>
          <span class="title">Guests</span>
          <el-input-number v-model="$store.state.host.guestNumber" :min="0" :max="10" @change="nextdisable"></el-input-number>
        </li>
        <li>
          <span class="title">Bedrooms</span>
          <el-input-number v-model="$store.state.host.bedroomNumber" :min="0" :max="10"></el-input-number>
        </li>
        <li>
          <span class="title">Beds</span>
          <el-input-number v-model="$store.state.host.bedNumber" :min="0" :max="10"></el-input-number>
        </li>
        <li>
          <span class="title">Baths</span>
          <el-input-number v-model="$store.state.host.bathNumber" :min="0" :max="10"></el-input-number>
        </li>
      </ul>

      <div class="bedrooms">
        <h3>Bedrooms <span class="button" slot="reference" @click="getutilities">Add</span></h3>
        <ul class="bedrooms-list">
          <li v-for="(item,index) in $store.state.host.arrangements" :key="index">
            <div class="flex-wrap">
              <div class="title">
                <p>Bedroom {{index+1}}</p>
                <p>
                  <span v-for="(items,indexs) in item.utilities" :key="indexs" v-if="items.name && items.count" >{{items.count}} {{items.name}} </span>
                  <span v-for="(items,indexs) in item.utilities" :key="indexs" v-if="items.utility && items.count">{{items.count}} {{items.utility}}</span>
                </p>
              </div>

              <div class="buttonBOX">
                <div class="button" @click="popover = index">Edit</div>
                <div class="button" @click="Delete(index)" v-if="$store.state.host.arrangements.length>1">Delete</div>
              </div>

              <div class="roomselect" v-if="popover == index">

                <div class="popover">
                  <h4>Bedroom {{index+1}}</h4>
                  <ul class="rooms">
                    <li class="flex-wrap flex-center-between" v-for="(items,indexs) in item.utilities" :key="indexs">
                      <span class="r-title" v-if="items.name">{{items.name}}</span>
                      <span class="r-title" v-if="items.utility">{{items.utility}}</span>
                      <el-input-number v-model="items.count" :min="0" :max="10"></el-input-number>
                    </li>
                  </ul>
                  <div class="bottom flex-wrap flex-center-between">
                    <span @click="Clear(index)">Clear</span>
                    <span class="red" @click="Apply(index)">Apply</span>
                  </div>
                </div>

              </div>

            </div>
          </li>
        </ul>
      </div>
    </div>

    <button class="r-button next" :class="arrangementsLen ? 'disable' : null" :disabled="arrangementsLen" @click="next">Next</button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      num1: 1,
      num2: 1,
      num3: 1,
      num4: 1,
      num5: 1,
      num6: 1,
      arrangements:[],
      popover:999999,
      arrangementsLen:true
    }
  },
  created () {
    if(this.$route.query.id){
      this.getPlace(this.$route.query.id)
    }
  },
  methods: {
    getPlace(id){

      this.$get(this.partialplaceUrl + '/temp/place', {
        tempPlaceId: id
      }).then((res) => {
        if(res.code == 200){

          if(res.data.guestNumber){
            this.$store.state.host.guestNumber = res.data.guestNumber
          }

          if(res.data.bedNumber){
            this.$store.state.host.bedNumber = res.data.bedNumber
          }

          if(res.data.bedroomNumber){
            this.$store.state.host.bedroomNumber = res.data.bedroomNumber
          }

          if(res.data.bathNumber){
            this.$store.state.host.bathNumber = res.data.bathNumber
          }

          if(res.data.arrangements){
            this.$store.state.host.arrangements = res.data.arrangements
          }

        }
      })

    },
    getutilities(){
      this.$get(this.placeUrl + '/arrangement/utilities').then((res) => {
        if(res.code == 200){

          var utilitieslist= {};

          res.data.dataList.forEach((val, key) => {
            val.count = 0
          })

          utilitieslist.utilities = res.data.dataList;

          this.$store.state.host.arrangements.push(utilitieslist)
          this.arrangementsLen = false
        }
      })
    },
    Clear(index){

      this.$store.state.host.arrangements[index].utilities.forEach((val, key) => {
        val.count = 0
      })
      this.popover = 99999;
    },
    Apply(index){
      var utility = [];
      var utilityArr = [];

      this.$store.state.host.arrangements[index].utilities.forEach((val, key) => {
        utilityArr.push(val)
      })

      utility.utilities = utilityArr

      this.$store.state.host.arrangements[index] = utility

      this.popover = 99999
    },
    Delete(index){
      this.$store.state.host.arrangements.splice(index,1);
    },
    nextdisable(){
      console.log(this.$store.state.host.guestNumber)
    },
    next () {
      this.$router.push({path: '/becomeHost/Location', query: {id: this.$route.query.id}})
      this.$store.state.becomehostTitle.Rooms = 'Rooms'
    }
  }
}
</script>

<style lang="scss" scoped>
.rooms {
  .rooms-list {
    li {
      margin-bottom: 10px;
      .title{
        display: inline-block;
        width: 180px;
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0.62px;
      }
    }
  }
  .r-title {
    display: inline-block;
    width: 120px;
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
    letter-spacing: 0.62px;
  }
  .bedrooms {
    margin-top: 80px;
    h3 {
      max-width: 320px;
      font-weight: 100;
      font-family: Roboto-Medium;
      font-size: 28px;
      color: #4A4A4A;
      letter-spacing: 1px;
      margin: 0 0 30px;
      position: relative;
      .button{
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #F4436C;
        letter-spacing: 0.62px;
        cursor: pointer;
      }
    }
    .bedrooms-list {
      li {
        margin-bottom: 30px;
        max-width: 320px;
        position: relative;
      }
      .title {
        width: 260px;
        p {
          font-family: Roboto-Medium;
          font-size: 16px;
          color: #4A4A4A;
          letter-spacing: 0.62px;
        }
        span {
          font-family: Roboto-Regular;
          font-size: 14px;
          color: #000000;
          letter-spacing: 0.62px;
          line-height: 19px;
          &:before{
            content: ',';
          }
          &:first-child:before{
            color: #FFF;
          }
        }
      }
      .button {
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #F4436C;
        letter-spacing: 0.62px;
        height: 30px;
        cursor: pointer;
        float: right;
      }
    }
  }
}
 .roomselect {
   position: absolute;
   z-index: 99999;
   background: white;
   width: 100%;
   box-shadow: 2px 10px 20px 0 rgba(0,0,0,0.15);
   padding: 20px;

    h4 {
      font-family: Roboto-Medium;
      font-size: 16px;
      color: #F4436C;
      letter-spacing: 0.62px;
      font-weight: 100;
      margin: 0;
      padding-bottom: 15px;
    }
    ul{
      max-height: 400px;
      overflow: auto;
      margin-right: -15px;
    }
    li {
      margin-bottom: 5px;
    }
    .bottom {
      margin-top: 10px;
      span {
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #4A4A4A;
        padding-right: 20px;
        cursor: pointer;
      }
      .red {
        color: #F4436C
      }
    }
  }
</style>
