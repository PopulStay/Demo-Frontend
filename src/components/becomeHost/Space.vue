<template>
   <div>
    <div class="becomeHost-header">
      <div class="title">{{$t('message.Space')}}</div>
      <h3>{{$t('message.Aboutyourspace')}}</h3>
    </div>
    <div class="Space">
      <ul>
        <li class="flex-wrap flex-align-center">
          <div class="title">{{$t('message.Title')}}</div>
          <div>
            <el-input v-model="$store.state.host.placeName" :placeholder="$t('message.EgfreshNordicstylehomestay')"></el-input>
          </div>
        </li>
        <li class="flex-wrap">
          <div class="title padding-top">{{$t('message.Description')}}</div>
          <div>
            <textarea cols="30" rows="10" v-model="$store.state.host.description" :placeholder="$t('message.Theroomoftheexquisitegirlisdownstairs')"></textarea>
          </div>
        </li>
        <li class="flex-wrap">
          <div class="title padding-top">{{$t('message.Photos')}}</div>
          <div class="photos-wrap">

            <ul class="picturesList">
              <li v-for="(item,index) in $store.state.host.pictures" v-dragging="{ item: item, list: $store.state.host.pictures, group: 'picture' }"
                  v-if="item.smallPictureUrl" :style="{backgroundImage: 'url(' + item.smallPictureUrl +')'}" class="avatar"
                  @mouseover="picturesOver(index)" @mouseout="picturesOut(index)" >
                <div class="picturesMask" v-if="picturesMask == index">
                  <div>
                    <i class="el-icon-zoom-in" @click="picturesPreview(index)"></i>
                    <i class="el-icon-delete" @click="picturesDelete(index)"></i>
                  </div>
                  <p></p>
                </div>
              </li>
              <li>
                <el-upload
                  class="avatar-uploader"
                  action="https://testapi.image.populstay.com/image?dir=populstay_placeimage"
                  name="img"
                  multiple="true"
                  :on-success="handleAvatarSuccess"
                  :show-file-list="false"
                  :on-progress="handleAvatarProgress"
                  :on-error="handleAvatarError"
                  v-loading="loading">
                  <div v-if="loading" class="avatar"></div>
                  <i v-if="!loading" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </li>
            </ul>

            <el-dialog
              title=""
              :visible.sync="picturesShow"
              class="picturesShow"
              center>
                <img :src="bigPictureUrl" alt="">
                <el-button @click="picturesShow = false">{{$t('message.Close')}}</el-button>
              </span>
            </el-dialog>

          </div>
        </li>
      </ul>
    </div>

     <button class="r-button next" :class="$store.state.host.placeName == '' || $store.state.host.description == '' || $store.state.host.pictures.length == 0 ? 'disable' : null" :disabled="$store.state.host.placeName == '' || $store.state.host.description == '' || $store.state.host.pictures.length == 0" @click="next" >{{$t('message.Next')}}</button>

   </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      imageUrl: '',
      loading:false,
      picturesMask:false,
      picturesShow:false
    }
  },
  created () {

    if(this.$route.query.id){
      this.getspace(this.$route.query.id)
    }

    if(this.$store.state.becomehostTitle.Amenities != 'Amenities'){
      this.$router.push('/becomeHost/Amenities')
    }
  },
  methods: {
    getspace (id) {

      this.$get(this.partialplaceUrl + '/temp/place', {
        tempPlaceId: id
      }).then((res) => {
        if(res.code == 200){
          if(res.data.placeName){
            this.$store.state.host.placeName = res.data.placeName;
          }

          if(res.data.description){
            this.$store.state.host.description = res.data.description;
          }

          if(res.data.picture){
            this.$store.state.host.pictures = res.data.picture;
          }
        }
      })

    },
    handleAvatarSuccess (res, file) {

      this.loading = false
      let pictureARR = {};
      pictureARR.title = "";
      pictureARR.placePart = "";
      pictureARR.bigPictureUrl = res.data.bigUrl;
      pictureARR.mediumPictureUrl = res.data.mediumUrl;
      pictureARR.originalUrl = res.data.originalUrl;
      pictureARR.smallPictureUrl = res.data.smallUrl;
      this.$store.state.host.pictures.push(pictureARR);

    },
    handleAvatarError (errs, file, fileList) {
      this.loading = false

      this.$notify({
        title: this.$t('message.Warning'),
        message: this.$t('message.Pleaseconfirmwhetherthepicturehasbeenupdated'),
        type: 'warning'
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleAvatarProgress (event, file, fileList) {
      this.loading = true
    },
    next () {
      this.$router.push({path: '/becomeHost/Requirements', query: {id: this.$route.query.id}})
      this.$store.state.becomehostTitle.space = 'space'
    },
    picturesOver(id){
      this.picturesMask = id
    },
    picturesOut(id){
      this.picturesMask = 999999999
    },
    picturesPreview(id){
      this.bigPictureUrl = this.$store.state.host.pictures[id].bigPictureUrl;
      this.picturesShow = true
    },
    picturesDelete(id){
      this.$store.state.host.pictures.splice(id,1)
    },
  },
  mounted(){

  }
}
</script>

<style scoped lang="scss">
  .Space {
    li {
      margin-bottom: 20px;

      .picturesList{
        li{
          display: inline-block;
          position: relative;
          width: 249px;
          height: 170px;
          background-size: cover;

          &:first-child{
            width: 100%;
            height: 240px;
          }

          &:nth-child(odd){
            float: right;
          }

          div.picturesMask {
            position: absolute;
            width: 100%;
            height: 100%;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            p{
              width: 100%;
              height: 100%;
              position: absolute;
              background: black;
              opacity: 0.5;
            }

            div{
              position: absolute;
              z-index: 1;
              i{
                color: white;
                font-size: 24px;
                margin: 0 10px;
                vertical-align: middle;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .title {
      width: 230px;
      font-family: Roboto-Regular;
      font-size: 16px;
      color: #4A4A4A;
      letter-spacing: 0;
      line-height: 19px;
    }
    textarea {
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      width: 512px;
      height: 160px;
      font-family: Roboto-Regular;
      font-size: 16px;
      color: #4A4A4A;
      letter-spacing: 0;
      padding: 10px 15px;
      box-sizing: border-box;
      resize: none;
      &:focus {
        outline: none;
      }
    }
    .avatar-uploader {
      display: inline-block;
      margin-bottom: 20px;
    }
    .nomargin {
      margin-right: 0;
    }
    .photos-wrap {
      width: 512px;
    }
    .padding-top {
      padding-top: 20px;
    }
  }

  .picturesShow{
    .el-dialog__body{
      overflow: auto;
      height: 500px;

      img{
        display: block;
        width: 100%;
        max-width: 800px;
        margin: 20px auto;
      }

      button{
        display: block;
        background: #F4436C;
        color: white;
        margin: 0 auto;
      }
    }

  }
</style>

<style lang="scss">
  .Space{
    .avatar-uploader{
      width: 100%;
      height: 100%;

      .el-loading-spinner .path{
        stroke:#F4436C;
      }
    }
  }
  .Space .el-input__inner {
    width: 512px;
    height: 46px;
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
    letter-spacing: 0;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9!important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    width: 243px;
    height: 170px;
    line-height: 170px;
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }
  @media only screen and (max-width: 800px) {
    .Space ul li {
      display: block;
    }
    .Space ul li .title {
      margin-bottom: 3px;
    }
    .Space .el-input__inner, .Space textarea, .Space .photos-wrap {
      width: 100%!important;
    }
    .Space .photos-wrap .avatar-uploader {
      margin-right: 5px;
    }
  }
</style>
