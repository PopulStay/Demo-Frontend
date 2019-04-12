<template>
  <div class="content" @click="toListing(houselist.placeId)">
    <div class="houseimg" :style="{backgroundImage: 'url(' + houselist.picture[0].smallPictureUrl +')'}" ></div>
    <p class="city">{{city}}</p>
    <p class="title">{{houselist.placeName}}</p>
    <p class="number">{{$t('message.pernightcn')}} {{houselist.prices[0].bestPrice}} pps {{$t('message.pernighten')}}</p>
    <el-rate  v-model="value" disabled show-score :colors="['#99A9BF', '#f4436C', '#FF9900']" text-color="#4A4A4A" score-template="5">
    </el-rate>
  </div>
</template>

<script>
  export default {
    name:"houselist",
    props:{
      houselist:{}
    },
    data () {
      return {
        value:3.7,
        city:"",
        housetitle:"",
        q:"你好",
        from:'',
        to:'en',
        appKey:'4f8f22b581b589a3',
        salt:"13753068898",
        secret_key:'ZeTmYSw4chp1VWfTldWtiVjSx2JTEoYh'
      }
    },
    created () {
      if(this.houselist){
        this.$get(this.cityUrl + '/city', {
          code: this.houselist.citycode,
          language: 'en_US'
        }).then((res) => {
          if (res.code === 200) {
            this.city = res.data.fullAddress
          }
        })
        // this.translation()
      }


    },
    mounted () {
    },
    methods: {
      translation(){
        this.$jsonp(this.youdaoUrl+'/api',
          {
            q: this.houselist.placeName,
            appKey: this.appKey,
            salt: '13753068898',
            from: this.from ,
            to: this.to,
            sign:this.$md5(this.appKey+this.houselist.placeName+this.salt+this.secret_key)
          }
        ).then(json => {
          this.housetitle = json.translation[0];
        }).catch(err => {
          console.log(err)
        })
      },
      toListing (placeId) {
        this.$router.push({path: 'listing/lstHome', query: {id: placeId}})
      }
    }
  }
</script>

<style scoped lang="scss">
.content{
  margin: 10px;
  cursor: pointer;



  .houseimg{
    width: 100%;
    height: 260px;
    border-radius: 4px;
    background-size: cover;

  }

  .city{
    color: #f4436c;
    margin: 8px 0 5px;
    letter-spacing: .62px;
    font-family: Roboto-Medium;
  }

  .title{
    width: 95%;
    font-size: 18px;
    color: #000;
    font-family: Roboto-Medium;
    text-align: left;
    display: -webkit-box;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-align: justify;
  }
  .number{
    font-family: Roboto-Light;
    font-size: 16px;
    color: #4a4a4a;
    margin-top: 8px;
    margin-bottom: 3px;
    letter-spacing: .62px;
    text-align: left;
    margin: 8px 0;
  }
}
</style>
