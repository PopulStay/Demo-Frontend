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
            <el-input v-model="input" placeholder="E.g. Lorem ipsum dolor sit amet consectetur adipiscing"></el-input>
          </div>
        </li>
        <li class="flex-wrap">
          <div class="title padding-top">Description</div>
          <div>
            <textarea cols="30" rows="10" placeholder="Pellentesque odio mi venenatis at volutpat fringilla pharetra vitae"></textarea>
          </div>
        </li>
        <li class="flex-wrap">
          <div class="title padding-top">Photos</div>
          <div class="photos-wrap">
           <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-upload
              class="avatar-uploader nomargin"
              action=""
              :show-file-list="false">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
      imageUrl: ''
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
    margin-right: 10px;
    margin-bottom: 10px;
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
  font-size: 28px;
  color: #8c939d;
  width: 158px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
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
