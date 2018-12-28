<template>
   <div>
    <div class="becomeHost-header">
      <div class="title">Space</div>
      <h3>About your space</h3>
    </div>
    <div class="Space">
      <ul>
        <li class="flex-wrap flex-align-center">
          <div class="title">Title</div>
          <div>
            <el-input v-model="$store.state.host.placeName" placeholder="E.g. Lorem ipsum dolor sit amet consectetur adipiscing"></el-input>
          </div>
        </li>
        <li class="flex-wrap">
          <div class="title padding-top">Description</div>
          <div>
            <textarea cols="30" rows="10" v-model="$store.state.host.description" placeholder="Pellentesque odio mi venenatis at volutpat fringilla pharetra vitae"></textarea>
          </div>
        </li>
        <li class="flex-wrap">
          <div class="title padding-top">Photos</div>
          <div class="photos-wrap">

           <el-upload
             v-if="$store.state.host.picture.length"
              v-for="(item,index) in $store.state.host.picture"
              :key="index"
              class="avatar-uploader"
              action=""
              :on-remove="handleRemove"
              :show-file-list="false">
              <div v-if="item.smallPictureUrl" :style="{backgroundImage: 'url(' + item.smallPictureUrl +')'}" class="avatar"></div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-upload
              class="avatar-uploader"
              action="https://testapi.image.populstay.com/image?dir=populstay_placeimage"
              name="img"
              :on-success="handleAvatarSuccess"
              :show-file-list="false"
              :on-progress="handleAvatarProgress"
              :on-error="handleAvatarError"
              v-loading="loading">
              <div v-if="loading" class="avatar"></div>
              <i v-if="!loading" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </div>
        </li>
      </ul>
    </div>
   </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      imageUrl: '',
      loading:false,
    }
  },
  created () {

    if(this.$route.query.id){
      this.getspace(this.$route.query.id)
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
            this.$store.state.host.picture = res.data.picture;
          }
        }
      })

    },
    handleAvatarSuccess (res, file) {
      this.loading = false
      let pictureARR = {};
      pictureARR.title = "";
      pictureARR.placePart = "";
      pictureARR.bigUrl = res.data.bigUrl;
      pictureARR.mediumPictureUrl = res.data.mediumUrl;
      pictureARR.originalUrl = res.data.originalUrl;
      pictureARR.smallPictureUrl = res.data.smallUrl;
      this.$store.state.host.picture.push(pictureARR);

    },
    handleAvatarError (errs, file, fileList) {
      this.loading = false
      this.$alert('Please confirm whether the picture has been updated', 'Warning', {
        confirmButtonText: 'Confirm'
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleAvatarProgress (event, file, fileList) {
      this.loading = true
    }
  }
}
</script>

<style scoped lang="scss">
  .Space {
    li {
      margin-bottom: 20px;
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

      &:nth-child(2n){
        float: right;
      }
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
</style>

<style>
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
  .avatar {
    width: 249px;
    height: 170px;
    display: block;
    background-size: cover;
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
